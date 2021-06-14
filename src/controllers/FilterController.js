const gameList = require('../models/Game');
const User = require('../models/User');
const { shuffle } = require('../tools/shuffle');

// Filter controller

// Render filter form
const chooseGame = async (req, res) => {
    gameList.find({}).then((games) => {
        shuffle(games);
        User.findById(req.user._id, (err, user) => {
            if (err) throw err;
            res.render('pages/filter/chooseGame.njk', { title: 'Filter game', games, user });
        });
    });
};

const getFilterFort = (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) throw err;
        res.render('pages/filter/filter.njk', { title: 'Filter', chosenGame: 'fortnite', user });
    });
};

const getFilterRocket = (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) throw err;
        res.render('pages/filter/filter.njk', { title: 'Filter', chosenGame: 'rocket-league', user });
    });
};

const getFilterNba = (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) throw err;
        res.render('pages/filter/filter.njk', { title: 'Filter', chosenGame: 'nba-2k21', user });
    });
};

const getFilterMine = (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) throw err;
        res.render('pages/filter/filter.njk', { title: 'Filter', chosenGame: 'minecraft', user });
    });
};

const getFilterCold = (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) throw err;
        res.render('pages/filter/filter.njk', { title: 'Filter', chosenGame: 'cold-war', user });
    });
};

module.exports = {
    chooseGame,
    getFilterFort,
    getFilterRocket,
    getFilterNba,
    getFilterMine,
    getFilterCold,
};
