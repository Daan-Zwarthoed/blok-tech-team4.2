const gameList = require('../models/Game');
const User = require('../models/User');

// Filter controller

// Render filter form
const chooseGame = (req, res) => {
    res.render('pages/filter/chooseGame.njk', { title: 'Filter', gameList, User });
};

const getFilter = async(req, res) => {
    res.render('pages/filter/matches.njk', { title: 'Matches', filteredUsers });
};



const useFilter = async(req, res) => {
    const filteredUsers = User.filter(user => user.games = req.body.game);
    res.render('pages/filter/matches.njk', { title: 'Matches', filteredUsers });
};

module.exports = { chooseGame, getFilter, useFilter };