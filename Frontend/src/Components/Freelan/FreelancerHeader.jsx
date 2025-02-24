import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';
import { UserDetailsContext } from '../../Context/UserDetailsContext'
import logo from '../../Assets/logo.png'
import Notification from './Notification'
import { io } from 'socket.io-client';

export default function FreelancerHeader() {

    const location = useLocation();

    if ((window.location.pathname === "/freelancer/signup") || (window.location.pathname === "/freelancer/create-profile") || (window.location.pathname === "/client/signup") || (window.location.pathname === "/client/create-profile")) {
        return;
    }

    useEffect(() => {
        console.log("Pathname changed:", location.pathname);
    }, [location.pathname]);

    const { userDetails } = useContext(UserDetailsContext);


    const [isOpn, SetIsOpen] = useState(false);
    const [newNoti, SetNewNoti] = useState(false);
    const socket = io("http://localhost:3000");

    socket.emit("join", "67b62ec3e4a7216330c0307d");
    socket.on("notification", (data) => {
        SetNewNoti(true)
    })

    const [query, setQuery] = useState("");
    const [searchType, setSearchType] = useState("Jobs");
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            
            let url = searchType === "Talent" ?  "searchjobs" : "searchusers";
             fetch(import.meta.env.VITE_APP_BACKEND_URL+"/" + url,{
                method:"POST",
                headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    query:e.target.value
                })
             }).then((res)=>{
                    res.json().then(data => {
                        console.log(data);
                        const route = searchType === "Talent" ? "/freelancer/find-developer" : "/freelancer/find-jobs" ;
                        navigate(route);
                    })
             })

         ;
        }
    };

    return (
        <>
            <header className="flex items-center justify-between px-6 py-3 shadow-md bg-white">
                <div className="flex items-center gap-6">
                    <img src={logo} alt="Upwork Logo" className="h-8 w-24" />
                    <nav className="hidden md:flex items-center gap-4 text-gray-700">
                        <ul className="flex gap-4">
                            <Link to='/freelancer/home'>
                                <li className="relative group cursor-pointer flex items-center gap-1">
                                    Home
                                </li>
                            </Link>
                            <li className="relative group cursor-pointer flex items-center gap-1">
                                Find talent
                            </li>
                            <li className="relative group cursor-pointer flex items-center gap-1">
                                Find work
                            </li>
                            <li className="relative group cursor-pointer flex items-center gap-1">
                                Why Upwork
                            </li>
                            <li className="relative group cursor-pointer flex items-center gap-1">
                                What’s new
                            </li>
                            <li className="relative group cursor-pointer flex items-center gap-1">
                                Message
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative border rounded-full flex items-center">
                        <i className="fas fa-search absolute left-3 text-gray-500"></i>
                        <input
                            type="text"
                            placeholder="Search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="px-4 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-gray-400 flex-grow"
                        />
                        <select
                            name="searchType"
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            className="rounded-full py-2 px-4 bg-white border"
                        >
                            <option value="Jobs">Jobs</option>
                            <option value="Talent">Talent</option>
                        </select>

                    </div>

                    <i class="fas fa-question"></i>
                    <div className='relative'>

                        <button onClick={() => { SetIsOpen(!isOpn); SetNewNoti(false) }} className='relative'>
                            {newNoti && <p className='text-red-700 text-[5rem] absolute top-[-5.5rem] right-[-0.3rem]' >.</p>}
                            <i className="far fa-bell text-xl"></i>
                        </button>

                        {isOpn && <Notification set={SetNewNoti} />}
                    </div>
                    <Link to='/freelancer/profile'>
                        <img src={userDetails.profileImage} alt="" className='h-9 w-9 rounded-full' />
                    </Link>


                </div>
            </header>
        </>
    )

}
