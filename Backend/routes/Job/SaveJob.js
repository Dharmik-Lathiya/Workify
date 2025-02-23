const JobSchema = require('../../models/JobSchema');
const ClientSchema = require('../../models/ClientSchema');
const UserSchema = require('../../models/UserSchema');

const saveJob = async (req, res) => {

    if (req.body.type == "devloper") {
        await UserSchema.findByIdAndUpdate(req.body.id, { $push: { savedJobs: req.body.jobId } }).then(() => {
            res.status(200).json({ success: true, message: "job saved" })
        }).catch(() => {
            res.status(400).json({ success: false, message: "something went wrong" })

        })
    } else {

        await ClientSchema.findByIdAndUpdate(req.body.id, { $push: { savedJobs: req.body.jobId } }).then(() => {
            res.status(200).json({ success: true, message: "job saved" })
        }).catch(() => {
            res.status(400).json({ success: false, message: "something went wrong" })

        })

    }
}
module.exports = saveJob