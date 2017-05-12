import { Login, User, Restaurant } from "./Classes";
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
            Find(object: Login, callback) {
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
            this.Collection().update(object.login.username, { $setOnInsert: object }, { upsert: true }, (err, numAffected) => callback(numAffected));
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
        Insert(object: Restaurant) {
            console.log(object);
            this.Collection().update({ name: object.name }, { $setOnInsert: object }, { upsert: true }, (err, numAffected) => console.log(err));
        },
        Find(object: Restaurant, callback) {
            return this.Collection().find(object).toArray((err, row: Restaurant) => {
                if (row) return callback({ success: true, data: row });
                return callback({ success: false, data: object.branches });
            });
        }
    }
};