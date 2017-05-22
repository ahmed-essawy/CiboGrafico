import { Order, SubOrder } from "../Classes";
import { objectId, Id, Order_Rate } from "../Types";
import { Collection } from "../Mongodb";
module.exports = {
    Collection: () => Collection("Orders"),
    Read(object: Id, callback: any) {
        this.Collection().findOne(objectId(object._id), (err, row: Order) => {
            if (row) return callback({ success: true, data: row });
            else return callback({ success: false, data: object });
        });
    },
    ReadAll(callback: any) {
        this.Collection().find().toArray((err, row: Order[]) => {
            if (row) return callback({ success: true, data: row });
            else return callback({ success: false });
        });
    },
    Delete(object: Id, callback: any) {
        this.Collection().removeOne({ "_id": objectId(object._id) }, (err, resp) => {
            if (resp.result.ok) {
                Collection("Users").update({ "_id": object._id },
                    { $pull: { "orders": object._id } });
                return callback({ success: true, data: resp.result });
            }
            else return callback({ success: false, data: object });
        });
    },
    Create(object: Order, callback: any) {
        object.owner = objectId(object.owner);
        object.restaurant = objectId(object.restaurant);
        this.Collection().update({ "num": object.num }, { $setOnInsert: object }, { upsert: true }, (err, resp) => {
            if (resp.result.upserted) {
                Collection("Users").update({ "_id": object.owner },
                    { $addToSet: { "orders": resp.result.upserted[0]._id } }, (err, resp) => { console.log(resp) });
                return callback({ success: true, data: resp });
            } else return callback({ success: false });
        });
    },
    Update(object: Order, callback: any) {
        object._id = objectId(object._id);
        this.Collection().updateOne({ _id: object._id }, { $set: object }, (err, row: Order) => {
            if (row) return callback({ success: true, data: row });
            else return callback({ success: false });
        });
    },
    RateOrder(object: Order_Rate, callback: any) {
        object._id = objectId(object._id);
        this.Collection().updateOne({ _id: object._id }, { $set: { rate: object.rate } },
            (err, row: Order) => {
                if (row) return callback({ success: true, data: row });
                else return callback({ success: false });
            });
    },
    CreateSubOrder(object: SubOrder, callback: any) {
        object._id = objectId(object._id);
        this.Collection().insertOne(object,
            (err, row: Order) => {
                if (row) {
                    this.Collection().update({ "num": object.num, "subOrders": { $exists: true } },
                        { $addToSet: { "subOrders": object._id } });
                    return callback({ success: true, data: row });
                }
                return callback({ success: false });
            });
    },
    GetSubOrders(num: number, callback: any) {
        this.Collection().find({ num: num, "subOrders": { $exists: false } })
            .toArray((err, row: Order[]) => {
                if (row) return callback({ success: true, data: row });
                return callback({ success: false });
            });
    }
};