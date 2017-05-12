import { User, Login, Restaurant, Branch, Order, SubOrder, Offer } from "./Classes";
import { objectId, Id, Order_Rate } from "./Types";
let usersCollection: any, restaurantsCollection: any, ordersCollection: any, subordersCollection: any, offersCollection: any;
module.exports = {
    objectId: () => require("mongodb").ObjectId(),
    connectToServer: function (callback: any) {
        require("mongodb").MongoClient.connect("mongodb://localhost:27017/Project",
            (err, db) => {
                usersCollection = db.collection("Users");
                restaurantsCollection = db.collection("Restaurants");
                console.log(`\nConnected to Database:${db.databaseName} successfully.`);
                return callback(err);
            });
    },
    Users: {
        Collection: () => usersCollection,
        Create(object: User, callback) {
            this.Collection().Update(object.login.username,
                { $setOnInsert: object },
                { upsert: true },
                (err, numAffected) => callback(numAffected));
        },
        Read(object: Id, callback) {
            return this.Collection().findOne(objectId(object._id),
                (err, row: User) => {
                    if (row) return callback({ success: true, data: row });
                    return callback({ success: false, data: object });
                });
        },
        ReadAll(object: Id, callback) {
            return this.Collection().find(objectId(object._id)).toArray(
                (err, row: User[]) => {
                    if (row) return callback({ success: true, data: row });
                    return callback({ success: false, data: object });
                });
        },
        Login(object: Login, callback) {
            this.Collection().findOne({ "login.username": object.username, "login.password": object.password },
                (err, row: User) => {
                    if (row) return callback({ success: true, data: row.login.token });
                    return callback({ success: false, data: object.username });
                });
        }
    },
    Restaurants: {
        Collection: () => restaurantsCollection,
        Create(object: Restaurant, callback) {
            this.Collection().update({ name: object.name },
                { $setOnInsert: object },
                { upsert: true },
                (err, numAffected) => callback(numAffected));
        },
        Read(object: Id, callback) {
            return this.Collection().findOne(objectId(object._id),
                (err, row: Restaurant) => {
                    if (row) return callback({ success: true, data: row });
                    return callback({ success: false, data: object });
                });
        },
        ReadAll(callback) {
            return this.Collection().find().toArray((err, row: Restaurant[]) => {
                if (row) return callback({ success: true, data: row });
                return callback({ success: false });
            });
        },
        Update(object: Restaurant, callback) {
            object._id = objectId(object._id);
            this.Collection().update({ _id: object._id },
                { $set: object },
                (err, resp) => {
                    if (resp.result.ok) return callback({ success: true, data: resp.result });
                    return callback({ success: false, data: object });
                });
        },
        Delete(object: Id) {
            this.Collection().removeOne({ _id: objectId(object._id) });
        }
    },
    Branches: {
        Collection: () => restaurantsCollection,
        Create(object: Restaurant, callback) {
            object._id = objectId(object._id);
            this.Collection().update({ _id: object._id },
                { $set: object },
                (err, resp) => {
                    if (resp.result.ok) return callback({ success: true, data: resp.result });
                    return callback({ success: false, data: object });
                });
        },
        Read(object: Id, callback) {
            this.Collection().findOne({ "branches._id": objectId(object._id) },
                (err, row: Restaurant) => {
                    if (row) return callback({ success: true, data: row.branches.filter(b => b._id = object._id) });
                    return callback({ success: false, data: object._id });
                });
        },
        Delete(object: Id) {
            this.Collection().branches.splice(this.Collection().branches.indexOf(objectId(object._id)), 1);
        },
        Login(object: Login, callback) {
            this.Collection().findOne({ "login.username": object.username, "login.password": object.password },
                (err, row: User) => {
                    if (row) return callback({ success: true, data: row.login.token });
                    return callback({ success: false, data: object.username });
                });
        },
        AddBranch(object: Branch, restaurant: Id, callback) {
            this.Collection().update({ _id: objectId(restaurant._id) },
                { $addToSet: { branches: object } },
                (err, resp) => {
                    if (resp.result.ok) return callback({ success: true, data: resp.result });
                    return callback({ success: false, data: object });
                }
            );
        }
    },
    Orders: {
        Collection: () => ordersCollection,
        Read(object: Order, callback) {
            return this.Collection().find(object).toArray((err, row: Order[]) => {
                if (row) return callback({ success: true, data: row });
                return callback({ success: false });
            });
        },
        Delete(object: Id) {
            this.Collection().removeOne({ "_id": objectId(object._id) });
            //Sohaila and Omar functions
            //this.Collection().Users.orders.splice(this.Users.Collection().orders.indexOf(objectId(object._id)), 1);
            //this.Collection().Restaurants.orders.splice(this.Restaurants.Collection().Orders
            //    .indexOf(objectId(object._id)),
            //    1);
        },
        Create(object: Order, callback) {
            this.Collection().insertOne(object,
                (err, row: Order) => {
                    if (row) {
                        //Omar should do a function here
                        //this.Users.Find({ _id: object.owner }).orders.push(object._id);
                        //sohaila should do a function here
                        //this.Restaurants.Find({ _id: objectId(object.restaurant) }).orders.push(object.restaurant);
                        return callback({ success: true, data: row });
                    }
                    return callback({ success: false });
                });
        },
        Update(object: Order, callback) {
            object._id = objectId(object._id);
            this.Collection().updateOne({ _id: object._id },
                { $set: object },
                (err, row: Order) => {
                    if (row) return callback({ success: true, data: row });
                    return callback({ success: false });
                });
        },
        RateOrder(object: Order_Rate, callback) {
            object._id = objectId(object._id);
            this.Collection().updateOne({ _id: object._id },
                { $set: { rate: object.rate } },
                (err, row: Order) => {
                    if (row) return callback({ success: true, data: row });
                    return callback({ success: false });
                });
        }
    },
    Suborders: {
        Collection: () => subordersCollection,
        Read(object: SubOrder, callback) {
            return this.Collection().find(object).toArray((err, row: SubOrder[]) => {
                if (row) return callback({ success: true, data: row });
                return callback({ success: false });
            });
        },
        Delete(object: Id) {
            this.Collection().removeOne({ "_id": objectId(object._id) });
            //delete suborder from users also.>>OMar
        },
        Create(object: SubOrder, callback) {
            this.Collection().insertOne(object,
                (err, row: SubOrder) => {
                    if (row) {
                        return callback({ success: true, data: row });
                        //Insert the suborder in the specified owner(user)>>OMar
                    }
                    return callback({ success: false });
                });
        },
        Update(object: SubOrder, callback) {
            object._id = objectId(object._id);
            this.Collection().updateOne({ _id: object._id },
                { $set: object },
                (err, row: Order) => {
                    if (row) return callback({ success: true, data: row });
                    return callback({ success: false });
                });
        },
        RateOrder(object: Order_Rate, callback) {
            object._id = objectId(object._id);
            this.Collection().updateOne({ _id: object._id },
                { $set: { rate: object.rate } },
                (err, row: Order) => {
                    if (row) return callback({ success: true, data: row });
                    return callback({ success: false });
                });
        }
    },
    Offers: {
        Collection: () => offersCollection,
        Read(object: Offer, callback) {
            return this.Collection().find(object).toArray((err, row: Offer[]) => {
                if (row) return callback({ success: true, data: row });
                return callback({ success: false });
            });
        },
        Delete(object: Id) {
            this.Collection().removeOne({ "_id": objectId(object._id) });
        },
        Create(object: Offer, callback) {
            this.Collection().insertOne(object,
                (err, row: Offer) => {
                    if (row) return callback({ success: true, data: row });
                    return callback({ success: false });
                });
        },
        Update(object: Offer, callback) {
            object._id = objectId(object._id);
            this.Collection().updateOne({ _id: object._id },
                { $set: object },
                (err, row: Offer) => {
                    if (row) return callback({ success: true, data: row });
                    return callback({ success: false });
                });
        }
    }
};