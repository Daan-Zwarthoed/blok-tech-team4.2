const gameList = ["CSGO", "CoD", "Tetris", "WoW"];
const User = require("../models/User");

//Filter controller

//Render filter form
const getFilter = (req, res) => {
    res.render("pages/filter/filter.njk", { title: "Filter", gameList, User });
};

//Apply filter to userlist
const useFilter = async(req, res) => {
    const form = req.body;
    console.log(form);
    const query = form;
    const filteredUsers = await User.find(query);
    console.log(filteredUsers);
    res.render("pages/filter/matches.njk", { title: "Matches", filteredUsers });
};

module.exports = { getFilter, useFilter };