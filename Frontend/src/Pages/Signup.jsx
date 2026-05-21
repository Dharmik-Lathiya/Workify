import React, { useState } from 'react';
import logo from '../Assets/logo.png';
import { useUser } from "../Context/HeaderComponent";
import { Link, useNavigate } from 'react-router-dom';
import { Building2, User } from 'lucide-react';
import { Button } from '../Components/UI/Button';

export default function Signup() {
  const { userType, setUserType } = useUser();
  const navigate = useNavigate();

  const handleJoin = () => {
    if (userType === 'client') {
      navigate('/client/signup');
    } else if (userType === 'freelancer') {
      navigate('/freelancer/signup');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="w-full px-8 py-6 bg-white shadow-sm flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Workify Logo" className="h-8 object-contain" />
        </Link>
        <p className="text-gray-600 font-medium">
          Here to hire talent? <Link to="/client/signup" className="text-green-600 hover:underline">Join as a Client</Link>
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-3xl w-full border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
            Join as a client or freelancer
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Client Option */}
            <label
              className={`relative border-2 p-6 rounded-xl flex flex-col cursor-pointer transition-all duration-300 ${
                userType === "client" 
                  ? "border-green-600 bg-green-50/50" 
                  : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
              }`}
              onClick={() => setUserType("client")}
            >
              <div className="flex justify-between items-start mb-4">
                <Building2 size={32} className={userType === "client" ? "text-green-600" : "text-gray-600"} />
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${userType === "client" ? "border-green-600" : "border-gray-300"}`}>
                  {userType === "client" && <div className="w-3 h-3 bg-green-600 rounded-full" />}
                </div>
              </div>
              <p className="text-xl font-medium text-gray-900 pr-4">I’m a client, hiring for a project</p>
            </label>

            {/* Freelancer Option */}
            <label
              className={`relative border-2 p-6 rounded-xl flex flex-col cursor-pointer transition-all duration-300 ${
                userType === "freelancer" 
                  ? "border-green-600 bg-green-50/50" 
                  : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
              }`}
              onClick={() => setUserType("freelancer")}
            >
              <div className="flex justify-between items-start mb-4">
                <User size={32} className={userType === "freelancer" ? "text-green-600" : "text-gray-600"} />
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${userType === "freelancer" ? "border-green-600" : "border-gray-300"}`}>
                  {userType === "freelancer" && <div className="w-3 h-3 bg-green-600 rounded-full" />}
                </div>
              </div>
              <p className="text-xl font-medium text-gray-900 pr-4">I’m a freelancer, looking for work</p>
            </label>
          </div>

          <div className="flex flex-col items-center">
            <Button 
              size="lg" 
              className="w-full md:w-auto min-w-[280px]"
              disabled={!userType}
              onClick={handleJoin}
            >
              {userType === "client" ? "Join as a Client" : userType === "freelancer" ? "Apply as a Freelancer" : "Create Account"}
            </Button>
            
            <p className="mt-8 text-gray-600 font-medium">
              Already have an account? <Link to="/login" className="text-green-600 hover:underline">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
