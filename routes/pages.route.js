const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const pageController = require('../controllers/pages.contoller');

router.get('/', authController.isLoggedIn, pageController.getIndex);

router.get('/register', authController.isLoggedIn, pageController.getRegister);

router.get('/login', authController.isLoggedIn, pageController.getLogin);

router.get('/profile', authController.isLoggedIn, pageController.getProfile);

module.exports = router;