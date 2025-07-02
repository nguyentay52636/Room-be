const router = require('express').Router();
const userController = require('../controllers/userController');
const middlewareController = require('../controllers/middlewareController');
//get all users

router.get('/',middlewareController.verifyToken,userController.getAllUser);
router.delete('/:id',middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);
module.exports = router;