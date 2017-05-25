let collection = {};
export let Collection = (table: any): any => collection[table];
export let Functions = (funcName, object): any => Collection("db").eval("return " + Collection("Functions")[funcName] + "(" + JSON.stringify(object) + ")");
module.exports = {
    objectId: () => require("mongodb").ObjectId(),
    connectToServer: function (callback: any) {
        require("mongodb").MongoClient.connect("mongodb://localhost:27017/Project",
            (err, db) => {
                collection["db"] = db;
                collection["Authentications"] = db.collection("Authentications");
                collection["Users"] = db.collection("Users");
                collection["Restaurants"] = db.collection("Restaurants");
                collection["Orders"] = db.collection("Orders");
                collection["SubOrders"] = db.collection("SubOrders");
                collection["Offers"] = db.collection("Offers");
                collection["Ingredients"] = db.collection("Ingredients");
                collection["Functions"] = {}
                db.collection("system.js").find()
                    .toArray((a, b) => { b.forEach(c => { collection["Functions"][c._id] = c.value.code }); });
                console.log(`\nConnected to Database:${db.databaseName} successfully.`);
                return callback(err);
            });
    },
    Collection: Collection,
    Functions: Functions,
    Branches: require("./Access Layers/Branches"),
    Login: require("./Access Layers/Login"),
    Meals: require("./Access Layers/Meals"),
    Offers: require("./Access Layers/Offers"),
    Orders: require("./Access Layers/Orders"),
    Restaurants: require("./Access Layers/Restaurants"),
    SubOrders: require("./Access Layers/SubOrders"),
    Users: require("./Access Layers/Users"),
    Locations: require("./Access Layers/Locations")
};