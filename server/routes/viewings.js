const ViewingsController = require("../controllers/viewingsController")
const express = require("express")
const router = express.Router()

router.get('/getAllViewing',ViewingsController.getAllViewings)
router.post('/createViewing',ViewingsController.createViewing)
router.put('/updateViewing/:id',ViewingsController.updateViewing)
router.delete('/deleteViewing/:id',ViewingsController.deleteViewing)
module.exports = router;

module.exports=router
