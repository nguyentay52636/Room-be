const express = require('express');
const router = express.Router();
const { 
    getMessages,
    createMessageHandler,
    updateMessageHandler,
    deleteMessageHandler,
    markMessageAsRead,
    getAllMessages
} = require('../controllers/messageController');

router.get('/room/:roomId', getMessages);
router.get('/', getAllMessages);
router.post('/', createMessageHandler);
router.put('/:id', updateMessageHandler);
router.delete('/:id', deleteMessageHandler);
router.put('/:id/read', markMessageAsRead);

module.exports = router;