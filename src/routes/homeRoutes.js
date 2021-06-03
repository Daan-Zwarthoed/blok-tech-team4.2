// Router
const router = require("express").Router();
// const HomeController = require("../controllers/HomeController")
const RegisterController = require("../controllers/RegisterController");

// router.get("/", HomeController.homePage);

router.get("/register", RegisterController.getRegister);

router.post("/register", RegisterController.registerUser);

module.exports = router;
