const UserSchema = require('../../models/UserSchema');
const ClientSchema = require('../../models/ClientSchema');


const getNotification = async (req,res) => {

        console.log(req.body)
        
        if(req.body.type){
            try {
                const user = await UserSchema.findById(req.body.id)
                    .populate('notifications.reciverid', 'firstName lastName username email photo'); // Select only needed fields
        
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
        
                res.json(user.notifications);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }else{

            try {
                const user = await ClientSchema.findById(req.body.id)
                    .populate('notifications.reciverid', 'firstName lastName username email photo'); // Select only needed fields
        
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
        
                res.json(user.notifications);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            

        }
}
module.exports = getNotification;