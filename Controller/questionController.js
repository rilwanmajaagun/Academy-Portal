const express = require("express")
const {
createAssessment,
createUserAnswer,
getUserScore,
changeApplicantScore,
getBatch,
getBatch_id,
updateQuestion,
alreadySubmit,
getQuestion,
assessment_details,
checkAssessmentDeatils
} = require("../Functions/questionFunction")


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
        const batch_id = await getBatch_id(user_id)
        const result = await createUserAnswer(req.body,user_id,batch_id.batch)
        const result2 = await getUserScore(user_id,batch_id.batch)
        await changeApplicantScore(result2,user_id,batch_id.batch)
        return res.status(201).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function changequestionController (req, res)  {
    try {   
        const result = await updateQuestion( req.body);
        return res.status(200).json(result)
    } catch (e) {
        return res.status(e.code).json(e)
    }
}

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

async function assessmentHistory (req, res) {
    try {
        const result1 = await getBatch()
        await checkAssessmentDeatils(result1.current)
        const result = await assessment_details(req.body,result1.current)
        return res.status(201).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}


module.exports = {
    userAnswer,
    changequestionController,
    getQues,
    Assessments,
    assessmentHistory
}