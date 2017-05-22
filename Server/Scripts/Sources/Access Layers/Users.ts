import { Collection } from "../Mongodb";
import { User, Authentication, SocialMedia, Meal } from "../Classes";
import { objectId, Id, AccountType } from "../Types";
import { ILogin } from "../Interfaces";
module.exports = {
    Create(object: User, password: string, callback: any) {
        Collection("Users").update({ "username": object.username },
            { $setOnInsert: object },
            { upsert: true },
            (err, resp1) => {
                if (err) return callback({ success: false, msg: "Error !!" });
                if (resp1.result.upserted) {
                    const tempAuth = new Authentication(resp1.result.upserted[0]._id,
                        AccountType.User,
                        object.email,
                        object.username,
                        password);
                    Collection("Tokens").update({ "_id": tempAuth._id },
                        { $setOnInsert: tempAuth },
                        { upsert: true },
                        (err, resp2) => {
                            if (err) return callback({ success: false, msg: "Error !!" });
                            if (resp2.result.upserted)
                                return callback({ success: true, data1: resp1.result, data2: resp2.result });
                            else return callback({ success: false, msg: "Duplicated Data" });
                        });
                } else return callback({ success: false, msg: "Duplicated Data" });
            });
    },
    Read(object: Id, callback: any) {
        Collection("Users").findOne(objectId(object._id),
            (err, row: User) => {
                if (err) return callback({ success: false, msg: "Error !!" });
                if (row) return callback({ success: true, data: row });
                else return callback({ success: false });
            });
    },
    ReadAll(callback: any) {
        Collection("Users").find().toArray((err, row: User[]) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (row) return callback({ success: true, data: row });
            else return callback({ success: false });
        });
    },
    Update(object: User, callback: any) {
        object._id = objectId(object._id);
        Collection("Users").update({ _id: object._id },
            { $set: object },
            (err, resp1) => {
                if (err) return callback({ success: false, msg: "Error !!" });
                if (resp1.result.nModified === 1) {
                    Collection("Tokens").update({ _id: object._id },
                        { $set: { "email": object.email, "username": object.username } as ILogin },
                        (err, resp2) => {
                            if (err) return callback({ success: false, msg: "Error !!" });
                            if (resp2.result.ok)
                                return callback({ success: true, data1: resp1.result, data2: resp2.result });
                            else return callback({ success: false, msg: "Data not modified" });
                        });
                } else return callback({ success: false, msg: "Data not modified" });
            });
    },
    Delete(object: Id, callback: any) {
        Collection("Users").removeOne({ _id: objectId(object._id) },
            (err, resp1) => {
                if (err) return callback({ success: false, msg: "Error !!" });
                if (resp1.result.n === 1) {
                    Collection("Tokens").removeOne({ _id: objectId(object._id) },
                        (err, resp2) => {
                            if (err) return callback({ success: false, msg: "Error !!" });
                            if (resp2.result.n === 1)
                                return callback({ success: true, data1: resp1.result, data2: resp2.result });
                            else return callback({ success: false, msg: "Can't delete data" });
                        });
                } else return callback({ success: false, msg: "Can't delete data" });
            });
    },
    AddSocial(object: SocialMedia, UserId: Id, callback: any) {
        Collection("Users").update({ _id: objectId(UserId._id), "socialMedia.provider": { $ne: object.provider } },
            { $addToSet: { "socialMedia": object } },
            (err, resp) => {
                if (resp.result.ok) return callback({ success: true, data: resp.result });
                else return callback({ success: false, data: object });
            }
        );
    },
    AddFavurite(object: Meal, UserId: Id, callback: any) {
        Collection("Users").update({ _id: objectId(UserId._id), "favorites._id": { $ne: object._id } },
            { $addToSet: { "favorites": object } },
            (err, resp) => {
                if (resp.result.ok) return callback({ success: true, data: resp.result });
                else return callback({ success: false, data: object });
            }
        );
    },
    DeleteSocial(object: Id, provider: string, callback: any) {
        Collection("Users").update({ "_id": objectId(object._id) },
            { $pull: { "socialMedia": { "socialMedia.provider": provider } } },
            (err, resp) => {
                if (resp.result.ok) return callback({ success: true, data: resp.result });
                else return callback({ success: false, data: object });
            });
    }
    //,
    //    DeleteFavourite(object: Id, provider: string, callback: any) {
    //        Collection("Users").update({ "_id": objectId(object._id) },
    //            { $pull: { "socialMedia": { "socialMedia.provider": provider } } }, (err, resp) => {
    //                if (resp.result.ok) return callback({ success: true, data: resp.result });
    //                else return callback({ success: false, data: object });
    //            });
    //    }
    ,
    DeleteFavourite(object: Id, callback: any) {
        Collection("Users").update({ "favorites._id": objectId(object._id) },
            { $pull: { "favorites": { "_id": objectId(object._id) } } },
            (err, resp) => {
                if (resp.result.ok) return callback({ success: true, data: resp.result });
                else return callback({ success: false, data: object });
            });
    }
    //UpdateSocial(object: Id,providerr:string, callback: any) {
    //   object._id = objectId(object._id);
    //   Collection("Users").update({ _id: object._id }, { $pull: { socialMedia: { "provider": providerr } }}, (err, resp1) => {
    //       if (err) return callback({ success: false, msg: "Error !!" });
    //       if (resp1.result.nModified === 1) {
    //           return callback({ success: true, data1: resp1.result });
    //       } else return callback({ success: false, msg: "Data not modified" });
    //   });
    //       } else return callback({ success: false, msg: "Data not modified" });
    //   });
};