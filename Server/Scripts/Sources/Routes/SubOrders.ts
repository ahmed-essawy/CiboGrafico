import { SubOrder } from "../Classes";
import { objectId, Order_Rate, OrderRate } from "../Types";
{
    const suborders = require("express").Router(), parser = require("body-parser"), db = require("../Mongodb");
    suborders
        .use(parser.json())
        .use(parser.urlencoded({ extended: true }))
        .get("/", (req, res) => db.Suborders.Read(null, response => res.json(response)))
        .get("/:id", (req, res) => db.Suborders.Read({ _id: req.body.id }, response => res.json(response)))
        .delete("/:id",
        (req, res) => {
            console.log(req.params.id);
            db.Suborders.Delete({ "_id": req.params.id });
            res.json({ success: true });
        })
        .post("/",
        (req, res) => {
            let suborder: SubOrder = new SubOrder(db.objectId(), req.body.num, req.body.owner, req.body.meals);
            db.Suborders.Create(suborder, response => res.json(response));
        })
        .put("/",
        (req, res) => {
            let suborder: SubOrder = new SubOrder(req.body._id, req.body.num, req.body.owner, req.body.meals);
            db.Suborders.Update(suborder, response => res.json(response));
        })
        .put("/RateOrder",
        (req, res) => {
            let suborder: Order_Rate = { _id: req.body._id, "rate": OrderRate[parseInt(req.body.rate)] };
            db.Suborders.Update(suborder, response => res.json(response));
        });
    module.exports = suborders;
}