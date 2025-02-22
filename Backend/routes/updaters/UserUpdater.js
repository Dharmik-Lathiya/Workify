const UserSchema = require('../../models/UserSchema');


const userUpadater = async (req, res) => {


    await UserSchema.findByIdAndUpdate(req.body.id, { $set: req.body.update}).then(() => {
        res.status(200).json({ success: true, message: "updated" })
    }).catch(() => {
        res.status(400).json({ success: false, message: "something went wrong" })

    })

}
module.exports = userUpadater;