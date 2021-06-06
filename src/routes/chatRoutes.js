// Chat Routes
const router = require('express').Router();
const ChatController = require('../controllers/ChatController');

router.get('/', ChatController.chatHome);

router.get('/chatSelf', ChatController.chatSelf);

router.post('/chatSelf', ChatController.chatSelf);

router.post('/chatMessageReceived', ChatController.chatMessageReceived);

module.exports = router;
