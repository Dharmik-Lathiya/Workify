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
                    id: localStorage.getItem("userId"),
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


    function createChat(job) {

        console.log(job);

        let chatId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`
        fetch(import.meta.env.VITE_APP_BACKEND_URL + "/addchat", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                reciverid: job.clientId,
                recivermodel: "client",
                model: "users",
                role: "sender",
                chatId: chatId
            })
        }).then(() => {


        })

    }

    useEffect(() => {

        fetch(import.meta.env.VITE_APP_BACKEND_URL + "/" + selectedTab, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: localStorage.getItem("userId"),
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

    console.log(jobsList);



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
                                <button className=' bg-green-600 text-white p-2 rounded' onClick={() => { createChat(job) }}>
                                    Message
                                </button>
                            </div>


                        </div>


                    ))}
                </div>
            </div>
        </>
    );
}
