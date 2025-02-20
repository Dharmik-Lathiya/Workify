const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    skills: [{ type: String }],
    title: { type: String },
    password: {
        type: String
    },
    photo: { type: String },
    dob: { type: Date },
    address: { type: String },
    country: { type: String },
    phone: { type: Number },
    languages: [{
        lang: String,
        proficiency: String
    }],
    bio: { type: String },
    price: { type: Number },
    experience: [{
        title: String,
        company: String,
        location: { type: String },
        startDate: Date,
        endDate: Date,
        desc: String,

    }],
    educaton: [{
        school: String,
        degree: String,
        startDate: Number,
        endDate: Number,
        desc: String
    }],
    portfolio: [{
        title: String,
        role: String,
        desc: String,
        urls: [{ type: String }],
        thumbnail: { type: String }
    }],
    completedProject: [{ type: String }],
    chats: [{
        reciverid: { type: mongoose.Schema.Types.ObjectId, refPath: 'chats.reciverModel' }, // Dynamic ref
        reciverModel: { type: String, enum: ['users', 'client'] }, // Model type (User or Client)
        chatid: String
    }],
    notifications: [{
        reciverid: { type: mongoose.Schema.Types.ObjectId, refPath: 'notifications.reciverModel' },
        reciverModel: { type: String, enum: ['users', 'client'] },
        notificationType: String,
        content: String,
        role:String

    }]

});

module.exports = mongoose.model("users", userSchema);