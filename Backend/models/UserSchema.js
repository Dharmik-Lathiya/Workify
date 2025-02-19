const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    skills:[{type:String}],
    title:{type:String},
    password:{
        type:String
    },
    photo:{type:String},
    dob:{type:Date},
    address:{type:String},
    country:{type:String},
    phone:{type:Number},
    languages:[{
        lang:String,
        proficiency:String
    }],
    bio:{type:String},
    price:{type:Number},
    experience:[{
        title:String,
        company:String,
        location:{type:String},
        startDate:Date,
        endDate:Date,
        desc:String,

    }],
    educaton:[{
        school:String,
        degree:String,
        startDate:Number,
        endDate:Number,
        desc:String
    }],
    portfolio:[{
        title:String,
        role:String,
        desc:String,
        urls:[{type:String}],
        thumbnail:{type:String}
    }],
    completedProject:[{type:String}]


});

module.exports = mongoose.model("users",userSchema);