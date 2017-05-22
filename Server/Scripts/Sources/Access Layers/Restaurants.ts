import { Collection } from "../Mongodb";
import { Restaurant } from "../Classes";
import { objectId, Id } from "../Types";
module.exports = {
    Collection: () => Collection("Restaurants"),
    Create(object: Restaurant, callback: any) {
        this.Collection().update({ name: object.name }, { $setOnInsert: object }, { upsert: true }, (err, resp) => {
            if (resp.result.ok) return callback({ success: true, data: resp.result });
            else return callback({ success: false, data: object });
        });
    },
    Read(object: Id, callback: any) {
        this.Collection().findOne(objectId(object._id), (err, row: Restaurant) => {
            if (row) return callback({ success: true, data: row });
            else return callback({ success: false, data: object });
        });
    },
    ReadAll(callback: any) {
        this.Collection().find().toArray((err, row: Restaurant[]) => {
            if (row) return callback({ success: true, data: row });
            else return callback({ success: false });
        });
    },
    Update(object: Restaurant, callback: any) {
        object._id = objectId(object._id);
        this.Collection().update({ _id: object._id }, { $set: object }, (err, resp) => {
            if (resp.result.ok) return callback({ success: true, data: resp.result });
            else return callback({ success: false, data: object });
        });
    },
    Delete(object: Id, callback: any) {
        this.Collection().removeOne({ _id: objectId(object._id) }, (err, resp) => {
            if (resp.result.ok) return callback({ success: true, data: resp.result });
            else return callback({ success: false, data: object });
        });
    }
};