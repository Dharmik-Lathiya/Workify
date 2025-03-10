const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    username:String,
    email: {
        type: String
    },
    password: {
        type: String
    },
    photo:{type:String},
    address: { type: String },
    country: { type: String },
    phone: { type: Number },
    postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }],
    savedJobs:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }],
    chats: [{
        reciverid: { type: mongoose.Schema.Types.ObjectId, refPath: 'chats.reciverModel' },
        reciverModel: { type: String, enum: ['users', 'client'] }, 
        chatid: String
    }],
    notifications:[{
        reciverid: { type: mongoose.Schema.Types.ObjectId, refPath: 'notifications.reciverModel' }, 
        reciverModel: { type: String, enum: ['users', 'client'] },
        notificationType:String,
        content:String,
        role:String
        
    }]


});

module.exports = mongoose.model("client", ClientSchema);