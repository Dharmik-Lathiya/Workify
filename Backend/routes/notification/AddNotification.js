const UserSchema = require('../../models/UserSchema');
const ClientSchema = require('../../models/ClientSchema');



const addNotification = async (req, res) => {



    // "userId/clientId reciverid  model recivermodel chatid"

    console.log(req.body)
    
    let sender;
    if (req.body.userId) {

        sender = req.body.userId;
        await UserSchema.updateOne({ _id: req.body.userId }, { $push: { notifications: { reciverid: req.body.reciverid, reciverModel: req.body.recivermodel,notificationType:req.body.notificationType,content:req.body.content,role:req.body.role } } }).catch(() => {
            res.status(400).json({ success: false, message: "something went wrong" })
        })


    } else {
        sender = req.body.clientId;

        await ClientSchema.updateOne({ _id: req.body.clientId }, { $push: { notifications: { reciverid: req.body.reciverid,reciverModel: req.body.recivermodel,notificationType:req.body.notificationType,content:req.body.content,role:req.body.role} } }).catch(() => {
            res.status(400).json({ success: false, message: "something went wrong" })
        })

    }

    if(req.body.recivermodel == 'users'){
        await UserSchema.updateOne({ _id: req.body.reciverid }, { $push: { notifications: { reciverid:sender, reciverModel: req.body.model,notificationType:req.body.notificationType,content:req.body.content} } }).then(() => {

            res.status(200).json({ success: true, message: "notification added" })

        }).catch(() => {
            res.status(400).json({ success: false, message: "something went wrong" })
        })
    }else{
        await ClientSchema.updateOne({ _id: req.body.reciverid }, { $push: { notifications: { reciverid:sender, reciverModel: req.body.model,notificationType:req.body.notificationType,content:req.body.content} } }).then(()=>{
            res.status(200).json({ success: true, message: "notification added" })

        }).catch(() => {
            res.status(400).json({ success: false, message: "something went wrong" })
        })
    }







}

module.exports = addNotification;