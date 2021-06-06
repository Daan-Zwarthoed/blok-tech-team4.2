/**
 * Home Routes
 */

const router = require('express').Router();
const HomeController = require('../controllers/HomeController');
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');
const auth = require('../config/auth');
const upload = require('../config/multer');

router.get('/', auth.isLoggedIn, HomeController.getHome);

router.get('/login', auth.isLoggedOut, LoginController.getLogin);

router.post('/login', LoginController.loginUser);

router.get('/logout', LoginController.getLogout);

router.get('/register', auth.isLoggedOut, RegisterController.getRegister);

router.post('/register', upload.profileUpload, RegisterController.registerUser);

router.get('/onboarding', auth.isLoggedIn, RegisterController.getOnboarding);

router.post('/onboarding', RegisterController.onboardUser);

module.exports = router;
