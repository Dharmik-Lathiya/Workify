import React from "react";
import { useParams } from "react-router-dom";

export default function DeveloperProfile() {
  const { id } = useParams(); // Get ID from URL

  // Developers Data
  const developers = [
    {
      id: 1,
      name: "Vijay P.",
      location: "Umarkhi, India",
      localTime: "12:53 AM",
      jobSuccess: "100%",
      totalEarnings: "$90k+",
      hourlyRate: "$25.00/hr",
      availability: "More than 30 hrs/week",
      languages: ["English: Fluent", "Gujarati: Fluent", "Hindi: Fluent"],
      verified: true,
      associatedWith: "AddatechWeb",
      skills: ["ASP.NET Core", "C#", "SQL Server", "Web API"],
      workHistory: [
        { title: "ASP.NET Developer", rating: 5.0, date: "2021-2022", review: "Great work!", earnings: "$5,000" },
      ],
    },
    {
      id: 2,
      name: "Kemar J.",
      location: "Kingston, Jamaica",
      localTime: "2:00 PM",
      jobSuccess: "95%",
      totalEarnings: "$50k+",
      hourlyRate: "$15.00/hr",
      availability: "Less than 20 hrs/week",
      languages: ["English: Fluent"],
      verified: false,
      associatedWith: "Freelance",
      skills: ["Lead Generation", "Data Entry"],
      workHistory: [{ title: "Lead Generator", rating: 4.9, date: "2020-2021", review: "Awesome lead generation!", earnings: "$3,500" }],
    },
  ];

  // Find developer based on ID
  const developer = developers.find((dev) => dev.id === parseInt(id));

  // Show error if developer not found
  if (!developer) return <h2 className="text-center mt-10 text-red-500">Developer Not Found</h2>;

  return (
    <div className="max-w-6xl mx-auto mt-10 flex gap-6">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white p-5 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Profile Details</h3>
        <p className="text-gray-600">💼 <strong>Associated With:</strong> {developer.associatedWith}</p>
        <p className="text-gray-600">🎯 <strong>Job Success:</strong> {developer.jobSuccess}%</p>
        <p className="text-gray-600">✅ {developer.verified ? "Verified" : "Not Verified"}</p>
        <h3 className="mt-4 text-lg font-semibold">Languages</h3>
        <ul className="list-disc ml-5 text-gray-600">
          {developer.languages.map((lang, index) => (
            <li key={index}>{lang}</li>
          ))}
        </ul>
      </div>

      {/* Right Side (Main Profile) */}
      <div className="w-3/4 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="https://via.placeholder.com/80" alt={developer.name} className="w-20 h-20 rounded-full border" />
            <div>
              <h2 className="text-2xl font-bold">{developer.name} <span className="text-blue-500">✔</span></h2>
              <p className="text-sm text-gray-500">{developer.location} – {developer.localTime} local time</p>
              <p className="text-green-600 font-semibold">⭐ {developer.jobSuccess}% Job Success</p>
            </div>
          </div>
          <button className="px-5 py-2 bg-green-500 text-white rounded-lg">Hire</button>
        </div>

        {/* Work History */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Work History</h3>
          {developer.workHistory.map((job, index) => (
            <div key={index} className="p-4 border rounded-lg mb-3">
              <h4 className="font-bold">{job.title}</h4>
              <p className="text-sm text-gray-500">{job.date}</p>
              <p className="text-yellow-500 font-bold">⭐ {job.rating}</p>
              <p className="text-gray-700 italic">"{job.review}"</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {developer.skills.map((skill, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-xs">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
