const Joi = require('joi')

const schema = Joi.object({
    value: Joi.string()
    .required()
    .messages({
        "string.empty": "Email or username is required"
    }),
    password: Joi.string()
        .min(8)
        .max(30)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters',
            'string.max': 'Password must be at most 30 characters',
        })
        
}).options({ abortEarly: false });


const validationLogin = (req,res,next) => {
        
    const {error , value} = schema.validate(req.body)
    
    if(error){
        res.status(401).send({success:false,...error})
    }else{
        res.locals.data = req.body;
        next()
    }
}

module.exports = validationLogin