const UserSchema = require('../../models/UserSchema');
const ClientSchema = require('../../models/ClientSchema');


const getUsers = async (req,res) =>{

    console.log(req.params);
    
    if(req.params.type == "devloper"){
        
        const user = await UserSchema.findById(req.params.id)
        .populate('completedProject', 'jobTitle skills time type price desc files');

        res.status(200).json(user);
    }else{  
        const user = await ClientSchema.findById(req.params.id)
        .populate('postedJobs', ' jobTitle skills time type price desc files'); 
        res.status(200).json(user);
    }
            
}

module.exports = getUsers;