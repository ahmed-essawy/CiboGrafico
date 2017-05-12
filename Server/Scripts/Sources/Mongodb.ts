import { Login, User, Restaurant, Branch } from "./Classes";
import { Id, objectId } from "./Types";
let usersCollection, restaurantsCollection;
module.exports = {
    objectId: () => require("mongodb").ObjectId(),
    connectToServer: function (callback) {
        require("mongodb").MongoClient.connect("mongodb://localhost:27017/Project",
            (err, db) => {
                usersCollection = db.collection("Users");
                restaurantsCollection = db.collection("Restaurants");
                console.log(`\nConnected to Database:${db.databaseName} successfully.`);
                return callback(err);
            });
    },
    Login: {
        Users: {
            Collection: () => usersCollection,
            Find(object: Login, callback) {
                this.Collection().findOne({ "login": object },
                    (err, row: User) => {
                        if (row) return callback({ success: true, data: row._id });
                        return callback({ success: false, data: object.username });
                    });
            }
        },
        Branches: {
            Collection: () => restaurantsCollection,
            Read(object: Login, callback) {
                this.Collection().findOne({ "branches.login": object },
                    (err, row: Restaurant) => {
                        if (row) return callback({ success: true, data: row.branches.filter(b => b.login = object) });
                        return callback({ success: false, data: object.username });
                    });
            }
        }
    },
    Users: {
        Collection: () => usersCollection,
        Insert(object: User, callback) {
            this.Collection().Update(object.login.username,
                { $setOnInsert: object },
                { upsert: true },
                (err, numAffected) => callback(numAffected));
        },
        Find(object: User, callback) {
            return this.Collection().find(object).toArray((err, row: User[]) => {
                if (row) return callback({ success: true, data: row });
                return callback({ success: false, data: object.login.username });
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
        ReadAll(callback) {
            return this.Collection().find().toArray((err, row: Restaurant) => {
                if (row) return callback({ success: true, data: row });
                return callback({ success: false });
            });
        },
        Read(object: Id, callback) {
            return this.Collection().findOne(objectId(object._id),
                (err, row: Restaurant) => {
                    if (row) return callback({ success: true, data: row });
                    return callback({ success: false, data: object });
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
        AddBranch(object: Branch, restaurant: Id, callback) {
            this.Collection().update({ _id: objectId(restaurant._id) },
                { $addToSet: { branches: object } },
                (err, resp) => {
                    if (resp.result.ok) return callback({ success: true, data: resp.result });
                    return callback({ success: false, data: object });
                }
            );
        }
    }
};