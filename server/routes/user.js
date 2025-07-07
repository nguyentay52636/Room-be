const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");

// GET /api/users
router.get("/", userController.getAllUser);

// DELETE /api/users/:id (admin or self)
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteUser
);

module.exports = router;
