const mongoose = require('mongoose');
const JobSchema = require('../../models/JobSchema');
const ClientSchema = require('../../models/ClientSchema');


const PostJob = async (req,res) =>{

    const date = new Date()
    let newJob = new JobSchema({...req.body,curtime:date.toUTCString()});
    let job = await newJob.save();

    if(job){
        console.log(job);
         await ClientSchema.findByIdAndUpdate(req.body.clientId,{$push:{postedJobs:job._id}})
        return res.status(200).send({
             success:true,
             message:"Job posted"
         })
     }else{
         
         return res.status(400).send({success:false,message:'something went wrong '})
     }
}

module.exports = PostJob