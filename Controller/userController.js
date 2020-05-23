const express = require("express")
const {
checkIfUserDoesNotExistBefore,
createNewUser,
checkEmailAndPasswordMatch,
createApplication
} = require("../Functions/userFunction")
const {
    getEmails,
    sendMail
} = require("../nodeMailer/nodemailer")
const {getUserApplication, getAllApplicantsResult} = require("../Functions/userApplication");


async function signup (req, res) {
    const { email_address } = req.body;
    try {
        await checkIfUserDoesNotExistBefore(email_address);
        const result = await createNewUser(req.body)
        return res.status(201).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function loginController (req, res) {
    try {
        const result = await checkEmailAndPasswordMatch(req.body);
        return res.status(202).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function applicationController (req,res){
    const body = "your"
    const subject = "welcome to academy"
    const user_id = res.locals.user.id
    try{
        email = await getEmails(user_id);
        await sendMail(email, body, subject);
        const result = await createApplication(user_id,req.body)
        return res.status(201).json(result)
    }catch(e){
        return res.status(e.code).json(e);
    }
}
async function getUserApplicationController (req, res) {
    const { id } = req.params;
        try {
            const result = await getUserApplication(id);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(e.code).json(e);
        }
}
async function getAllApplicantsResultController (req, res) {
    try {
        const result = await getAllApplicantsResult();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}
module.exports = {
signup,
loginController,
applicationController,
getUserApplicationController,
getAllApplicantsResultController
}