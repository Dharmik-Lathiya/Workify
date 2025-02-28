import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../Assets/logo.png'
import { UserDetailsContext } from '../../Context/UserDetailsContext';
import { ClientDetailsContext } from '../../Context/ClientDetailsContext';
import Notification from '../Freelan/Notification'
import { io } from 'socket.io-client';
import { useLocation,useNavigate  } from 'react-router-dom';

export default function ClientHeader() {
    const location = useLocation();

    if ((window.location.pathname === "/freelancer/signup") || (window.location.pathname === "/freelancer/create-profile") || (window.location.pathname === "/client/signup") || (window.location.pathname === "/client/create-profile")) {
        return;
    }


    useEffect(() => {
        console.log("Pathname changed:", location.pathname);
    }, [location.pathname]);

    const { userDetails } = useContext(UserDetailsContext);
    const {clientDetails} = useContext(ClientDetailsContext);
    console.log(clientDetails);
    

    const [isOpn, SetIsOpen] = useState(false);
    const [newNoti, SetNewNoti] = useState(false);
    const socket = io("http://localhost:3000");

    socket.emit("join", "67b62ec3e4a7216330c0307d");
    socket.on("notification", (data) => {
        SetIsOpen(false)
        SetNewNoti(true);
    })

    const [query, setQuery] = useState("");
    const [searchType, setSearchType] = useState("Talent");
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const searchQuery = e.target.value.trim();
            if (!searchQuery) return;
                    const route = searchType === "Talent"
                        ? `/client/find-developer/${encodeURIComponent(searchQuery)}`
                        : `/client/find-jobs/${encodeURIComponent(searchQuery)}`;

                    navigate(route);
             
        }
    };
    

    return (
        <header className="flex items-center justify-between px-6 py-3 shadow-md bg-white">
            <div className="flex items-center gap-6">
                <img src={logo} alt="Upwork Logo" className="h-8 w-24" />
                <nav className="hidden md:flex items-center gap-4 text-gray-700">
                    <ul className="flex gap-4">
                        <Link to='/client/home'>
                            <li className="relative group cursor-pointer flex items-center gap-1">
                                Hire Talent
                            </li>
                        </Link>
                        <Link to='/client/find-developer'>
                            <li className="relative group cursor-pointer flex items-center gap-1">
                                Manage Work
                            </li>
                        </Link>

                        <li className="relative group cursor-pointer flex items-center gap-1">
                            Why Upwork
                        </li>
                        <li className="relative group cursor-pointer flex items-center gap-1">
                            Reports
                        </li>
                        <Link to='/chat'>
                        <li className="relative group cursor-pointer flex items-center gap-1">
                            Message
                        </li>
                        </Link>
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
                        <option value="Talent">Talent</option>
                        <option value="Jobs">Jobs</option>
                    </select>
                
                </div>


                <i class="fas fa-question"></i>
                <div className='relative'>

                    <button onClick={() => { SetIsOpen(!isOpn); SetNewNoti(false) }} className='relative'>
                        {newNoti && <p className='text-red-700 text-[5rem] absolute top-[-5.5rem] right-[-0.3rem]' >.</p>}
                        <i className="far fa-bell text-xl"></i>
                    </button>

                    {isOpn && <Notification set={SetNewNoti}/>}
                </div>
                <Link to='/client/profile'>
                    <img src={clientDetails.photo} alt="" className='h-9 w-9 rounded-full' />
                </Link>


            </div>
        </header>
    )
}
