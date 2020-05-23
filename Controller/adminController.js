const express = require("express")
const {
createApplication,
getAllApplicantsResult,
checkIfUserIsAdmin,
checkEmailAndPasswordMatch
} = require("../Functions/adminFunction")


async function adminCreateApplication (req, res) {
    try {
        const result = await createApplication(req.body)
        return res.status(201).json(result);
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

async function adminLogin (req, res) {
    try {
        await checkIfUserIsAdmin(req.body)
        const result = await checkEmailAndPasswordMatch(req.body);
        return res.status(202).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}


module.exports = {
    adminCreateApplication,
    getAllApplicantsResultController,
    adminLogin
}