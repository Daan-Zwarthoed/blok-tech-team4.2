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
    Game.find({}).then((games) => {
        // Shuffle the order of the games array
        shuffle(games);
        res.render('pages/home/register.njk', { games });
    });
};

/**
 * This function handles the registering process. It will take a number of user inputs and store / encrypt (where neccessary) them.
 */
const registerUser = (req, res) => {
    const { username, email, password, playstyle, playtime } = req.body;
    const displayname = req.body.username;
    let avatar;
    let banner;

    // Check if banner has input
    if (req.files.banner) {
        banner = req.files.banner[0].filename;
    } else {
        banner = 'defaultBanner.jpg';
    }

    // Check if avatar has input
    if (req.files.avatar) {
        avatar = req.files.avatar[0].filename;
    } else {
        avatar = 'defaultUser.png';
    }

    Game.find({}).then((games) => {
        games.forEach((game) => {
            if (req.body[game.titleSlug]) {
                Game.updateOne({ title: game.title }, { $push: { likedBy: username } }, (err) => {
                    if (err) throw err;
                });
            }
        });
    });

    User.findOne({ username }).then((result) => {
        // If username is already registered, redirect the user back to register
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
                playstyle,
                playtime,
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
                    res.redirect('/');
                });
            });
        }
    });
};

module.exports = { getRegister, registerUser };
