const express = require("express");
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
	getUpdate,
	checkIfBatchExistBefore,
	getAllBatch,
	updateTime,
	getAssessmentTime,
} = require("../Functions/adminFunction");
const { getEmails, sendMail } = require("../nodeMailer/nodemailer");

async function adminCreateApplication(req, res) {
	const { batch_id } = req.body;
	try {
		await checkIfBatchExistBefore(batch_id);
		const result = await createApplication(req.body);
		return res.status(201).json(result);
	} catch (e) {
		return res.status(e.code).json(e);
	}
}

async function getAllApplicantsResultDESCController(req, res) {
	try {
		const result = await getAllApplicantsResultDESC();
		return res.status(200).json(result);
	} catch (e) {
		return res.status(e.code).json(e);
	}
}

async function getAllApplicantsResultASCController(req, res) {
	try {
		const result = await getAllApplicantsResultASC();
		return res.status(200).json(result);
	} catch (e) {
		return res.status(e.code).json(e);
	}
}

async function adminLogin(req, res) {
	try {
		const result = await checkEmailAndPasswordMatch(req.body);
		await checkIfUserIsAdmin(req.body);
		return res.status(202).json(result);
	} catch (e) {
		return res.status(e.code).json(e);
	}
}

async function getSpecificBatchController(req, res) {
	const { batch_id } = req.params;
	try {
		const result = await getSpecificBatch(batch_id);
		return res.status(202).json(result);
	} catch (e) {
		return res.status(e.code).json(e);
	}
}

async function getTotal(req, res) {
	try {
		const currentBatch = await getCurrentBatch();
		const result = await getTotalApplication(
			currentBatch.current
		);
		return res.status(200).json(result);
	} catch (e) {
		return res.status(e.code).json(e);
	}
}
async function getCurrentAcademy(req, res) {
	try {
		const result = await getCurrentBatch();
		return res.status(200).json(result.current);
	} catch (e) {
		return res.status(e.code).json(e);
	}
}

async function createAcademy(req, res) {
	try {
		await checkAcademyBatch(req.body);
		const result = await createAcademyRecord(req.body);
		return res.status(201).json(result);
	} catch (e) {
		return res.status(e.code).json(e);
	}
}

async function getAllAcademyRecords(req, res) {
	try {
		const result = await getAllAcademyRecord();
		return res.status(200).json(result);
	} catch (e) {
		return res.status(e.code).json(e);
	}
}

async function getAcademyNumbers(req, res) {
	try {
		const result = await getAcademySofar();
		return res.status(200).json(result);
	} catch (e) {
		return res.status(e.code).json(e);
	}
}

async function changeApplicationController(req, res) {
	const body = "your";
	const subject = "Application status changed";
	try {
		const result = await changeApplicationStatus(req.body);
		const email = await getEmails(result.user_id);
		await sendMail(email, body, subject);
		return res.status(200).json(result);
	} catch (e) {
		return res.status(e.code).json(e);
	}
}

async function getUpdatedApplication(req, res) {
	try {
		const result = await getUpdate();
		return res.status(200).json(result);
	} catch (e) {
		return res.status(e.code).json(e);
	}
}

async function getAllBatchs(req, res) {
	try {
		const result = await getAllBatch();
		return res.status(200).json(result);
	} catch (e) {
		return res.status(e.code).json(e);
	}
}

async function updateTimeController(req, res) {
	const { batch_id } = req.params;
	try {
		const result = await updateTime(req.body, batch_id);
		return res.status(200).json(result);
	} catch (e) {
		return res.status(e.code).json(e);
	}
}

async function getAssessmentTimeController(req, res) {
	const { batch_id } = req.params;
	try {
		const result = await getAssessmentTime(batch_id);
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
	getUpdatedApplication,
	getCurrentAcademy,
	getAllBatchs,
	updateTimeController,
	getAssessmentTimeController,
};
