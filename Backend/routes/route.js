const routes = require('express').Router();
const validationSignup = require('../middlewares/validationSignup');
const validationLogin = require('../middlewares/vakidationLogin');
const signup = require('./auth/Signup');
const login = require('./auth/Login');

routes.post("/signup",validationSignup,signup);
routes.post("/login",validationLogin,login);

module.exports = routes