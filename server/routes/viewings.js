const express = require("express");
const router = express.Router();
const ViewingsController = require("../controllers/viewingsController");

// GET /viewing
router.get("/", ViewingsController.getAllViewings);

// POST /viewing
router.post("/", ViewingsController.createViewing);

// PUT /viewing/:id
router.put("/:id", ViewingsController.updateViewing);

// DELETE /viewing/:id
router.delete("/:id", ViewingsController.deleteViewing);

module.exports = router;
