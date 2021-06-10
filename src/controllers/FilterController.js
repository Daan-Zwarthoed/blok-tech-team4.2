const gameList = ['CSGO', 'CoD', 'Tetris', 'WoW'];
const User = require('../models/User');

// Filter controller

// Render filter form
const getFilter = (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) throw err;
        res.render('pages/filter/filter.njk', { title: 'Filter', gameList, User, user });
    });
};

// Apply filter to userlist
const useFilter = async (req, res) => {
    const filteredUsers = await User.find(req.body);
    User.findById(req.params.userId, (err, user) => {
        if (err) throw err;
        res.render('pages/filter/matches.njk', { title: 'Matches', filteredUsers, user });
    });
};

module.exports = { getFilter, useFilter };
