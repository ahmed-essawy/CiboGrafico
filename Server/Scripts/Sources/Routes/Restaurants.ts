import { Restaurant, Owner, Address, Branch, Manager } from "../Classes";
{
    const restaurants = require("express").Router(), db = require("../Mongodb");
    restaurants
        .get("/", (req: any, res: any) => db.Restaurants.ReadAll(response => res.json(response)))
        .get("/:id", (req, res) => db.Restaurants.Read({ _id: req.params.id }, response => res.json(response)))
        .delete("/:id", (req, res) => db.Restaurants.Delete({ _id: req.params.id }, response => res.json(response)))
        .post("/", (req, res) => {
            try {
                const tempRest = new Restaurant(db.objectId(),
                    req.body.name,
                    req.body.logo,
                    new Owner(req.body.owner.firstName,
                        req.body.owner.lastName,
                        req.body.owner.phone,
                        req.body.owner.email,
                        new Address(req.body.owner.address.street,
                            req.body.owner.address.city,
                            req.body.owner.address.country)));
                if (req.body.branches) {
                    for (let i = 0; i < req.body.branches.length; i++) {
                        tempRest.addBranch(new Branch(db.objectId(),
                            req.body.branches[i].name,
                            new Manager(req.body.branches[i].manager.firstName,
                                req.body.branches[i].manager.lastName,
                                req.body.branches[i].manager.phone,
                                req.body.branches[i].manager.email,
                                new Address(req.body.branches[i].manager.address.street,
                                    req.body.branches[i].manager.address.city,
                                    req.body.branches[i].manager.address.country)),
                            new Address(req.body.branches[i].address.street,
                                req.body.branches[i].address.city,
                                req.body.branches[i].address.country), req.body.branches[i].email, req.body.branches[i].username,
                            req.body.branches[i].phones));
                    }
                }
                db.Restaurants.Create(tempRest, response => response => res.json(response));
            } catch (err) {
                res.json({ success: false, msg: "Invalid Data" });
            }
        })
        .put("/", (req, res) => {
            try {
                const updateRest = new Restaurant(req.body._id,
                    req.body.name,
                    req.body.logo,
                    new Owner(req.body.owner.firstName,
                        req.body.owner.lastName,
                        req.body.owner.phone,
                        req.body.owner.email,
                        new Address(req.body.owner.address.street,
                            req.body.owner.address.city,
                            req.body.owner.address.country)));
                if (req.body.branches) {
                    for (let i = 0; i < req.body.branches.length; i++) {
                        updateRest.addBranch(new Branch(db.objectId(),
                            req.body.branches[i].name,
                            new Manager(req.body.branches[i].manager.firstName,
                                req.body.branches[i].manager.lastName,
                                req.body.branches[i].manager.phone,
                                req.body.branches[i].manager.email,
                                new Address(req.body.branches[i].manager.address.street,
                                    req.body.branches[i].manager.address.city,
                                    req.body.branches[i].manager.country)),
                            new Address(req.body.branches[i].address.street,
                                req.body.branches[i].address.city,
                                req.body.branches[i].address.country),
                            req.body.branches[i].email,
                            req.body.branches[i].username,
                            req.body.branches[i].phones));
                    }
                }
                db.Restaurants.Update(updateRest, response => res.json(response));
            } catch (err) {
                res.json({ success: false, msg: "Invalid Data" });
            }
        });
    module.exports = restaurants;
}