const queries = {
  applicantSignUp: `
   INSERT INTO academy2_user(
    first_name,
    last_name,
    email_address,
    phone_number,
    password,
    password_confrimation,
    created_at,
    updated_at,
    is_admin
    ) VALUES($1, $2, $3, $4, $5, $6, $7,$8,$9) RETURNING * 
  `,
  applicantLogin: `
    SELECT * FROM academy_user WHERE email_address=($1)
  `,
  findUserByEmail: `
    SELECT * FROM academy2_user WHERE email_address=($1)
  `,
  applicantForm: `
    INSERT INTO users(
      cv,
      first_name,
      last_name,
      email,
      date_of_birth,
      address,
      uiversity,
      course_of_study,
      cgpa
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
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
      created_at, 
      modified_at
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *
  `,
};

module.exports = queries;