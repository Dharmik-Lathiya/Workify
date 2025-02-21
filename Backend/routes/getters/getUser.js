const UserSchema = require('../../models/UserSchema');
const ClientSchema = require('../../models/ClientSchema');


const getUsers = async (req,res) =>{

    if(req.params.type == "devloper"){
        
        const user = await UserSchema.findById(req.params.id)
        .populate('completedProject', 'title skills time type price desc files'); // Select only needed fields

        res.status(200).json(user);
    }else{  
        const user = await ClientSchema.findById(req.params.id)
        .populate('postedJobs', 'title skills time type price desc files'); // Select only needed fields
        res.status(200).json(user);
    }
            
}

module.exports = getUsers;