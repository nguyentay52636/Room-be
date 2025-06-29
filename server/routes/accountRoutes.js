
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Gọi đúng hàm xử lý
router.get('/', accountController.getAccount);
module.exports = router;
