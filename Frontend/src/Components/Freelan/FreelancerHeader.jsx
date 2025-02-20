import React from 'react'
import { Link } from 'react-router-dom'
import workify from '../../Assets/logo.png'
import profileImg from '../../Assets/UserIcon.png'

export default function FreelancerHeader() {
  return (
    <>
         <header className="flex items-center justify-between px-6 py-3 shadow-md bg-white">
                <div className="flex items-center gap-6">
                    <img src={workify} alt="Upwork Logo" className="h-8" />
                    <nav className="hidden md:flex items-center gap-4 text-gray-700">
                        <ul className="flex gap-4">
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
                    <i class="far fa-bell text-xl"></i>
                    <img src={profileImg} alt="" className='h-9 w-9 rounded-full' />
                </div>
            </header>
    </>
  )
}
