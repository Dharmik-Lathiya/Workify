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
    street: String,
    apt: String,
    city: String,
    state: String,
    zip: String,    
    country: { type: String },
    phone: { type: Number },
    languages: [{
        name: String,
        proficiency: String
    }],
    bio: { type: String },
    price: { type: Number },
    experience: [{
        title: String,
        company: String,
        location:String ,
        country:String ,
        startDate: {month:String,year:String},
        endDate: {month:String,year:String},
        description: String,
        currentRole:Boolean

    }],
    educaton: [{
        school: String,
        degree: String,
        country: String,
        field: String,
        location:String ,
        startDate: {month:String,year:String},
        endDate: {month:String,year:String},
        description: String
    }],
    portfolio: [{
        title: String,
        role: String,
        desc: String,
        urls:  String ,
        thumbnail:String 
    }],
    completedProject: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }],
    savedJobs:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }],
    chats: [{
        reciverid: { type: mongoose.Schema.Types.ObjectId, refPath: 'chats.reciverModel' }, 
        reciverModel: { type: String, enum: ['users', 'client'] }, 
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