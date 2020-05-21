const express = require("express")
const {
checkIfUserDoesNotExistBefore,
createNewUser
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

module.exports = {
signup
}