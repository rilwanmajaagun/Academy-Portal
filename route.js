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
    getAllApplicantsResultController,
    adminLogin,
    getTotal,
    createAcademy,
    getAllAcademyRecords,
    getAcademyNumbers
} = require("./Controller/adminController")
const {
    signupMiddleWare, 
    loginMiddleWare,
    applicationMiddleWare,
    createapplicationMiddleWare,
    createAcademyMiddleWare
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
router.post("/academy",verifyAdminToken,createAcademyMiddleWare,createAcademy)
router.get("/application", verifyToken, getUserApplicationController)
router.get("/applicants/all", verifyAdminToken, getAllApplicantsResultController)
router.get("/getTotal", getTotal)
router.get("/academy", verifyAdminToken,getAllAcademyRecords)
router.get("/academySoFar", verifyAdminToken,getAcademyNumbers)


module.exports = router