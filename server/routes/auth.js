const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Gọi đúng hàm xử lý
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
