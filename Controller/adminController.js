const express = require("express")
const {
createApplication,
getAllApplicantsResult,
checkIfUserIsAdmin,
checkEmailAndPasswordMatch,
getSpecificBatch,
getTotalApplication,
createAcademyRecord,
getAllAcademyRecord,
getAcademySofar,
checkAcademyBatch
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
         const result = await checkEmailAndPasswordMatch(req.body);
         await checkIfUserIsAdmin(req.body)
        return res.status(202).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function getSpecificBatchController (req, res) {
    const user_id = res.locals.user_id;
    // const {batch_id} = req.body
    try {
        const result = await getSpecificBatch(user_id, req.body);
        return res.status(202).json(result);

async function getTotal (req, res) {
    const { batch_id } = req.params;
        try {
            const result = await getTotalApplication(batch_id);
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

module.exports = {
    adminCreateApplication,
    getAllApplicantsResultController,
    adminLogin,
    getSpecificBatchController,
    getTotal,
    createAcademy,
    getAllAcademyRecords,
    getAcademyNumbers
}