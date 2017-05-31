import {Collection} from "../Mongodb";
import { Authentication } from "../Classes";
module.exports = {
    Check(object: any, callback: any) {
        Collection("Authentications").findOne({ $and: [{ "password": require("md5")(object.password) }, { $or: [{
            "email": object.username }, { "username": object.username }] }] }, (err, resp: Authentication) => {
            if (err) return callback({ success: false });
            if (resp) {
                require("../Mongodb").Users.Read({ _id: resp._id }, resp2 => {
                    if (err) return callback({ success: false });
                    if (resp2.success) {
                        resp2.data["token"] = resp.token;
                        return callback({ success: true, data: resp2.data });
                    } else return callback({ success: false });
                });
            } else return callback({ success: false });
        });
    }
};