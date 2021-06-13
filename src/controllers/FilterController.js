const gameList = require('../models/Game');
const User = require('../models/User');
const { shuffle } = require('../tools/shuffle');

let header;

// Filter controller

// Render filter form
const chooseGame = async (req, res) => {
    gameList.find({}).then((games) => {
        shuffle(games);
        res.render('pages/filter/chooseGame.njk', { title: 'Filter game', games });
    });
};

const getFilterFort = (req, res) => {
    res.render('pages/filter/filter.njk', { title: 'Filter', chosenGame: 'fortnite' });
};

const getFilterRocket = (req, res) => {
    res.render('pages/filter/filter.njk', { title: 'Filter', chosenGame: 'rocket-league' });
};

const getFilterNba = (req, res) => {
    res.render('pages/filter/filter.njk', { title: 'Filter', chosenGame: 'nba-2k21' });
};

const getFilterMine = (req, res) => {
    res.render('pages/filter/filter.njk', { title: 'Filter', chosenGame: 'minecraft' });
};

const getFilterCold = (req, res) => {
    res.render('pages/filter/filter.njk', { title: 'Filter', chosenGame: 'cold-war' });
};

const useFilter = async (req, res) => {
    gameList.find().then((games) => {
        const chosenGame = req.body.games;
        const filteredUsers = games.filter((game) => game.titleSlug == chosenGame)[0].likedBy;

        User.find().then((userList) => {
            const profiles = [];

            userList.forEach((user) => {
                if (filteredUsers.includes(user.username)) {
                    profiles.push(user);
                }
            });
            const filteredProfiles = profiles.filter(
                (profile) => profile.playstyle == req.body.playstyle && profile.playtime == req.body.playtime
            );

            if (filteredProfiles == 0) {
                header = 'No users matched the criteria.';
            } else {
                header = 'Matches';
            }

            console.log(header);
            res.render('pages/filter/matches.njk', { filteredProfiles, chosenGame, header });
        });
    });
};

module.exports = {
    chooseGame,
    getFilterFort,
    getFilterRocket,
    getFilterNba,
    getFilterMine,
    getFilterCold,
    useFilter,
};
