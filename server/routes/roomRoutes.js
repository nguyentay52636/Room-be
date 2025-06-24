// server/routes/room.routes.js
const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/roomController');

router.get('/', RoomController.getAllRooms);

module.exports = router;
