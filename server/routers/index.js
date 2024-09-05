const express = require('express')
const UserController = require('../controllers/UserController')
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication')
const imageRouter = require('./imageRouter')
const ImageController = require('../controllers/ImageController')
const fileUpload = require('express-fileupload')
const router = express.Router()


router.use(fileUpload())

router.post("/login" , UserController.login)
router.post("/register" , UserController.register)
router.post("/login/google" , UserController.googleLogin)
router.use(authentication)
// console.log("ini auth")
router.post("/image" , ImageController.postImg)
// router.use("/image" , imageRouter)
router.use(errorHandler);
module.exports = router