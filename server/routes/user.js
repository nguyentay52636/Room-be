const router = require('express').Router();
const userController = require('../controllers/userController');
const middlewareController = require('../controllers/middlewareController');
//get all users

// router.get('/user',middlewareController.verifyToken,userController.getAllUser);
router.get('/user', userController.getAllUser);
router.delete('/user/:id',middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);
module.exports = router;