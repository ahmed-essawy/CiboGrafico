import { Collection } from "../Mongodb";
import { Authentication, User, Address } from "../Classes";
import { objectId, AccountType } from "../Types";
import { validate } from "class-validator";
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
    },
    fbLogin(object: any, callback: any) {
        Collection("Authentications").update({
            $or: [{ "_id": objectId(object._id) }, { "username": object.username }, { "email": object.email }, {
                "socials.data.id": object.id }] }, { $pull: { "socials": { "data.id": object.id } } }, (err, resp) => {
            if (err) return callback({ success: false });
            if (resp.result.ok === 1) {
                if (resp.result.n === 0) {
                    new Promise((resolve, reject) => {
                        const tempUser = new User(require("../Mongodb").objectId(), object.first_name, object
                            .last_name,
                            object.email, object.username, [], new Address(), object.Image);
                        validate(tempUser).then(errs => {
                            if (errs.length > 0) {
                                const errors = Array<string>();
                                errs.forEach(a => errors.push(a.constraints[Object.keys(a.constraints)[0]]));
                                reject({ success: false, msg: errors });
                            } else {
                                require("../Mongodb").Users.Create(tempUser, object.username, response => resolve({
                                    success: true, data: response
                                }));
                            }
                        });
                    }).then(resp1 => { addSocial(object, callback); }).catch(err => console.log(err));
                } else addSocial(object, callback);
            } else return callback({ success: false });
        });
    }
};
function addSocial(object: any, callback: any) {
    const fbObject = { "name": "facebook", "data": { "id": object.id, "accessToken": object.AccessToken,
        "expiresIn": object.ExpiresIn } };
    Collection("Authentications").update({ $or: [{ "_id": objectId(object._id) }, { "username": object.username }, {
        "email": object.email }] }, {
        $push: { "socials": fbObject } }, (err, resp1) => {
        if (err) return callback({ success: false });
        if (resp1.result.nModified > 0) {
            Collection("Authentications").findOne({ "socials.data.id": object.id }, (err, resp2: Authentication) => {
                if (err) return callback({ success: false });
                if (resp2) {
                    require("../Mongodb").Users.Read({ _id: resp2._id }, resp3 => {
                        if (err) return callback({ success: false });
                        if (resp3.success) {
                            resp3.data["token"] = resp2.token;
                            return callback({ success: true, data: resp3.data });
                        } else return callback({ success: false });
                    });
                } else return callback({ success: false });
            });
        } else return callback({ success: false });
    });
}