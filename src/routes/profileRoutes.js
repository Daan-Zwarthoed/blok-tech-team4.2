// Home Routes
const router = require("express").Router();
const ProfileController = require("../controllers/ProfileController")

router.get("/:userId", ProfileController.getProfile);

module.exports = router;
