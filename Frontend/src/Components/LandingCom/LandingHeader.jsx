import React from 'react'
import { Link } from 'react-router-dom'
import upworkLogo from "../../Assets/logo.png";
export default function LandingHeader() {
    return (
        <>
            <header className="flex items-center justify-between px-6 py-3 shadow-md bg-white">
                <div className="flex items-center gap-6">
                    <img src={upworkLogo} alt="Upwork Logo" className="h-8" />
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
                                Why Workify?
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
                        <i className="fas fa-search absolute left-2 top-2.5 text-gray-500"></i>
                    </div>
                    <Link to='/Login' className="text-black">Log in</Link>
                    <Link to='/SignUp' className="bg-green-600 text-white px-4 py-2 rounded-full">Sign up</Link>
                </div>
            </header>
        </>
    )
}
