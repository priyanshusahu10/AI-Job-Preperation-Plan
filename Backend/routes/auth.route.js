const express = require('express')
const router  = express.Router()
const authController = require('../controllers/auth.controller')
const Middleware = require('../middleware/auth.middleware')


router.post('/register', authController.userRegister)
router.post('/login',authController.loginController)
router.get('/logout',authController.logoutController)
router.get('/get-user',Middleware.User,authController.getUser)


module.exports = router;