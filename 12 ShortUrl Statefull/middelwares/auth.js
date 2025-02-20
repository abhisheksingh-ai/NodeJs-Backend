const { getUser } = require("../services/auth");

async function restrictToLogedInUser(req, res, next) {
    const userUid = req.cookies?.uid;

    if (!userUid) {
        return res.redirect("/login"); //static route display
    }

    const user = getUser(userUid);

    if (!user) {
        return res.redirect("/login");
    }

    req.user = user;

    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
    restrictToLogedInUser,
    checkAuth
}