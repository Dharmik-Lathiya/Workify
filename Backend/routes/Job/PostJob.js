const mongoose = require('mongoose');
const JobSchema = require('../../models/JobSchema');


const PostJob = async (req,res) =>{

    let newJob = new JobSchema(req.body);
    let job = await newJob.save();

    if(job){
        return res.status(200).send({
             success:true,
             message:"Job posted"
         })
     }else{
         
         return res.status(400).send({success:false,message:'something went wrong '})
     }
}

module.exports = PostJob