const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const middlewareController = require('../controllers/middlewareController');


router.post('/register', authController.register);
router.post('/login', authController.login);
// router.post('/refresh', authController.RequestrefreshToken);
router.post('/logout',authController.userLogout);

module.exports = router;
