//{ Address, Branch, Ingredient, Login, Meal, Manager, Owner, Offer, Order, User, SubOrder, SocialMedia }
//{ Duration, Email, MealPrice, OrderRate, OrderType, Phone, Price, Uri }
import { isAuthenticatedUser } from "./Authentication";
const middlewares = require("express")(), parser = require("body-parser"), md5 = require("md5"), cookieParser = require("cookie-parser");
middlewares
    .use("/Login", require("./Routes/Login"))
    .use("/Restaurants", require("./Routes/Restaurants"))
    .use("/Restaurants/Branches", require("./Routes/Restaurants"))
    .use("/Users", isAuthenticatedUser, require("./Routes/Users"))
    .use(parser.json())
    .use(parser.urlencoded({ extended: true }))
    .use(cookieParser());
//.use(function (req, res, next) {
//    res.header("Access-Control-Allow-Credentials", true);
//    res.header("Access-Control-Allow-Origin", req.headers.origin);
//    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
//    if ("OPTIONS" == req.method) res.send(200);
//    else next();
//});
module.exports = middlewares;