// Chat Routes
const router = require('express').Router();
const ChatController = require('../controllers/ChatController');
const auth = require('../config/auth');

router.get('/:userId', auth.isLoggedIn, ChatController.chatHome);

router.get('/chatSelf/:userId', auth.isLoggedIn, ChatController.chatSelf);

router.post('/chatSelf/:userId', auth.isLoggedIn, ChatController.chatSelf);

router.post('/chatSelf/chatMessageReceived/:userId', ChatController.chatMessageReceived);

module.exports = router;
