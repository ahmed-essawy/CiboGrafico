const users = require("express").Router(), db = require("../Mongodb");
users.get("/",
    (req, res) => {
        db.Users.Find();
        res.json({ Success: true });
    });
module.exports = users;