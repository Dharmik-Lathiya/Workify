const Joi = require('joi');

const schema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'First name is required',
    'string.min': 'First name must be at least 2 characters',
    'string.max': 'First name must be at most 50 characters'
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Last name is required',
    'string.min': 'Last name must be at least 2 characters',
    'string.max': 'Last name must be at most 50 characters'
  }),
  username: Joi.string().min(5).max(50).required().messages({
    'string.empty': 'Username is required',
    'string.min': 'Username must be at least 5 characters',
    'string.max': 'Username must be at most 50 characters'
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
  type: Joi.string().valid('developer', 'client').default('developer')
}).options({ abortEarly: false, allowUnknown: true });

const validationSignup = (req, res, next) => {
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

module.exports = validationSignup;
