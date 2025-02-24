const UserSchema = require('../../models/UserSchema');
const Fuse = require("fuse.js");



const searchUser = async (req, res) => {
    const users = await UserSchema.find({});

    const options = {
        keys: ["firstName", "lastName", "username"],
        threshold: 0.3,
        distance: 100,
    };


    const fuse = new Fuse(users, options);
    let result = fuse.search(req.body.query); 

    result = result.map((user) => user.item);

    if(result){

        return res.status(404).json({success:false , message:"no users found"})
    }
    res.status(200).json({users:result})


}

module.exports = searchUser;