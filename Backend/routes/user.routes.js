const express = require('express')
const router = express.Router();
const { body } = require('express-validator')
const userController = require('../controllers/user.contoller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register',[
    body('empNo').isInt({ min: 100 }).withMessage('emp no must be atleast 3 digits long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long'),
],userController.registerUser)

router.post('/login',[
    body('empNo').isInt().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
],userController.loginUser)

router.get('/profile',authMiddleware.authUser,userController.getUserProfile)
router.get('/logout',authMiddleware.authUser,userController.logoutUser)

module.exports = router;