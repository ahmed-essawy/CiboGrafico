{
    const restaurants = require("express").Router(), db = require("../Mongodb"), parser = require("body-parser");
    restaurants.use(parser.json())
        .use(parser.urlencoded({ extended: true }))
        .get("/:id", (req, res) => db.Branches.Read({ _id: req.params.id }, response => res.json(response)))
        .post("/", (req, res) => { db.Branches.AddBranch(req.body.branch, { _id: req.body.restaurant }, response => res.json(response)); })
        .delete("/:id",
        (req, res) => {
            db.Branches.Delete({ _id: req.params.id });
            res.json({ success: true, data: req.params.id });
        });
    module.exports = restaurants;
}