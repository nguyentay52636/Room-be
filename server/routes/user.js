const router = require('express').Router();
const userController = require('../controllers/userController');
//get all users

router.get('/',userController.getAllUser);
router.delete('/:id',userController.deleteUser);
module.exports = router;