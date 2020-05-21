const queries = {
    addNewApplicant: `
    INSERT INTO users(
      email,
      password,
      first_name,
      last_name,
      phone_number,
      date_of_birth,
      address,
      uiversity,
      course_of_study,
      cgpa,
      status,
      created_at,
      modified_at,
      is_admin
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
    applicantLogin: `
    SELECT * FROM users WHERE email=($1) AND password = ($2)
  `,
    applicantSignUp: `
    SELECT * FROM users WHERE email=($1)
  `,
    
  
    addAssessment: `
    INSERT INTO assessment(
      user_id,
      batch_id,
      created_at, 
      modified_at
    ) VALUES($1, $2, $3, $4) RETURNING *`,
  
    
  };
  
  module.exports = queries;