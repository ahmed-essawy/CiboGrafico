const middlewares = require("express")();
middlewares
    .use("/Login", require("./Routes/Login"))
    .use("/Restaurants", require("./Routes/Restaurants"))
    .use("/Restaurant/Branches", require("./Routes/Branches"))
    .use("/Restaurant/Meals", require("./Routes/Meals"))
    .use("/Orders", require("./Routes/Orders"))
    .use("/SubOrders", require("./Routes/SubOrders"))
    .use("/Meals", require("./Routes/Meals"))
    .use("/Offers", require("./Routes/Offers"))
    .use("/Users", require("./Routes/Users"))
    .use("/Ingredients", require("./Routes/Ingredients"))
    .use("/Locations", require("./Routes/Locations"));
module.exports = middlewares;