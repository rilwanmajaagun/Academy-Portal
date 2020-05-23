const express = require("express");
const router = express.Router();
const {
    signup, 
    loginController,
    applicationController,
    getUserApplicationController,
    getAllApplicantsResultController
} = require("./Controller/userController");
const {
    signupMiddleWare, 
    loginMiddleWare,
    applicationMiddleWare,
    getUserApplicationMiddleware
} = require("./Authorization/middleware")
const {verifyToken} = require("./Authorization/verification")


router.post("/signup",signupMiddleWare,signup);
router.post("/login", loginMiddleWare,loginController)
router.post("/application",verifyToken,applicationMiddleWare,applicationController)
router.get("/application/:id", verifyToken, getUserApplicationMiddleware, getUserApplicationController)
router.get("/applicants/all", verifyToken, getAllApplicantsResultController)

module.exports = router