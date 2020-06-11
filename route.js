const express = require("express");
const router = express.Router();
const {
    signup, 
    loginController,
    passwordChangeController,
    applicationController,
    getUserApplicationController,
    getDetails,
    sendResetLinkControll
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
    getUpdatedApplication,
    getCurrentAcademy,
    getAllBatchs,
    updateTimeController
} = require("./Controller/adminController")
const {
    userAnswer, 
    getQues,
    Assessments,
    assessmentHistory,
    getHistorys,
    getQuesByparams,
    changequestionController2, 
} = require("./Controller/questionController")
const {
    signupMiddleWare, 
    loginMiddleWare,
    forgetpasswordMiddleWare,
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
router.post("/assessmentHistory",verifyAdminToken,assessmentHistory)
router.post("/email",sendResetLinkControll)
router.put("/password_change", verifyToken,passwordChangeController)
router.put("/status_change", verifyAdminToken,statusChangeMiddleWare,changeApplicationController)
router.put("/updateTime/:batch_id",verifyAdminToken,updateTimeController)
router.put("/update_question2/:batch_id", verifyAdminToken, changequestionController2)
router.get("/application", verifyToken, getUserApplicationController) 
router.get("/applicants/all", verifyAdminToken, getAllApplicantsResultDESCController) 
router.get("/applicants_asc/all", verifyAdminToken, getAllApplicantsResultASCController) 
router.get("/specific_batch/:batch_id", verifyAdminToken, getSpecificBatchController)
router.get("/getTotal", verifyAdminToken,getTotal)
router.get("/academy", verifyAdminToken,getAllAcademyRecords)
router.get("/academySoFar", verifyAdminToken,getAcademyNumbers)
router.get("/details", verifyToken,getDetails) 
router.get("/getQuestion", verifyToken,getQues)
router.get("/getUpdate", getUpdatedApplication)
router.get("/getHistory",verifyAdminToken,getHistorys)
router.get("/getCurrentAcademy",verifyAdminToken,getCurrentAcademy) 
router.get("/getQues/:batch_id",getQuesByparams)
router.get("/getBatch",getAllBatchs)






module.exports = router