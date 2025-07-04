const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const propertyRouter = require('./property')
const reviewRouter = require('./review');

router.use('/auth', authRouter);
router.use('/property',propertyRouter)
router.use('/review', reviewRouter);
module.exports = router;