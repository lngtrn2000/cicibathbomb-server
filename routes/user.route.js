const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")

const UserProducts = require("../models/products.model")
const middlewareController = require('../controllers/middleware')
const getController = require('../controllers/getController')
const updateController = require('../controllers/updateController')

//Get all products for home page
router.get("/",getController.getHomePage)

router.post("/getusercart",getController.getUserCart)

router.post("/addcart/:id",updateController.addToUserCart)

router.post("/addordered/:id",updateController.addToUserOrdered)


module.exports = router 