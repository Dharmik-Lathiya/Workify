const UserSchema = require('../../models/UserSchema');


const educationDeleter = async (req,res) =>{

            await UserSchema.updateOne({_id:req.body.id},{$pull:{educaton:req.body.eduId}}).then(()=>{
                res.status(200).json({success:true,message:"education deleted"})
            }).catch(()=>{
                res.status(400).json({success:false,message:"something went wrong"})

            })

}

module.exports = educationDeleter
