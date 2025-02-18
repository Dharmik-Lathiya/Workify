const userSchema = require('../../models/UserSchema');
const clientSchema = require("../../models/ClientSchema")

const bcrypt = require('bcrypt');

const Login = async (req, res) => {

    let ExistingUser;
    if (res.locals.data.type == "devloper") {
        ExistingUser = await userSchema.findOne({ email: res.locals.data.email });

    } else {

        ExistingUser = await clientSchema.findOne({ email: res.locals.data.email });
    }

    if (ExistingUser) {

        const match = await bcrypt.compare(res.locals.data.password, ExistingUser.password);
        if (match) {

            res.status(200).send({
                success: true,
                message: "login successfull",

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