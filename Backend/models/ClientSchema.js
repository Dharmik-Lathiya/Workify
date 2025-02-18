const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    companyName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    address:{type:String},
    country:{type:String},
    phone:{type:Number},
    empNumber:{type:String},
    website:{type:String},
    postedJobs:[{type:String}]
    

});

module.exports = mongoose.model("client",ClientSchema);