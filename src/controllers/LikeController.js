/**
 * Match Controller
 */

const Game = require('../models/Game');
const User = require('../models/User');

let displayedUser;
let match;
let chosenGame;

// functie getSimilarUsers, deze functie zoekt naar gebruikers die dezelfde spelletjes als jou hebben geliked
const getSimilarUsers = (req, res) => {
    const myUser = req.user; // dit is de ingelogd gebruiker
    Game.find().then((games) => {
        if (req.body.games) {
            chosenGame = req.body.games; // Gekozen game door de gebruiker om op te filteren
        }
        // Filtert gebruikersnamen van de gebruikers die de gekozen game geliked hebben
        const filteredUsers = games.filter((game) => game.titleSlug == chosenGame)[0].likedBy;

        User.find().then((userList) => {
            const profiles = [];

            // Pushed de profielen van de gebruikers wiens gebruikernamen in filteredUsers staan
            userList.forEach((user) => {
                if (filteredUsers.includes(user.username)) {
                    profiles.push(user);
                }
            });
            // Filtert profielen van gebruikers op playtime, playstyle, likes, dislikes en verwijdert eigen naam van de lijst.
            const filteredProfiles = [...new Set(profiles)].filter(
                (profile) =>
                    profile.playstyle === req.body.playstyle &&
                    profile.playtime === req.body.playtime &&
                    profile.username !== myUser.username &&
                    !myUser.likedBy.includes(profile.username) &&
                    !myUser.dislikedBy.includes(profile.username)
            );

            // Kiest 1 random gebruiker uit de lijst
            displayedUser = filteredProfiles[Math.floor(Math.random() * filteredProfiles.length)];

            if (filteredProfiles.length > 0) {
                filteredProfiles.shift();
            }
            res.render('pages/like/like.njk', { user: myUser, displayedUser, chosenGame });
        });
    });
};

const userPreference = (req, res) => {
    const myUser = req.user; // dit is de ingelogd gebruiker
    const { displayedUserUsername } = req.body;
    chosenGame = req.body.games;
    if (req.body.preference === 'like') {
        // als de gebruiker een like geeft, dan update hij mijn gelikete profielen door de user id van de getoonde gebruiker er in te stoppen
        User.updateOne({ username: displayedUserUsername }, { $push: { likedBy: myUser.username } }, (err) => {
            if (err) throw err;
        });
    } else {
        // als de gebruiker een dislike geeft, dan update hij mijn gedislikete profielen door de user id van de getoonde gebruiker er in te stoppen // je hebt maar 2 opties: liken of disliken
        User.updateOne({ username: displayedUserUsername }, { $push: { dislikedBy: myUser.username } }, (err) => {
            if (err) throw err;
        });
    }

    if (myUser.likedBy.includes(displayedUserUsername)) {
        match = true;
    } else {
        match = false;
    }

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
