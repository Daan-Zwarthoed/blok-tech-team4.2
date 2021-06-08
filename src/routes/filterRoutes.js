const router = require("express").Router();
const gameList = ["CSGO", "CoD", "Tetris", "WoW"]
const FilterController = require("../controllers/FilterController");
const userList = [{
        "name": "Beasthunter69",
        "topGame": "CSGO",
        "playstyle": "Competitive",
        "time": "5+ hours per day"
    },
    {
        "name": "xXKirito420Xx",
        "topGame": "CSGO",
        "playstyle": "Competitive",
        "time": "-5 hours per day"
    },
    {
        "name": "rinrin",
        "topGame": "Tetris",
        "playstyle": "Casual",
        "time": "A few times per week"
    },
    {
        "name": "xnamewastakenx",
        "topGame": "WoW",
        "playstyle": "Casual",
        "time": "Once per week"
    }
];

router.get("/", (req, res) => {
    res.render("pages/filter/chooseGame.njk", { gameList });
});

router.get("/CSGO", (req, res) => {
    res.render("pages/filter/filter.njk", { title: "CSGO", gameList, userList });
});

router.post("/CSGO", (req, res) => {
    const form = req.body;
    console.log(form);
    const options = { sort: { time: -1 } };
    const query = form;
    const filteredUsers = userList.find(query, options).toArray();
    console.log(filteredUsers);
    res.render("pages/filter/matches.njk", { title: "Matches", filteredUsers });
});


router.get("/CoD", (req, res) => {
    res.render("pages/filter/filter.njk", { title: "CoD", gameList });
});

router.get("/Tetris", (req, res) => {
    res.render("pages/filter/filter.njk", { title: "Tetris", gameList });
});

router.get("/WoW", (req, res) => {
    res.render("pages/filter/filter.njk", { title: "WoW", gameList });
});

module.exports = router;