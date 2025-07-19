const express = require('express');
const router = express.Router();
const { 
    getMessages, 
    createMessageHandler, 
    updateMessageHandler, 
    deleteMessageHandler,
    getAllMessages
} = require('../controllers/messageController');

router.get('/:sender/:receiver', getMessages);

router.post('/', createMessageHandler);
router.put('/:id', updateMessageHandler);
router.delete('/:id', deleteMessageHandler);
router.get('/', getAllMessages);

module.exports = router;