const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.get('/getAllproperty', propertyController.getAllproperty)
router.get('/getpropertyById/:id', propertyController.getpropertyById)
router.post('/createProperty', propertyController.createProperty)
router.put('/updateProperty/:id', propertyController.updateProperty)
router.delete('/deleteProperty/:id', propertyController.deleteProperty)

module.exports = router;