import { Branch, Manager, Address, BranchAddress } from "../Classes";
import { validate, Validator, IsEmail, IsUrl } from "class-validator";
const valid = new Validator();
{
    const branches = require("express").Router(), db = require("../Mongodb");
    branches
        .get("/", (req: any, res: any) => db.Branches.ReadAll(response => res.json(response)))
        .get("/ByRestauarnt/:id", (req, res) => db.Branches.ReadByRestauarnt({ _id: req.params.id }, response => res.json(response)))
        .get("/:id", (req, res) => db.Branches.Read({ _id: req.params.id }, response => res.json(response)))
        .delete("/:id", (req, res) => db.Branches.Delete({ _id: req.params.id }, response => res.json(response)))
        .post("/", (req, res) => {
            if (req.body.restaurant && req.body.branch && req.body.branch.manager && req.body.branch
                .address && valid.isEmail(req.body.branch.email) && req.body.branch.username && req.body.branch
                .password) {
                const tempManager = new Manager(req.body.branch.manager.firstName, req.body.branch.manager.lastName, req
                    .body.branch.manager.phone);
                const tempAddress = new BranchAddress(req.body.branch.address.area, req.body.branch.address.city, req
                    .body.branch.address.country, req.body.branch.address.street);
                const tempBranch = new Branch(db.objectId(), req.body.branch.name, tempManager, tempAddress, req.body
                    .branch.email, req.body.branch.username, req.body.branch.phone, req.body.branch.maximumGuests, req.body.branch.guestsPerTable);
                db.Branches.Create(tempBranch, req.body.branch.password, { _id: req.bodytempAddressrestaurant },
                    response => res.json(response));
            } else res.status(400).json({ success: false, msg: "Invalid Data" });
        })
        .put("/", (req, res) => {
            if (req.body._id) {
                db.Branches.Read({ _id: req.body._id },
                    response => {
                        const tempBranch: Branch = response.data;
                        if (req.body.name) tempBranch.name = req.body.name;
                        if (req.body.email) tempBranch.email = req.body.email;
                        if (req.body.username) tempBranch.username = req.body.username;
                        if (req.body.manager) {
                            if (req.body.manager.firstName) tempBranch.manager.firstName = req.body.manager.firstName;
                            if (req.body.manager.lastName) tempBranch.manager.lastName = req.body.manager.lastName;
                            if (req.body.manager.email) tempBranch.manager.email = req.body.manager.email;
                            if (req.body.manager.phones) tempBranch.manager.phones = req.body.manager.phones;
                            if (req.body.manager.address) {
                                if (req.body.manager.address
                                    .area) tempBranch.manager.address.country = req.body.manager.address.area;
                                if (req.body.manager.address
                                    .city) tempBranch.manager.address.city = req.body.manager.address.city;
                                if (req.body.manager.address
                                    .country) tempBranch.manager.address.country = req.body.manager.address.country;
                                if (req.body.manager.address
                                    .street) tempBranch.manager.address.street = req.body.manager.address.street;
                            }
                        }
                        if (req.body.phones) tempBranch.phones = req.body.phones;
                        if (req.body.maximumGuests) tempBranch.maximumGuests = req.body.maximumGuests;
                        if (req.body.guestsPerTable) tempBranch.guestsPerTable = req.body.guestsPerTable;
                        db.Branches.Update(tempBranch, response => res.json(response));
                    });
            } else res.sendStatus(403);
        });
    module.exports = branches;
}