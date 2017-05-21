import {Collection} from "../Mongodb";
import {SubOrder, Order } from "../Classes";
import { objectId, Id, Order_Rate} from "../Types";
module.exports = {
        Collection: () => Collection("Orders"),
        Read(object: SubOrder, callback: any) {
            this.Collection().find(object).toArray((err, row: SubOrder[]) => {
                if (row) return callback({ success: true, data: row });
                else return callback({ success: false });
            });
        },
        Delete(object: Id, callback: any) {
            this.Collection().removeOne({ "_id": objectId(object._id) }, (err, resp) => {
                if (resp.result.ok) return callback({ success: true, data: resp.result });
                else return callback({ success: false, data: object });
            });
            //delete suborder from users also.>>OMar
        },
        Create(object: SubOrder, callback: any) {
            this.Collection().insertOne(object, (err, row: SubOrder) => {
                if (row) return callback({ success: true, data: row });
                //Insert the suborder in the specified owner(user)>>OMar
                else return callback({ success: false });
            });
        },
        Update(object: SubOrder, callback: any) {
            object._id = objectId(object._id);
            this.Collection().updateOne({ _id: object._id }, { $set: object }, (err, row: Order) => {
                if (row) return callback({ success: true, data: row });
                else return callback({ success: false });
            });
        },
        RateOrder(object: Order_Rate, callback: any) {
            object._id = objectId(object._id);
            this.Collection().updateOne({ _id: object._id }, { $set: { rate: object.rate } }, (err, row: Order) => {
                if (row) return callback({ success: true, data: row });
                else return callback({ success: false });
            });
        }
    };