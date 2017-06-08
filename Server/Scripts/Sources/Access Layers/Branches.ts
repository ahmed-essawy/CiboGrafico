import { Branch, Restaurant, Authentication } from "../Classes";
import { objectId, Id, AccountType } from "../Types";
import { Collection, Functions } from "../Mongodb";
module.exports = {
    Create(object: Branch, password: string, restaurant: Id, callback: any) {
        Collection("Restaurants").update({
                _id: objectId(restaurant._id), "branches.username": { $ne: object.username }
            },
            { $addToSet: { "branches": object } }, (err, resp1) => {
                if (err) return callback({ success: false, msg: "Error !!" });
                if (resp1.result.nModified > 0) {
                    const tempAuth = new Authentication(object._id, AccountType.Branch, object.email, object
                        .username, password);
                    console.log(tempAuth);
                    Functions("addAuth", tempAuth);
                } else return callback({ success: false, msg: "Duplicated Data" });
            }
        );
    },
    Read(object: Id, callback: any) {
        Collection("Restaurants").findOne({ "branches._id": objectId(object._id) }, (err, row: Restaurant) => {
            if (row)
                return callback({ success: true, data: row.branches.filter(b => b._id.toString() === object._id
                    .toString())[0] });
            else return callback({ success: false, data: object._id });
        });
    },
    ReadAll(callback: any) {
        Collection("Restaurants").find().toArray((err, row: Restaurant[]) => {
            const branches = new Array<Branch>();
            row.forEach(restaurant => restaurant.branches.forEach(branch => branches.push(branch)));
            if (row) return callback({ success: true, data: branches });
            else return callback({ success: false });
        });
    },
    ReadByRestauarnt(object: Id, callback: any) {
        Collection("Restaurants").findOne({ "_id": objectId(object._id) }, (err, row: Restaurant) => {
            if (row) return callback({ success: true, data: row.branches });
            else return callback({ success: false, data: object._id });
        });
    },
    Update(object: Branch, callback: any) {
        object._id = objectId(object._id);
        Collection("Restaurants").update({ "branches._id": object._id }, { $set: { "branches.$": object } },
            (err, resp) => {
                if (resp.result.ok) return callback({ success: true, data: resp.result });
                else return callback({ success: false, data: object });
            }
        );
    },
    Delete(object: Id, callback: any) {
        Collection("Restaurants").update({ "branches._id": objectId(object._id) },
            { $pull: { "branches": { "_id": objectId(object._id) } } }, (err, resp) => {
                if (resp.result.ok) return callback({ success: true, data: resp.result });
                else return callback({ success: false, data: object });
            });
    }
};