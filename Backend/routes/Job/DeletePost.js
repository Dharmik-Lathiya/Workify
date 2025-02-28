const JobSchema = require('../../models/JobSchema');
const ClientSchema = require('../../models/ClientSchema'); // Assuming clients are stored in UserSchema

const deleteJob = async (req, res) => {
    try {
        // Find the job to get the client reference
        const job = await JobSchema.findById(req.body.id);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

       
        await JobSchema.findByIdAndDelete(req.body.id);

       
        await ClientSchema.findByIdAndUpdate(
            job.clientId,
            { $pull: { postedJobs: req.body.id } }
        );

        res.status(200).json({ success: true, message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
};

module.exports = deleteJob;
