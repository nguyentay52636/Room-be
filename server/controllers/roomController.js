const express = require('express');
const router = express.Router();
const RoomController = require('./roomController');

router.get('/', RoomController.getAllRooms);

module.exports = router;
