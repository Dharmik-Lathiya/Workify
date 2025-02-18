import React from 'react';
import logo from '../Assets/logo.png';
import { useUser } from "../Context/HeaderComponent";
import { Link } from 'react-router-dom';

export default function Signup() {
  const { userType, setUserType } = useUser();

  return (
    <>
      <img src={logo} alt="Workify Logo" className="h-10 m-5" />
      <div className="flex flex-col items-center justify-center h-[37vw] bg-white">
        <h1 className="text-2xl font-semibold mb-6">Join as a client or freelancer</h1>
        <div className="flex gap-6">
          <label
            className={`border p-6 h-40 rounded-lg shadow-md flex flex-col items-center cursor-pointer relative ${userType === "client" ? "border-green-600" : "border-gray-300"
              }`}
            onClick={() => setUserType("client")}
          >
            <i className="fas fa-briefcase text-2xl mb-2"></i>
            <p className="text-2xl w-4/6 font-medium justify-start">I’m a client, hiring for a project</p>
            <span className="absolute top-2 right-2 w-5 h-5 border-2 rounded-full flex items-center justify-center">
              {userType === "client" && <span className="w-3 h-3 bg-green-600 rounded-full"></span>}
            </span>
          </label>
          <label
            className={`border p-6 rounded-lg shadow-md flex flex-col items-center cursor-pointer relative ${userType === "freelancer" ? "border-green-600" : "border-gray-300"
              }`}
            onClick={() => setUserType("freelancer")}
          >
            <i className="fas fa-laptop text-2xl mb-2"></i>
            <p className="text-2xl w-4/6 font-medium">I’m a freelancer, looking for work</p>
            <span className="absolute top-2 right-2 w-5 h-5 border-2 rounded-full flex items-center justify-center">
              {userType === "freelancer" && <span className="w-3 h-3 bg-green-600 rounded-full"></span>}
            </span>
          </label>
        </div>
        <Link
          to={userType === "client" ? "/client-signup" : "/freelancer-signup"}
          className="bg-green-600 text-white px-6 py-2 rounded-full mt-6 text-center"
        >
          {userType === "client" ? "Join as a Client" : "Apply as a Freelancer"}
        </Link>
        <p className="mt-4 text-gray-600">
          Already have an account? <a href="/login" className="text-green-600">Log In</a>
        </p>
      </div>
    </>
  );
}
