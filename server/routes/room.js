const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomChatController');

// Get rooms of user
router.get('/user/:userId', roomController.getRoomsOfUser);

// Get room by ID  
router.get('/:roomId', roomController.getRoomById);

// Create new room
router.post('/', roomController.createRoom);

// Find or create private room between 2 users
router.post('/find-or-create-private', roomController.findOrCreatePrivateRoom);

// Add message to room
router.post('/:roomId/message', roomController.addMessageToRoom);

// Remove message from room
router.delete('/:roomId/message/:messageId', roomController.removeMessageFromRoom);

// Update room
router.put('/:roomId', roomController.updateRoom);

// Delete room
router.delete('/:roomId', roomController.deleteRoom);

module.exports = router;