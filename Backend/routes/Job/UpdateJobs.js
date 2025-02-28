const UserSchema = require('../../models/UserSchema');
const JobSchema = require('../../models/JobSchema')

const jobUpdater = async (req,res) =>{

            
            await JobSchema.findByIdAndUpdate(req.body.id,{  $set: { 
                ...req.body.update
            }}).then(()=>{
                res.status(200).json({success:true,message:"post updated"})
            }).catch(()=>{
                res.status(400).json({success:false,message:"something went wrong"})

            })
      

}

module.exports = jobUpdater
