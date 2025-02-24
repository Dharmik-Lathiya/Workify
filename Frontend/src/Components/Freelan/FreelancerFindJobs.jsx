import React from 'react'
import { Link } from 'react-router-dom'

export default function FreelancerFindJobs() {
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
        
      </div>
    </div>
    </>
  )
}
