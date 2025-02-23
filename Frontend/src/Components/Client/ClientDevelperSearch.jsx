import React from "react";
import { Link } from "react-router-dom";

export default function ClientDeveloperSearch() {
  const developers = [
    {
      id: 1,
      name: "Kemar J.",
      title: "Lead Generation Expert, Email Researcher and List Builder, Data Entry",
      hourlyRate: "$15/hr",
      jobSuccess: "95%",
      earnings: "$50k+",
      skills: ["Lead Generation", "Data Entry", "Data Mining", "Email Research"],
      profileImage: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "AJ R.",
      title: "Data Entry | LinkedIn lead generation | Web Research | List Building",
      hourlyRate: "$7/hr",
      jobSuccess: "85%",
      earnings: "$25k+",
      skills: ["Data Entry", "Web Research", "List Building", "Data Scraping"],
      profileImage: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Ruben V.",
      title: "Certified Facebook Ads & Google Ads Expert | Meta | Adwords | PPC",
      hourlyRate: "$20/hr",
      jobSuccess: "100%",
      earnings: "$100k+",
      skills: ["Google Ads", "Meta Ads", "Adwords", "PPC"],
      profileImage: "https://via.placeholder.com/100",
    },
    {
      id: 4,
      name: "Muhammed M.",
      title: "Dropshipping | Shopify | SMM | VA | Customer Care | DMCA",
      hourlyRate: "$9/hr",
      jobSuccess: "90%",
      earnings: "$30k+",
      skills: ["Shopify", "Virtual Assistant", "Customer Support"],
      profileImage: "https://via.placeholder.com/100",
    },
  ];

  return (
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
        {developers.map((developer) => (
          <div
            key={developer.id}
            className="bg-white p-5 rounded-lg shadow-md flex items-center justify-between "
          >
            <div className="flex items-center gap-4">
              <img
                src={developer.profileImage}
                alt={developer.name}
                className="w-16 h-16 rounded-full border"
              />
              <div>
                <h2 className="text-lg font-bold">{developer.name}</h2>
                <p className="text-sm text-gray-600">{developer.title}</p>
                <p className="text-sm mt-1 text-gray-500">
                  💰 {developer.earnings} | 🎯 {developer.jobSuccess} Job Success
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {developer.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 px-2 py-1 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Link to={`/client/developer-profile/${developer.id}`} className="px-4 py-2 bg-green-500 text-white rounded-lg">
              Invite to Job
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
