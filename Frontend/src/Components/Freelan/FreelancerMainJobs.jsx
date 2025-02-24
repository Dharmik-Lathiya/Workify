import React, { useContext, useEffect, useState } from 'react';
import { UserDetailsContext } from "../../Context/UserDetailsContext.jsx";
import { Link } from 'react-router-dom';

export default function FreelancerMainJobs() {


    const { userDetails, userId } = useContext(UserDetailsContext);
    const [selectedTab, setSelectedTab] = useState('getsavedpost');
    const [savedJobs, setSavedJobs] = useState([]);
    const [jobsList, SetJobList] = useState([]);
    const [flag, setFlag] = useState(true);

    const toggleSaveJob = (job) => {

        const isJobSaved = savedJobs.some(saved => saved.jobTitle === job.jobTitle);
        if (isJobSaved) {
            setSavedJobs(savedJobs.filter(saved => saved.jobTitle !== job.jobTitle));
            fetch(import.meta.env.VITE_APP_BACKEND_URL + "/savejob", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: userId,
                    jobId: job._id,
                    type: "delete",

                })
            }).then((res) => {
                res.json().then(data => {
                    console.log(data);

                })
            }).catch()
        } else {
            setSavedJobs([...savedJobs, job]);
            fetch(import.meta.env.VITE_APP_BACKEND_URL + "/savejob", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: userId,
                    jobId: job._id,
                    type: "save",

                })
            }).then((res) => {
                res.json().then(data => {
                    console.log(data);

                })
            }).catch()
        }
    };

    useEffect(() => {

        fetch(import.meta.env.VITE_APP_BACKEND_URL + "/" + selectedTab, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: userId,
                skills: userDetails.selectedSkills
            })
        }).then((res) => {
            res.json().then(data => {
                SetJobList(() => { return data });
                selectedTab === 'getsavedpost' || flag ? setSavedJobs(() => { return data }) : 0
                if (flag) {
                    setSelectedTab(() => { return 'getbestmatches' });
                }
                setFlag(false)

            })
        }).catch()

    }, [selectedTab])

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
                        className={`px-4 py-2 rounded-md ${selectedTab === 'getbestmatches' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedTab('getbestmatches')}
                    >
                        Best Matches
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${selectedTab === 'getrecentjobs' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedTab('getrecentjobs')}
                    >
                        Most Recent
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${selectedTab === 'getsavedpost' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedTab('getsavedpost')}
                    >
                        Saved Jobs
                    </button>
                </div>

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
                                <Link className=''>
                                    Contect
                                </Link>
                            </div>


                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
