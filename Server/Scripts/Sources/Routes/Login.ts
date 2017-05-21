{
    const login = require("express").Router(), db = require("../Mongodb"), cookie = require("cookie");
    login
        .get("/", (req: any, res: any) => { res.json(cookie.parse(req.headers.cookie || "")); })
        .get("/:user/:pass", (req: any, res: any) => db.Login.Check({ "username": req.params.user, "password": req.params.pass }, response => {
                console.log("a");
                res.setHeader("Set-Cookie", cookie.serialize("AccessToken", String(response.data), {
                        // secure: true,
                        httpOnly: true,
                        maxAge: 60 * 60 * 24 * 7 // 1 week
                    }));
                res.statusCode = 302;

            res.json(response);
        }))
        .post("/", (req: any, res: any) => db.Login.Check(req.body, response => {
            if (response.success) {
                res.setHeader("Set-Cookie", cookie.serialize("AccessToken", String(response.data), {
                        //   secure: true,
                        httpOnly: true,
                        maxAge: 60 * 60 * 24 * 7 // 1 week
                    }));
                res.statusCode = 302;
            }
            res.json(response);
        }))
        .post("/Branch", (req, res) => db.Branches.Login(req.body, result => res.json({ success: result.success, token: result.data })));
    module.exports = login;
}