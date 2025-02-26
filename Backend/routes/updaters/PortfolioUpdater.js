const UserSchema = require('../../models/UserSchema');


const portfolioUpdater = async (req,res) =>{

            const {title,role,desc,urls,thumbnail} = req.body.update

            console.log(req.body.portfolioId);
            
            if(req.body.portfolioId){

                await UserSchema.updateOne({_id:req.body.id,"portfolio._id":req.body.portfolioId},{  $set: { 
                    "portfolio.$.title": title, 
                    "portfolio.$.role": role, 
                    "portfolio.$.desc": desc, 
                    "portfolio.$.urls": urls, 
                    "portfolio.$.thumbnail":thumbnail
                }}).then(()=>{
                    res.status(200).json({success:true,message:"portfolio added"})
                }).catch(()=>{
                    res.status(400).json({success:false,message:"something went wrong"})
    
                })

            }
            else{
            await UserSchema.findByIdAndUpdate(req.body.id,{$push:{portfolio:{title,role,desc,urls,thumbnail}}}).then(()=>{
                res.status(200).json({success:true,message:"portfolio added"})
            }).catch(()=>{
                res.status(400).json({success:false,message:"something went wrong"})

            })
        }
}

module.exports = portfolioUpdater
