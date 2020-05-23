const {schema} = require("./validation")



async function signupMiddleWare(req, res, next){
    try {
        await schema.user.validateAsync(req.body)
    } catch (error) {
        return res.status(400).json({
            error: error.details[0].message.replace(/[\]["]/gi, "")
        })
    }
    next();
}

async function loginMiddleWare(req, res, next){
    try {
        await schema.login.validate(req.body)
    } catch (error) {
        return res.status(400).json({
            error: error.details[0].message.replace(/[\"]/gi, "")
        })
    }
    next();
}
async function applicationMiddleWare(req, res, next){
    try {
        await schema.application.validateAsync(req.body)
    } catch (error) {
        return res.status(400).json({
            error: error.details[0].message.replace(/[\]["]/gi, "")
        })
    }
    next();
}

const getUserApplicationMiddleware = (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
        return res.status(400).json({
            message: "Id must be an integer",
        });
    }
    next();
}

async function createapplicationMiddleWare(req, res, next){
    try {
        await schema.createApplication.validateAsync(req.body)
    } catch (error) {
        return res.status(400).json({
            error: error.details[0].message.replace(/[\]["]/gi, "")
        })
    }
    next();
}

module.exports ={
    signupMiddleWare,
    loginMiddleWare,
    applicationMiddleWare,
    getUserApplicationMiddleware,
    createapplicationMiddleWare
}