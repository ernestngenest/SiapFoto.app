const express = require('express')
const UserController = require('../controllers/UserController')
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication')
const imageRouter = require('./imageRouter')
const router = express.Router()

router.post("/login" , UserController.login)
router.post("/register" , UserController.register)
router.post("/login/google" , UserController.googleLogin)
router.use(authentication)
router.use("/image" , imageRouter)
router.use(errorHandler);
module.exports = router