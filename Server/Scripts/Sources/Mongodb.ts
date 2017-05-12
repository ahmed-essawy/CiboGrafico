import { Login, User, Restaurant, Order, SubOrder, Offer } from "./Classes";
import { Id, objectId, Order_Rate } from "./Types";
let usersCollection, restaurantsCollection, ordersCollection, subordersCollection, offersCollection;
module.exports = {
        objectId: () => require("mongodb").ObjectId(),
        connectToServer: function (callback) {
            require("mongodb").MongoClient.connect("mongodb://localhost:27017/Project",
                (err, db) => {
                    usersCollection = db.collection("Users");
                    restaurantsCollection = db.collection("Restaurants");
                    ordersCollection = db.collection("Orders");
                    subordersCollection = db.collection("SubOrders");
                    offersCollection = db.collection("Offers");
                    console.log(`\nConnected to Database:${db.databaseName} successfully.`);
                    return callback(err);
                });
        },
        Users: {
                Collection: () => usersCollection,
                Insert(object: User, callback) {
                    this.Collection().update(object.login.username,
                        { $setOnInsert: object },
                        { upsert: true },
                        (err, numAffected) => callback(numAffected));
                },
                Read(object: User, callback) {
                    return this.Collection().find(object).toArray((err, row: User[]) => {
                        if (row) return callback({ success: true, data: row });
                        return callback({ success: false, data: object.login.username });
                    });
                }
            },
        Restaurants: {
                Collection: () => restaurantsCollection,
                Insert(object: Restaurant) {
                    console.log(object);
                    this.Collection().update({ name: object.name },
                        { $setOnInsert: object },
                        { upsert: true },
                        (err, numAffected) => console.log(err));
                },
                Read(object: Restaurant, callback) {
                    return this.Collection().find(object).toArray((err, row: Restaurant) => {
                        if (row) return callback({ success: true, data: row });
                        return callback({ success: false, data: object.branches });
                    });
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