import { Restaurant, Owner, Address, Branch, Manager, BranchAddress } from "../Classes";
import { validate, Validator, IsEmail } from "class-validator";
const valid = new Validator();
{
    const restaurants = require("express").Router(), db = require("../Mongodb");
    restaurants
        .get("/", (req: any, res: any) => db.Restaurants.ReadAll(response => res.json(response)))
        .get("/:id", (req, res) => db.Restaurants.Read({ _id: req.params.id }, response => res.json(response)))
        .delete("/:id", (req, res) => db.Restaurants.Delete({ _id: req.params.id }, response => res.json(response)))
        .post("/",
            (req, res) => {
                if (req.body.owner) {
                    let ownerAddress = new Address();
                    if (req.body.owner.address) {
                        ownerAddress = new Address(req.body.owner.address.street, req.body.owner.address.city, req.body
                            .owner.address.country);
                    }
                    const tempOwner = new Owner(req.body.owner.firstName, req.body.owner.lastName, req.body.owner
                        .phones, req.body.owner.email, ownerAddress);
                    const tempRest = new Restaurant(db.objectId(), req.body.name, req.body.logo, tempOwner);
                    validate(tempRest).then(errs1 => {
                        if (errs1.length > 0) {
                            const errors = Array<string>();
                            errs1.forEach(a => errors.push(a.constraints[Object.keys(a.constraints)[0]]));
                            res.status(400).json({ success: false, msg: errors });
                        } else {
                            db.Restaurants.Create(tempRest, resp1 => {
                                if (resp1.data.upserted && req.body.branch && req.body.branch.manager && req.body.branch
                                    .address && req.body.branch.email && req.body.branch.username && req.body.branch
                                    .password) {
                                    const branchManager = new Manager(req.body.branch.manager.firstName, req.body.branch
                                        .manager
                                        .lastName, req.body.branch.manager.phone);
                                    const branchAddress = new BranchAddress(req.body.branch.address.area, req.body
                                        .branch
                                        .address.city, req.body.branch.address.country, req.body.branch.address.street);
                                    const tempBranch = new Branch(db.objectId(), req.body.branch.name, branchManager,
                                        branchAddress, req.body.branch.email, req.body.branch.username, req.body.branch
                                        .phones,50);
                                    validate(tempBranch).then(errs2 => {
                                        if (errs2.length > 0) {
                                            const errors = Array<string>();
                                            errs1.forEach(a => errors.push(a.constraints[Object.keys(a
                                                .constraints)[0]]));
                                            resp1.data["branch"] = errors;
                                        } else {
                                            db.Branches.Create(tempBranch, req.body.branch.password, {
                                                _id: resp1.data.upserted[0]._id
                                            }, resp2 => { resp1.data["branch"] = resp2; });
                                        }
                                        res.json(resp1);
                                    });
                                } else res.json(resp1);
                            });
                        }
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
                                    if (valid.isEmail(req.body.owner
                                        .email)) tempRest.owner.email = req.body.owner.email;
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
            })
        .get("/:country/:city/:area", (req, res) => db.Restaurants.ReadAllByLoc({
            "branches.address.country": req.params.country,
            "branches.address.city": req.params.city, "branches.address.area": req.params.area
        }, response => res.json(response)))
        .put("/Review",
            (req, res) => {
                if (req.body.restaurant) {
                    db.Restaurants.Read({ _id: req.body.restaurant },
                        response => {
                            if (response.success) {
                                const tempRest: Restaurant = response.data;
                                if (req.body.review && req.body.review._id && req.body.review
                                    .comment) tempRest.addReview(req.body.review);
                                db.Restaurants.Update(tempRest, response => res.json(response));
                            } else res.status(404).json({ success: false, msg: "Data Not Found" });
                        });
                } else res.status(400).json({ success: false, msg: "Invalid Data" });
            })
        .put("/Rate",
            (req, res) => {
                if (req.body.restaurant) {
                    db.Restaurants.Read({ _id: req.body.restaurant },
                        response => {
                            if (response.success) {
                                const tempRest: Restaurant = response.data;
                                if (req.body.rate && req.body.rate._id && req.body.rate
                                    .rate) tempRest.addRate(req.body.rate);
                                db.Restaurants.Update(tempRest, response => res.json(response));
                            } else res.status(404).json({ success: false, msg: "Data Not Found" });
                        });
                } else res.status(400).json({ success: false, msg: "Invalid Data" });
            });
    module.exports = restaurants;
}