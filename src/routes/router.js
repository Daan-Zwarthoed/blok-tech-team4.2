// Router
const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("index.njk")
})

module.exports = router;