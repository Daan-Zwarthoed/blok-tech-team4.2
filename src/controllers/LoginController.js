// Login Controller
const passport = require("passport");

const getLogin = (req, res) => {
    res.render("login.njk");
};

const getLogout = (req, res) => {
    req.logout();
    res.redirect("/");
};

const loginUser = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?error=true",
});

module.exports = { getLogin, getLogout, loginUser };
