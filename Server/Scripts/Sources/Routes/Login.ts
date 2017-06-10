{
    const login = require("express").Router(), db = require("../Mongodb");
    login
        .post("/", (req: any, res: any) => {
            if (req.body.username && req.body.password) db.Login.Check({ username: req.body.username, password: req.body.password }, response => res.json(response));
            else res.status(400).json({ success: false, msg: "Invalid Data" });
        })
        .post("/fbLogin", (req: any, res: any) => {
            if (req.body.id && req.body.email) {
                req.body.username = req.body.email.split("@")[0];
                db.Login.fbLogin(req.body, response => res.json(response));
            } else res.status(400).json({ success: false, msg: "Invalid Data" });
        });
    module.exports = login;
}