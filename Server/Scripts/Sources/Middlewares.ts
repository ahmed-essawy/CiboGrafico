const middlewares = require("express")();
middlewares
    .use("/Login", require("./Routes/Login"))
    .use("/Restaurants", require("./Routes/Restaurants"))
    .use("/Restaurant/Branches", require("./Routes/Branches"))
    .use("/Restaurant/Meals", require("./Routes/Meals"))
    .use("/Orders", require("./Routes/Orders"))
    .use("/SubOrders", require("./Routes/SubOrders"))
    .use("/Offers", require("./Routes/Offers"))
    .use("/Users", require("./Routes/Users"));
module.exports = middlewares;