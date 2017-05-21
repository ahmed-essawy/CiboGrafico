export let isAuthenticatedUser = (req: any, res: any, next: any) => {};
export let isAuthenticatedBranch = (req: any, res: any, next: any) => {
    require("./Mongodb").Restaurants.Read({ "login.token": req.query.access_token },
        users => {
            if (users.data.length === 0) res.status(401).json({ success: false, msg: "Unauthorized" });
            else next();
        });
};