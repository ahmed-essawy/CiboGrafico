/// <reference path="../Classes.ts" />
import { Restaurant, Owner, Address, Branch, Manager } from "../Classes";
import { isEmail } from "../Types";
{
    const restaurants = require("express").Router(), db = require("../Mongodb");
    restaurants
        .get("/test", (req: any, res: any) => res.json(db.Functions("addAuth", { aaaaaaa: "sdsds" })))
        .get("/", (req: any, res: any) => db.Restaurants.ReadAll(response => res.json(response)))
        .get("/:id", (req, res) => db.Restaurants.Read({ _id: req.params.id }, response => res.json(response)))
        .delete("/:id", (req, res) => db.Restaurants.Delete({ _id: req.params.id }, response => res.json(response)))
        .post("/",
            (req, res) => {
                if (req.body.name && req.body.logo && req.body.owner && req.body.owner.firstName && req.body.owner
                    .lastName && (req.body.owner.phone || isEmail(req.body.owner.email))) {
                    let ownerAddress = new Address();
                    if (req.body.owner.address) {
                        ownerAddress = new Address(req.body.owner.address.street,
                            req.body.owner.address.city,
                            req.body.owner.address.country);
                    }
                    const tempOwner = new Owner(req.body.owner.firstName, req.body.owner.lastName, req.body.owner.phone,
                        req.body.owner.email, ownerAddress);
                    const tempRest = new Restaurant(db.objectId(), req.body.name, req.body.logo, tempOwner);
                    db.Restaurants.Create(tempRest, resp1 => {
                        if (resp1.data.upserted && req.body.branch && req.body.branch.manager && req.body.branch
                            .address && isEmail(req.body.branch.email) && req.body.branch.username && req.body.branch
                            .password) {
                            const branchManager = new Manager(req.body.branch.manager.firstName, req.body.branch.manager
                                .lastName, req.body.branch.manager.phone);
                            const branchAddress = new Address(req.body.branch.address.street, req.body.branch.address
                                .city, req.body.branch.address.country);
                            const tempBranch = new Branch(db.objectId(), req.body.branch.name, branchManager,
                                branchAddress, req.body.branch.email, req.body.branch.username, req.body.branch.phone);
                            db.Branches.Create(tempBranch, req.body.branch.password, {
                                    _id: resp1.data.upserted[0]._id
                                }, resp2 => {
                                    resp1.data["branch"] = resp2;
                                    res.json(resp1);
                                });
                        } else res.json(resp1);
                    });
                } else res.status(400).json({ success: false, msg: "Invalid Data" });
            })
        .put("/",
            (req, res) => {
                if (req.body._id) {
                    db.Restaurants.Read({ _id: req.body._id },
                        response => {
                            if (response.success) {
                                const tempRest: Restaurant = response.data;
                                if (req.body.name) tempRest.name = req.body.name;
                                if (req.body.logo) tempRest.logo = req.body.logo;
                                if (req.body.owner) {
                                    if (req.body.owner.firstName) tempRest.owner.firstName = req.body.owner.firstName;
                                    if (req.body.owner.lastName) tempRest.owner.lastName = req.body.owner.lastName;
                                    if (Array.isArray(req.body.phones)) tempRest.owner.phones = req.body.phones;
                                    if (isEmail(req.body.owner.email)) tempRest.owner.email = req.body.owner.email;
                                    if (req.body.owner.address) {
                                        if (req.body.owner.address
                                            .street) tempRest.owner.address.street = req.body.owner.address.street;
                                        if (req.body.owner.address
                                            .city) tempRest.owner.address.city = req.body.owner.address.city;
                                        if (req.body.owner.address
                                            .country) tempRest.owner.address.country = req.body.owner.address.country;
                                    }
                                }
                                db.Restaurants.Update(tempRest, response => res.json(response));
                            } else res.status(404).json({ success: false, msg: "Data Not Found" });
                        });
                } else res.status(400).json({ success: false, msg: "Invalid Data" });
            });
    module.exports = restaurants;
}