const routes = require('express').Router();
const validationSignup = require('../middlewares/validationSignup');
const validationLogin = require('../middlewares/vakidationLogin');
const signup = require('./auth/Signup');
const login = require('./auth/Login');
const postJob = require('./Job/PostJob')
const eductionUpdater = require('./updaters/EducationUpdater');
const portfolioUpdater = require('./updaters/PortfolioUpdater');
const experienceUpdater = require('./updaters/ExperienceUpdater');
const userUpdater = require('./updaters/UserUpdater');
const addChat = require('./chat/AddChat');
const getChat = require('./chat/getChats');
const addNotification = require('./notification/AddNotification');
const getNotification = require('./notification/getNotification');

routes.post("/signup",validationSignup,signup);
routes.post("/login",validationLogin,login);
routes.post("/postjob",postJob);
routes.post("/getchat",getChat);
routes.post("/getnotification",getNotification);

routes.put("/addeducation",eductionUpdater);
routes.put("/addportfolio",portfolioUpdater);
routes.put("/addexperience",experienceUpdater);
routes.put("/updateuser",userUpdater);
routes.put("/addchat",addChat);
routes.put("/addnotification",addNotification);

module.exports = routes