import { Offer } from "../Classes";
{
    const offers = require("express").Router(), db = require("../Mongodb");
    offers
        .get("/", (req: any, res: any) => db.Offers.Read(null, response => res.json(response)))
        .get("/:id", (req, res) => db.Offers.Read({ _id: req.body.id }, response => res.json(response)))
        .delete("/:id", (req, res) => db.Offers.Delete({ _id: req.params.id }, response => res.json(response)))
        .post("/", (req, res) => {
            const offer = new Offer(db.objectId(),
                req.body.provider,
                req.body.image,
                req.body.description,
                req.body.meal,
                req.body.discount,
                req.body.duration,
                req.body.startDate);
            db.Offers.Create(offer, response => res.json(response));
        })
        .put("/", (req, res) => {
            if (req.body._id) {
                db.Offers.Read({ _id: req.body._id },
                    response => {
                        if (response.success) {
                            const tempOffer: Offer = response.data;
                            if (req.body.image) tempOffer.image = req.body.image;
                            if (req.body.description) tempOffer.description = req.body.description;
                            if (req.body.meal) tempOffer.meal = req.body.meal;
                            if (req.body.discount) tempOffer.discount = req.body.discount;
                            if (req.body.startDate) tempOffer.startDate = req.body.startDate;
                            if (req.body.endDate) tempOffer.endDate = req.body.endDate;
                            db.Offers.Update(tempOffer, response => res.json(response));
                        } else res.status(404).json({ success: false, msg: "Data Not Found" });
                    });
            } else res.status(400).json({ success: false, msg: "Invalid Data" });
        });
    module.exports = offers;
}