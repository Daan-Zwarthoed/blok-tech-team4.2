/**
 * Match Controller
 */

const Game = require('../models/Game');
const User = require('../models/User');

let displayedUser;
let unknownUsers;
let match;

// functie getSimilarUsers, deze functie zoekt naar gebruikers die dezelfde spelletjes als jou hebben geliked
const getSimilarUsers = (req, res) => {
    const myUser = req.user; // dit is de ingelogd gebruiker
    Game.find({ likedBy: myUser.username }, (err, games) => {
        // hier zoek je naar de spelletjes die ik zelf heb geliked
        if (err) throw err;

        const likeArr = []; // lege Array voor het pushen van de SimilarUsers

        games.forEach((game) => {
            // haal alle likes op van elke game
            const likes = game.likedBy;

            likes.forEach((like) => {
                // push alle individuele likes naar de likeArray
                likeArr.push(like);
            });
        });

        const uniqueLikeArr = [...new Set(likeArr)].filter(
            (
                like // zorgt ervoor dat een gebruiker maar één keer voorkomt en filter mijzelf eruit
            ) => like !== myUser.username
        );

        User.find({}, (err, users) => {
            if (err) throw err;

            const similarUsers = [];

            users.forEach((user) => {
                if (uniqueLikeArr.includes(user.username)) {
                    similarUsers.push(user);
                }
            });

            unknownUsers = similarUsers.filter(
                (user) => !user.likedBy.includes(myUser.username) && !user.dislikedBy.includes(myUser.username)
            );

            displayedUser = unknownUsers[Math.floor(Math.random() * unknownUsers.length)];

            unknownUsers.shift();

            User.findById(req.user._id, (err, user) => {
                if (err) throw err;
                res.render('pages/like/like.njk', { user, displayedUser });
            });
        });
    });
};

const userPreference = (req, res) => {
    const myUser = req.user; // dit is de ingelogd gebruiker
    if (req.body.preference === 'like') {
        // als de gebruiker een like geeft, dan update hij mijn gelikete profielen door de user id van de getoonde gebruiker er in te stoppen
        User.updateOne({ username: displayedUser.username }, { $push: { likedBy: myUser.username } }, (err) => {
            if (err) throw err;
        });
    } else {
        // als de gebruiker een dislike geeft, dan update hij mijn gedislikete profielen door de user id van de getoonde gebruiker er in te stoppen // je hebt maar 2 opties: liken of disliken
        User.updateOne({ username: displayedUser.username }, { $push: { dislikedBy: myUser.username } }, (err) => {
            if (err) throw err;
        });
    }

    if (myUser.likedBy.includes(displayedUser.username)) {
        match = true;
    } else {
        match = false;
    }

    unknownUsers.shift();

    if (req.body.preference === 'like' && match === true) {
        res.redirect('/like/match');
    } else {
        res.redirect('/like');
    }
};

const getMatch = (req, res) => {
    const myUser = req.user; // dit is de ingelogd gebruiker

    if (match === true) {
        res.render('pages/like/match.njk', { displayedUser, myUser });
        match = null;
    } else {
        res.redirect('/');
    }
};

module.exports = { getSimilarUsers, userPreference, getMatch };
