import React, { useState, useContext } from "react";
import { UserDetailsContext } from "../../Context/UserDetailsContext.jsx";
import logo from "../../Assets/UserIcon.png";

export default function StepNine() {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  // Initialize form data including profileImage
  const [formData, setFormData] = useState({
    bio: userDetails.bio || "",
    dob: userDetails.dob || "",
    country: userDetails.country || "India",
    street: userDetails.street || "",
    apt: userDetails.apt || "",
    city: userDetails.city || "",
    state: userDetails.state || "",
    zip: userDetails.zip || "",
    phone: userDetails.phone || "",
    profileImage: userDetails.profileImage || logo, // Store image in context
  });

  // Handle input change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload and store URL
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Temporary URL for preview
      setFormData({ ...formData, profileImage: imageUrl });
    }
  };

  // Save to context
  const handleSave = () => {
    setUserDetails((prev) => ({ ...prev, ...formData }));
    console.log("Updated Profile Details:", formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-[13dvh]">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2 ml-10">
        A few last details, then you can check and publish your profile.
      </h2>
      <p className="text-gray-600 mb-6 ml-10">
        A professional photo helps you build trust with clients. To keep things
        safe and simple, they'll pay you through us - which is why we need your
        personal information.
      </p>

      <div className="flex gap-20 ml-10">
        {/* Profile Photo Upload */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={formData.profileImage}
            alt="Profile"
            className="rounded-full w-20 h-20 object-cover mb-2"
          />

          {/* Upload Button */}
          <label className="border border-gray-400 px-3 py-1 rounded-md text-sm text-gray-700 cursor-pointer">
            Add Profile
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
          {/* Bio Field */}
          <div className="col-span-2">
            <label className="block text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Tell us a bit about yourself..."
              rows="3"
            ></textarea>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Country *</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Street Address *</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter street address"
            />
          </div>

          <div>
            <label className="block text-gray-700">Apt/Suite</label>
            <input
              type="text"
              name="apt"
              value={formData.apt}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Apt/Suite (Optional)"
            />
          </div>

          <div>
            <label className="block text-gray-700">City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter city"
            />
          </div>

          <div>
            <label className="block text-gray-700">State/Province</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter state/province"
            />
          </div>

          <div>
            <label className="block text-gray-700">ZIP/Postal Code</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter ZIP/Postal code"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Phone *</label>
            <div className="flex items-center border rounded mt-1">
              <span className="p-2 border-r">+91</span>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 rounded"
                placeholder="Enter number"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full mt-4 bg-green-500 text-white py-2 rounded"
          >
            Save Details
          </button>
        </div>
      </div>
    </div>
  );
}
