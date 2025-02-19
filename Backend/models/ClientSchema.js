const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    companyName: {
        type: String
    },
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
    empNumber: { type: String },
    website: { type: String },
    postedJobs: [{ type: String }],
    chats: [{
        reciverid: { type: mongoose.Schema.Types.ObjectId, refPath: 'chats.reciverModel' }, // Dynamic ref
        reciverModel: { type: String, enum: ['users', 'client'] }, // Model type (User or Client)
        chatid: String
    }]


});

module.exports = mongoose.model("client", ClientSchema);