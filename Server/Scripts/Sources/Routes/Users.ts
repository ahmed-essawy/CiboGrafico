import { Address, User, SocialMedia, Meal, Ingredient } from "../Classes";
import { IsEmail } from "class-validator";
{
    const users = require("express").Router(), db = require("../Mongodb");
    users
        .get("/", (req: any, res: any) => db.Users.ReadAll(response => res.json(response)))
        .get("/:id", (req, res) => db.Users.Read({ _id: req.params.id }, response => res.json(response)))
        .delete("/:id", (req, res) => db.Users.Delete({ _id: req.params.id }, response => res.json(response)))
        .post("/",
        (req, res) => {
            if (req.body.firstName &&
                req.body.lastName &&
                IsEmail(req.body.email) &&
                req.body.username &&
                req.body.password) {
                let tempAddress = new Address();
                if (req.body.address) {
                    tempAddress = new Address(req.body.address.street &&
                        req.body.address.city &&
                        req.body.address.country);
                }
                const tempUser = new User(db.objectId(),
                    req.body.firstName,
                    req.body.lastName,
                    req.body.email,
                    req.body.username,
                    req.body.phones,
                    tempAddress,
                    req.body.image,
                    req.body.socialMedia);
                db.Users.Create(tempUser, req.body.password, response => res.json(response));
            } else res.status(400).json({ success: false, msg: "Invalid Data" });
        })
        .put("/",
        (req, res) => {
            if (req.body._id) {
                db.Users.Read({ _id: req.body._id },
                    response => {
                        if (response.success) {
                            const tempUser: User = response.data;
                            if (req.body.firstName) tempUser.firstName = req.body.firstName;
                            if (req.body.lastName) tempUser.lastName = req.body.lastName;
                            if (IsEmail(req.body.email)) tempUser.email = req.body.email;
                            if (req.body.username) tempUser.username = req.body.username;
                            if (Array.isArray(req.body.phones)) tempUser.phones = req.body.phones;
                            if (req.body.address) {
                                if (req.body.address.street) tempUser.address.street = req.body.address.street;
                                if (req.body.address.city) tempUser.address.city = req.body.address.city;
                                if (req.body.address
                                    .country) tempUser.address.country = req.body.address.country;
                            }
                            if (req.body.image) tempUser.image = req.body.image;
                            if (Array.isArray(req.body
                                .socialMedia)) tempUser.socialMedia = req.body.socialMedia;
                            db.Users.Update(tempUser, response => res.json(response));
                        } else res.status(404).json({ success: false, msg: "Data Not Found" });
                    });
            } else res.status(400).json({ success: false, msg: "Invalid Data" });
        })
        .post("/Socials",
        (req, res) => {
            if (req.body.id && req.body.socialMedia) {
                const tempSocial = new SocialMedia(req.body.socialMedia.provider, req.body.socialMedia.uri);
                db.Users.AddSocial(tempSocial, { _id: req.body.id }, response => res.json(response));
            } else res.status(400).json({ success: false, msg: "Invalid Data" });
        })
        .post("/Favorites",
        (req, res) => {
            if (req.body.id && req.body.name && req.body.image && req.body.category && req.body.price) {
                const tempMeal = new Meal(db.objectId(),
                    req.body.name,
                    req.body.image,
                    req.body.category,
                    req.body.price);
                if (req.body.ingredients) tempMeal.addIngredients(req.body.ingredients);
                db.Users.AddFavurite({ _id: req.body.Id }, tempMeal, response => res.json(response));
            } else res.status(400).json({ success: false, msg: "Invalid Data" });
        })
        .delete("/Socials/:id/:provider",
        (req, res) => db.Users.DeleteSocial({ _id: req.params.id },
            req.params.provider,
            response => res.json(response)))
        .delete("/Favorites/:id",
        (req, res) => db.Users.DeleteFavorite({ _id: req.params.id }, response => res.json(response)));
    module.exports = users;
}