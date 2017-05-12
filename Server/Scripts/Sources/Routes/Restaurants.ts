import { Restaurant, Owner, Address, Branch, Manager, Login, Meal, Offer, Order, User, SocialMedia, Reservation } from "../Classes";
{
    const restaurants = require("express").Router(), db = require("../Mongodb"), parser = require("body-parser");
    restaurants.use(parser.json())
        .use(parser.urlencoded({ extended: true }))
        .get("/", (req, res) => db.Restaurants.ReadAll(response => res.json(response)))
        .get("/:id", (req, res) => db.Restaurants.Read({ _id: req.params.id }, response => res.json(response)))
        .post("/",
            (req, res) => {
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
                        for (var i = 0; i < req.body.branches.length; i++) {
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
                                    req.body.branches[i].address.country),
                                new Login(req.body.branches[i].login.username, req.body.branches[i].login.password),
                                req.body.branches[i].phones));
                        }
                    }
                    if (req.body.meals) {
                        for (var i = 0; i < req.body.meals.length; i++) {
                            tempRest.addMeal(new Meal(db.objectId(),
                                req.body.meals[i].name,
                                req.body.meals[i].image,
                                req.body.meals[i].category,
                                req.body.meals[i].price));
                        }
                    }
                    if (req.body.offers) {
                        for (var i = 0; i < req.body.offers.length; i++) {
                            tempRest.addOffer(new Offer(db.objectId(),
                                req.body.offers[i].image,
                                req.body.offers[i].description,
                                new Meal(db.objectId(),
                                    req.body.offers[i].meals.name,
                                    req.body.offers[i].meals.image,
                                    req.body.offers[i].meals.category,
                                    req.body.offers[i].meals.price),
                                req.body.offers[i].discount,
                                req.body.offers[i].duration,
                                req.body.offers[i].startDate));
                        }
                    }
                    if (req.body.orders) {
                        for (var i = 0; i < req.body.orders.length; i++) {
                            tempRest.addOrder(new Order(db.objectId(),
                                req.body.orders[i].num,
                                new User(db.objectId(),
                                    req.body.orders[i].owner.firstName,
                                    req.body.orders[i].owner.lastName,
                                    req.body.orders[i].owner.email,
                                    new Login(req.body.orders[i].owner.login.username,
                                        req.body.orders[i].owner.login.password),
                                    req.body.orders[i].owner.phone,
                                    new Address(req.body.orders[i].owner.address.street,
                                        req.body.orders[i].owner.address.city,
                                        req.body.orders[i].owner.address.country),
                                    req.body.orders[i].owner.image,
                                    new Array<SocialMedia>(
                                        req.body.orders[i].owner.socialMedia.provider,
                                        req.body.orders[i].owner.socialMedia.uri)),
                                req.body.orders[i].type,
                                new Address(
                                    req.body.orders[i].address.street,
                                    req.body.orders[i].address.city,
                                    req.body.orders[i].address.country)));
                        }
                    }
                    if (req.body.reservations) {
                        for (var i = 0; i < req.body.reservations.length; i++) {
                            tempRest.addReservation(new Reservation(db.objectId(),
                                new User(db.objectId(),
                                    req.body.reservations[i].owner.firstName,
                                    req.body.reservations[i].owner.lastName,
                                    req.body.reservations[i].owner.email,
                                    new Login(req.body.reservations[i].owner.login.username,
                                        req.body.reservations[i].owner.login.password),
                                    req.body.reservations[i].owner.phone,
                                    new Address(req.body.reservations[i].owner.address.street,
                                        req.body.reservations[i].owner.address.city,
                                        req.body.reservations[i].owner.address.country),
                                    req.body.reservations[i].owner.image,
                                    new Array<SocialMedia>(
                                        req.body.reservations[i].owner.socialMedia.provider,
                                        req.body.reservations[i].owner.socialMedia.uri)),
                                req.body.reservations[i].guests,
                                req.body.reservations[i].guestsPerTable,
                                req.body.reservations[i].order));
                        }
                    }
                    db.Restaurants.Create(tempRest, response => response => res.json(response));
                } catch (err) {
                    res.json({ success: false, msg: "Invalid Data" });
                }
            })
        .put("/",
            (req, res) => {
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
                        for (var i = 0; i < req.body.branches.length; i++) {
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
                                    req.body.branches[i].country),
                                new Login(req.body.branches[i].login.username, req.body.branches[i].login.password),
                                req.body.branches[i].phones));
                        }
                    }
                    if (req.body.meals) {
                        for (var i = 0; i < req.body.meals.length; i++) {
                            updateRest.addMeal(new Meal(db.objectId(),
                                req.body.meals[i].name,
                                req.body.meals[i].image,
                                req.body.meals[i].category,
                                req.body.meals[i].price));
                        }
                    }
                    if (req.body.offers) {
                        for (var i = 0; i < req.body.offers.length; i++) {
                            updateRest.addOffer(new Offer(db.objectId(),
                                req.body.offers[i].image,
                                req.body.offers[i].description,
                                new Meal(db.objectId(),
                                    req.body.offers[i].meals.name,
                                    req.body.offers[i].meals.image,
                                    req.body.offers[i].meals.category,
                                    req.body.offers[i].meals.price),
                                req.body.offers[i].discount,
                                req.body.offers[i].duration,
                                req.body.offers[i].startDate));
                        }
                    }
                    if (req.body.orders) {
                        for (var i = 0; i < req.body.orders.length; i++) {
                            updateRest.addOrder(new Order(db.objectId(),
                                req.body.orders[i].num,
                                new User(db.objectId(),
                                    req.body.orders[i].owner.firstName,
                                    req.body.orders[i].owner.lastName,
                                    req.body.orders[i].owner.email,
                                    new Login(req.body.orders[i].owner.login.username,
                                        req.body.orders[i].owner.login.password),
                                    req.body.orders[i].owner.phone,
                                    new Address(req.body.orders[i].owner.address.street,
                                        req.body.orders[i].owner.address.city,
                                        req.body.orders[i].owner.address.country),
                                    req.body.orders[i].owner.image,
                                    new Array<SocialMedia>(
                                        req.body.orders[i].owner.socialMedia.provider,
                                        req.body.orders[i].owner.socialMedia.uri)),
                                req.body.orders[i].type,
                                new Address(
                                    req.body.orders[i].address.street,
                                    req.body.orders[i].address.city,
                                    req.body.orders[i].address.country)));
                        }
                    }
                    if (req.body.reservations) {
                        for (var i = 0; i < req.body.reservations.length; i++) {
                            updateRest.addReservation(new Reservation(db.objectId(),
                                new User(db.objectId(),
                                    req.body.reservations[i].owner.firstName,
                                    req.body.reservations[i].owner.lastName,
                                    req.body.reservations[i].owner.email,
                                    new Login(req.body.reservations[i].owner.login.username,
                                        req.body.reservations[i].owner.login.password),
                                    req.body.reservations[i].owner.phone,
                                    new Address(req.body.reservations[i].owner.address.street,
                                        req.body.reservations[i].owner.address.city,
                                        req.body.reservations[i].owner.address.country),
                                    req.body.reservations[i].owner.image,
                                    new Array<SocialMedia>(
                                        req.body.reservations[i].owner.socialMedia.provider,
                                        req.body.reservations[i].owner.socialMedia.uri)),
                                req.body.reservations[i].guests,
                                req.body.reservations[i].guestsPerTable,
                                req.body.reservations[i].order));
                        }
                    }
                    db.Restaurants.Update(updateRest, response => res.json(response));
                } catch (err) {
                    res.json({ success: false, msg: "Invalid Data" });
                }
            })
        .delete("/:id",
            (req, res) => {
                db.Restaurants.Delete({ _id: req.params.id });
                res.json({ success: true, data: req.params.id });
            });
    module.exports = restaurants;
}