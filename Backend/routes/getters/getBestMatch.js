const JobSchema = require('../../models/JobSchema')

const getBestMatches = async (req,res) => {
    const {skills} = req.body

    const jobs = await JobSchema.aggregate([
      {
        $addFields: {
          matchCount: { $size: { $setIntersection: ["$skills", skills] } }
        }
      },
      { $sort: { matchCount: -1 } }
    ]);
  
    if(jobs){
        res.status(200).json(jobs);
      }else{
        res.status(400).json({message:"something went wrong"})
      }

  };

  module.exports  = getBestMatches