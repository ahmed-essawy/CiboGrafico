import { Ingredient } from "../Classes";
{
    const ingredients = require("express").Router(), db = require("../Mongodb");
    ingredients
        .get("/", (req: any, res: any) => db.Ingredients.ReadAll(response => res.json(response)))
        .get("/:id", (req, res) => db.Ingredients.Read({ _id: req.params.id }, response => res.json(response)))
        .delete("/:id", (req, res) => db.Branches.Delete({ _id: req.params.id }, response => res.json(response)))
        .post("/", (req, res) => {
            if (req.body.meal && req.body.ingredient) {
                const tempingredient = new Ingredient(db.objectId(), req.body.ingredient.name, req.body.ingredient
                    .image);
                db.Ingredients.Create(tempingredient, req.body.meal, response => res.json(response));
            } else res.status(400).json({ success: false, msg: "Invalid Data" });
        })
        .put("/", (req, res) => {});
    module.exports = ingredients;
}