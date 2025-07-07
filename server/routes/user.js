const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");

// GET /user
router.get("/", userController.getAllUser);

// DELETE /user/:id (admin or self)
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteUser
);

module.exports = router;
