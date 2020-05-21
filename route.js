const express = require("express");
const router = express.Router();
const {signup} = require("./Controller/userController");
const {signupMiddleWare} = require("./Authorization/middleware")



router.post("/signup",signupMiddleWare,signup)


module.exports = router