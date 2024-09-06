const express = require('express')
const UserController = require('../controllers/UserController')
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication')
const ImageController = require('../controllers/ImageController')
const fileUpload = require('express-fileupload')
const router = express.Router()


router.use(fileUpload())

router.post("/login" , UserController.login)
router.post("/register" , UserController.register)
router.post("/login/google" , UserController.googleLogin)
router.use(authentication)
router.get("/image" , ImageController.allImage)
router.post("/image" , ImageController.postImg)
router.get("/getimgById/:id" , ImageController.getImgById)
router.delete("/image/:id" , ImageController.deleteImage)
router.put("/update/:id"  , UserController.updateUsername)
router.post("/sendEmail/:id"  , ImageController.sendEmail)
router.use(errorHandler);
module.exports = router