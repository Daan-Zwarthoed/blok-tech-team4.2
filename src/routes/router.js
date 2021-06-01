// Router
const router = require("express").Router();
const RegisterController = require('../controllers/RegisterController');

router.get("/register", RegisterController.getRegister);

router.post("/register", RegisterController.registerUser);

module.exports = router;
