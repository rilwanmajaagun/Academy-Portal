const moment = require("moment");
const queries = require("../Query/query");
const db = require("../database");
const {hashPassword,generateUserToken} = require("../Authorization/validation")

async function createNewUser(body) {
    const d = new Date();
    const created_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
    const {first_name,last_name,email_address,phone_number,password} = body;
    const is_admin = false;
    const hashedPassword = hashPassword(password);
    const queryObj = {
        text: queries.applicantSignUp,
        values: [first_name, last_name, email_address, phone_number, hashedPassword, created_at, created_at,is_admin]
    } 
  
    try {

        const { rowCount, rows } = await db.query(queryObj);
        const response = rows[0];
        const tokens = generateUserToken(response.id, response.first_name, response.last_name, response.email_address, response.is_admin);
        const data = {
            token: tokens,
            response
        }
        if (rowCount == 0) {
            return Promise.reject({
                status: "error",
                code: 500,
                message: "Could not create user",
            });
        }
        if (rowCount > 0) {
            return Promise.resolve({
                message: "User created successfully",
                first_name: data.response.first_name,
                last_name: data.response.last_name

            });
        }
    } catch (e) {
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error creating user",
        });
    }
}

async function checkIfUserDoesNotExistBefore(email_address) {
    const queryObj = {
        text: queries.findUserByEmail,
        values: [email_address],
    };
    try {
        const { rowCount } = await db.query(queryObj);
        if (rowCount == 0) {
            return Promise.resolve();
        }
        if (rowCount > 0) {
            return Promise.reject({
                status: "error",
                code: 409,
                message: "User Already Exists",
            });
        }
    } catch (e) {
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error finding user",
        });
    }
}


module.exports= {
    createNewUser,
    checkIfUserDoesNotExistBefore
}