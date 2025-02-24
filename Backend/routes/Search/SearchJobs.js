const JobSchema = require('../../models/JobSchema');
const Fuse = require("fuse.js");


const searchJobs = async (req,res) =>{
    const jobs = await JobSchema.find({});
    const options = {
        keys: ["title", "skills"], 
        threshold: 0.5, 
        distance: 100, 
      };

      const fuse = new Fuse(jobs, options);
      let result = fuse.search(req.body.query); 

      result = result.map((job) => job.item);

      if(!result){

        return res.status(404).json({success:false , message:"no jobs found"})
    }

      res.status(200).json({jobs:result})

}
module.exports = searchJobs