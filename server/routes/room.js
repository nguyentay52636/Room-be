const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomChatController');

router.get('/user/:userId', roomController.getRoomsOfUser);
router.post('/', roomController.createRoom);
router.delete('/:roomId', roomController.deleteRoom);

module.exports = router;