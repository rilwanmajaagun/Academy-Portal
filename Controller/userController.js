const express = require("express")
const {
checkIfUserDoesNotExistBefore,
createNewUser,
checkEmailAndPasswordMatch,
createApplication
} = require("../Functions/userFunction")
const {
    getEmails,
    sendreply
} = require("../nodeMailer/nodemailer")

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
    try{
        email = await getEmails(4);
        await sendreply(email, body, subject);
        const result = await createApplication(req.body)
        return res.status(201).json(result)
    }catch(e){
        return res.status(e.code).json(e);
    }
}
module.exports = {
signup,
loginController,
applicationController
}