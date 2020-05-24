const express = require("express")
const {
createApplication,
getAllApplicantsResult,
checkIfUserIsAdmin,
checkEmailAndPasswordMatch,
getTotalApplication,
createAcademyRecord,
getAllAcademyRecord,
getAcademySofar,
checkAcademyBatch,
getCurrentBatch
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

module.exports = {
    adminCreateApplication,
    getAllApplicantsResultController,
    adminLogin,
    getTotal,
    createAcademy,
    getAllAcademyRecords,
    getAcademyNumbers
}