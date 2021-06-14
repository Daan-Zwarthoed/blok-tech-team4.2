// Chat Routes
const router = require('express').Router();
const ChatController = require('../controllers/ChatController');
const auth = require('../config/auth');

router.get('/', auth.isLoggedIn, ChatController.chatHome);

router.get('/chatSelf', auth.isLoggedIn, ChatController.chatSelf);

router.post('/chatSelf', auth.isLoggedIn, ChatController.chatSelf);

router.post('/chatMessageReceived', ChatController.chatMessageReceived);

module.exports = router;
