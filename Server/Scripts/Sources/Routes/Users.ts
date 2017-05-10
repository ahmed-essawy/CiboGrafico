import { User, Login, Address, Restaurant, Branch, Manager } from "../Classes";
import Classes = require("../Classes");
import Owner = Classes.Owner;
{
    const users = require("express").Router(), db = require("../Mongodb");
    users.get("/",
        (req, res) => {
            const user1 = new User(db.objectId(), "fsf", "fddsfsd", "sdfsd", new Login("Ahmed", "Moa"), "fdsfds", new Address("Street"));
            console.log(user1);
            db.Users.Insert(user1, callback => console.log(callback));
            const rest1 = new Restaurant(db.objectId(), "Ahmead", "dsadas", new Owner("OWner", "OF Ahmed", "546789"));
            rest1.addBranch(new Branch(db.objectId(), "das", new Manager("Ahmed", "Mohamed", "342432"), new Address(), new Login("test", "Mo"), "5467"));
            db.Restaurants.Insert(rest1);
            res.json({ Success: true });
        });
    module.exports = users;
}