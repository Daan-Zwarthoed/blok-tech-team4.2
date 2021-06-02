// Router
const router = require("express").Router();
const controller = require("../controllers/controller");
const RegisterController = require("../controllers/RegisterController");
const ChatController = require("../controllers/ChatController");

router.get("/", controller.homePage);

router.get("/register", RegisterController.getRegister);

router.post("/register", RegisterController.registerUser);

router.get("/chat", ChatController.chatHome);

router.get("/chat/chatSelf", ChatController.chatSelf);

router.post("/chat/chatSelf", ChatController.chatSelf);

module.exports = router;
