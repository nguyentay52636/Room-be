const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.get('/getAllProperty', propertyController.getAllProperty);

router.get('/getPropertyById/:id', propertyController.getPropertyById);

router.post('/createProperty', propertyController.createProperty);

router.put('/updateProperty/:id', propertyController.updateProperty);

router.delete('/deleteProperty/:id', propertyController.deleteProperty);

module.exports = router;
