const express = require('express');
const router = express.Router();
const { 
    getMessages,
    createMessageHandler,
    updateMessageHandler,
    deleteMessageHandler,
    markMessageAsRead,
    createMessage,
    updateMessage,
    deleteMessage,
    getAllMessages
} = require('../controllers/messageController');

router.get('/:sender/:receiver', getMessages);
router.post('/', createMessageHandler);
router.put('/:id', updateMessageHandler);
router.delete('/:id', deleteMessageHandler);
router.get('/', getAllMessages);
router.put('/:id/read', markMessageAsRead);
router.post('/', createMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);   



module.exports = router;