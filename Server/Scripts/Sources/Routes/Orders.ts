import { Order, Address } from "../Classes";
import { OrderRate, OrderType, objectId, MealPrice, Order_Rate } from "../Types";
{
    const orders = require("express").Router(), parser = require("body-parser"), db = require("../Mongodb");
    orders
        .use(parser.json())
        .use(parser.urlencoded({ extended: true }))
        .get("/", (req, res) => db.Orders.Read(null, response => res.json(response)))
        .get("/:id", (req, res) => db.Orders.Read({ _id: req.body.id }, response => res.json(response)))
        .delete("/:id",
            (req, res) => {
                console.log(req.params.id);
                db.Orders.Delete({ "_id": req.params.id });
                res.json({ success: true });
            })
        .post("/",
            (req, res) => {
                let order: Order = new Order(db.objectId(),
                    req.body.num,
                    req.body.owner,
                    req.body.restaurant,
                    req.body.type,
                    req.body.address,
                    req.body.meals);
                db.Orders.Create(order, response => res.json(response));
            })
        .put("/",
            (req, res) => {
                let order: Order = new Order(req.body._id,
                    req.body.num,
                    req.body.owner,
                    req.body.restaurant,
                    req.body.type,
                    req.body.address,
                    req.body.meals);
                db.Orders.Update(order, response => res.json(response));
            })
        .put("/RateOrder",
            (req, res) => {
                let order: Order_Rate = { _id: req.body._id, "rate": OrderRate[parseInt(req.body.rate)] };
                db.Orders.Update(order, response => res.json(response));;
            });
    module.exports = orders;
}