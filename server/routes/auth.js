const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");

// POST /auth/register
router.post("/register", authController.register);

// POST /auth/login
router.post("/login", authController.login);

// POST /auth/logout
router.post("/logout", authController.userLogout);

module.exports = router;
