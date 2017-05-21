import {Collection} from "../Mongodb";
import { Authentication } from "../Classes";
module.exports = {
        Check(object: any, callback: any) {
            Collection("Tokens").findOne({ $and: [{ "password": require("md5")(object.password) }, { $or: [{ "email": object.username }, { "username": object.username }] }] }, (err, resp: Authentication) => {
                if (err) return callback({ success: false });
                if (resp) return callback({ success: true, data: resp.token });
                else return callback({ success: false });
            });
        }
    };