const userSchema = require('../../models/UserSchema');
const clientSchema = require("../../models/ClientSchema")
const bcrypt = require('bcrypt');

const Signup = async (req,res) =>{

  
    let IsAlredyLogedIn;
     if (res.locals.data.type == "devloper") {
             IsAlredyLogedIn = await userSchema.findOne({email:res.locals.data.email});
    
        } else {
    
             IsAlredyLogedIn = await clientSchema.findOne({email:res.locals.data.email});
        }

    if(!IsAlredyLogedIn){

        await bcrypt.hash(res.locals.data.password, 10).then((hash)=>{
            res.locals.data.password = hash;
        })
        

        if(res.locals.data.type == "devloper"){
            newUser = new userSchema(res.locals.data);
            
        }else{
            
            newUser = new clientSchema(res.locals.data);
        }
        const user = await newUser.save()

        if(user){
           return res.status(200).send({
                success:true,
                message:"sign up successfull",
                _id:user._id
            })
        }else{
            
            return res.status(400).send({success:false,message:'something went wrong '})
        }

    }else{
        return res.status(400).send({success:false,message:'user already exists'})
    }
}

module.exports = Signup