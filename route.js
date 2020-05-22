const express = require("express");
const router = express.Router();
const {
    signup, 
    loginController,
    applicationController
} = require("./Controller/userController");
const {
    signupMiddleWare, 
    loginMiddleWare,
    applicationMiddleWare
} = require("./Authorization/middleware")



router.post("/signup",signupMiddleWare,signup);
router.post("/login", loginMiddleWare,loginController)
router.post("/application", applicationMiddleWare,applicationController)


module.exports = router