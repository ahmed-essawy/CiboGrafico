import {Order} from "../Classes";
import { objectId, Id, Order_Rate} from "../Types";
import {Collection} from "../Mongodb";
module.exports = {
        Collection: () => Collection("Orders"),
        Read(object: Order, callback: any) {
            this.Collection().find(object).toArray((err, row: Order[]) => {
                if (row) return callback({ success: true, data: row });
                else return callback({ success: false });
            });
        },
        Delete(object: Id, callback: any) {
            this.Collection().removeOne({ "_id": objectId(object._id) }, (err, resp) => {
                if (resp.result.ok) return callback({ success: true, data: resp.result });
                else return callback({ success: false, data: object });
            });
            //Sohaila and Omar functions
            //this.Collection().Users.orders.splice(this.Users.Collection().orders.indexOf(objectId(object._id)), 1);
            //this.Collection().Restaurants.orders.splice(this.Restaurants.Collection().Orders
            //    .indexOf(objectId(object._id)),
            //    1);
        },
        Create(object: Order, callback: any) {
            this.Collection().insertOne(object, (err, row: Order) => {
                if (row) {
                    //Omar should do a function here
                    //this.Users.Find({ _id: object.owner }).orders.push(object._id);
                    //sohaila should do a function here
                    //this.Restaurants.Find({ _id: objectId(object.restaurant) }).orders.push(object.restaurant);
                    return callback({ success: true, data: row });
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
        }
    };