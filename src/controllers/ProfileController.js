// Profile Controller
const User = require("../models/User");

const getProfile = (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) throw err;
        res.render("pages/profiles/profile.njk", { user });
    });
};

const getUpdateProfile = (req, res) => {
    if (req.user._id == req.params.userId) {
        User.findById(req.params.userId, (err, user) => {
            if (err) throw err;
            res.render("pages/profiles/updateProfile.njk", { user });
        });
	} else {
        res.redirect(`/profiles/${req.params.userId}`);
    }
}

module.exports = { getProfile, getUpdateProfile };
