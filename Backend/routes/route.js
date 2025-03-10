const routes = require('express').Router();
const validationSignup = require('../middlewares/validationSignup');
const validationLogin = require('../middlewares/vakidationLogin');
const signup = require('./auth/Signup');
const login = require('./auth/Login');
const postJob = require('./Job/PostJob');
const saveJob = require('./Job/SaveJob');
const eductionUpdater = require('./updaters/EducationUpdater');
const portfolioUpdater = require('./updaters/PortfolioUpdater');
const experienceUpdater = require('./updaters/ExperienceUpdater');
const userUpdater = require('./updaters/UserUpdater');
const addChat = require('./chat/AddChat');
const getChat = require('./chat/getChats');
const addNotification = require('./notification/AddNotification');
const getNotification = require('./notification/getNotification');
const getUser = require('./getters/getUser');
const educationDeleter = require('./deleter/EducationDeleter');
const experienceDeleter = require('./deleter/ExperienceDeleter');
const portfolioDeleter = require('./deleter/PortfolioDeleter');
const getRecentJobs = require('./getters/getRecentJobs');
const getBestMatches = require('./getters/getBestMatch');
const getSavedJobs = require('./getters/getSavedJobs');
const Verification = require('./auth/Verification');
const searchJobs = require('./Search/SearchJobs');
const searchUser = require('./Search/SearchUser');
const updatepost = require('./Job/UpdateJobs');
const deleteJob = require('./Job/DeletePost');





routes.get("/getuser/:type/:id",getUser);
routes.get("/",(req,res)=>{
            res.send("hii")
});     

routes.post("/verification",Verification);
routes.post("/getsavedpost",getSavedJobs);
routes.post("/getrecentjobs",getRecentJobs);
routes.post("/getbestmatches",getBestMatches);
routes.post("/searchjobs",searchJobs);
routes.post("/searchusers",searchUser);
routes.post("/signup",validationSignup,signup);
routes.post("/login",validationLogin,login);
routes.post("/postjob",postJob);
routes.post("/savejob",saveJob);
routes.post("/getchat",getChat);
routes.post("/getnotification",getNotification);

routes.put("/addeducation",eductionUpdater);
routes.put("/addportfolio",portfolioUpdater);
routes.put("/addexperience",experienceUpdater);
routes.put("/updateuser",userUpdater);
routes.put("/addchat",addChat);
routes.put("/addnotification",addNotification);
routes.put("/updatejob",updatepost);

routes.delete("/deleteeducation",educationDeleter);
routes.delete("/deleteexperience",experienceDeleter);
routes.delete("/deleteportfolio",portfolioDeleter);
routes.delete("/deletejob",deleteJob);

module.exports = routes