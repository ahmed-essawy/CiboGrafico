import { Offer } from "../Classes";
import {Collection} from "../Mongodb";
import {objectId, Id} from "../Types";
module.exports = {
        Collection: () => Collection("Offers"),
        Read(object: Offer, callback: any) {
            this.Collection().find(object).toArray((err, row: Offer[]) => {
                if (row) return callback({ success: true, data: row });
                else return callback({ success: false });
            });
        },
        Delete(object: Id, callback: any) {
            this.Collection().removeOne({ "_id": objectId(object._id) }, (err, resp) => {
                if (resp.result.ok) return callback({ success: true, data: resp.result });
                else return callback({ success: false, data: object });
            });
        },
        Create(object: Offer, callback: any) {
            this.Collection().insertOne(object, (err, row: Offer) => {
                if (row) return callback({ success: true, data: row });
                else return callback({ success: false });
            });
        },
        Update(object: Offer, callback: any) {
            object._id = objectId(object._id);
            this.Collection().updateOne({ _id: object._id }, { $set: object }, (err, row: Offer) => {
                if (row) return callback({ success: true, data: row });
                else return callback({ success: false });
            });
        }
    };