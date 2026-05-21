const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
    jobTitle: String,
    skills: [{ type: String }],
    curtime: { type: Date, default: Date.now },
    time: String,
    price: Number,
    desc: String,
    type: {
        size: String,
        time: String,
        exp: String,
        price: Number,
        desc: String
    },
    files: [String],
    category: String,
    location: String
}, { timestamps: true });

module.exports = mongoose.model("Jobs", JobSchema);
