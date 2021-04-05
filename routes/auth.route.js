const router = require('express').Router();
//controllers
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/logout', authController.logout);


module.exports = router;