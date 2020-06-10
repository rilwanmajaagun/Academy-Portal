const nodemailer = require('nodemailer');
const queries = require("../Query/query");
const db = require("../database");
const dotenv = require("dotenv")

dotenv.config()


async function getEmails(id) {
    const queryObj = {
        text: queries.getEmail,
        values: [id ],
    };
    try {
        const { rows } = await db.query(queryObj);
        if (rows) {
            return Promise.resolve(rows[0].email_address);
        }
        if (!rows) {
            return Promise.reject({
                status: "erorr",
                code: 409,
                message: "user Email not found",
            });
        }
    } catch (e) {
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error finding user",
        });
    }
}

async function  sendMail (email, body, subject){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:  process.env.NODE_MAILER_EMAIL,
          pass:  process.env.NODE_MAILER_PASSWORD
        }
      });
      
      var mailOptions = {
        from:  process.env.NODE_MAILER_EMAIL,
        to: email,
        subject: `${subject}`,
        text: `${body}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
} 

module.exports = {
    sendMail,
    getEmails
}