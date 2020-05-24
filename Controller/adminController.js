const express = require("express")
const {
createApplication,
getAllApplicantsResultDESC,
getAllApplicantsResultASC,
checkIfUserIsAdmin,
checkEmailAndPasswordMatch,
getSpecificBatch
} = require("../Functions/adminFunction")


async function adminCreateApplication (req, res) {
    try {
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
        await checkIfUserIsAdmin(req.body)
        const result = await checkEmailAndPasswordMatch(req.body);
        return res.status(202).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}
async function getSpecificBatchController (req, res) {
    const {batch_id} = req.body
    try {
        const result = await getSpecificBatch(batch_id, req.body);
        return res.status(202).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

module.exports = {
    adminCreateApplication,
    getAllApplicantsResultDESCController,
    getAllApplicantsResultASCController,
    adminLogin,
    getSpecificBatchController
}