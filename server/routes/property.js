// server/routes/property.js
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// GET /property
router.get('/', propertyController.getAllProperty);

// GET /property/:id
router.get('/:id', propertyController.getPropertyById);

// POST /property
router.post('/', propertyController.createProperty);

// PUT /property/:id
router.put('/:id', propertyController.updateProperty);

// DELETE /property/:id
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;