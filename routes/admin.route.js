const express = require("express")
const crudController = require("../controllers/getController")
const authController = require("../controllers/authControllers")
const router = express.Router()

router.get("/get-user", crudController.getAllUser)

router.post("/delete-user", authController.deleteUser)


module.exports = router