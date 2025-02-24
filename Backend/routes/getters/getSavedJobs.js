const UserSchema = require('../../models/UserSchema');


const getSavedJobs = async (req, res) => {
    const user = await UserSchema.findById(req.body.id)
        .populate('savedJobs', 'title skills curtime type price desc'); 

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user.savedJobs);
}
module.exports = getSavedJobs