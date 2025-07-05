const express = require('express')
const router = express.Router()
const favoriteController = require('../controllers/favoriteController')

router.post('/createFavorite',favoriteController.createFavorite)
router.delete('/deleteFavorite',favoriteController.deleteFavorite)
module.exports=router