import { SubOrder } from "../Classes";
import { Order_Rate, OrderRate } from "../Types";
{
    const suborders = require("express").Router(), db = require("../Mongodb");
    suborders
        .get("/", (req: any, res: any) => db.Suborders.Read(null, response => res.json(response)))
        .get("/:id", (req, res) => db.Suborders.Read({ _id: req.body.id }, response => res.json(response)))
        .delete("/:id", (req, res) => db.Suborders.Delete({ _id: req.params.id }, response => res.json(response)))
        .post("/", (req, res) => {
            const suborder = new SubOrder(db.objectId(), req.body.num, req.body.owner, req.body.meals);
            db.Suborders.Create(suborder, response => res.json(response));
        })
        .put("/", (req, res) => {
            const suborder = new SubOrder(req.body._id, req.body.num, req.body.owner, req.body.meals);
            db.Suborders.Update(suborder, response => res.json(response));
        })
        .put("/RateOrder", (req, res) => {
            const suborder: Order_Rate = { _id: req.body._id, "rate": OrderRate[parseInt(req.body.rate)] };
            db.Suborders.Update(suborder, response => res.json(response));
        });
    module.exports = suborders;
}