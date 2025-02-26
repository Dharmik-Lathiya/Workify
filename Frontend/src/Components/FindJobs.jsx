import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import { data, useParams } from 'react-router-dom';

export default function FindJobs() {
  const [jobsList, setJobList] = useState([]);

  const [loading, setLoading] = useState(true)
  const { searchQuery } = useParams();
  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_APP_BACKEND_URL + "/searchjobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: searchQuery })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched jobs:", data);
        setJobList(Array.isArray(data) ? data : Array.isArray(data.jobs) ? data.jobs : []);
      })
      .catch(err => {
        console.error("Error fetching jobs:", err);
        setJobList([]);
      })
      .finally(() => setLoading(false));
  }, [searchQuery]);

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
          {/* Job Listings */}
          {/* <div className="w-3/4 space-y-6">
            {jobsList.length > 0 ? (
              jobsList.map((job, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md border">
                  <p className="text-gray-500 text-sm">{job.date}</p>
                  <h3 className="font-bold text-xl text-gray-800">{job.jobTitle}</h3>
                  <p className="text-gray-600 text-sm mt-2">{job.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.skills && job.skills.map((skill, idx) => (
                      <span key={idx} className="bg-gray-200 text-gray-700 px-3 py-1 text-xs font-medium rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between mt-4 text-gray-600 text-sm">
                    <p>Experience: <span className='font-bold'>{job?.type?.exp || "N/A"}</span></p>
                    <p>Price: <span className='font-bold'>₹{job?.type?.price || "N/A"}</span></p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No jobs found</p>
            )}
          </div> */}

          <div className="w-[100%] ">
            {loading ? (
              <p className="text-center text-gray-500">Loading jobs...</p>
            ) : jobsList.length === 0 ? (
              <p className="text-center text-gray-500">No jobs found.</p>
            ) : (
              jobsList.map((job, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md border my-4">
                  <p className="text-gray-500 text-sm">{job.date}</p>
                  <h3 className="font-bold text-xl text-gray-800">{job.jobTitle}</h3>
                  <p className="text-gray-600 text-sm mt-2">{job.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.skills && job.skills.map((skill, idx) => (
                      <span key={idx} className="bg-gray-200 text-gray-700 px-3 py-1 text-xs font-medium rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4 text-gray-600 text-sm text-[15px]">
                    <div>
                      <p className='font-medium'>Experence Requried: <span className='font-bold'>{job.type.exp}</span></p>
                    </div>
                    <div>
                      <p className='font-medium'>Project Sized: <span className='font-bold'>{job.type.size}</span></p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2 text-gray-600 text-sm text-[15px]">
                    <div>
                      <p className='font-medium'>Project Price: <span className='font-bold '>₹{job.type.price}</span></p>
                    </div>
                    <div>
                      <p className='font-medium'>Project Completion Time: <span className='font-bold'>{job.type.time}</span></p>
                    </div>
                    <button className=' bg-green-600 text-white p-2 rounded ' onClick={() => { createChat(job) }}>
                      Message
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  )
}
