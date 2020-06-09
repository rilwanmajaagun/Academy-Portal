const queries = {
  applicantSignUp: `
   INSERT INTO academy_user(
    first_name,
    last_name,
    email_address,
    phone_number,
    password,
    created_at,
    updated_at,
    is_admin
    ) VALUES($1, $2, $3, $4, $5, $6, $7,$8) RETURNING * 
  `,
  forgetPassword: `
  UPDATE academy_user SET email_address=($1), password=($2) WHERE id=($3) RETURNING *
  `,

  findUserByEmail: `
    SELECT * FROM academy_user WHERE email_address=($1)
  `,
  
  applicantForm: `
    INSERT INTO application_form(
      user_id,
      cv_url,
      first_name,
      last_name,
      email,
      date_of_birth,
      age,
      address,
      university,
      course_of_study,
      cgpa,
      batch_id,
      closure_date,
      score,
      created_at,
      application_status
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *
  `,

  getEmail:`
  SELECT email_address FROM academy_user WHERE id=($1)
  `,
  
  getuserName:`
  SELECT * FROM academy_user WHERE id=($1)
  `,

  applicantDashboard: `
    SELECT * FROM application_form WHERE user_id=($1) ORDER BY "batch_id" DESC
  `,

  getSpecificBatch: `
    SELECT * FROM application_form WHERE batch_id=($1)
  `,

  getAllapplicantResultDESC: `
  SELECT * FROM application_form ORDER BY "age" DESC, "cgpa" DESC
  `,

  getAllapplicantResultASC: `
  SELECT * FROM application_form ORDER BY "age" ASC, "cgpa" ASC
`,

  updateStatus:
  `
  UPDATE application_form SET application_status=($1) WHERE id=($2) RETURNING *
  `,

  applcantDashboard: `
    SELECT * FROM assessment WHERE user_id=($1)
  `,

  getBatch: `
  SELECT * FROM application_form WHERE user_id=($1) AND batch_id=($2)
  `,
  
  createApplication: `
  INSERT INTO application_table(
    file_url,
    link,
    closure_date,
    batch_id,
    instruction,
    created_at,
    updated_at
    ) VALUES($1, $2, $3,$4, $5, $6, $7) RETURNING *
  `,

  checkIfBatchExists: `
    SELECT * FROM application_table WHERE batch_id=($1)
  `,

  getTotalApplication:`
  SELECT COUNT(*) 
  FROM application_form
  WHERE batch_id=($1)
  UNION
  SELECT COUNT(*) 
  FROM application_form
  `,

  academyHistory:`
  INSERT INTO academy(
    batch_id,
    students,
    started,
    created_at,
    updated_at
  ) VALUES ($1, $2, $3, $4, $5)
  `,

  getAllAcademyRecord:`
    SELECT * FROM academy ORDER BY "batch_id" ASC
  `,

  getAcademyTotal:`
  SELECT COUNT(*) 
  FROM academy
  `,

  checkAcademyBatch:`
  SELECT * FROM academy WHERE batch_id = ($1)
  `,

  currentBatch:`
  SELECT batch_id FROM application_form ORDER BY batch_id DESC
  `,
  allBatch:`
  SELECT batch_id FROM application_table ORDER BY batch_id ASC
  `,

  getToken:`
  SELECT * FROM blacklist WHERE token = ($1)
  `,

  addAssessment: `
  INSERT INTO  question(
    file_url,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    option_answer,
    batch_id
  ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
`,

getCorrectAnswer:`
SELECT option_answer FROM question WHERE batch_id=($1) ORDER BY id
`,

selectQuestion: `
SELECT file_url, question,
option_a,
option_b,
option_c,
option_d,
option_answer,batch_id FROM question WHERE id=($1) 
`,

 updateQuestion:`
 UPDATE question SET  
 file_url=($1),
 question= ($2), option_a= ($3), option_b= ($4), option_c= ($5), option_d= ($6), option_answer= ($7) 
 WHERE batch_id = ($8) AND id = ($9) RETURNING *
 `,

userAnswer: `
INSERT INTO userAn(
  question_id,
  user_id,
  batch_id,
  user_answer
) VALUES($1, $2, $3, $4) RETURNING *
`,

getUserAnswer:`
SELECT user_answer FROM userAn WHERE user_id=($1) AND batch_id=($2) ORDER BY question_id 
`,

updateScore:
`
UPDATE application_form SET score=($1) WHERE user_id=($2) AND batch_id=($3) RETURNING *
`,

questionBatch:`
SELECT batch_id FROM application_table ORDER BY batch_id DESC
`,

checkIfUserSubmit:`
SELECT * FROM userAn WHERE user_id=($1) 
`,

getQuestion:`
SELECT * FROM question WHERE batch_id=($1)
`,

getQuestionBatch:`
SELECT batch_id FROM application_form WHERE user_id =($1) ORDER BY batch_id DESC
`,

getUpdate:`
SELECT * FROM application_table ORDER BY batch_id DESC
`,
assessmentStatus:`
INSERT INTO assessment_details(
  batch_id,
  date_compose,
  number_of_question,
  time_allocated,
  status
)VALUES($1, $2, $3, $4, $5) RETURNING *
`,
checkIfBatchExistsInAssessmentStatus:`
SELECT * FROM assessment_details WHERE batch_id=($1)
`,
assessHistory:`
SELECT * FROM assessment_details ORDER BY batch_id ASC
`,
updateAssessmenTStatus:`
UPDATE assessment_details SET status=($1) WHERE batch_id=($2)
`
};


module.exports = queries;

