import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import logo from '../Assets/logo.png'
import loginBg from '../Assets/landingmainsection2.jpg'
import { UserDetailsContext } from "../Context/UserDetailsContext.jsx";
import { ClientDetailsContext } from '../Context/ClientDetailsContext';
import { Button } from '../Components/UI/Button';
import { Input } from '../Components/UI/Input';
import apiFetch from '../lib/api';

export default function Login() {
    const { SetUserId } = useContext(UserDetailsContext);
    const { setClientId } = useContext(ClientDetailsContext);
    const navigate = useNavigate();
    
    const [data, setData] = useState({
        value: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (!data.value || !data.password) {
            toast.error("Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        apiFetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(data)
        }).then((data) => {
            setIsLoading(false);
            if (data.success) {
                localStorage.setItem("token", data.data.token);
                if (data.type === "developer") {
                    SetUserId(data.data._id);
                    localStorage.setItem("userId", data.data._id);
                    localStorage.removeItem("clientId");
                    navigate('/freelancer/home');
                } else {
                    setClientId(data.data._id);
                    localStorage.setItem("clientId", data.data._id);
                    localStorage.removeItem("userId");
                    navigate('/client/home');
                }
            } else {
                if (data.message) {
                    toast.error(data.message);
                } else if (data.details) {
                    data.details.forEach((detail) => toast.error(detail.message));
                } else {
                    toast.error("An error occurred during login.");
                }
            }
        }).catch((err) => {
            setIsLoading(false);
            const data = err.data || {};
            if (data.details) {
                data.details.forEach((detail) => toast.error(detail.message));
            } else {
                toast.error(err.message || "An error occurred during login.");
            }
        });
    }

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row">
            <ToastContainer position="top-center" autoClose={3000} />
            
            {/* Left Side - Image */}
            <div className="hidden md:flex md:w-1/2 bg-gray-900 relative">
                <img 
                    src={loginBg} 
                    alt="Login Background" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <div className="relative z-10 p-12 flex flex-col justify-end h-full text-white">
                    <h2 className="text-4xl font-bold mb-4">Welcome back to Workify</h2>
                    <p className="text-lg text-gray-300">
                        Connect with top talent and find the best opportunities around the globe.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
                <div className="w-full max-w-md mx-auto">
                    <Link to="/" className="mb-12 inline-block">
                        <img src={logo} alt="Workify Logo" className="h-10" />
                    </Link>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Log in to your account</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username or Email</label>
                            <Input 
                                type="text" 
                                placeholder="Enter your username or email" 
                                value={data.value} 
                                onChange={(e) => setData({ ...data, value: e.target.value })} 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <Input 
                                type="password" 
                                placeholder="Enter your password" 
                                value={data.password} 
                                onChange={(e) => setData({ ...data, password: e.target.value })} 
                            />
                        </div>
                        
                        <Button 
                            type="submit" 
                            className="w-full mt-6" 
                            size="lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </Button>
                    </form>

                    <div className="mt-8 text-center border-t border-gray-100 pt-6">
                        <p className="text-gray-600 mb-4">Don't have a Workify account?</p>
                        <Link to="/signup">
                            <Button variant="outline" className="w-full text-green-600 border-green-600 hover:bg-green-50">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
