const UserSchema = require('../../models/UserSchema');


const eductionUpdater = async (req,res) =>{

            const {school,field,location,country,degree,startDate,endDate,description} = req.body.update

            if(req.body.eduId){
            await UserSchema.updateOne({_id:req.body.id,"educaton._id":req.body.eduId},{  $set: { 
                "educaton.$.school": school, 
                "educaton.$.degree": degree, 
                "educaton.$.field": field, 
                "educaton.$.location": location, 
                "educaton.$.country": country, 
                "educaton.$.startDate": startDate, 
                "educaton.$.endDate": endDate, 
                "educaton.$.description":description
            }}).then(()=>{
                res.status(200).json({success:true,message:"education updated"})
            }).catch(()=>{
                res.status(400).json({success:false,message:"something went wrong"})

            })
        }else{

            await UserSchema.findByIdAndUpdate(req.body.id,{$push:{educaton:{school,field,location,country,degree,startDate,endDate,description}}}).then(()=>{
                res.status(200).json({success:true,message:"education added"})
            }).catch(()=>{
                res.status(400).json({success:false,message:"something went wrong"})

            })

        }

}

module.exports = eductionUpdater
