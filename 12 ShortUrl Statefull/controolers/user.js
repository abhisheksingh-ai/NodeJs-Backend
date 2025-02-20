const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../services/auth");

async function handleSignUp(req, res) {
    const { name, email, password } = req.body;
    User.create({
        name,
        email,
        password,
    });
    return res.render("home");
}

async function handleUserLogIn(req,res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.render("login", {
            Error : "invalid mail or passward",
        })
    }
    //now i have to create a uid and send back with cookie
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
}


module.exports = {
    handleSignUp,
    handleUserLogIn
}