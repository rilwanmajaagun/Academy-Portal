const express = require("express")
const {
createApplication,
getAllApplicantsResultDESC,
getAllApplicantsResultASC,
checkIfUserIsAdmin,
checkEmailAndPasswordMatch,
getTotalApplication,
createAcademyRecord,
getAllAcademyRecord,
getAcademySofar,
checkAcademyBatch,
getCurrentBatch,
getSpecificBatch,
changeApplicationStatus,
createAssessment,
createUserAnswer,
getUserScore,
changeApplicantScore,
getBatch,
// updateQuestion,
checkIfBatchExistBefore,
alreadySubmit,
getQuestion,
getBatch_id,
getUpdate,
checkId,
update
} = require("../Functions/adminFunction")
const {
    getEmails,
    sendMail
} = require("../nodeMailer/nodemailer")

async function adminCreateApplication (req, res) {
    const {batch_id} = req.body 
    try {
        await checkIfBatchExistBefore(batch_id)
        const result = await createApplication(req.body)
        return res.status(201).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function getAllApplicantsResultDESCController (req, res) {
    try {
        const result = await getAllApplicantsResultDESC();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}
async function getAllApplicantsResultASCController (req, res) {
    try {
        const result = await getAllApplicantsResultASC();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function adminLogin (req, res) {
    try {
         const result = await checkEmailAndPasswordMatch(req.body);
         await checkIfUserIsAdmin(req.body)
        return res.status(202).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function getSpecificBatchController (req, res) {
    const {batch_id} = req.params
    try {
        const result = await getSpecificBatch(batch_id);
        return res.status(202).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function getTotal (req, res) {
        try {
            const currentBatch = await getCurrentBatch()
            const result = await getTotalApplication(currentBatch.current);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(e.code).json(e);
        }
}

async function createAcademy (req, res) {
    try {
        await checkAcademyBatch(req.body)
        const result = await createAcademyRecord(req.body)
        return res.status(201).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function getAllAcademyRecords (req, res) {
    try {
        const result = await getAllAcademyRecord();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function getAcademyNumbers (req, res) {
    try {
        const result = await getAcademySofar();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function changeApplicationController (req, res)  {
    const body = "your"
    const subject = "Application status changed"    
     try {   
         const result = await changeApplicationStatus( req.body);
         const email = await getEmails(result.user_id);
         await sendMail(email, body, subject)
         return res.status(200).json(result)
     } catch (e) {
         return res.status(e.code).json(e)
     }
}

async function Assessments (req, res) {
    try {
        const result1 = await getBatch()
        const result = await createAssessment(req.body,result1.current)
        return res.status(201).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function userAnswer (req, res) {
    const user_id = res.locals.user.id
    try {
        const result = await createUserAnswer(req.body,user_id)
        return res.status(201).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function userScores (req, res) {
    const user_id = res.locals.user.id
    try {
        const result = await getUserScore(user_id)
        await changeApplicantScore(result,user_id)
        return res.status(201).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function changequestionController (req, res)  {
    const { id } = req.params;
     try {  
         await  checkId(id);
         const result = await update(req.body);
        //  const result = await updateQuestion( req.body);
         return res.status(200).json(result)
     } catch (e) {
         return res.status(e.code).json(e)
     }
}
// move this into userAnswer

async function getQues (req, res) {
    const user_id = res.locals.user.id
    try {
        await alreadySubmit(user_id)
        const batch_id = await getBatch_id(user_id)
        const result = await getQuestion(batch_id.batch)
        return res.status(201).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function getUpdatedApplication (req, res) {
    try {
        const result = await getUpdate();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

module.exports = {
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
}