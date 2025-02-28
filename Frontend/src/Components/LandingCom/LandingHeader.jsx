import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import upworkLogo from "../../Assets/logo.png";

export default function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-3 transition-all duration-300 z-50 
                ${isScrolled ? "bg-white shadow-md text-black" : "bg-transparent text-white"}`}
            >
                {/* Left: Logo */}
                <div className="flex items-center gap-6">
                    <img src={upworkLogo} alt="Logo" className="h-8" />
                    <nav className="hidden md:flex items-center gap-6">
                        <ul className="flex gap-6">
                            <li className="cursor-pointer hover:text-green-500 transition-all">Find talent</li>
                            <li className="cursor-pointer hover:text-green-500 transition-all">Find work</li>
                            <li className="cursor-pointer hover:text-green-500 transition-all">Why Upwork</li>
                            <li className="cursor-pointer hover:text-green-500 transition-all">What’s new</li>
                            <li className="cursor-pointer hover:text-green-500 transition-all">Why Workify?</li>
                        </ul>
                    </nav>
                </div>

                {/* Right: Search, Login, Signup */}
                <div className="flex items-center gap-4">
                    {/* Search Bar */}
                    <div className="relative hidden md:block">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border rounded-full px-4 py-2 pl-8 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        <i
                            className={`fas fa-search absolute left-3 top-3 ${isScrolled ? "text-gray-900" : "text-gray-500"}`}
                        ></i>
                    </div>

                    {/* Login & Signup */}
                    <Link to="/Login" className={isScrolled ? "text-black" : "text-white"}>
                        Log in
                    </Link>
                    <Link to="/SignUp" className="bg-green-600 text-white px-4 py-2 rounded-full">
                        Sign up
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-2xl focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed top-14 left-0 w-full bg-white shadow-md py-6 px-6 md:hidden z-50">
                    <ul className="flex flex-col gap-4">
                        <li className="cursor-pointer hover:text-green-500 transition-all">Find talent</li>
                        <li className="cursor-pointer hover:text-green-500 transition-all">Find work</li>
                        <li className="cursor-pointer hover:text-green-500 transition-all">Why Upwork</li>
                        <li className="cursor-pointer hover:text-green-500 transition-all">What’s new</li>
                        <li className="cursor-pointer hover:text-green-500 transition-all">Why Workify?</li>
                    </ul>
                </div>
            )}
        </>
    );
}
