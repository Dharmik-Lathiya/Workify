import React, { useState, useEffect, useContext } from 'react';
import { ClientDetailsContext } from '../../Context/ClientDetailsContext';

export default function ClientOverview() {
    const { clientDetails, setClientDetails } = useContext(ClientDetailsContext);
    const [allJobs, setAllJobs] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [flag,setFlag] = useState(true)
    const [jobData, setJobData] = useState({
        jobTitle: "",
        skills: [],
        type: {
            size: "",
            time: "",
            exp: "",
            price: 0,
            desc: "",
        },
    });

    useEffect(() => {

        fetch(import.meta.env.VITE_APP_BACKEND_URL + `/getuser/client/${localStorage.getItem("clientId")}`, {
            method: "GET"
        }).then((res) => {
            res.json().then((data) => {
                setAllJobs(data.postedJobs);
                setClientDetails(prevState => ({
                    ...prevState,
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    email: data.email || "",
                    password: data.password || "",
                    country: data.country || "India",
                    photo: data.photo || "",
                    address: data.address || "",
                    phone: data.phone || "",
                    jobs: data.postedJobs || [],
                }));
            });
        });
    }, [flag]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setJobData((prev) => {
            return {
                ...prev,
                type: {
                    ...prev.type,
                    [name]: value,
                },
            };

        });
    };
    const handleTitleChange = (e) => {
        const { name, value } = e.target;

        setJobData((prev) => {
            return {
                ...prev,
                [name]: value,

            };

        });
    };


    const editJobEntry = (index) => {
        setJobData(allJobs[index]);
        setEditIndex(index);
        setShowPopup(true);
    };
    const deleteJob = (index) => {

        fetch(import.meta.env.VITE_APP_BACKEND_URL + "/deletejob", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: clientDetails.jobs[index]._id,
               
            })
        }).then(res =>{
            setFlag(!flag)
        })

    };
    const editJob = () => {

        
        fetch(import.meta.env.VITE_APP_BACKEND_URL + "/updatejob", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: clientDetails.jobs[editIndex]._id,
                update: {
                    ...jobData
                }
            })
        }).then(res => {
            res.json().then(data => {
                console.log(data);
                setFlag(!flag)
                setShowPopup(false);
                setJobData({
                    jobTitle: "",
                    skills: [],
                    type: {
                        size: "",
                        time: "",
                        exp: "",
                        price: 0,
                        desc: "",
                    },
                });

            })
        })

    }

    return (
        <>
            <p className="mx-10 mb-4 text-2xl font-medium">Overview</p>
            <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-100 rounded-xl p-4 lg:grid-cols-3 gap-4">
                {allJobs.map((job, index) => (
                    <div key={index} className="bg-slate-100 p-4 rounded-2xl shadow-lg border-2 border-slate-200">
                        <div className='flex flex-row justify-between'>
                            <div>
                                <span className="text-[16px] font-bold">Job Title:</span>
                                <span className="text-xxl ml-2">{job.jobTitle}</span>
                            </div>
                            <div>
                                <i className="fas fa-pen p-2 h-8 bg-green-500 text-white rounded-lg cursor-pointer" onClick={() => editJobEntry(index)}></i>
                                <i className="fas fa-trash p-2 ml-2 h-8 bg-red-500 text-white rounded-lg cursor-pointer" onClick={() => deleteJob(index)}></i>
                            </div>
                        </div>
                        <p className="text-[16px] font-medium mt-4">Selected Skills</p>
                        <div className="text-[15px] mt-2 border-slate-200 my-1 border-2 p-2 rounded-2xl mx-1">
                            {job.skills.map((skill, skillIndex) => (
                                <button key={skillIndex} className="border-2 border-slate-300 px-3 py-1 rounded-xl m-1">
                                    {skill}
                                </button>
                            ))}
                        </div>
                        <p className="mt-4 font-semibold">Project Type</p>
                        <ul className="text-[15px] mt-2 ml-2">
                            <li><strong>Size:</strong> {job.type.size}</li>
                            <li><strong>Time:</strong> {job.type.time}</li>
                            <li><strong>Experience:</strong> {job.type.exp}</li>
                            <li><strong>Price:</strong> {job.type.price}</li>
                            <li><strong>Description:</strong> <p>{job.type.desc.slice(0, 40)}</p></li>
                        </ul>
                    </div>
                ))}
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-300/50 z-100 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[70vw] h-[70vh] overflow-auto">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-bold">Post a Job</h2>
                            <button onClick={() => { setShowPopup(false) }} className="p-2 px-4 bg-red-500 text-white rounded-lg">X</button>
                        </div>
                        <label className="block mt-3 font-medium">Job Title</label>
                        <input type="text" name="jobTitle" value={jobData.jobTitle} className="w-full border px-3 py-2 rounded-md mt-1" onChange={handleTitleChange} />
                        <label className="block mt-3 font-medium">Skills</label>
                        <div className="text-[15px] mt-2 border border-slate-200 my-1 p-2 h-10 rounded-xl mx-1">
                            {jobData.skills.map((skill, index) => (
                                <button key={index} className="border-2 border-slate-300 px-3 py-1 rounded-xl">
                                    {skill}
                                </button>
                            ))}
                        </div>
                        <label className="block mt-3 font-medium">Project Size</label>
                        <input type="text" name="size" value={jobData.type.size} className="w-full border px-3 py-2 rounded-md mt-1" onChange={handleChange} />
                        <label className="block mt-3 font-medium">Duration</label>
                        <input type="text" name="time" value={jobData.type.time} className="w-full border px-3 py-2 rounded-md mt-1" onChange={handleChange} />
                        <label className="block mt-3 font-medium">Experience Level</label>
                        <input type="text" name="exp" value={jobData.type.exp} className="w-full border px-3 py-2 rounded-md mt-1" onChange={handleChange} />
                        <label className="block mt-3 font-medium">Price</label>
                        <input type="number" name="price" value={jobData.type.price} className="w-full border px-3 py-2 rounded-md mt-1" onChange={handleChange} />
                        <label className="block mt-3 font-medium">Description</label>
                        <textarea name="desc" value={jobData.type.desc} className="w-full border px-3 py-2 rounded-md mt-1" onChange={handleChange}></textarea>
                        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg" onClick={editJob} >Submit</button>
                    </div>
                </div>
            )}
        </>
    );
}