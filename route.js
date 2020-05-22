const express = require("express");
const router = express.Router();
const {signup, loginController} = require("./Controller/userController");
const {signupMiddleWare, loginMiddleWare} = require("./Authorization/middleware")



router.post("/signup",signupMiddleWare,signup);
router.post("/login", loginMiddleWare,loginController)


module.exports = router