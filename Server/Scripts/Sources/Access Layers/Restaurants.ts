import { Collection } from "../Mongodb";
import { Restaurant, Review, User, Offer } from "../Classes";
import { objectId, Id } from "../Types";
module.exports = {
    Create(object: Restaurant, callback: any) {
        Collection("Restaurants").update({ name: object.name }, { $setOnInsert: object }, { upsert: true },
            (err, resp) => {
                if (err) return callback({ success: false, msg: "Error !!" });
                if (resp.result.ok) return callback({ success: true, data: resp.result });
                else return callback({ success: false, data: object });
            });
    },
    ReadFull(object: Id, callback: any) {
        Collection("Restaurants").findOne(objectId(object._id), (err, row) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (row) {
                const users = async function () {
                    const reviews = Array<Review>();
                    for (let i = 0; i < row.reviews.length; i++) {
                        const review = row.reviews[i];
                        await new Promise((resolve, reject) => {
                            Collection("Users").findOne(objectId(review._id),
                                (err, datarow: User) => {
                                    if (err) return callback({ success: false, msg: "Error !!" });
                                    if (datarow) {
                                        review["name"] = datarow.firstName + " " + datarow.lastName;
                                        review["userImg"] = datarow.image;
                                        resolve(review);
                                    }
                                    reject();
                                });
                        }).then(review => reviews.push(review as Review)).catch(() => {});
                    }
                    const offers = Array<Offer>();
                    for (let i = 0; i < row.offers.length; i++) {
                        await new Promise((resolve, reject) => {
                            Collection("Offers").findOne(objectId(row.offers[i]),
                                (err, datarow: Offer) => {
                                    if (err) return callback({ success: false, msg: "Error !!" });
                                    if (datarow) resolve(datarow);
                                    reject();
                                });
                        }).then(offer => offers.push(offer as Offer)).catch(() => {});
                    }
                    return { reviews: reviews, offers: offers };
                };
                users().then(object => {
                    row.reviews = object.reviews;
                    row.offers = object.offers;
                    callback({ success: true, data: row });
                });
            } else return callback({ success: false, data: object });
        });
    },
    Read(object: Id, callback: any) {
        Collection("Restaurants").findOne(objectId(object._id), (err, row: Restaurant) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (row) return callback({ success: true, data: row });
            else return callback({ success: false, data: object });
        });
    },
    ReadAll(callback: any) {
        Collection("Restaurants").find().toArray((err, row: Restaurant[]) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (row) return callback({ success: true, data: row });
            else return callback({ success: false });
        });
    },
    Update(object: Restaurant, callback: any) {
        object._id = objectId(object._id);
        Collection("Restaurants").update({ _id: object._id }, { $set: object }, (err, resp) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (resp.result.ok) return callback({ success: true, data: resp.result });
            else return callback({ success: false, data: object });
        });
    },
    Delete(object: Id, callback: any) {
        Collection("Restaurants").removeOne({ _id: objectId(object._id) }, (err, resp) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (resp.result.ok) return callback({ success: true, data: resp.result });
            else return callback({ success: false, data: object });
        });
    },
    ReadAllByLoc(object: any, callback: any) {
        Collection("Restaurants").find(object).toArray((err, row: Restaurant[]) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (row) return callback({ success: true, data: row });
            else return callback({ success: false });
        });
    }
};