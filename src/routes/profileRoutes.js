// Home Routes
const router = require("express").Router();
const ProfileController = require("../controllers/ProfileController")
const auth = require("../config/auth")

router.get("/:userId", auth.isLoggedIn, ProfileController.getProfile);

router.get("/:userId/update", auth.isLoggedIn, ProfileController.getUpdateProfile);

module.exports = router;
