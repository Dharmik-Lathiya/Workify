const UserSchema = require('../../models/UserSchema');
const ClientSchema = require('../../models/ClientSchema');



const addChat = async (req, res) => {



    // "userId/clientId reciverid  model recivermodel chatid"
    let sender;
    if (req.body.userId) {

        sender = req.body.userId;
        await UserSchema.updateOne({ _id: req.body.userId }, { $push: { chats: { reciverid: req.body.reciverid, reciverModel: req.body.recivermodel, chatid: req.body.chatId } } }).catch(() => {
            res.status(400).json({ success: false, message: "something went wrong" })
        })


    } else {
        sender = req.body.clientId;

        await ClientSchema.updateOne({ _id: req.body.clientId }, { $push: { chats: { reciverid: req.body.reciverid,reciverModel: req.body.recivermodel, chatid: req.body.chatId } } }).catch(() => {
            res.status(400).json({ success: false, message: "something went wrong" })
        })

    }

    if(req.body.recivermodel == 'users'){
        await UserSchema.updateOne({ _id: req.body.reciverid }, { $push: { chats: { reciverid:sender, reciverModel: req.body.model, chatid: req.body.chatId } } }).then(() => {

            res.status(400).json({ success: true, message: "chat added" })

        }).catch(() => {
            res.status(400).json({ success: false, message: "something went wrong" })
        })
    }else{
        await ClientSchema.updateOne({ _id: req.body.reciverid }, { $push: { chats: { reciverid:sender, reciverModel: req.body.model, chatid: req.body.chatId } } }).then(()=>{
            res.status(400).json({ success: true, message: "chat added" })

        }).catch(() => {
            res.status(400).json({ success: false, message: "something went wrong" })
        })
    }







}

module.exports = addChat;