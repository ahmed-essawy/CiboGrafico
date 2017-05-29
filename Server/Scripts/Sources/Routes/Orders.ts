import { Order, SubOrder, Address } from "../Classes";
import { Order_Rate, objectId, OrderType } from "../Types";
{
    const orders = require("express").Router(), db = require("../Mongodb");
    orders
        .get("/", (req: any, res: any) => db.Orders.ReadAll(response => res.json(response)))
        .get("/:id", (req, res) => db.Orders.Read({ _id: req.body.id }, response => res.json(response)))
        .get("/SubOrders/:num", (req, res) => db.Orders.GetSubOrders(parseInt(req.params.num), response => res.json(response)))
        .delete("/:id", (req, res) => db.Orders.Delete({ _id: req.params.id }, response => res.json(response)))
        .post("/", (req, res) => {
            if (req.body.num && req.body.owner && req.body.restaurant && req.body.type && Array.isArray(req.body.meals)) {
                let tempAddress = new Address();
                if (req.body.address) tempAddress = new Address(req.body.address.street && req.body.address.city && req.body.address.country);
                const tempOrder = new Order(db.objectId(), req.body.num, req.body.owner, req.body.restaurant, req.body.type, tempAddress, req.body.meals);
                db.Orders.Create(tempOrder, response => res.json(response));
            }
            else res.status(400).json({ success: false, msg: "Invalid Data" });
        })
        .post("/CreateSubOrder",
        (req, res) => {
            if (req.body.num && req.body.owner) {
                const tempSubOrder = new SubOrder(db.objectId(), req.body.num, req.body.owner);
                db.Orders.Create(tempSubOrder, response => res.json(response));
                if (Array.isArray(req.body.meals)) tempSubOrder.meals = req.body.meals;
            }
            else res.status(400).json({ success: false, msg: "Invalid Data" });
        })
        .put("/", (req, res) => {
            if (req.body._id) {
                db.Orders.Read({ _id: req.body._id },
                    response => {
                        if (response.success) {
                            let tempOrder: Order = response.data;
                            if (req.body.type) tempOrder.type = OrderType[parseInt(req.body.type)];
                            if (req.body.address) {
                                if (req.body.address.street) tempOrder.address.street = req.body.address.street;
                                if (req.body.address.city) tempOrder.address.city = req.body.address.city;
                                if (req.body.address.country) tempOrder.address.country = req.body.address.country;
                            }
                            if (Array.isArray(req.body.meals)) tempOrder.meals = req.body.meals;
                            db.Orders.Update(tempOrder, response => res.json(response));
                        } else res.status(404).json({ success: false, msg: "Data Not Found" });
                    });
            } else res.status(400).json({ success: false, msg: "Invalid Data" });
        })
        .put("/RateOrder", (req, res) => {
            if (req.body._id) {
                db.Orders.Read({ _id: req.body._id },
                    response => {
                        if (response.success) {
                            const tempOrder: Order = response.data;
                            if (req.body.rate) tempOrder.rate = req.body.rate;
                            db.Orders.Update(tempOrder, response => res.json(response));
                        } else res.status(404).json({ success: false, msg: "Data Not Found" });
                    });
            } else res.status(400).json({ success: false, msg: "Invalid Data" });
        });
    module.exports = orders;
}