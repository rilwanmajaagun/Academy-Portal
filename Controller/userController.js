const express = require("express")
const {
checkIfUserDoesNotExistBefore,
createNewUser,
checkEmailAndPasswordMatch
} = require("../Functions/userFunction")

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
module.exports = {
signup,
loginController
}