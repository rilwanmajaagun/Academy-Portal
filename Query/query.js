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
  getAllapplicantResult: `
  SELECT * FROM application_form
  `,
  addAssessment: `
    INSERT INTO assessment(
      user_id,
      batch_id,
      closure_date,
      instructions,
      question,
      total_application,
      academy_so_far,
      date_completed,
      time_allocated,
      no_of_question,
      application_status
      created_at, 
      modified_at
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *
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
};


module.exports = queries;