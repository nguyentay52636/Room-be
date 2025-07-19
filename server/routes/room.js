const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomChatController');

router.get('/', roomController.getRoomsOfUser);
router.post('/', roomController.createRoom);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;