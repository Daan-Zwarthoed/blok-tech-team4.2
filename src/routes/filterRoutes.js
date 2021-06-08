const router = require("express").Router();
const gameList = ["CSGO", "CoD", "Tetris", "WoW"];
const User = require("../models/User");
const FilterController = require("../controllers/FilterController");

router.get("/", (req, res) => {
    res.render("pages/filter/filter.njk", { title: "Filter", gameList, User });
});

router.post("/", async(req, res) => {
    const form = req.body;
    console.log(form);
    const query = form;
    const filteredUsers = await User.find(query);
    console.log(filteredUsers);
    res.render("pages/filter/matches.njk", { title: "Matches", filteredUsers });
});

module.exports = router;