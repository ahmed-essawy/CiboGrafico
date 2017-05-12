export let isAuthenticatedUser = (req, res, next) => {
    require("./Mongodb").Users.Read({ "login.token": req.query.access_token },
        users => {
            if (users.data.length == 0) res.sendStatus(401);
            else next();
        });
};
export let isAuthenticatedBranch = (req, res, next) => {
    require("./Mongodb").Restaurants.Read({ "login.token": req.query.access_token },
        users => {
            if (users.data.length == 0) res.sendStatus(401);
            else next();
        });
};