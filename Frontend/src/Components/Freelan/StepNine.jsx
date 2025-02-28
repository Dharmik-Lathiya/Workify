import React, { useState, useContext, useEffect } from "react";
import { UserDetailsContext } from "../../Context/UserDetailsContext.jsx";
import logo from "../../Assets/UserIcon.png";

export default function StepNine() {
  const { userDetails, setUserDetails, userId } = useContext(UserDetailsContext);
  const [flag, setFlag] = useState(false)


  const [formData, setFormData] = useState({
    bio: "",
    dob: "",
    country: "India",
    street: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    profileImage: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ...userDetails,
    }));

    if (flag) {
      fetch(import.meta.env.VITE_APP_BACKEND_URL + "/updateuser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            id: localStorage.getItem("userId"),
            type: "user",
            update: {
              skills: userDetails.selectedSkills,
              title: userDetails.professionalTitle,
              photo: userDetails.profileImage,
              dob: userDetails.dob,
              street: userDetails.street,
              apt: userDetails.apt,
              city: userDetails.city,
              state: userDetails.state,
              zip: userDetails.zip,
              address: userDetails.apt + " " + userDetails.street + " " + userDetails.city + " " + userDetails.zip + " " + userDetails.state,
              country: userDetails.country,
              phone: userDetails.phone,
              languages: userDetails.languages,
              bio: userDetails.bio,
              price: 215,
              experience: userDetails.experiences,
              educaton: userDetails.education
            }

          }
        )
      }).then((res) => {
        res.json().then(data => {
          console.log(data);

        })
      })

    }
  }, [userDetails, flag]);

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
    }
  };


  // Save to context
  const handleSave = () => {
    setUserDetails((prev) => ({
      ...prev,
      ...formData,
    }));
    setFlag(true)

  console.log("Updated Profile Details:", userDetails);


  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-[13dvh]">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2 ml-10">
        A few last details, then you can check and publish your profile.
      </h2>

      <div className="flex gap-20 ml-10">
        {/* Profile Photo Upload */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={formData.profileImage}
            alt="Profile"
            className="rounded-full w-20 h-20 object-cover mb-2 border-2"
          />
          <label className="border border-gray-400 px-3 py-1 rounded-md text-sm text-gray-700 cursor-pointer">
            Add Profile
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
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
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Country *</label>
            <select name="country" value={formData.country} onChange={handleChange} className="w-full border p-2 rounded mt-1">
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Street Address *</label>
            <input type="text" name="street" value={formData.street} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
          </div>

          <div>
            <label className="block text-gray-700">Apt/Suite</label>
            <input type="text" name="apt" value={formData.apt} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
          </div>

          <div>
            <label className="block text-gray-700">City *</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
          </div>

          <div>
            <label className="block text-gray-700">State/Province</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
          </div>

          <div>
            <label className="block text-gray-700">ZIP/Postal Code</label>
            <input type="text" name="zip" value={formData.zip} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Phone *</label>
            <div className="flex items-center border rounded mt-1">
              <span className="p-2 border-r">+91</span>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 rounded" />
            </div>
          </div>

          <button onClick={handleSave} className="w-full mt-4 bg-green-500 text-white py-2 rounded">
            Save Details
          </button>
        </div>
      </div>
    </div>
  );
}
