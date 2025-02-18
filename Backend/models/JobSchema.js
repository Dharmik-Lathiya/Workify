const mongoose = require('mongoose');


const JobSchema = mongoose.Schema({
    title:String,
    skills:[{type:String}],
    time:Date,
    type:{size:String,months:String,exp:String},
    price:{type:String,price:Number},
    desc:String,
    files:[{type:String}]
});


module.exports = mongoose.Model("Jobs",JobSchema);