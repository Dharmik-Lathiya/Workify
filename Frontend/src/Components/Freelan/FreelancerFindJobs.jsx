import React from 'react'
import { Link } from 'react-router-dom'

export default function FreelancerFindJobs() {

  const [jobsList, SetJobList] = useState([]);
  
  return (
    <>
      <div className="max-w-6xl mx-auto mt-10 flex gap-6">
        {/* Left Sidebar (Sorting & Filters) */}
        <div className="w-1/4 bg-white p-5 rounded-lg shadow-md ">
          <h2 className="text-xl font-semibold mb-4">Filter & Sort</h2>

          {/* Sort by Hourly Rate */}
          <div className="mb-5">
            <h3 className="font-medium text-gray-700 mb-2">Hourly Rate</h3>
            <label className="flex items-center gap-2">
              <input type="radio" name="rate" className="w-4 h-4" /> $0 - $10/hr
            </label>
            <label className="flex items-center gap-2 mt-1">
              <input type="radio" name="rate" className="w-4 h-4" /> $10 - $30/hr
            </label>
            <label className="flex items-center gap-2 mt-1">
              <input type="radio" name="rate" className="w-4 h-4" /> $30 - $50/hr
            </label>
          </div>

          {/* Job Success Filter */}
          <div className="mb-5">
            <h3 className="font-medium text-gray-700 mb-2">Job Success</h3>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" /> 90% & Up
            </label>
            <label className="flex items-center gap-2 mt-1">
              <input type="checkbox" className="w-4 h-4" /> 80% & Up
            </label>
          </div>

          {/* Skills Filter */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Skills</h3>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" /> Data Entry
            </label>
            <label className="flex items-center gap-2 mt-1">
              <input type="checkbox" className="w-4 h-4" /> Web Research
            </label>
            <label className="flex items-center gap-2 mt-1">
              <input type="checkbox" className="w-4 h-4" /> Lead Generation
            </label>
          </div>
        </div>

        {/* Right Side - Developers List */}
        <div className="w-3/4 space-y-6">
          <div className="space-y-4">
            {jobsList && jobsList.map((job, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border">
                <p className="text-gray-500 text-sm">{job.date}</p>
                <div className='flex justify-between'>
                  <h3 className="font-bold text-xl text-gray-800">{job.jobTitle}</h3>
                  <button
                    className="text-red-500 focus:outline-none mr-8"
                    onClick={() => toggleSaveJob(job)}
                  >
                    <i className={savedJobs.some(saved => saved.jobTitle === job.jobTitle) ? "fas fa-heart" : "far fa-heart"}></i>
                  </button>
                </div>
                <p className="text-gray-600 text-sm mt-2">{job.desc}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-gray-700 px-3 py-1 text-xs font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    {job.verified && <i className="fas fa-check-circle"></i>}
                    <span>Payment Verified</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2 text-gray-600 text-sm">
                  <button className='' onClick={() => { createChat(job) }}>
                    Contect
                  </button>
                </div>


              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
