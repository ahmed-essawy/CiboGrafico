{
    const login = require("express").Router(), db = require("../Mongodb");
    login.get("/User/:user/:pass",
        (req, res) => {
            db.Login.Users.Find({ "username": req.params["user"], "password": req.params["pass"] },
                result => {
                    if (result.success) console.log(result.data);
                    else console.log(`Username: ${result.data} or password is incorrect.`);
                });
            res.json({ Success: true });
        }).get("/Branch/:user/:pass",
        (req, res) => {
            db.Login.Branches.Find({ "username": req.params["user"], "password": req.params["pass"] },
                result => {
                    if (result.success) console.log(result.data);
                    else console.log(`Username: ${result.data} or password is incorrect.`);
                });
            res.json({ Success: true });
        });
    module.exports = login;
}