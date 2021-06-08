/**
 * Like Routes
 */

 const router = require('express').Router();
 const LikeController = require('../controllers/LikeController');
 const auth = require('../config/auth');
 
 router.get('/', auth.isLoggedIn, LikeController.getSimilarUsers);

 module.exports = router;
 