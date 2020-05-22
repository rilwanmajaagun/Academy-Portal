const moment = require("moment");
const queries = require("../Query/query");
const db = require("../database");
const { hashPassword, comparePassword, generateUserToken } = require("../Authorization/validation")

async function createNewUser(body) {
    const d = new Date();
    const created_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
    const { first_name, last_name, email_address, phone_number, password, password_confirmation } = body;
    const is_admin = false;
    const hashedPassword = hashPassword(password);
    const queryObj = {
        text: queries.applicantSignUp,
        values: [first_name, last_name, email_address, phone_number, hashedPassword, created_at, created_at, is_admin]
    }

    try {

        const { rowCount, rows } = await db.query(queryObj);
        const response = rows[0];
        const tokens = generateUserToken(response.id, response.first_name, response.last_name, response.email_address, response.phone_number, response.is_admin);
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
                last_name: data.response.last_name,
                token: data.token

            });
        }
    } catch (e) {
        console.log(e)
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

async function checkEmailAndPasswordMatch(body) {
    const { email_address, password } = body;
    const queryObj = {
        text: queries.applicantLogin,
        values: [email_address],
    };

    try {
        const { rows, rowCount } = await db.query(queryObj);
        if (rowCount == 0) {
            return Promise.reject({
                status: "error",
                code: 404,
                message: "Email not found",
            });
        }

        if (rowCount > 0) {
            const result = rows[0];
            if (!comparePassword(result.password, password)) {
                return Promise.reject({
                    status: "error",
                    code: 400,
                    message: "Password is incorrect",
                });
            }

            const tokens = generateUserToken(result.id, result.first_name, result.last_name, result.email_address, result.phone_number, result.is_admin);
            const data = {
                token: tokens,
                result
            }
            return Promise.resolve({
                message: "Log in successful. Welcome!",
                first_name: data.result.first_name,
                last_name: data.result.last_name,
                token: data.token


            })
        }

    } catch (e) {
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error finding user",
        });
    }
}

async function createApplication (body){
    // const d = new Date();
    // const created_at = moment(d).format("YYYY-MM-DD");
    const { user_id, cv_url, first_name, last_name, email, date_of_birth, address, university, course_of_study, cgpa, batch_id, closure_date, score, created_at, application_status} = body;
    const queryObj = {
        text: queries.applicantForm,
        values: [user_id, cv_url, first_name, last_name, email, date_of_birth, address, university, course_of_study, cgpa, batch_id, closure_date, score, created_at, application_status]
    }
    try{
        const { rowCount, rows} = await db.query(queryObj);
        if ( rowCount == 0 ){
            return Promise.reject({
                status: "error",
                code: 500,
                message: "colud not create application"
            });
        }
        if ( rowCount > 0 ){
            return Promise.resolve({
                status: "success",
                code: 201,
                message: "Application sent",
                rows: rows[0].created_at
            })
        };
    }catch(e)
        { 
            console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error SubmittingApplication Form"
        })

    }
}

console.log("hello there")

module.exports = {
    createNewUser,
    checkIfUserDoesNotExistBefore,
    checkEmailAndPasswordMatch,
    createApplication
}