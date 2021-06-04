/*
 * Profile Controller
 */

const User = require("../models/User");

/**
 * This function renders the profile of the request user by checking the userId entered in the URL.
 */
const getProfile = (req, res) => {
    // Look for the user who matches the entered id.
    User.findById(req.params.userId, (err, profile) => {
        if (err) throw err;

        // Look for the current session user. This is necessary for displaying the correct header data.
        User.findById(req.user._id, (err, user) => {
            if (err) throw err;
            res.render("pages/profiles/profile.njk", { profile, user });
        });
    });
};

/**
 * This function renders the update profile page of the request user by checking the userId entered in the URL.
 */
const getUpdateProfile = (req, res) => {
    // Check if the session user is equal to the requested user (this way other users can't access this page).
    if (req.user._id == req.params.userId) {
        User.findById(req.params.userId, (err, user) => {
            if (err) throw err;
            res.render("pages/profiles/updateProfile.njk", { user });
        });
    } else {
        res.redirect(`/profiles/${req.params.userId}`);
    }
};

module.exports = { getProfile, getUpdateProfile };
