{
    const login = require("express").Router(), db = require("../Mongodb"), parser = require("body-parser");
    login.use(parser.json())
        .use(parser.urlencoded({ extended: true }))
        .post("/User", (req, res) => db.Users.Login(req.body, result => res.json({ success: result.success, token: result.data })))
        .post("/Branch", (req, res) => db.Branches.Login(req.body, result => res.json({ success: result.success, token: result.data })));
    module.exports = login;
}