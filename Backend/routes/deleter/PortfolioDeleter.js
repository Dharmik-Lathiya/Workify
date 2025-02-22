const UserSchema = require('../../models/UserSchema');


const portfolioDeleter = async (req,res) =>{


                await UserSchema.updateOne({_id:req.body.id} , {$pull:{educaton:req.body.portfolioId}}).then(()=>{
                    res.status(200).json({success:true,message:"portfolio deleted"})
                }).catch(()=>{
                    res.status(400).json({success:false,message:"something went wrong"})
    
                })

          
}

module.exports = portfolioDeleter
