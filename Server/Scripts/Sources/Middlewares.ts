//{ Address, Branch, Ingredient, Login, Meal, Manager, Owner, Offer, Order, User, SubOrder, SocialMedia }
//{ Duration, Email, MealPrice, OrderRate, OrderType, Phone, Price, Uri }
const middlewares = require("express")(), passport = require("passport"), auth = require("passport-http-bearer"), db = require("./Mongodb");
const parser = require("body-parser"), md5 = require("md5"), cookieParser = require("cookie-parser");
middlewares
    .use("/Users", passport.authenticate("bearer", { session: false }), require("./Routes/Users"))
    .use("/Login", require("./Routes/Login"))
    .use("/Restaurants", require("./Routes/Restaurants"))
    .use(parser.json())
    .use(parser.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(function (req, res, next) {
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
        if ("OPTIONS" == req.method) res.send(200);
        else next();
    });
passport.use(new auth(
    function (token, callback) {
        db.Users.Find({ token: token },
            (err, user) => {
                console.log(user);
                if (err) return callback(err);
                if (!user) return callback(null, false);
                return callback(null, user, { scope: "all" });
            });
    }
));
//app.use("/Restaurants", require("./Scripts/Sources/Routes/Restaurants"));
module.exports = middlewares;