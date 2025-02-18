const Joi = require('joi')

const schema = Joi.object({
    firstName: Joi.string().min(5).max(50).required().messages({
        'string.empty':'First name is required',
        'string.min': 'First name must be at least 2 characters',
        'string.max': 'First name must be at most 50 characters'
    }),
    
    lastName: Joi.string().min(5).max(50).required().messages({
        'string.empty': 'Last name is required',
        'string.min': 'Last name must be at least 2 characters',
        'string.max': 'Last name must be at most 50 characters'
    }),
    username: Joi.string().min(5).max(50).required().messages({
        'string.empty': 'username is required',
        'string.min': 'username must be at least 2 characters',
        'string.max': 'username must be at most 50 characters'
    }),
    
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


const validationSignup = (req,res,next) => {

    console.log(res.body);
    
    const {error , value} = schema.validate(req.body)
    
    if(error){
        res.status(401).send({success:false,...error})
    }else{
        res.locals.data = req.body;
        next()
    }
}

module.exports = validationSignup