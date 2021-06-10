const gameList = ['CSGO', 'CoD', 'Tetris', 'WoW'];
const User = require('../models/User');

// Filter controller

// Render filter form
const getFilter = (req, res) => {
    res.render('pages/filter/filter.njk', { title: 'Filter', gameList, User });
};

// Apply filter to userlist
const useFilter = async (req, res) => {
    const filteredUsers = await User.find(req.body);
    res.render('pages/filter/matches.njk', { title: 'Matches', filteredUsers });
};

module.exports = { getFilter, useFilter };
