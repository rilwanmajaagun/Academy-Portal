const express = require("express");
const router = express.Router();
const {
    signup, 
    loginController,
    applicationController,
    getUserApplicationController
} = require("./Controller/userController");
const {
    adminCreateApplication,
    getAllApplicantsResultDESCController,
    getAllApplicantsResultASCController,
    adminLogin,
    getTotal,
    createAcademy,
    getAllAcademyRecords,
    getAcademyNumbers,
    getSpecificBatchController,
    changeApplicationController,
    Assessments,
    userAnswer,
    userScores,
    changequestionController,
    getQues,
    getUpdatedApplication
} = require("./Controller/adminController")
const {
    signupMiddleWare, 
    loginMiddleWare,
    applicationMiddleWare,
    createapplicationMiddleWare,
    createAcademyMiddleWare,
    statusChangeMiddleWare
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
router.post("/assessment",verifyAdminToken,Assessments)
router.post("/userAns",verifyToken,userAnswer) 
router.post("/academy",verifyAdminToken,createAcademyMiddleWare,createAcademy)
router.put("/status_change", verifyAdminToken,statusChangeMiddleWare,changeApplicationController)
router.get("/application", verifyToken, getUserApplicationController)
router.get("/applicants/all", verifyAdminToken, getAllApplicantsResultDESCController)
router.get("/applicants_asc/all", verifyAdminToken, getAllApplicantsResultASCController)
router.get("/specific_batch/:batch_id", verifyAdminToken, getSpecificBatchController)
router.get("/getTotal", getTotal)
router.get("/academy", verifyAdminToken,getAllAcademyRecords)
router.get("/academySoFar", verifyAdminToken,getAcademyNumbers)
router.get("/score", verifyToken,userScores) // change to post wen user submit 
router.put("/update_question", verifyAdminToken, changequestionController)
router.get("/getQuestion", verifyToken,getQues)
router.get("/getUpdate", getUpdatedApplication)





module.exports = router