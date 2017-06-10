import { Order, SubOrder, Restaurant } from "../Classes";
import { objectId, Id, Order_Rate } from "../Types";
import { Collection } from "../Mongodb";
module.exports = {
    Collection: () => Collection("Orders"),
    Read(object: Id, callback: any) {
        Collection("Orders").findOne(objectId(object._id),
            (err, row: Order) => {
                if (err) return callback({ success: false, msg: "Error !!" });
                if (row) return callback({ success: true, data: row });
                else return callback({ success: false, data: object });
            });
    },
    ReadAll(callback: any) {
        Collection("Orders").find().toArray((err, row: Order[]) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (row) return callback({ success: true, data: row });
            else return callback({ success: false });
        });
    },
    Delete(object: Id, callback: any) {
        Collection("Orders").removeOne({ "_id": objectId(object._id) }, (err, resp) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (resp.result.ok) {
                Collection("Users").update({ "_id": object._id }, { $pull: { "orders": object._id } });
                return callback({ success: true, data: resp.result });
            } else return callback({ success: false, data: object });
        });
    },
    Create(object: Order, callback: any) {
        object.meals.forEach(meal => meal._id = objectId(meal._id));
        object.owner = objectId(object.owner);
        object.restaurant = objectId(object.restaurant);
        Collection("Orders").update({ "num": object.num }, { $setOnInsert: object }, { upsert: true }, (err, resp1) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (resp1.result.upserted) {
                Collection("Users").update({ "_id": object.owner }, { $addToSet: { "orders": resp1.result.upserted[0]._id } }, (err, resp2) => {
                    if (err) return callback({ success: false, msg: "Error !!" });
                    if (resp2.result.nModified > 0) {
                        Collection("Restaurants").update({ "_id": object.restaurant }, { $addToSet: { "orders": resp1.result.upserted[0]._id } }, (err, resp3) => {
                            if (err) return callback({ success: false, msg: "Error !!" });
                            if (resp3.result.nModified > 0) return callback({ success: true, data: { "number": object.num, "insertOrder": resp1, "addToUser": resp2, "addToRestaurant": resp3 } });
                            else return callback({ success: true, data: "Data doesn't exist" });
                        });
                    } else return callback({ success: true, data: "Data doesn't exist" });
                });
            } else return callback({ success: false });
        });
    },
    Update(object: Order, callback: any) {
        object._id = objectId(object._id);
        Collection("Orders").updateOne({ _id: object._id }, { $set: object }, (err, row: Order) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (row) return callback({ success: true, data: row });
            else return callback({ success: false });
        });
    },
    RateOrder(object: Order_Rate, callback: any) {
        object._id = objectId(object._id);
        Collection("Orders").updateOne({ _id: object._id }, { $set: { rate: object.rate } }, (err, row: Order) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (row) return callback({ success: true, data: row });
            else return callback({ success: false });
        });
    },
    CreateSubOrder(object: SubOrder, callback: any) {
        object.owner = objectId(object.owner);
        object._id = objectId(object._id);
        Collection("Orders").findOne({ "num": object.num, "subOrders": { $exists: true } },
            (err, row: Order) => {
                if (err) return callback({ success: false, msg: "Error !!" });
                if (row) {
                    Collection("Orders").insertOne(object, (err, resp1) => {
                        if (err) return callback({ success: false, msg: "Error !!" });
                        if (resp1.result.n > 0) {
                            Collection("Orders").update({ "num": object.num, "subOrders": { $exists: true } }, { $addToSet: { "subOrders": object._id } }, (err, resp2) => {
                                if (err) return callback({ success: false, msg: "Error !!" });
                                if (resp2.result.nModified > 0) {
                                    Collection("Users").update({ "_id": object.owner }, { $addToSet: { "orders": object._id } }, (err, resp3) => {
                                        if (err) return callback({ success: false, msg: "Error !!" });
                                        if (resp3.result.nModified > 0) return callback({ success: true, data: { "insertSubOrder": resp1, "addToOrder": resp2, "addToUser": resp3 } });
                                        else return callback({ success: false });
                                    });
                                } else return callback({ success: false });
                            });
                        } else return callback({ success: false });
                    });
                } else return callback({ success: true, data: false });
            });
    },
    GetSubOrders(num: number, callback: any) {
        Collection("Orders").find({ num: num, "subOrders": { $exists: false } }).toArray((err, row: Order[]) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (row) return callback({ success: true, data: row });
            else return callback({ success: false });
        });
    },
    ReadAllByUser(object: Id, callback: any) {
        Collection("Orders").find({ "owner": objectId(object._id) }).toArray((err, row: Order[]) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (row) {
                const restaurants = async function () {
                    const orders = Array<Order>();
                    for (let i = 0; i < row.length; i++) {
                        await new Promise((resolve, reject) => {
                            Collection("Restaurants").findOne(objectId(row[i].restaurant), (err, datarow: Restaurant) => {
                                if (err) return callback({ success: false, msg: "Error !!" });
                                if (datarow) {
                                    row[i]["restName"] = datarow.name;
                                    resolve(row[i]);
                                }
                                reject();
                            });
                        }).then(order => orders.push(order as Order)).catch(() => {});
                    }
                    return orders;
                };
                restaurants().then(orders => callback({ success: true, data: orders }));
            } else return callback({ success: false });
        });
    }
};