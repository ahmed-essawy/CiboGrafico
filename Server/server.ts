const server = require("express")(), parser = require("body-parser"), cookie = require("cookie");
server.use(require("./Scripts/Sources/Settings").settings)
    .use(parser.json()).use(parser.urlencoded({ extended: true }))
    .use(require("./Scripts/Sources/Middlewares"))
    .use((req, res) => res.status(404).json({ success: false, msg: "Not Found" }));
require("./Scripts/Sources/Mongodb").connectToServer(err => {
    if (err) console.log("Failed to connect to database!");
    else {
        const port = process.env.port || 8888;
        require("http").createServer(server).listen(port, function () { console.log("Server listening at %s", this.address().port) });
    }
});