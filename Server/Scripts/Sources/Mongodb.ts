let collection = {};
export let Collection = (table: any): any => collection[table];
module.exports = {
        objectId: () => require("mongodb").ObjectId(),
        connectToServer: function (callback: any) {
            require("mongodb").MongoClient.connect("mongodb://localhost:27017/Project",
                (err, db) => {
                    collection["Tokens"] = db.collection("Tokens");
                    collection["Users"] = db.collection("Users");
                    collection["Restaurants"] = db.collection("Restaurants");
                    collection["Orders"] = db.collection("Orders");
                    collection["SubOrders"] = db.collection("SubOrders");
                    collection["Offers"] = db.collection("Offers");
                    collection["Ingredients"] = db.collection("Ingredients");
                    console.log(`\nConnected to Database:${db.databaseName} successfully.`);
                    return callback(err);
                });
        },
        Collection: Collection,
        Branches: require("./Access Layers/Branches"),
        Login: require("./Access Layers/Login"),
        Meals: require("./Access Layers/Meals"),
        Offers: require("./Access Layers/Offers"),
        Orders: require("./Access Layers/Orders"),
        Restaurants: require("./Access Layers/Restaurants"),
        SubOrders: require("./Access Layers/SubOrders"),
        Users: require("./Access Layers/Users")
    };