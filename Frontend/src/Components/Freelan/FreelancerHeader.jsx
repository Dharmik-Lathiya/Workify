import React, { useContext, useEffect , useState} from 'react'
import { useLocation } from "react-router-dom";

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
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border rounded-full px-4 py-2 pl-8 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        <i className="fas fa-search absolute left-2 top-3 text-gray-500"></i>
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
