import { Order } from "../Classes";
import { OrderRate, Order_Rate } from "../Types";
{
    const orders = require("express").Router(), parser = require("body-parser"), db = require("../Mongodb");
    orders
        .use(parser.json())
        .use(parser.urlencoded({ extended: true }))
        .get("/", (req, res) => db.Orders.Read(null, response => res.json(response)))
        .get("/:id", (req, res) => db.Orders.Read({ _id: req.body.id }, response => res.json(response)))
        .delete("/:id", (req, res) => db.Orders.Delete({ _id: req.params.id }, response => res.json(response)))
        .post("/",
            (req, res) => {
                const order = new Order(db.objectId(),
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
                const order = new Order(req.body._id,
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
                const order: Order_Rate = { _id: req.body._id, "rate": OrderRate[parseInt(req.body.rate)] };
                db.Orders.Update(order, response => res.json(response));;
            });
    module.exports = orders;
}