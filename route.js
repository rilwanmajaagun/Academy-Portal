const express = require("express");
const router = express.Router();
const {
    signup, 
    loginController,
    applicationController,
    getUserApplicationController,
} = require("./Controller/userController");
const {
    adminCreateApplication,
    getAllApplicantsResultDESCController,
    getAllApplicantsResultASCController,
    adminLogin,
    getSpecificBatchController

} = require("./Controller/adminController")
const {
    signupMiddleWare, 
    loginMiddleWare,
    applicationMiddleWare,
    createapplicationMiddleWare
} = require("./Authorization/middleware")
const {
    verifyToken,
    verifyAdminToken
} = require("./Authorization/verification")

router.post("/admin/login",loginMiddleWare,adminLogin)
router.post("/signup",signupMiddleWare,signup);
router.post("/login", loginMiddleWare,loginController)
router.post("/application",verifyToken,applicationMiddleWare,applicationController)
router.post("/createApplication",verifyAdminToken,createapplicationMiddleWare,adminCreateApplication)
router.get("/application", verifyToken, getUserApplicationController)
router.get("/applicants/all", verifyAdminToken, getAllApplicantsResultDESCController)
router.get("/applicants_asc/all", verifyAdminToken, getAllApplicantsResultASCController)
router.get("/specific_batch", verifyAdminToken, getSpecificBatchController)
module.exports = router