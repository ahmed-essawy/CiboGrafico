export let settings = (req: any, res: any, next: any) => {
    req.accepts("application/json");
    res.setHeader("X-Powered-By", "Project");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methodss", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    //if (req.method === "OPTIONS") res.sendStatus(200);
    //else if (["PUT", "POST", "DELETE"].indexOf(req.method) > -1) {
    //    require("./Mongodb").Users.Read({ "login.token": req.query.access_token },
    //        users => {
    //            if (users.data.length > 0) next();
    //            else res.status(401).json({ success: false, msg: "Unauthorized" });
    //        });
    //}
    if (!req.is("application/json") && ["PUT", "POST"].indexOf(req.method) !== -1) res.status(400).send({ success: false, msg: "Content-type must be 'application/json'" });
    else next();
};