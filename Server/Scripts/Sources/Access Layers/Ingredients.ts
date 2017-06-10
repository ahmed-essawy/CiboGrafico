import { Collection } from "../Mongodb";
import { Meal, Restaurant, Order, Ingredient } from "../Classes";
import { objectId, Id } from "../Types";
module.exports = {
    Create(object: Ingredient, meal: string, callback: any) {
        object._id = objectId(object._id);
        Collection("Ingredients").update({ name: object.name },
            { $setOnInsert: object }, { upsert: true }, (err, resp1) => {
                if (err) return callback({ success: false, data: err });
                if (resp1.result.upserted) {
                    Collection("Restaurants").update({ "meals._id": objectId(meal) },
                        { $addToSet: { "meals.$.ingredients": resp1.result.upserted[0]._id } },
                        (err, resp2) => {
                            if (err) return callback({ success: false, data: err });
                            if (resp2.result.nModified) {
                                return callback({ success: true, data: { "addToIngredients": resp1, "addToMeal": resp2 }
                                });
                            } else return callback({ success: false, data: resp2 });
                        }
                    );
                } else return callback({ success: false, data: resp1 });
            });
    },
    Read(object: Id, callback: any) {
        Collection("Ingredients").findOne(objectId(object._id), (err, row: Ingredient) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (row) return callback({ success: true, data: row });
            else return callback({ success: false, data: object });
        });
    },
    ReadAll(callback: any) {
        Collection("Ingredients").find().toArray((err, row: Ingredient[]) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (row) return callback({ success: true, data: row });
            else return callback({ success: false });
        });
    },
    Delete(object: Id, callback: any) {
        Collection("Ingredients").removeOne({ "_id": objectId(object._id) }, (err, resp) => {
            if (err) return callback({ success: false, msg: "Error !!" });
            if (resp.result.ok) return callback({ success: true, data: resp.result });
            else return callback({ success: false, data: object });
        });
    }
};