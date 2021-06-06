/** 
 * Profile Routes
 */

const router = require("express").Router();
const ProfileController = require("../controllers/ProfileController")
const auth = require("../config/auth")
const upload = require("../config/multer")

router.get("/:userId", auth.isLoggedIn, ProfileController.getProfile);

router.get("/:userId/update", auth.isLoggedIn, ProfileController.getUpdateProfile);

router.post("/:userId/update", auth.isLoggedIn, upload.profileUpload, ProfileController.updateProfile);

module.exports = router;
