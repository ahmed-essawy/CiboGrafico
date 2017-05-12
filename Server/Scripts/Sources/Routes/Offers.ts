import { Offer, Meal } from "../Classes";
import { objectId } from "../Types";
{
    const offers = require("express").Router(), parser = require("body-parser"), db = require("../Mongodb");
    offers
        .use(parser.json())
        .use(parser.urlencoded({ extended: true }))
        .get("/", (req, res) => db.Offers.Read(null, response => res.json(response)))
        .get("/:id", (req, res) => db.Offers.Read({ _id: req.body.id }, response => res.json(response)))
        .delete("/:id",
        (req, res) => {
            console.log(req.params.id);
            db.Offers.Delete({ "_id": req.params.id });
            res.json({ success: true });
        })
        .post("/",
        (req, res) => {
            let offer: Offer = new Offer(db.objectId(),
                req.body.image,
                req.body.description,
                req.body.meal,
                req.body.discount,
                req.body.duration,
                req.body.startDate);
            db.Offers.Create(offer, response => res.json(response));
        })
        .put("/",
        (req, res) => {
            let offer: Offer = new Offer(req.body._id,
                req.body.image,
                req.body.description,
                req.body.meal,
                req.body.discount,
                req.body.duration,
                req.body.startDate);
            db.Offers.Update(offer, response => res.json(response));
        });
    module.exports = offers;
}