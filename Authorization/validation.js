const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi =  require("@hapi/joi")
const dotenv = require("dotenv")

dotenv.config();

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

const generateUserToken = (id,first_name,last_name,email_address,phone_number,is_admin) => {
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ id,first_name,last_name,email_address,phone_number,is_admin }, key, { expiresIn: '1h' });
    return token;
}

const comparePassword = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
}; 
const schema = {
    user: joi.object({
        email_address: joi.string().email().required(),
        password: joi.string().min(6).required(),
        password_confirmation: joi.string().required().valid(joi.ref('password')),
        first_name: joi.string().max(100).required(),
        last_name: joi.string().max(100).required(),
        phone_number: joi.number().required()
    }),
    login: joi.object({
        email_address: joi.string().email().required(),
        password: joi.string().min(6).required(),
    }),
    parcel: joi.object({
        price: joi.number(),
        weight: joi.string().required(),
        location: joi.string().required(),
        destination: joi.string().required(),
        sender_name: joi.string().required(),
        sender_note: joi.string()
    }),
    idparam: {
        id: joi.number().required()
    },
    idparams: {
        user_id: joi.number().required()
    },
    status: joi.object({
        status: joi.string().valid('pending', 'shipped', 'delivered')
    }),
    application: joi.object({
        cv_url: joi.string().required(),
        first_name: joi.string().required(),
        last_name: joi.string().required(),
        date_of_birth: joi.date().required(),
        address: joi.string().required(),
        university: joi.string().required(),
        course_of_study: joi.string().required(),
        cgpa: joi.number().min(0).max(5).required(),
        batch_id: joi.number().required(),
        email: joi.string().email().required(),
        created_at: joi.date().required(),
        score: joi.number(),
        application_status: joi.string().valid('Pending',"Approved").required(),
        closure_date: joi.date().greater(joi.ref('created_at')),
    })

}



module.exports = {
    hashPassword,
    generateUserToken,
    comparePassword,
    schema
};