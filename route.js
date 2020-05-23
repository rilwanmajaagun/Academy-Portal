const express = require("express");
const router = express.Router();
const {
    signup, 
    loginController,
    applicationController,
    getUserApplicationController,
    getAllApplicantsResultController
} = require("./Controller/userController");
const {adminCreateApplication} = require("./Controller/adminController")
const {
    signupMiddleWare, 
    loginMiddleWare,
    applicationMiddleWare,
    getUserApplicationMiddleware,
    createapplicationMiddleWare
} = require("./Authorization/middleware")
const {
    verifyToken,
    verifyAdminToken
} = require("./Authorization/verification")


router.post("/signup",signupMiddleWare,signup);
router.post("/login", loginMiddleWare,loginController)
router.post("/application",verifyToken,applicationMiddleWare,applicationController)
router.post("/createApplication",verifyAdminToken,createapplicationMiddleWare,adminCreateApplication)
router.get("/application/:id", verifyToken, getUserApplicationMiddleware, getUserApplicationController)
router.get("/applicants/all", verifyToken, getAllApplicantsResultController)

module.exports = router