import React, { useContext, useState, useEffect } from "react";
import { ClientDetailsContext } from "../../Context/ClientDetailsContext";
import { Link } from "react-router-dom";

export default function ClientProfile() {
  const { clientDetails, setClientDetails } = useContext(ClientDetailsContext);
  const [showPopup, setShowPopup] = useState(false);
  
  // Initialize formData from clientDetails
  const [formData, setFormData] = useState(clientDetails);

  // Sync formData with clientDetails when context updates
  useEffect(() => {

    fetch(import.meta.env.VITE_APP_BACKEND_URL + `/getuser/client/${localStorage.getItem("clientId")}`,{
      method:"GET"
    }).then((res)=>{
        res.json().then((data)=>{

          const updatedClientDetails = {
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            password: data.password || "",
            country: data.country || "India",
            photo: data.photo || "",
            address: data.address || "",
            phone: data.phone || "",
            jobs: data.postedJobs || []
          };
    
          // Update both states in one go
          setClientDetails(updatedClientDetails);
          setFormData(updatedClientDetails);
    
        console.log(formData);
        })
    })

  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, photo: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    setClientDetails(formData); // Update context with new data
    setShowPopup(false); // Close popup
  };

  return (
    <>
      <div className="max-w-6xl mt-10 mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex">
            <img
              src={clientDetails.photo || "https://via.placeholder.com/100"}
              alt="Profile"
              className="h-28 w-28 rounded-full border-2"
            />
            <div className="ml-10">
              <h1 className="font-semibold text-4xl">{clientDetails.firstName || "User"}</h1>
              <p className="text-gray-500 mt-3">📍 {clientDetails.address || "No address provided"} </p>
            </div>
          </div>
          <div className="flex gap-5">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
              onClick={() => setShowPopup(true)}
            >
              Profile Settings
            </button>
          </div>
        </div>
      </div>

      {/* Popup for Profile Settings */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50  bg-slate-300/75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[50vw]">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <button
                onClick={() => setShowPopup(false)}
                className="p-2 px-4 bg-red-500 text-white rounded-lg"
              >
                X
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="flex gap-5">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              <p className="text-xl font-medium">Profile Image</p>
              {formData.photo && (
                <img
                  src={formData.photo}
                  alt="Profile Preview"
                  className="h-28 w-28 mt-2 rounded-full border-2"
                />
              )}
              {/* Image Upload */}
              <div className="flex flex-col items-center w-40">
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg w-full"              >
                Save Changes
              </button>
            </form>
          </div>
          
        </div>
      )}
      <p className="max-w-6xl mx-auto text-2xl font-medium m-3">Payment Method</p>
      <div className="max-w-6xl mx-auto mt-2 shadow-lg p-5 rounded-xl bg-white py-8">
        <span className="text-xl font-medium">Balance: ${0} </span><br />
        <button className="bg-green-500 px-4 py-2 mt-4 text-white rounded-xl">
          Add Balance
        </button>
      </div>
      <div className="max-w-6xl mx-auto mt-2 shadow-lg p-5 rounded-xl bg-white py-8">
        <span className="text-xl font-medium">Billing methods </span><br />
        <p className="mt-2 ">ou haven’t set up any billing methods yet. Add a method so you can hire when you’re ready.</p>
        <button className="bg-green-500 px-4 py-2 mt-4 text-white rounded-xl">
          Add Billing Method
        </button>
      </div>
      <Link to='/'>Log Out</Link>
    </>
  );
}
