import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from "react-router-dom";
import { UserDetailsContext } from '../../Context/UserDetailsContext'
import logo from '../../Assets/logo.png'
import Notification from './Notification'
import { io } from 'socket.io-client';
import { Search, Bell, MessageSquare, HelpCircle, ChevronDown } from 'lucide-react';
import { Input } from '../UI/Input';

export default function FreelancerHeader() {
    const location = useLocation();

    if (["/freelancer/signup", "/freelancer/create-profile", "/client/signup", "/client/create-profile"].includes(window.location.pathname)) {
        return null;
    }

    const { userDetails } = useContext(UserDetailsContext);
    const [isOpn, SetIsOpen] = useState(false);
    const [newNoti, SetNewNoti] = useState(false);
    
    // In production, move socket initialization to context or higher level to avoid re-renders
    useEffect(() => {
        const socket = io(import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000");
        const userId = localStorage.getItem("userId");
        if (userId) {
            socket.emit("join", userId);
            socket.on("notification", () => {
                SetIsOpen(false);
                SetNewNoti(true);
            });
        }
        return () => socket.disconnect();
    }, []);

    const [query, setQuery] = useState("");
    const [searchType, setSearchType] = useState("Jobs");
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const searchQuery = e.target.value.trim();
            if (!searchQuery) return;
            const route = searchType === "Talent"
                ? `/freelancer/find-developer/${encodeURIComponent(searchQuery)}`
                : `/freelancer/find-jobs/${encodeURIComponent(searchQuery)}`;
            navigate(route);
        }
    };

    return (
        <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <Link to='/freelancer/home'>
                    <img src={logo} alt="Workify Logo" className="h-8 object-contain" />
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
                    <Link to='/freelancer/home' className="hover:text-green-600 transition-colors">Find Work</Link>
                    <Link to='/freelancer/profile' className="hover:text-green-600 transition-colors">My Jobs</Link>
                    <Link to='/chat' className="hover:text-green-600 transition-colors flex items-center gap-1">
                        Messages <MessageSquare size={16} />
                    </Link>
                </nav>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden lg:flex relative items-center bg-gray-100 rounded-full pr-2">
                    <div className="pl-4 pr-2 text-gray-500">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent py-2 px-2 focus:outline-none w-48 text-sm"
                    />
                    <div className="flex items-center gap-1 border-l border-gray-300 pl-3 py-1 cursor-pointer">
                        <select
                            name="searchType"
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            className="bg-transparent text-sm font-medium outline-none cursor-pointer appearance-none pr-1"
                        >
                            <option value="Jobs">Jobs</option>
                            <option value="Talent">Talent</option>
                        </select>
                        <ChevronDown size={14} className="text-gray-500" />
                    </div>
                </div>

                <div className="flex items-center gap-4 text-gray-600">
                    <button className="hover:text-green-600 transition-colors">
                        <HelpCircle size={22} />
                    </button>
                    
                    <div className="relative">
                        <button 
                            onClick={() => { SetIsOpen(!isOpn); SetNewNoti(false) }} 
                            className="relative hover:text-green-600 transition-colors"
                        >
                            {newNoti && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
                            <Bell size={22} />
                        </button>
                        {isOpn && (
                            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                                <Notification set={SetNewNoti} />
                            </div>
                        )}
                    </div>
                    
                    <Link to='/freelancer/profile' className="ml-2">
                        {userDetails?.profileImage ? (
                            <img src={userDetails.profileImage} alt="Profile" className="h-9 w-9 rounded-full border border-gray-200 object-cover" />
                        ) : (
                            <div className="h-9 w-9 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
                                {userDetails?.firstName?.charAt(0) || 'U'}
                            </div>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    )
}
