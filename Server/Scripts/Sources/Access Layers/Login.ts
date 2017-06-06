import { Collection } from "../Mongodb";
import { Authentication } from "../Classes";
import { objectId, AccountType } from "../Types";
module.exports = {
    Check(object: any, callback: any) {
        Collection("Authentications").findOne({
            $and: [{ "password": require("md5")(object.password) }, {
                $or: [{
                    "email": object.username
                }, { "username": object.username }]
            }]
        }, (err, resp: Authentication) => {
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
    },
    fbLogin(object: any, callback: any) {
        const fbObject = {
            "name": "facebook", "data": {
                "id": object.id, "accessToken": object.AccessToken,
                "expiresIn": object.ExpiresIn
            }
        };
        if (object.isRegistered) {
            Collection("Authentications").findOne({
                "_id": objectId(object._id), "socials.data.id": {
                    $eq: fbObject.data
                        .id
                }
            },
                (err, resp: Authentication) => {
                    console.log(err);
                    console.log(resp);
                    if (err) return callback({ success: false });
                    if (resp) {
                        console.log(resp);
                        //require("../Mongodb").Users.Read({ _id: resp._id }, resp2 => {
                        //    if (err) return callback({ success: false });
                        //    if (resp2.success) {
                        //        resp2.data["token"] = resp.token;
                        //        return callback({ success: true, data: resp2.data });
                        //    } else return callback({ success: false });
                        //});
                    } else return callback({ success: false });
                });
            //Collection("Authentications").update({ "_id": objectId(object._id), "socials.data.id": { $ne: fbObject.data.id } },
            //    { $addToSet: { "socials": fbObject } }, (err, resp) => {
            //        if (err) return callback({ success: false, msg: "Error !!" });
            //        if (resp.result.nModified > 0) return callback({ success: true, data: resp.result });
            //        else return callback({ success: false, msg: "Data does't exists!" });
            //    });
        } else {
            object["username"] = object.email;
            Collection("Users").update({ "username": object.username, "email": object.email },
                { $setOnInsert: object },
                { upsert: true },
                (err, resp1) => {
                    if (err) return callback({ success: false, msg: "Error !!" });
                    if (resp1.result.upserted) {
                        const tempAuth = new Authentication(resp1.result.upserted[0]._id, AccountType.User, object
                            .email, object.username, object.username);
                        tempAuth.addSocial({
                            "name": "facebook", "data": {
                                "id": object.id, "accessToken": object
                                    .AccessToken, "expiresIn": object.ExpiresIn
                            }
                        });
                        Collection("Authentications").update({ "_id": tempAuth._id },
                            { $setOnInsert: tempAuth },
                            { upsert: true },
                            (err, resp2) => {
                                if (err) return callback({ success: false, msg: "Error !!" });
                                if (resp2.result.upserted)
                                    return callback({ success: true, data: resp1.result, data1: resp2.result });
                                else return callback({ success: false, msg: "Duplicated Data" });
                            });
                    } else return callback({ success: false, msg: "Duplicated Data" });
                });
        };
    }
};