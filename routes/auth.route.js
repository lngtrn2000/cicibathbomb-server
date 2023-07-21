const express = require('express');
const router = express.Router();
const User = require("../models/users.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const middlewareController = require('../controllers/middleware');
const authController = require("../controllers/authControllers")

//Register
router.post("/register", authController.registerUser);

//Login
router.post("/login", authController.loginUser)

//Refresh
router.post("/refresh",authController.refreshToken)

//Get Home Page
// router.get("/", middlewareController)

module.exports = router