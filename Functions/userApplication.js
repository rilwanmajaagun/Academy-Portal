const moment = require("moment");
const queries = require("../Query/query");
const db = require("../database");



async function getUserApplication(id) {
    const queryObj = {
        text: queries.applicantDashboard,
        values: [id],
    };
    try {
        const { rows, rowCount } = await db.query(queryObj);
        const result = rows[0];
        const data = {
            result 
        }
        if (rowCount == 0) {
            return Promise.reject({
                status: "erorr",
                code: 400,
                message: "User Application Not found. Please check back",
            });
        }
        if (rowCount > 0) {
            return Promise.resolve({
              status: "success",
              message: "User Application Found",
            //   data: rows
            Application_date: data.result.created_at,
            Application_status: data.result.application_status
            });
        }
    } catch (e) {
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error finding application",
        });
    }
}
async function getAllApplicantsResult() {
    const queryObj = {
        text: queries.getAllapplicantResult,
    };
    try {
        const { rows } = await db.query(queryObj);
        const result = rows[0];
        const data = {
            result
        }
        return Promise.resolve({
            status: "success",
            code: 200,
            message: "Successfully fetched all results",
            first_name: data.result.first_name,
            last_name: data.result.last_name,
            email: data.result.email_address,
            date_of_birth: data.result.date_of_birth,
            address: data.result.address,
            university: data.result.university,
            cgpa: data.result.cgpa,
            test_score: data.result.score,
            data: rows
            
           
            
        });
    } catch (e) {
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error fetching all results",
        });
    }
}

module.exports = {getUserApplication, getAllApplicantsResult}