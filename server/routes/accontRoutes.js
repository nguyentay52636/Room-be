
const express = require('express');
const router = express.Router();
const {getAccount} = require('../controllers/accountController');


// Gọi đúng hàm xử lý
router.get('/', accountController.getAccount);
module.exports = router;
