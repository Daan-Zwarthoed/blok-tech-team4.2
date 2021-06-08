/*
 * Register Controller
 */

const bcrypt = require('bcrypt');
const User = require('../models/User');
const Game = require('../models/Game');
const { shuffle } = require('../tools/shuffle');

const saltRounds = 10;

/**
 * This function renders the register page.
 */
const getRegister = (req, res) => {
    res.render('pages/home/register.njk');
};

/**
 * This function handles the registering process. It will take a number of user inputs and store / encrypt (where neccessary) them.
 */
const registerUser = (req, res) => {
    const { username, email, password } = req.body;
    const displayname = req.body.username;
    const avatar = req.files.avatar[0].filename;
    const banner = req.files.banner[0].filename;

    User.findOne({ username }).then((result) => {
        // If username is already registered redirect back to register
        if (result) {
            res.redirect('/register');
        } else {
            // Otherwise create a new User with the user input.
            const addUser = new User({
                username,
                displayname,
                email,
                password,
                avatar,
                banner,
            });

            // Hash the password
            bcrypt.hash(addUser.password, saltRounds, (err, hash) => {
                if (err) throw err;
                addUser.password = hash;
                addUser.save();

                // Automatically login user after registering
                // https://www.passportjs.org/docs/login/
                req.login(addUser, (err) => {
                    if (err) throw err;
                    res.redirect('/onboarding');
                });
            });
        }
    });
};

const getOnboarding = (req, res) => {
    Game.find({}).then((games) => {
        shuffle(games);
        res.render('pages/profiles/addGames.njk', { games });
    });
};

const onboardUser = (req, res) => {
    Game.find({}).then((games) => {
        games.forEach((game) => {
            if (req.body[game.titleSlug]) {
                Game.updateOne({ title: game.title }, { $push: { likedBy: req.user._id } }, (err) => {
                    if (err) throw err;
                });
            }
        });
    });
    res.redirect('/');
};

module.exports = { getRegister, registerUser, getOnboarding, onboardUser };
