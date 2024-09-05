const express = require('express')
const UserController = require('../controllers/UserController')
const ImageController = require("../controllers/ImageController")
const errorHandler = require('../middlewares/errorHandler')
const imageRouter = express.Router()

imageRouter.post("/postImg" , ImageController.postImg)

module.exports = imageRouter