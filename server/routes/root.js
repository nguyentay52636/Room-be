const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const propertyRouter = require('./property')

router.use('/auth', authRouter);
router.use('/property',propertyRouter)
module.exports = router;