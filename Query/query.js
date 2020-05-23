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
    SELECT * FROM application_form WHERE user_id=($1) and batch_id=($2)
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
};


module.exports = queries;