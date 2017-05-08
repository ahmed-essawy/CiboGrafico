let usersCollection, restaurantsCollection;
module.exports = {
    connectToServer: function (callback) {
        require("mongodb").MongoClient.connect("mongodb://localhost:27017/Project",
            (err, db) => {
                usersCollection = db.collection("Restaurants");
                restaurantsCollection = db.collection("Restaurants");
                console.log(`\nConnected to Database:${db.databaseName} successfully.`);
                return callback(err);
            });
    },
    Users: {
        Collection: () => usersCollection,
        Find: function (object) { return this.Collection().find(object) }
    },
    Restaurants: {
        Collection: () => restaurantsCollection,
        Find: function (object) { return this.Collection().find(object) }
    }
};