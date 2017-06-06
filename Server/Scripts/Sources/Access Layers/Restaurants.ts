import { Collection } from "../Mongodb";
import { Restaurant,Review,User } from "../Classes";
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
    Read(object: Id, callback: any) {
        Collection("Restaurants").findOne(objectId(object._id), (err, row: Restaurant) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (row) {
                const users = async function () {
                    const reviews = Array<Review>();
                    for (let i = 0; i < row.reviews.length; i++) {
                        let review = row.reviews[i];
                        await new Promise(resolve => {
                            Collection("Users").findOne(objectId(review._id),
                                (err, datarow: User) => {
                                    if (err) return callback({ success: false, msg: "Error !!" });
                                    review["name"] = datarow.firstName + " " + datarow.lastName;
                                    resolve(review);
                                });
                        }).then(review => reviews.push(review as Review));
                    }
                    return reviews;
                };
                users().then(reviews => {
                    row.reviews = reviews;
                    callback({ success: true, data: row });
                });
            }
                //return callback({ success: true, data: row });
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