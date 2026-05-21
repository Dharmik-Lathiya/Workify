const Joi = require('joi');

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

const validationLogin = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map(d => d.message).join(', '),
      errors: error.details
    });
  }
  
  next();
};

module.exports = validationLogin;
