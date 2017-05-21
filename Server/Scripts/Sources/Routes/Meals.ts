import { Meal } from "../Classes";
{
    const meals = require("express").Router(), db = require("../Mongodb");
    meals
        .get("/", (req: any, res: any) => db.Meals.ReadAll(response => res.json(response)))
        .get("/:id", (req, res) => db.Meals.Read({ _id: req.params.id }, response => res.json(response)))
        .delete("/:id", (req, res) => db.Meals.Delete({ _id: req.params.id }, response => res.json(response)))
        .post("/", (req, res) => {
            if (req.body.restaurant && req.body.meal) {
                const tempMeal = new Meal(db.objectId(), req.body.meal.name, req.body.meal.image, req.body.meal.category, req.body.meal.price);
                db.Meals.Create(tempMeal, { _id: req.body.restaurant }, response => res.json(response));
            } else res.sendStatus(403);
        })
        .put("/", (req, res) => {
            if (req.body._id) {
                db.Meals.Read({ _id: req.body._id },
                    response => {
                        const tempMeal: Meal = response.data;
                        if (req.body.name) tempMeal.name = req.body.name;
                        if (req.body.image) tempMeal.image = req.body.image;
                        if (req.body.price) tempMeal.price = req.body.price;
                        if (req.body.category) tempMeal.category = req.body.category;
                        if (req.body.ingredients) tempMeal.ingredients = req.body.ingredients;
                        db.Meals.Update(tempMeal, response => res.json(response));
                    });
            } else res.sendStatus(403);
        });
    module.exports = meals;
}