import React, { useState, useEffect, useContext } from 'react';
import { ClientDetailsContext } from '../../Context/ClientDetailsContext';
import { Edit2, Trash2, X, PlusCircle, Briefcase, Clock, IndianRupee, Layers } from 'lucide-react';
import { Button } from '../UI/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../UI/Card';
import { Input } from '../UI/Input';
import apiFetch from '../../lib/api';

export default function ClientOverview() {
    const { clientDetails, setClientDetails } = useContext(ClientDetailsContext);
    const [allJobs, setAllJobs] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [flag, setFlag] = useState(true);
    const [loading, setLoading] = useState(false);
    
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
        setLoading(true);
        apiFetch(`/api/users/profile/client/${localStorage.getItem("clientId")}`)
        .then((data) => {
            const clientData = data.data;
            setAllJobs(clientData.postedJobs || []);
            setClientDetails(prevState => ({
                ...prevState,
                firstName: clientData.firstName || "",
                lastName: clientData.lastName || "",
                email: clientData.email || "",
                password: clientData.password || "",
                country: clientData.country || "India",
                photo: clientData.photo || "",
                address: clientData.address || "",
                phone: clientData.phone || "",
                jobs: clientData.postedJobs || [],
            }));
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [flag, setClientDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData((prev) => ({
            ...prev,
            type: {
                ...prev.type,
                [name]: value,
            },
        }));
    };

    const handleTitleChange = (e) => {
        const { name, value } = e.target;
        setJobData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const editJobEntry = (index) => {
        setJobData(allJobs[index]);
        setEditIndex(index);
        setShowPopup(true);
    };

    const deleteJob = (index) => {
        if (window.confirm("Are you sure you want to delete this job posting?")) {
            apiFetch("/api/jobs/delete", {
                method: "DELETE",
                body: JSON.stringify({ id: clientDetails.jobs[index]._id })
            }).then(() => {
                setFlag(!flag);
            }).catch(err => {
                console.error("Error deleting job:", err);
            });
        }
    };

    const editJob = () => {
        apiFetch("/api/jobs/update", {
            method: "PUT",
            body: JSON.stringify({
                id: clientDetails.jobs[editIndex]._id,
                update: { ...jobData }
            })
        }).then(() => {
            setFlag(!flag);
            setShowPopup(false);
            setJobData({
                jobTitle: "",
                skills: [],
                type: { size: "", time: "", exp: "", price: 0, desc: "" },
            });
        }).catch(err => {
            console.error("Error updating job:", err);
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Your Postings Overview</h1>
                <Button className="gap-2">
                    <PlusCircle size={18} /> Post a New Job
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : allJobs.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
                    <p className="text-gray-500 mb-6">Get started by creating your first job post to find great talent.</p>
                    <Button>Post your first job</Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allJobs.map((job, index) => (
                        <Card key={index} className="flex flex-col hover:shadow-md transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-xl leading-tight line-clamp-2 pr-4">{job.jobTitle}</CardTitle>
                                    <div className="flex gap-2 shrink-0">
                                        <button 
                                            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                                            onClick={() => editJobEntry(index)}
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button 
                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                            onClick={() => deleteJob(index)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="flex-1 pb-2">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {job.skills.map((skill, skillIndex) => (
                                        <span key={skillIndex} className="bg-gray-100 text-gray-700 px-2.5 py-1 text-xs font-medium rounded-md">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                
                                <p className="text-sm text-gray-600 mb-6 line-clamp-3">
                                    {job.type.desc}
                                </p>

                                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                                    <div className="flex items-start gap-2">
                                        <IndianRupee size={16} className="text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Budget</p>
                                            <p className="font-semibold text-gray-900">₹{job.type.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Clock size={16} className="text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Duration</p>
                                            <p className="font-semibold text-gray-900">{job.type.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Briefcase size={16} className="text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Experience</p>
                                            <p className="font-semibold text-gray-900">{job.type.exp}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Layers size={16} className="text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Size</p>
                                            <p className="font-semibold text-gray-900">{job.type.size}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-4 border-t border-gray-100">
                                <Button variant="outline" className="w-full">View Proposals</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {/* Edit Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900">Edit Job Posting</h2>
                            <button onClick={() => setShowPopup(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                <Input type="text" name="jobTitle" value={jobData.jobTitle} onChange={handleTitleChange} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
                                <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-lg min-h-[50px] bg-gray-50">
                                    {jobData.skills.length > 0 ? jobData.skills.map((skill, index) => (
                                        <span key={index} className="bg-white border border-gray-200 px-3 py-1 text-sm font-medium rounded-md shadow-sm">
                                            {skill}
                                        </span>
                                    )) : <span className="text-gray-400 text-sm">No skills selected</span>}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Skills can be edited from the main job creation flow.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Size</label>
                                    <Input type="text" name="size" value={jobData.type.size} onChange={handleChange} placeholder="e.g. Small, Medium, Large" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                    <Input type="text" name="time" value={jobData.type.time} onChange={handleChange} placeholder="e.g. 1 to 3 months" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                                    <Input type="text" name="exp" value={jobData.type.exp} onChange={handleChange} placeholder="e.g. Intermediate" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)</label>
                                    <Input type="number" name="price" value={jobData.type.price} onChange={handleChange} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea 
                                    name="desc" 
                                    value={jobData.type.desc} 
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 min-h-[120px] resize-y" 
                                    onChange={handleChange}
                                    placeholder="Describe your project requirements..."
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                            <Button variant="outline" onClick={() => setShowPopup(false)}>Cancel</Button>
                            <Button onClick={editJob}>Save Changes</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
