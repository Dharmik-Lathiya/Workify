const mongoose = require('mongoose');


const JobSchema = mongoose.Schema({
    clientId:{ type: mongoose.Schema.Types.ObjectId, ref: 'client' },
    jobTitle:String,
    skills:[{type:String}],
    curtime:Date,
    type:{size:String,months:String,exp:String},
    price:{type:Number},
    desc:String,
});


module.exports = mongoose.model("Jobs",JobSchema);