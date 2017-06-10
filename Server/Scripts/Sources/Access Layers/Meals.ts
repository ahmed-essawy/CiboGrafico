import {Meal, Ingredient, Offer, Restaurant } from "../Classes";
import {Collection} from "../Mongodb";
import {objectId, Id} from "../Types";
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
                        await new Promise((resolve, reject) =>
                            require("../Mongodb").Ingredients.Read({ "_id": meal.ingredients[i] }, ingredient => {
                                if (ingredient.success) resolve(ingredient.data);
                                reject();
                            })).then(ingredient => ingredients.push(ingredient as Ingredient)).catch(() => {});
                    }
                    await new Promise((resolve, reject) => {
                        Collection("Offers").findOne({ "meal": objectId(meal._id) }, (err, offer: Offer) => {
                            if (err) return callback({ success: false, msg: "Error !!" });
                            if (offer) resolve(offer.discount);
                            reject({ success: false, data: meal._id });
                        });
                    }).then(discount => meal.discount = discount).catch(() => {});
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
    MealsByRestaurant(object: Id, callback: any) {
        Collection("Restaurants").findOne({ "_id": objectId(object._id) }, (err, row: Restaurant) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (row) {
                const order = async function () {
                    const meals = Array<Meal>();
                    for (let i = 0; i < row.meals.length; i++) {
                        const meal = row.meals[i];
                        await new Promise((resolve, reject) => {
                            Collection("Offers").findOne({ "meal": objectId(meal._id) }, (err, offer: Offer) => {
                                if (err) reject({ success: false, msg: "Error !!" });
                                if (offer) meal["discount"] = offer.discount;
                                resolve(meal);
                            });
                        }).then(meal => meals.push(meal as Meal)).catch(() => {});
                    }
                    return meals;
                };
                order().then(meals => callback({ success: true, data: meals }));
            } else return callback({ success: false });
        });
    },
};