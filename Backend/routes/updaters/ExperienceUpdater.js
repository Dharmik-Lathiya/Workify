const UserSchema = require('../../models/UserSchema');
const mongoose = require('mongoose');


const experienceUpdater = async (req,res) =>{

            const {title,company,location,country,startDate,endDate,description,currentRole} = req.body.update  

            
            if(req.body.expId){
                await UserSchema.updateOne({_id:req.body.id,"experience._id":req.body.expId},{  $set: { 
                    "experience.$.title": title, 
                    "experience.$.company": company, 
                    "experience.$.location": location, 
                    "experience.$.country": country, 
                    "experience.$.startDate": startDate, 
                    "experience.$.endDate": endDate, 
                    "experience.$.description":description,
                    "experience.$.currentRole":currentRole,
                }}).then(()=>{
                    res.status(200).json({success:true,message:"experience updated"})
                }).catch(()=>{
                    res.status(400).json({success:false,message:"something went wrong"})
    
                })
            }else{
            await UserSchema.findByIdAndUpdate(req.body.id,{$push:{experience:{title,company,location,company,startDate,endDate,description,currentRole}}}).then(()=>{
                res.status(200).json({success:true,message:"experience added"})
            }).catch(()=>{
                res.status(400).json({success:false,message:"something went wrong"})

            })
        }

}

module.exports = experienceUpdater;


