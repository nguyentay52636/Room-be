const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");

// POST /favorite
router.post("/", favoriteController.createFavorite);

// DELETE /favorite
router.delete("/", favoriteController.deleteFavorite);

module.exports = router;
