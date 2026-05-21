import React,{useState,useContext, useEffect} from 'react'
import { useUser } from "../../Context/HeaderComponent";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { ClientDetailsContext } from '../../Context/ClientDetailsContext';
import apiFetch from '../../lib/api';

export default function ClientSignup() {
    
const { clientDetails, setClientDetails ,clinetId ,setClientId} = useContext(ClientDetailsContext);
  const { setUserType } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(clientDetails);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setClientDetails(formData);
    setUserType(formData);
  };


  useEffect(()=>{


    if(formData.agreeToTerms && clientDetails.email)
    apiFetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(
        {
          type: "client",
          firstName: clientDetails.firstName,
          lastName: clientDetails.lastName,
          username: clientDetails.username,
          email: clientDetails.email,
          password: clientDetails.password,
        }
      )
    }).then((data) => {
        console.log(data);
        
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          setClientId((pervId) =>{
            return data.data._id
          })
          localStorage.setItem("clientId", data.data._id);  
          navigate("/client/create-profile");
        }
    }).catch((err) => {
        const data = err.data || {};
        if (data.message) {
          toast.error(data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (data.details) {
          data.details.map((detail) => {
            toast.error(detail.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
        } else {
            toast.error(err.message || "An error occurred during signup.");
        }
    })

  },[clientDetails])

  return (
    <>
      
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up For Clients</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password (8+ characters)"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-green-600"
            />
            <span>Yes, I understand and agree to the Terms of Service.</span>
          </label>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Create my account
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/Login" className="text-green-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
    </>
  )
}
