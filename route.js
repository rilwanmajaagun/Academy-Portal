const express = require("express");
const router = express.Router();
const {
    signup, 
    loginController,
    applicationController,
    getUserApplicationController,
    getDetails
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
    getUpdatedApplication
    // userAnswer,
    // changequestionController,
    // getQues,
} = require("./Controller/adminController")
const {
    userAnswer,  //working
    changequestionController, 
    getQues, //working
    Assessments, //working
    assessmentHistory,
    getHistorys
} = require("./Controller/questionController")
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

router.post("/admin/login",loginMiddleWare,adminLogin) //working
router.post("/signup",signupMiddleWare,signup); //working
router.post("/login", loginMiddleWare,loginController) //working
router.post("/application",verifyToken,applicationMiddleWare,applicationController) //working
router.post("/createApplication",verifyAdminToken,createapplicationMiddleWare,adminCreateApplication)
router.post("/assessment",verifyAdminToken,Assessments)
router.post("/userAns",verifyToken,userAnswer) 
router.post("/academy",verifyAdminToken,createAcademyMiddleWare,createAcademy)
router.post("/assessmentHistory",verifyAdminToken,assessmentHistory)
router.put("/status_change", verifyAdminToken,statusChangeMiddleWare,changeApplicationController)
router.get("/application", verifyToken, getUserApplicationController) //working
router.get("/applicants/all", verifyAdminToken, getAllApplicantsResultDESCController) // remove later
router.get("/applicants_asc/all", verifyAdminToken, getAllApplicantsResultASCController) //remove later
router.get("/specific_batch/:batch_id", verifyAdminToken, getSpecificBatchController) //working
router.get("/getTotal", verifyAdminToken,getTotal)
router.get("/academy", verifyAdminToken,getAllAcademyRecords)
router.get("/academySoFar", verifyAdminToken,getAcademyNumbers)
router.get("/details", verifyToken,getDetails) 
router.put("/update_question", verifyAdminToken, changequestionController)
router.get("/getQuestion", verifyToken,getQues)
router.get("/getUpdate", getUpdatedApplication) //working
router.get("/getHistory",verifyAdminToken,getHistorys) //working





module.exports = router