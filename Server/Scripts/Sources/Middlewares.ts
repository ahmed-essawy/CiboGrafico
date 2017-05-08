import { Address, Meal, Order, User } from "./Classes";
//{ Address, Branch, Ingredient, Login, Meal, Manager, Owner, Offer, Order, User, SubOrder, SocialMedia }
import { OrderType } from "./Types";
//{ Duration, Email, MealPrice, OrderRate, OrderType, Phone, Price, Uri }
const middlewares = require("express")(), parser = require("body-parser"), md5 = require("md5"), cookieParser = require("cookie-parser");
middlewares
    .use("/Users", require("./Routes/Users"))
    .use(parser.json())
    .use(parser.urlencoded({ extended: true }))
    .use(cookieParser())
    .get("/restaurants",
    (req, res) => {
        // Cross component communication
        const user = new User("", "fsf", "fddsfsd", "sdfsd", "fdsfds", new Address());
        const order = new Order("sdasd", 13212, user, OrderType.Delivery, new Address());
        order.addMeal(new Meal("sdasd", "Meal 1 Name", "Link.com", "Cat", 30));
        order.addMeal(new Meal("sdasd", "Meal 2 Name", "Link2.com", "Cat2", 20));
        console.log(order.mealsCount);
        res.json({ a: "response" });
    });
//app.use("/Restaurants", require("./Scripts/Sources/Routes/Restaurants"));
module.exports = middlewares;