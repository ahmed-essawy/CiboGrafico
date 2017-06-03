{
    const login = require("express").Router(), db = require("../Mongodb"), cookie = require("cookie");
    login
        .post("/", (req: any, res: any) => {
            if (req.body.username && req.body.password) {
                db.Login.Check({ username: req.body.username, password: req.body.password }, response => res
                    .json(response));
            } else res.status(400).json({ success: false, msg: "Invalid Data" });
        });
    module.exports = login;
}