import { Collection } from "../Mongodb";
import { Meal, Restaurant, Order, Ingredient } from "../Classes";
import { objectId, Id } from "../Types";
module.exports = {
    Create(object: Meal, restaurant: Id, callback: any) {
        Collection("Restaurants").update({ _id: objectId(restaurant._id), "meals.name": { $ne: object.name } }, { $addToSet: { "meals": object } }, (err, resp) => {
                if (err) return callback({ success: false, msg: "Error !!" });
                if (resp.result.ok) return callback({ success: true, data: resp.result });
                else return callback({ success: false, data: object });
            }
        );
    },
    Read(object: Id, callback: any) {
        Collection("Restaurants").findOne({ "meals._id": objectId(object._id) }, (err, row) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (row) {
                const meal = row.meals.filter(b => b._id.toString() === object._id.toString())[0];
                const meals = async function () {
                    const ingredients = Array<Ingredient>();
                    for (let i = 0; i < meal.ingredients.length; ++i) {
                        await new Promise(resolve =>
                            require("../Mongodb").Ingredients.Read({ "_id": meal.ingredients[i] }, ingredient => resolve(ingredient.data))
                        ).then(ingredient => ingredients.push(ingredient as Ingredient));
                    }
                    return ingredients;
                };
                meals().then(ingredients => {
                    meal.ingredients = ingredients;
                    return callback({ success: true, data: meal });
                });
            } else return callback({ success: false, data: object._id });
        });
    },
    ReadAll(callback: any) {
        Collection("Restaurants").find().toArray((err, row: Restaurant[]) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            const meals = new Array<Meal>();
            row.forEach(restaurant => restaurant.meals.forEach(meal => meals.push(meal)));
            if (row) return callback({ success: true, data: meals });
            else return callback({ success: false });
        });
    },
    Update(object: Meal, callback: any) {
        object._id = objectId(object._id);
        Collection("Restaurants").update({ "meals._id": object._id }, { $set: { "meals.$": object } }, (err, resp) => {
                if (err) return callback({ success: false, msg: "Error !!" });
                if (resp.result.ok) return callback({ success: true, data: resp.result });
                else return callback({ success: false, data: object });
            }
        );
    },
    Delete(object: Id, callback: any) {
        Collection("Restaurants").update({ "meals._id": objectId(object._id) }, { $pull: { "meals": { "_id": objectId(object._id) } } }, (err, resp) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (resp.result.ok) return callback({ success: true, data: resp.result });
            else return callback({ success: false, data: object });
        });
    },
    AddIngredient(object: Ingredient, meal: Meal, callback: any) {
        return callback({ success: false, data: object });
    },
    AddIngredients(object: Ingredient, meal: Id, callback: any) {
        return callback({ success: false, data: object });
    },
    MealsByUser(object: Id, callback: any) {
        Collection("Orders").findOne({ "_id": objectId(object._id) }, (err, row: Order) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (row) {
                const order = async function () {
                    const meals = Array<Meal>();
                    for (let i = 0; i < row.meals.length; i++) {
                        const meal = row.meals[i];
                        await new Promise(resolve => {
                            Collection("Restaurants").findOne({ "_id": objectId(row.restaurant) }, (err, rest: Restaurant) => {
                                if (err) return callback({ success: false, msg: "Error !!" });
                                if (rest) {
                                    meal["name"] = rest.meals.filter(b => b._id.toString() === meal._id.toString())[0].name;
                                    resolve(meal);
                                } else return callback({ success: false, data: meal._id });
                            });
                        }).then(meal => meals.push(meal as Meal));
                    }
                    return meals;
                };
                order().then(meals => {
                    row.meals = meals;
                    callback({ success: true, data: row });
                });
            } else return callback({ success: false });
        });
    }
};