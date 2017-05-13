import { Branch, Manager, Address, Login } from "../Classes";
{
    const restaurants = require("express").Router(), db = require("../Mongodb"), parser = require("body-parser");
    restaurants.use(parser.json())
        .use(parser.urlencoded({ extended: true }))
        .get("/", (req, res) => db.Branches.ReadAll(response => res.json(response)))
        .get("/:id", (req, res) => db.Branches.Read({ _id: req.params.id }, response => res.json(response)))
        .delete("/:id", (req, res) => db.Branches.Delete({ _id: req.params.id }, response => res.json(response)))
        .post("/",
        (req, res) => {
            if (req.body.restaurant && req.body.branch && req.body.branch.manager && req.body.branch.address && req.body.branch.login) {
                const tempManager = new Manager(req.body.branch.manager.firstName, req.body.branch.manager.lastName, req.body.branch.manager.phone);
                const tempAddress = new Address(req.body.branch.address.street, req.body.branch.address.city, req.body.branch.address.country);
                const tempLogin = new Login(req.body.branch.login.username, req.body.branch.login.password);
                const tempBranch = new Branch(db.objectId(), req.body.branch.name, tempManager, tempAddress, tempLogin, req.body.branch.phone);
                db.Branches.Create(tempBranch, { _id: req.body.restaurant }, response => res.json(response));
            } else res.sendStatus(403);
        })
        .put("/",
        (req, res) => {
            if (req.body._id) {
                db.Branches.Read({ _id: req.body._id },
                    response => {
                        const tempBranch: Branch = response.data;
                        if (req.body.name) tempBranch.name = req.body.name;
                        if (req.body.login) {
                            if (req.body.login.username) tempBranch.login.username = req.body.login.username;
                            if (req.body.login.password) tempBranch.login.password = req.body.login.password;
                        }
                        if (req.body.manager) {
                            if (req.body.manager.firstName) tempBranch.manager.firstName = req.body.manager.firstName;
                            if (req.body.manager.lastName) tempBranch.manager.lastName = req.body.manager.lastName;
                            if (req.body.manager.email) tempBranch.manager.email = req.body.manager.email;
                            if (req.body.manager.phones) tempBranch.manager.phones = req.body.manager.phones;
                            if (req.body.manager.address) {
                                if (req.body.manager.address.street) tempBranch.manager.address.street = req.body.manager.address.street;
                                if (req.body.manager.address.city) tempBranch.manager.address.city = req.body.manager.address.city;
                                if (req.body.manager.address.country) tempBranch.manager.address.country = req.body.manager.address.country;
                            }
                        }
                        if (req.body.phones) tempBranch.phones = req.body.phones;
                        db.Branches.Update(tempBranch, response => res.json(response));
                    });
            } else res.sendStatus(403);
        })
    module.exports = restaurants;
}