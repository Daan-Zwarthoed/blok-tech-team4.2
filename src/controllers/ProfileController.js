// Profile Controller
const User = require("../models/User");

const getProfile = (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) throw err;
        res.render("pages/profiles/profile.njk", { user });
    });
};

module.exports = { getProfile };
