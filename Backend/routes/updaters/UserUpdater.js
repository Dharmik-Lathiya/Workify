const UserSchema = require('../../models/UserSchema');
const ClienttSchmea = require("../../models/ClientSchema")

const userUpadater = async (req, res) => {


    if (req.body.type == "user") {
        await UserSchema.findByIdAndUpdate(req.body.id, { $set: req.body.update }).then(() => {
            res.status(200).json({ success: true, message: "updated" })
        }).catch(() => {
            res.status(400).json({ success: false, message: "something went wrong" })

        })
    } else {

        await ClienttSchmea.findByIdAndUpdate(req.body.id, { $set: req.body.update }).then(() => {
            res.status(200).json({ success: true, message: "updated" })
        }).catch(() => {
            res.status(400).json({ success: false, message: "something went wrong" })

        })

    }

}
module.exports = userUpadater;