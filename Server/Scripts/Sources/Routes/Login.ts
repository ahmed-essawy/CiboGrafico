import { Address, User } from "../Classes";
import { validate } from "class-validator";
{
    const login = require("express").Router(), db = require("../Mongodb"), cookie = require("cookie");
    login
        .post("/", (req: any, res: any) => {
            if (req.body.username && req.body.password) {
                db.Login.Check({ username: req.body.username, password: req.body.password }, response => res
                    .json(response));
            } else res.status(400).json({ success: false, msg: "Invalid Data" });
        })
        .post("/fbLogin", (req: any, res: any) => {
            if (req.body.id && req.body.email) {
                db.Login.Check({ username: req.body.email, password: req.body.password }, response => {
                    console.log(response);
                    res.json(response);
                });
            } else res.status(400).json({ success: false, msg: "Invalid Data" });
            //if (req.body.isRegistered) {
            //    console.log("reg");
            //    if (req.body.id && req.body.email) {} /* db.Login.fbLogin(req.body, response => res.json(response));*/
            //    else res.status(400).json({ success: false, msg: "Invalid Data" });
            //} else {
            //    if (req.body.first_name && req.body.last_name && req.body.email) {
            //        const username = req.body.email.split("@")[0];
            //        const tempUser = new User(db.objectId(), req.body.first_name, req.body.last_name, req.body.email, username, [], new Address(), req.body.Image);
            //        validate(tempUser).then(errs => {
            //            if (errs.length > 0) {
            //                const errors = Array<string>();
            //                errs.forEach(a => errors.push(a.constraints[Object.keys(a.constraints)[0]]));
            //                res.status(400).json({ success: false, msg: errors });
            //            } else {
            //                db.Users.Create(tempUser, username, response => {
            //                    console.log(response);
            //                    res.json(response);
            //                });
            //            }
            //        });
            //    } else res.status(400).json({ success: false, msg: "Invalid Data" });
        });
    module.exports = login;
}