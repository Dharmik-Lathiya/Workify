const Joi = require('joi')

const schema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Invalid email format'
    }),
    
    password: Joi.string()
        .min(8)
        .max(30)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters',
            'string.max': 'Password must be at most 30 characters',
        }),
        type:Joi.string()
        
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