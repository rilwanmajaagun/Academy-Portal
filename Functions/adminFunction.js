const moment = require("moment");
const queries = require("../Query/query");
const db = require("../database");
const { hashPassword, comparePassword, generateUserToken } = require("../Authorization/validation")



async function createApplication (body){
    const d = new Date();
    const created_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
    const {
        file_url,
        link_url,
        closure_date,
        batch_id,
        instruction,
    } = body;
    const link = ` ${link_url}?${batch_id}&${closure_date}`
    const queryObj = {
        text: queries.createApplication,
        values: [
            file_url,
            link,
            closure_date,
            batch_id,
            instruction,
            created_at,
            created_at
        ]
    }
    try{
        const { rowCount} = await db.query(queryObj);
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
                message: "Application created successfully"
            })
        };
    }catch(e)
        { 
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error creating Application"
        })

    }
}

async function getAllApplicantsResult() {
    const queryObj = {
        text: queries.getAllapplicantResult,
    };
    try {
        const { rows } = await db.query(queryObj);
        return Promise.resolve({
            status: "success",
            code: 200,
            message: "Successfully fetched all results",
           rows  
        });
    } catch (e) {
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error fetching all results",
        });
    }
}

async function checkIfUserIsAdmin(body) {
    const { email_address } = body;
    const queryObj = {
        text: queries.findUserByEmail,
        values: [email_address],
    };
    try {
        const {rows} = await db.query(queryObj);
        const result = rows[0];
        if (result.is_admin == true ) {
            return Promise.resolve();
        }
        if (result.is_admin == false) {
            return Promise.reject({
                status: "error",
                code: 409,
                message: "User Not Allowed",
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
        text: queries.findUserByEmail,
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
            const tokens = generateUserToken(result.id, 
                result.first_name, 
                result.last_name, 
                result.email_address, 
                result.phone_number, 
                result.is_admin
            );
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
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error finding user",
        });
    }
}
module.exports = {
    createApplication,
    getAllApplicantsResult,
    checkIfUserIsAdmin,
    checkEmailAndPasswordMatch
}