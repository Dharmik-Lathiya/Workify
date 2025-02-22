import React, { useState } from 'react';

export default function FreelancerMainJobs() {
    const bestMatches = [
        {
            date: "Posted yesterday",
            title: "Build WordPress Website",
            desc: "Fixed-price - Entry level - Est. Budget: $100",
            skill: ["WordPress", "Web Development", "Web Design", "PHP", "HTML5"],
            country: "United States",
            proposals: 50,
            spent: 900,
            verified: true,
        },
    ];
    
    const mostRecent = [
        {
            date: "Posted today",
            title: "React.js Developer Needed",
            desc: "Hourly - Intermediate level - Est. Budget: $25/hr",
            skill: ["React.js", "JavaScript", "CSS", "Frontend"],
            country: "Canada",
            proposals: 30,
            spent: 1200,
            verified: true,
        },
    ];

    const [selectedTab, setSelectedTab] = useState('Most Recent');
    const [savedJobs, setSavedJobs] = useState([]);
    const jobsList = selectedTab === 'Best Matches' ? bestMatches : selectedTab === 'Saved Jobs' ? savedJobs : mostRecent;

    const toggleSaveJob = (job) => {
        const isJobSaved = savedJobs.some(saved => saved.title === job.title);
        if (isJobSaved) {
            setSavedJobs(savedJobs.filter(saved => saved.title !== job.title));
        } else {
            setSavedJobs([...savedJobs, job]);
        }
    };

    return (
        <>
            <div>
                <div className="relative my-6">
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                    <input
                        type="text"
                        placeholder="Search For Jobs"
                        className="border-2 rounded-[6px] pl-10 pr-3 py-2 w-full border-gray-300 focus:outline-none focus:border-slate-500"
                    />
                </div>

                <div className="flex space-x-4 mb-4">
                    <button 
                        className={`px-4 py-2 rounded-md ${selectedTab === 'Best Matches' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedTab('Best Matches')}
                    >
                        Best Matches
                    </button>
                    <button 
                        className={`px-4 py-2 rounded-md ${selectedTab === 'Most Recent' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedTab('Most Recent')}
                    >
                        Most Recent
                    </button>
                    <button 
                        className={`px-4 py-2 rounded-md ${selectedTab === 'Saved Jobs' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedTab('Saved Jobs')}
                    >
                        Saved Jobs
                    </button>
                </div>

                <div className="space-y-4">
                    {jobsList.map((job, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-md border">
                            <p className="text-gray-500 text-sm">{job.date}</p>
                            <div className='flex justify-between'>
                            <h3 className="font-bold text-xl text-gray-800">{job.title}</h3>
                            <button
                                className="text-red-500 focus:outline-none mr-8"
                                onClick={() => toggleSaveJob(job)}
                            >
                                <i className={savedJobs.some(saved => saved.title === job.title) ? "fas fa-heart" : "far fa-heart"}></i>
                            </button>
                            </div>
                            <p className="text-gray-600 text-sm mt-2">{job.desc}</p>

                            <div className="flex flex-wrap gap-2 mt-3">
                                {job.skill.map((skill, idx) => (
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
                                <span>
                                    ${job.spent}+ spent
                                </span>
                            </div>

                            <div className="flex justify-between items-center mt-2 text-gray-600 text-sm">
                                <span>
                                    Proposals: {job.proposals}
                                </span>
                                <span>
                                    <i className="fas fa-map-marker-alt"></i> {job.country}
                                </span>
                            </div>

                           
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
