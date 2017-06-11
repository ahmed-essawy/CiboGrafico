let collection = {};
export let Collection = (table: any): any => collection[table];
export let Functions = (funcName: any, object: any): any => Collection("db")
    .eval(`return ${Collection("Functions")[funcName]}(${JSON.stringify(object)})`);
module.exports = {
    objectId: () => require("mongodb").ObjectId(),
    lastOrderNum: (): Promise<number> => new Promise((resolve: any, reject: any) => {
        Collection("Orders").find().sort({ num: -1 }).limit(1).toArray((err, res) => {
            if (err) reject(10000);
            if (res[0]) resolve(++res[0].num);
            else resolve(10000);
        });
    }),
    connectToServer: function (callback: any) {
        require("mongodb").MongoClient.connect("mongodb://cibografico:meoMrDXVaUBnsU1tIhy9H87lQoQf5hz6l9mJQyonEwHLI7AaAAo57iyfzkTf19fNgbgqq3yHpmSEiBPBsxBv9w==@cibografico.documents.azure.com:10255/CiboGraficoDB?ssl=true",
            (err, db) => {
                collection["db"] = db;
                collection["Authentications"] = db.collection("Authentications");
                collection["Users"] = db.collection("Users");
                collection["Restaurants"] = db.collection("Restaurants");
                collection["Orders"] = db.collection("Orders");
                collection["SubOrders"] = db.collection("SubOrders");
                collection["Offers"] = db.collection("Offers");
                collection["Ingredients"] = db.collection("Ingredients");
                collection["Functions"] = {};
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
    Locations: require("./Access Layers/Locations"),
    Ingredients: require("./Access Layers/Ingredients")
};