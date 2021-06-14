/**
 * Like Routes
 */

const router = require('express').Router();
const LikeController = require('../controllers/LikeController');
const auth = require('../config/auth');

router.get('/', auth.isLoggedIn, LikeController.getSimilarUsers);

router.post('/', auth.isLoggedIn, LikeController.getSimilarUsers);

router.post('/likeDislike', auth.isLoggedIn, LikeController.userPreference);

router.get('/match', auth.isLoggedIn, LikeController.getMatch);

module.exports = router;
