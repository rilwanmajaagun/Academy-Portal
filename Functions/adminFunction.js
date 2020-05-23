const moment = require("moment");
const queries = require("../Query/query");
const db = require("../database");




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

module.exports = {
    createApplication,
    getAllApplicantsResult
}