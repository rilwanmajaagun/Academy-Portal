const {schema} = require("./validation")



async function signupMiddleWare(req, res, next){
    try {
        await schema.user.validateAsync(req.body)
    } catch (error) {
        return res.status(400).json({
            error: error.details[0].message.replace(/[\"]/gi, "")
        })
    }
    next();
}

module.exports ={
    signupMiddleWare
}