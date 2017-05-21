import {Branch, Restaurant } from "../Classes";
import {objectId, Id} from "../Types";
import {Collection} from "../Mongodb";
module.exports = {
        Collection: () => Collection("Restaurants"),
        Create(object: Branch, restaurant: Id, callback: any) {
            this.Collection().update({ _id: objectId(restaurant._id), "branches.login.username": { $ne: object.username } },
                    { $addToSet: { "branches": object } }, (err, resp) => {
                        if (resp.result.ok) return callback({ success: true, data: resp.result });
                        else return callback({ success: false, data: object });
                    }
                );
        },
        Read(object: Id, callback: any) {
            this.Collection().findOne({ "branches._id": objectId(object._id) }, (err, row: Restaurant) => {
                if (row) return callback({ success: true, data: row.branches.filter(b => b._id == object._id)[0] });
                else return callback({ success: false, data: object._id });
            });
        },
        ReadAll(callback: any) {
            this.Collection().find().toArray((err, row: Restaurant[]) => {
                const branches = new Array<Branch>();
                row.forEach(restaurant => restaurant.branches.forEach(branch => branches.push(branch)));
                if (row) return callback({ success: true, data: branches });
                else return callback({ success: false });
            });
        },
        Update(object: Branch, callback: any) {
            object._id = objectId(object._id);
            this.Collection().update({ "branches._id": object._id }, { $set: { "branches.$": object } }, (err, resp) => {
                        if (resp.result.ok) return callback({ success: true, data: resp.result });
                        else return callback({ success: false, data: object });
                    }
                );
        },
        Delete(object: Id, callback: any) {
            this.Collection().update({ "branches._id": objectId(object._id) },
                { $pull: { "branches": { "_id": objectId(object._id) } } }, (err, resp) => {
                    if (resp.result.ok) return callback({ success: true, data: resp.result });
                    else return callback({ success: false, data: object });
                });
        }
    };