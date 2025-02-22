const userSchema = require('../../models/UserSchema');
const clientSchema = require("../../models/ClientSchema")

const bcrypt = require('bcrypt');

const Login = async (req, res) => {
    let type ="devloper"
    let ExistingUser = await userSchema.findOne({ $or:[{email:req.body.value},{username:req.body.value}] });
    if (!ExistingUser) {
        type ="client"
        ExistingUser = await clientSchema.findOne({ $or:[{email:req.body.value},{username:req.body.value}] });
    } 

    if (ExistingUser) {

        const match = await bcrypt.compare(res.locals.data.password, ExistingUser.password);
        if (match) {

            res.status(200).send({
                success: true,
                message: "login successfull",
                type:type,
                _id:ExistingUser._id
            })



        } else {
            res.status(400).send({
                success: false,
                message: "Password is wrong",
            })
        }


    } else {
        return res.status(400).send({ success: false, message: 'user does not exists' })
    }
}

module.exports = Login