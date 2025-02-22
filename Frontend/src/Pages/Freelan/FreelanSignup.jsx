import React, { useState, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from "../../Context/HeaderComponent";
import { Link, useNavigate } from "react-router-dom";
import { UserDetailsContext } from "../../Context/UserDetailsContext";
import logo from '../../Assets/logo.png'

const FreelanSignup = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const { setUserType } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(userDetails);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserDetails(formData);
    setUserType(formData);

    // fetch(import.meta.env.VITE_APP_BACKEND_URL + "/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(
    //     {
    //       type: "devloper",
    //       firstName: userDetails.firstName,
    //       lastName: userDetails.lastName,
    //       username: userDetails.username,
    //       email: userDetails.email,
    //       password: userDetails.password,
    //     }
    //   )
    // }).then((res) => {
    //   res.json().then(data => {
    //     console.log(data);
    //     if (data.success) {
    //       navigate("/freelancer/create-profile");
    //     }
    //     if (!data.success && data.message) {

    //       toast.error(data.message, {
    //         position: "top-center",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: false,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",

    //       });
    //     } else {

    //       data.details.map((detail) => {
    //         toast.error(detail.message, {
    //           position: "top-center",
    //           autoClose: 5000,
    //           hideProgressBar: false,
    //           closeOnClick: false,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "light",

    //         });

    //       })
    //     }

    //   })
    // })

  };

  return (
<>
    <header className="border-b p-3 flex flex-row items-center  justify-between bg-white sticky  top-0">
        <img src={logo} alt="logo" className="h-10" />
        <h1 className="text-2xl font-semibold">Create Profile</h1>
      </header>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      

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
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up For Freelancers</h2>
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
  );
};

export default FreelanSignup;
