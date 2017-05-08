const server = require("express")();
server.use(require("./Scripts/Sources/Middlewares"));
require("./Scripts/Sources/Mongodb").connectToServer(err => {
    if (err) console.log("Failed to connect to database!");
    else {
        const port = process.env.port || 8888;
        require("http").createServer(server).listen(port, function () { console.log("Server listening at %s", this.address().port) });
    }
});