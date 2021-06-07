/**
 * Profile Controller
 */

const Game = require('../models/Game');
const User = require('../models/User');

/**
 * This function renders the profile of the request user by checking the userId entered in the URL.
 */
const getProfile = (req, res) => {
    const { userId } = req.params;
    // Look for the user who matches the entered id.
    User.findById(userId, (err, profile) => {
        if (err) throw err;

        // Find all games that are liked by the user that owns this profile.
        Game.find({ likedBy: userId }, (err, games) => {
            if (err) throw err;

            // Look for the current session user. This is necessary for displaying the correct header data.
            User.findById(req.user._id, (err, user) => {
                if (err) throw err;
                res.render('pages/profiles/profile.njk', {
                    profile,
                    user,
                    userId,
                    games,
                });
            });
        });
    });
};

/**
 * This function renders the update profile page of the request user by checking the userId entered in the URL.
 */
const getUpdateProfile = (req, res) => {
    const { userId } = req.params;
    // Check if the session user is equal to the requested user (this way other users can't access this page).
    if (userId == req.user._id) {
        User.findById(req.params.userId, (err, user) => {
            if (err) throw err;
            res.render('pages/profiles/updateProfile.njk', { user });
        });
    } else {
        res.redirect(`/profiles/${req.params.userId}`);
    }
};

/**
 * This function handles the updating of the user data.
 */
const updateProfile = (req, res) => {
    const avatar = req.files.avatar[0].filename;
    const banner = req.files.banner[0].filename;
    const { displayname } = req.body;
    const { description } = req.body;

    // Update the user who matches the (unique) username. The user can update the avatar and banner.
    User.updateOne({ username: req.user.username }, { $set: { avatar, banner, displayname, description } }, (err) => {
        if (err) throw err;
    });

    // Redirect the user back to their profile.
    res.redirect(`/profiles/${req.params.userId}`);
};

module.exports = { getProfile, getUpdateProfile, updateProfile };
