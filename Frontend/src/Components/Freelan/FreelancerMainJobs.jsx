import React, { useContext, useEffect, useState } from 'react';
import { UserDetailsContext } from "../../Context/UserDetailsContext.jsx";
import { useNavigate } from 'react-router-dom';
import { Heart, Search, Clock, CreditCard, CalendarDays, MapPin } from 'lucide-react';
import { Button } from '../UI/Button';
import { Card, CardContent } from '../UI/Card';
import { Input } from '../UI/Input';
import apiFetch from '../../lib/api';

export default function FreelancerMainJobs() {
    const { userDetails, userId } = useContext(UserDetailsContext);
    const [selectedTab, setSelectedTab] = useState('/api/jobs/best-matches');
    const [savedJobs, setSavedJobs] = useState([]);
    const [jobsList, setJobList] = useState([]);
    const [loader, setLoader] = useState(false);
    let Navigate = useNavigate();

    const toggleSaveJob = (job) => {
        const isJobSaved = savedJobs.some(saved => saved._id === job._id);
        if (isJobSaved) {
            setSavedJobs(savedJobs.filter(saved => saved._id !== job._id));
            apiFetch("/api/jobs/save", {
                method: "POST",
                body: JSON.stringify({
                    id: userId,
                    jobId: job._id,
                    type: "delete",
                })
            }).catch(console.error);
        } else {
            setSavedJobs([...savedJobs, job]);
            apiFetch("/api/jobs/save", {
                method: "POST",
                body: JSON.stringify({
                    id: localStorage.getItem("userId"),
                    jobId: job._id,
                    type: "save",
                })
            }).catch(console.error);
        }
    };

    function createChat(job) {
        let chatId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`
        apiFetch("/api/chats/add", {
            method: "PUT",
            body: JSON.stringify({
                userId: userId,
                reciverid: job.clientId,
                recivermodel: "client",
                model: "users",
                role: "sender",
                chatId: chatId
            })
        });
        Navigate("/chat/" + chatId);
    }

    useEffect(() => {
        setLoader(true);
        apiFetch(selectedTab, {
            method: "POST",
            body: JSON.stringify({
                id: localStorage.getItem("userId"),
                skills: userDetails?.selectedSkills || []
            })
        }).then(data => {
            setJobList(Array.isArray(data.data) ? data.data : []);
            setLoader(false);
        }).catch(err => {
            console.error(err);
            setLoader(false);
        });
    }, [selectedTab, userDetails]);

    const tabs = [
        { id: '/api/jobs/best-matches', label: 'Best Matches' },
        { id: '/api/jobs/recent', label: 'Most Recent' },
        { id: '/api/jobs/saved', label: 'Saved Jobs' },
    ];

    return (
        <div className="w-full">
            {loader && (
                <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center w-full z-50">
                    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* Search Bar */}
            <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                    type="text"
                    placeholder="Search for jobs..."
                    className="pl-12 py-6 text-lg rounded-xl border-gray-200 shadow-sm"
                />
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 mb-6 border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
                            selectedTab === tab.id 
                            ? 'border-green-600 text-green-700' 
                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Job List */}
            <div className="space-y-6">
                {jobsList.length === 0 && !loader && (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">No jobs found for this category.</p>
                    </div>
                )}
                
                {jobsList.map((job, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow group">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-xl text-gray-900 group-hover:text-green-700 transition-colors cursor-pointer">
                                    {job.jobTitle}
                                </h3>
                                <button
                                    className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-100"
                                    onClick={() => toggleSaveJob(job)}
                                >
                                    <Heart 
                                        size={22} 
                                        className={savedJobs.some(saved => saved._id === job._id) ? "fill-red-500 text-red-500" : ""} 
                                    />
                                </button>
                            </div>
                            
                            <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                                <Clock size={14} /> Posted {job.date || "recently"}
                            </div>

                            <p className="text-gray-700 text-sm mb-6 line-clamp-3 leading-relaxed">
                                {job.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {job.skills && job.skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-gray-100 text-gray-700 px-3 py-1.5 text-xs font-medium rounded-md hover:bg-gray-200 cursor-pointer transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-500 flex items-center gap-1"><CreditCard size={14} /> Budget</span>
                                    <span className="font-semibold text-gray-900">₹{job.type?.price || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-500 flex items-center gap-1"><CalendarDays size={14} /> Duration</span>
                                    <span className="font-semibold text-gray-900">{job.type?.time || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-500 flex items-center gap-1"><Clock size={14} /> Experience</span>
                                    <span className="font-semibold text-gray-900">{job.type?.exp || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-500 flex items-center gap-1"><MapPin size={14} /> Project Size</span>
                                    <span className="font-semibold text-gray-900">{job.type?.size || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <Button variant="outline" className="px-6">View Details</Button>
                                <Button onClick={() => createChat(job)} className="px-8">Message Client</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
