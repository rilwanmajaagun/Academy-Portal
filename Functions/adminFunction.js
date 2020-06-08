const moment = require("moment");
const queries = require("../Query/query");
const db = require("../database");
const { hashPassword, comparePassword, generateUserToken } = require("../Authorization/validation")



async function createApplication (body){
    console.log(body)
    // const d = new Date();
    // const created_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
    // const {
    //     file_url,
    //     link_url,
    //     closure_date,
    //     batch_id,
    //     instruction,
    // } = body;
    // const link = ` ${link_url}/enyata?id=${batch_id}=${closure_date}`
    // const queryObj = {
    //     text: queries.createApplication,
    //     values: [
    //         file_url,
    //         link,
    //         closure_date,
    //         batch_id,
    //         instruction,
    //         created_at,
    //         created_at
    //     ]
    // }
    // try{
    //     const { rowCount} = await db.query(queryObj);
    //     if ( rowCount == 0 ){
    //         return Promise.reject({
    //             status: "error",
    //             code: 500,
    //             message: "colud not create application"
    //         });
    //     }
    //     if ( rowCount > 0 ){
    //         return Promise.resolve({
    //             status: "success",
    //             code: 201,
    //             message: "Application created successfully"
    //         })
    //     };
    // }catch(e)
    //     { 
    //     return Promise.reject({
    //         status: "error",
    //         code: 500,
    //         message: "Error creating Application"
    //     })

    // }
}
// this is in descending order
async function getAllApplicantsResultDESC() {
    const queryObj = {
        text: queries.getAllapplicantResultDESC
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
// this is in ascending order
async function getAllApplicantsResultASC() {
    const queryObj = {
        text: queries.getAllapplicantResultASC,
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
                message: "User Must be an Admin ",
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

async function getSpecificBatch(batch_id) {
    const queryObj = {
        text: queries.getSpecificBatch,
        values: [batch_id]
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
                message: "Batch results Not found. Please check back",
            });
        }
        if (rowCount > 0) {
            return Promise.resolve({
              status: "success",
              message: " Batch results Found",
              data: rows
            
            });
        }
    } catch (e) {
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error finding batch result",
        });
    }
}

async function getTotalApplication(batch_id) {
    const queryObj = {
        text: queries.getTotalApplication,
        values:[batch_id]
    };
    try {
        const { rows } = await db.query(queryObj);
        return Promise.resolve({
            status: "success",
            code: 200,
            message: "get total Application",
           currentApplication: rows[0].count,
           totalApplication :  rows[1].count,
        });
    } catch (e) {
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error fetching all results",
        });
    }
}

async function createAcademyRecord (body){
    const d = new Date();
    const created_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
    const {
        batch_id,
        students,
        started
    } = body;
    const queryObj = {
        text: queries.academyHistory,
        values: [
            batch_id,
            students,
            started,
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
                message: "colud not create Academy record"
            });
        }
        if ( rowCount > 0 ){
            return Promise.resolve({
                status: "success",
                code: 201,
                message: "Academy record created successfully"
            })
        };
    }catch(e)
        { 
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error creating Academy record"
        })

    }
}

async function getAllAcademyRecord() {
    const queryObj = {
        text: queries.getAllAcademyRecord,
    };
    try {
        const { rows } = await db.query(queryObj);
        return Promise.resolve({
            status: "success",
            code: 200,
            message: "Successfully fetched all Academy record",
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

async function getAcademySofar() {
    const queryObj = {
        text: queries.getAcademyTotal,
    };
    try {
        const { rows } = await db.query(queryObj);
        return Promise.resolve({
            status: "success",
            code: 200,
            message: "Successfully fetched all Academy Numbers",
           rows  
        });
    } catch (e) {
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error fetching all Academy Numbers",
        });
    }
}

async function checkAcademyBatch(body){
    const { batch_id } = body
    const queryObj = {
        text: queries.checkAcademyBatch,
        values: [batch_id]
    };
    try{
        const { rowCount } = await db.query(queryObj)
        if( rowCount == 0){
            return Promise.resolve()
        }
        if(rowCount > 0){
            return Promise.reject({
                status: "error",
                code: 400,
                message: "Batch Record Already Exist"
            })
        }
    }catch(e){

    }
}

async function getCurrentBatch() {
    const queryObj = {
        text: queries.currentBatch,
    };
    try {
        const { rows } = await db.query(queryObj);
        return Promise.resolve({
           current:rows[0].batch_id
        });
    } catch (e) {
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error getting Cuurent Batch",
        });
    }
}

async function changeApplicationStatus( body) {
    const d = new Date();
    // const modified_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
    const { application_status, id } = body
    const queryObj = {
        text: queries.updateStatus,
        values: [application_status, id]
    }
    try {
        const { rows, rowCount } = await db.query(queryObj);
        const result = rows[0];
        const data = {
            result
        } 
        if (rowCount === 0) {
            return Promise.reject({
                status: "Error",
                code: 404,
                message: "Cannot find applicant Id."
            });
        }
        if (rowCount > 0) {
            return Promise.resolve({
                status: "success",
                code: 200,
                message: "Applicant status updated successfully",
                user_id: data.result.user_id
            });
        }
    } catch (e) {
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error updating applicant status"
        })
    }
}

async function createAssessment (body,batch_id){
    const {
        file_url,
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        option_answer
    } = body;
    const queryObj = {
        text: queries.addAssessment,
        values: [
            file_url,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            option_answer,
            batch_id
        ]
    }
    try{
        const { rowCount} = await db.query(queryObj);
        if ( rowCount == 0 ){
            return Promise.reject({
                status: "error",
                code: 500,
                message: "colud not create Assessment"
            });
        }
        if ( rowCount > 0 ){
            return Promise.resolve({
                status: "success",
                code: 201,
                message: "Assessment created successfully"
            })
        };
    }catch(e)
        { 
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error creating Assessment"
        })

    }
}

async function createUserAnswer (body,user_id){
    const {
        question_id,
        user_answer,
    } = body;
    const queryObj = {
        text: queries.userAnswer,
        values: [
            question_id,
            user_id,
            user_answer,
        ]
    }
    try{
        const { rowCount} = await db.query(queryObj);
        if ( rowCount == 0 ){
            return Promise.reject({
                status: "error",
                code: 500,
                message: "colud not create Answer"
            });
        }
        if ( rowCount > 0 ){
            return Promise.resolve({
                status: "success",
                code: 201,
                message: "Answer created successfully"
            })
        };
    }catch(e)
        { 
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error creating Assessment"
        })

    }
}

async function getUserScore(user_id) {
    const queryObj = {
        text: queries.getCorrectAnswer,
    };
    const queryObj2 = {
        text : queries.getUserAnswer,
        values:[user_id]
    }
    try {
        const { rows } = await db.query(queryObj);
        const row = await db.query(queryObj2)
    let score =0;
    for(i=0;i<rows.length;i++){
        if(rows[i].option_answer == row.rows[i].user_answer){
            score =  score+1
        }
    }
        return Promise.resolve(score);
    } catch (e) {
        console.log(e)
        console.log(rows)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error getting score",
        });
    }
}

async function changeApplicantScore(score,user_id) {
    const queryObj = {
        text: queries.updateScore,
        values: [score, user_id]
    }
    try {
        const { rowCount } = await db.query(queryObj); 
        if (rowCount == 0) {
            return Promise.reject({
                status: "Error",
                code: 404,
                message: "Cannot find applicant ."
            });
        }
        if (rowCount > 0) {
            return Promise.resolve({
                status: "success",
                code: 200,
                message: "Applicant score updated successfully",
            });
        }
    } catch (e) {
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error updating applicant score"
        })
    }
}

async function getBatch() {
    const queryObj = {
        text: queries.questionBatch,
    };
    try {
        const { rows } = await db.query(queryObj);
        return Promise.resolve({
           current:rows[0].batch_id
        });
    } catch (e) {
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error getting Batch",
        });
    }
}

// async function updateQuestion( id,body) {
//     const d = new Date();
//     const modified_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
 
    
//     let file_url = body && body.file_url;
//     let question = body && body.question;
//     let option_a = body && body. option_a;
//     let option_b = body && body.option_b;
//     let option_c = body && body.option_c;
//     let option_d = body && body.option_d;
//     let option_answer = body && body.option_answer;
//     let batch_id = body && body.batch_id;
//     const queryObj = {
//         text: queries.selectQuestion,
//         values: [id]
//     } 
//     try {
//         const { rows, rowCount } = await db.query(queryObj);
  
//         if (rowCount === 0) {
//             return Promise.reject({
//                 status: "Error",
//                 code: 404,
//                 message: "Cannot find applicant Id."
//             });
//         }
      
//          file_url= file_url || rows[0].file_url
//          question = question || rows[0].question
//          option_a = option_a || rows[0].option_a
//          option_b = option_b || rows[0].option_b
//          option_c = option_c || rows[0].option_c
//          option_d = option_d || rows[0].option_d
//          option_answer = option_answer || rows[0].option_answer
//         // batch_id = batch_id || rows[0].batch_id
//         const queryObj2 = {
//             text: queries.updateQuestion,
//             values: [
//                 file_url,
//                 question,
//                 option_a,
//                 option_b,
//                 option_c,
//                 option_d,
//                 option_answer,
//                 batch_id
//             ]
//         }
//          await db.query(queryObj2);
//         return Promise.resolve({
//             status: "success",
//             code: 200,
//             message: "question updated successfully",
//               });
//     } catch (e) {
//         console.log(e)
//         return Promise.reject({
//             status: "error",
//             code: 500,
          
//            message: "Error updating question"
//         });
//     }
// }
async function checkId (id){
    
    // let file_url = body && body.file_url;
    // let question = body && body.question;
    // let option_a = body && body. option_a;
    // let option_b = body && body.option_b;
    // let option_c = body && body.option_c;
    // let option_d = body && body.option_d;
    // let option_answer = body && body.option_answer;
    // let batch_id = body && body.batch_id;
    
    const queryObj = {
        text: queries.selectQuestion,
        values: [id]
    } 
    try {
                const { rows, rowCount } = await db.query(queryObj);
          
                if (rowCount === 0) {
                    return Promise.reject({
                        status: "error",
                        code: 400,
                        message: "try again"
                    });
                }
                if (rowCount > 0) {
                    return Promise.resolve();
                }             
} catch (e) {
            console.log(e)
            return Promise.reject({
                status: "error",
                code: 500,           
               message: "Error finding question"
            });
        }

}
async function update(body) {
            const file_url= body || body.file_url
           const  question = body || body.question
            const option_a = body || body.option_a
            const option_b = body || body.option_b
            const option_c =body || body.option_c
            const option_d = body || body.option_d
            const option_answer = body || body.option_answer
            const batch_id = body || body.batch_id
            const queryObj2 = {
                text: queries.updateQuestion,
                values: [
                    file_url,
                    question,
                    option_a,
                    option_b,
                    option_c,
                    option_d,
                    option_answer,
                    batch_id
                ]
            }
            try {
                const { rows, rowCount } = await db.query(queryObj2);
          
                if (rowCount === 0) {
                    return Promise.reject({
                        status: "Error",
                        code: 404,
                        message: "Cannot update question." 
                    });
                }
                if (rowCount > 0) {
                    return Promise.resolve({
                        status: "success",
                        code: 201,
                        message: "updated successfully"
                    });
                }
              
} catch (e) {
            console.log(e)
            return Promise.reject({
                status: "error",
                code: 500,
              
               message: "Error finding question"
            });
        }
}
async function alreadySubmit (user_id) {
    const queryObj = {
        text: queries.checkIfUserSubmit,
        values: [user_id]
    }
    try{
        const { rowCount } = await db.query(queryObj)
        if( rowCount == 0){
            return Promise.resolve()
        };
        if( rowCount > 0 ){
            return Promise.reject({
                status:"error",
                code:"400",
                message: "Assessment already taken"
            })
        }
    }catch(e){
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error checking table",
        });
    }
}

function shuffle (array) {
    return array.sort(() => Math.random() - 0.5);
  }

async function getQuestion (batch_id) {
    const queryObj = {
        text: queries.getQuestion,
        values:[batch_id]
    };
    try{
        const { rows } = await db.query(queryObj)
        return Promise.resolve(
            shuffle(rows)
        );
    }catch(e){
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error getting Batch",
        });
    }
}

async function getBatch_id(user_id) {
    const queryObj = {
        text: queries.getQuestionBatch,
        values:[user_id]
    };
    try {
        const { rows } = await db.query(queryObj);
        return Promise.resolve({
           batch:rows[0].batch_id
        });
    } catch (e) {
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
          
            message: "Error getting Batch_id",
        });
    }
}
        
async function getUpdate (){
    const queryObj = {
        text: queries.getUpdate
    };
    try{
        const { rows } = await db.query(queryObj)
        return Promise.resolve(
        rows[0]
        )
    }catch(e){
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error getting Batch_id",
        });
    }
}
async function checkIfBatchExistBefore(batch_id) {
    const queryObj = {
      text: queries.checkIfBatchExists,
      values: [batch_id]
    };
  
    try {
      const { rowCount } = await db.query(queryObj);
      if (rowCount == 0) {
        return Promise.resolve();
      }
      if (rowCount > 0) {
        return Promise.reject({
          status: "erorr",
          code: 409,
          message: "Batch Already Exists",
        });
      }
    } catch (e) {
      console.log(e);
      return Promise.reject({
        status: "error",
        code: 500,
        message: "Error finding batch",
      });
    }
  }
  

module.exports = {
    createApplication,
    getSpecificBatch,
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
    changeApplicationStatus,
    createAssessment,
    createUserAnswer,
    getUserScore,
    changeApplicantScore,
    getBatch,
    // updateQuestion,
    checkIfBatchExistBefore,
    alreadySubmit,
    getQuestion,
    getBatch_id,
    getUpdate,
    checkId,
    update
}