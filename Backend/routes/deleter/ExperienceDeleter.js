const UserSchema = require('../../models/UserSchema');
const mongoose = require('mongoose');


const experienceDeleter= async (req,res) =>{

        
                await UserSchema.updateOne({_id:req.body.id} , {$pull:{educaton:req.body.expId}}).then(()=>{
                    res.status(200).json({success:true,message:"experience deleted"})
                }).catch(()=>{
                    res.status(400).json({success:false,message:"something went wrong"})
    
                })
}



module.exports = experienceDeleter;


