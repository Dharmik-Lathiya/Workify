const UserSchema = require('../../models/UserSchema');


const eductionUpdater = async (req,res) =>{

            const {school,degree,startDate,endDate,desc} = req.body

            if(req.body.eduId){
            await UserSchema.updateOne({_id:req.body.id,"educaton._id":req.body.eduId},{$set:{educaton:{school,degree,startDate,endDate,desc}}}).then(()=>{
                res.status(200).json({success:true,message:"education updated"})
            }).catch(()=>{
                res.status(400).json({success:false,message:"something went wrong"})

            })
        }else{

            await UserSchema.findByIdAndUpdate(req.body.id,{$push:{educaton:{school,degree,startDate,endDate,desc}}}).then(()=>{
                res.status(200).json({success:true,message:"education added"})
            }).catch(()=>{
                res.status(400).json({success:false,message:"something went wrong"})

            })

        }

}

module.exports = eductionUpdater
