const express = require('express')
const UserController = require('../controllers/UserController')
const errorHandler = require('../middlewares/errorHandler')
const ImageController = require('../controllers/ImageController')
const imageRouter = express.Router()

imageRouter.get("/" , ImageController)

module.exports = imageRouter