import React from 'react'
import { Link } from "react-router-dom";
import logo from '../Assets/logo.png'

export default function Signup() {
  return (
    <>
    <img src={logo} alt="Workify Logo" className="h-10 m-5" />
     <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl font-semibold mb-6">Join as a client or freelancer</h1>
      <div className="flex gap-6">
        <div className="border p-6 rounded-lg shadow-md flex flex-col items-center cursor-pointer">
          <i className="fas fa-briefcase text-2xl mb-2"></i>
          <p className="text-lg font-medium">I’m a client, hiring for a project</p>
        </div>
        <div className="border p-6 rounded-lg shadow-md flex flex-col items-center cursor-pointer">
          <i className="fas fa-laptop text-2xl mb-2"></i>
          <p className="text-lg font-medium">I’m a freelancer, looking for work</p>
        </div>
      </div>
      <button className="bg-gray-400 text-white px-6 py-2 rounded-full mt-6 cursor-not-allowed">
        Create Account
      </button>
      <p className="mt-4 text-gray-600">
        Already have an account? <Link to="/login" className="text-green-600">Log In</Link>
      </p>
    </div>

    </>
  )
}
