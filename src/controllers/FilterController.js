const gameList = require('../models/Game');
const User = require('../models/User');
const { shuffle } = require('../tools/shuffle');

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
        const filteredUsers = games.filter((game) => game.titleSlug == req.body.games)[0].likedBy;
        console.log(filteredUsers);
        User.find().then((userList) => {
            const filteredProfiles = userList.filter(
                (user) =>
                    user.username == filteredUsers[0] ||
                    user.username == filteredUsers[1] ||
                    user.username == filteredUsers[2] ||
                    user.username == filteredUsers[3] ||
                    user.username == filteredUsers[4] ||
                    user.username == filteredUsers[5]
            );
            console.log(filteredProfiles);
            res.render('pages/filter/matches.njk', { title: 'Matches', filteredProfiles });
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
