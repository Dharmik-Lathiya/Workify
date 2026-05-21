import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import upworkLogo from "../../Assets/logo.png";
import { Menu, X, Search } from "lucide-react";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";

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
                className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 transition-all duration-300 z-50 
                ${isScrolled ? "bg-white shadow-md text-gray-900" : "bg-transparent text-white"}`}
            >
                {/* Left: Logo */}
                <div className="flex items-center gap-8">
                    <Link to="/">
                      <img src={upworkLogo} alt="Workify Logo" className="h-8 object-contain" />
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <ul className="flex gap-6 font-medium text-sm">
                            <li className="cursor-pointer hover:text-green-500 transition-colors">Find talent</li>
                            <li className="cursor-pointer hover:text-green-500 transition-colors">Find work</li>
                            <li className="cursor-pointer hover:text-green-500 transition-colors">Why Workify</li>
                            <li className="cursor-pointer hover:text-green-500 transition-colors">Enterprise</li>
                        </ul>
                    </nav>
                </div>

                {/* Right: Search, Login, Signup */}
                <div className="flex items-center gap-4">
                    {/* Search Bar */}
                    <div className="relative hidden lg:block w-64">
                        <Search className={`absolute left-3 top-2.5 h-4 w-4 ${isScrolled ? "text-gray-500" : "text-gray-300"}`} />
                        <Input
                            type="text"
                            placeholder="Search"
                            className={`pl-9 rounded-full border-none bg-black/10 text-current placeholder:text-current focus:ring-1 focus:ring-green-500 ${isScrolled ? 'bg-gray-100 placeholder:text-gray-500' : 'bg-white/20 placeholder:text-white/80'}`}
                        />
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                      <Link to="/Login" className={`text-sm font-medium hover:text-green-500 transition-colors ${isScrolled ? "text-gray-900" : "text-white"}`}>
                          Log in
                      </Link>
                      <Link to="/SignUp">
                        <Button variant="default" className="rounded-full px-5">Sign up</Button>
                      </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-2xl focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed top-[72px] left-0 w-full bg-white shadow-lg py-6 px-6 md:hidden z-40 flex flex-col gap-6 text-gray-900">
                    <ul className="flex flex-col gap-4 font-medium text-lg">
                        <li className="cursor-pointer hover:text-green-600 transition-all">Find talent</li>
                        <li className="cursor-pointer hover:text-green-600 transition-all">Find work</li>
                        <li className="cursor-pointer hover:text-green-600 transition-all">Why Workify</li>
                        <li className="cursor-pointer hover:text-green-600 transition-all">Enterprise</li>
                    </ul>
                    <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                       <Link to="/Login" className="text-center font-medium text-gray-700 py-2">
                          Log in
                      </Link>
                      <Link to="/SignUp">
                        <Button className="w-full">Sign up</Button>
                      </Link>
                    </div>
                </div>
            )}
        </>
    );
}
