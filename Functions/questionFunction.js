const moment = require("moment");
const queries = require("../Query/query");
const db = require("../database");
const { hashPassword, comparePassword, generateUserToken } = require("../Authorization/validation")




async function createAssessment (body,batch_id){
    try {
        const question = body
        var stored = 0;
        for (let prop in question) {
          queryObj = {
            text: queries.addAssessment,
            values: [
              question[prop].file_url,
              question[prop].question,
              question[prop].option_a,
              question[prop].option_b,
              question[prop].option_c,
              question[prop].option_d,
              question[prop].option_answer,
              batch_id
            ]
          }
          const {rowCount } = await db.query(queryObj);
          stored++;
        }
        if (stored<1) {
            return Promise.reject({
              status: "error",
              code: 400,
              message: `Failed to store Assessments`
            })
          }
      } catch (e) {
        if (stored < 1) {
          return Promise.reject({
            status: "error",
            code: 400,
            message: `Failed to store Assessments`
          })
        }
      }
      return Promise.resolve({
        status: "success",
        code: 201,
        message: "question created successfully"
      })
}

async function createUserAnswer(body, user_id, batch_id) {
    try {
      const answer = body
      var stored = 0;
      for (let prop in answer) {
        queryObj = {
          text: queries.userAnswer,
          values: [
            answer[prop].question_id,
            user_id,
            batch_id,
            answer[prop].user_answer,
          ]
        }
        const {rowCount } = await db.query(queryObj);
        stored++;
      }
    } catch (e) {
      if (stored < 1) {
        return Promise.reject({
          status: "error",
          code: 400,
          message: `Failed to store Assessments`
        })
      }
      return Promise.resolve({
        status: "success",
        code: 200,
        message: `Stored ${stored} out of ${prop.length} Assessments`
      })
    }
    return Promise.resolve({
      status: "success",
      code: 201,
      message: "Answer created successfully"
    })
}

async function getUserScore(user_id,batch_id) {
    const queryObj = {
        text: queries.getCorrectAnswer,
        values:[batch_id]
    };
    const queryObj2 = {
        text : queries.getUserAnswer,
        values:[user_id,batch_id]
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

async function updatequestion2 (body,batch_id){
    try {
        const question = body
        var update = 0;
        for (let prop in question) {
          queryObj = {
            text: queries.updateQuestion,
            values: [
                question[prop].file_url,
                question[prop].question,
                question[prop].option_a,
                question[prop].option_b,
                question[prop].option_c,
                question[prop].option_d,
                question[prop].option_answer,
                batch_id,
                question[prop].id

              ]
          }
          const {rowCount } = await db.query(queryObj);
          update++;
        }
      } catch (e) {
        if (update < 1) {
          return Promise.reject({
            status: "error",
            code: 400,
            message: `Failed to update Assessment`
          })
        }
        return Promise.resolve({
          status: "success",
          code: 200,
          message: `Queston ${update} out of ${prop.length} Assessments`
        })
      }
      return Promise.resolve({
        status: "success",
        code: 200,
        message: "Question updated successfully"
      })
    // const {
    //     id, 
    //     file_url,
    //     question,
    //     option_a,
    //     option_b,option_c,
    //     option_d,
    //     option_answer
    // } = body
    // const queryObj = {
    //     text: queries.updateQuestion,
    //     values:[
    //         file_url,
    //         question,
    //         option_a,
    //         option_b,
    //         option_c,
    //         option_d,
    //         option_answer,
    //         batch_id,
    //         id
    //     ]
    // }
    // try{
    //     await db.query(queryObj)
    //     return Promise.resolve({
    //         status:"sucess",
    //         code:"200",
    //         message:"question updated sucessfully"
    //     })
    // }catch(e){
    //     console.log(e)
    //     return Promise.reject({
    //         status: "error",
    //         code: 500,
    //        message: "Error updating question"
    //     });
    // }
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

async function alreadySubmit (user_id,batch_id) {
    const queryObj = {
        text: queries.checkIfUserSubmit,
        values: [user_id,batch_id]
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

async function changeApplicantScore(score,user_id,batch_id) {
    const queryObj = {
        text: queries.updateScore,
        values: [score, user_id,batch_id]
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
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error getting Batch",
        });
    }
}

async function assessment_details (body,batch_id) {
    const d = new Date();
    const date_compose = moment(d).format("DD/MM/YY");
    const { number_of_question,time_allocated } = body
    const status = "Not Taken";
     const queryObj = {
        text: queries.assessmentStatus,
        values:[
        batch_id,
        date_compose,
        number_of_question,
        time_allocated,
        status
        ]
    }
    try{
        const { rowCount,rows } = await db.query(queryObj)
        if( rowCount==0){
            return Promise.reject({
                status:'error',
                code: 400,
                message:"Error creating Assessment History"
            })
        }
        if(rowCount>0){
            return Promise.resolve({
                status:"Success",
                code:201,
                message:"Assessment History created sucessfully"
            })
        }
    }catch(e){
        console.log(e)
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error creating Assessment History",
        });
    }
   
}


async function checkAssessmentDeatils (batch_id) {
    const queryObj = {
        text: queries.checkIfBatchExistsInAssessmentStatus,
        values: [batch_id]
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
                message: "Assessment History Already Submitted"
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

async function getHistory() {
    const queryObj = {
        text: queries.assessHistory,
    };
    try {
        const { rows } = await db.query(queryObj);
        return Promise.resolve({
            status:"success",
            code:200,
            message:"Assessment History",
            rows
            
         
        });
    } catch (e) {
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error getting History",
        });
    }
}

async function updateAssessmentStatus(batch_id){
    const status = 'Taken'
    const queryObj={
        text:queries.updateAssessmenTStatus,
        values:[status,batch_id]
    }
    try{
        const {rowCount} = await db.query(queryObj)
        if(rowCount==0){
            return Promise.reject({
                status:"Error",
                code:"400",
                message:"Error updating status"
            })
        };
        if(rowCount > 0){
            return Promise.resolve()
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


module.exports = {
    createUserAnswer,
    getUserScore,
    getQuestion,
    alreadySubmit,
    createAssessment,
    changeApplicantScore,
    getBatch_id,
    getBatch,
    assessment_details,
    checkAssessmentDeatils,
    getHistory,
    updateAssessmentStatus,
    updatequestion2
}