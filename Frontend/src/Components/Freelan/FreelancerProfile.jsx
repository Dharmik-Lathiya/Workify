import React, { useContext, useState, useEffect } from 'react'
import { UserDetailsContext } from '../../Context/UserDetailsContext'
import FreelancerProfilePortfolio from './FreelancerProfilePortfolio.jsx';
import FreelancerProfileEducation from './FreelancerProfileEducation.jsx';
import FreelancerProfileExperence from './FreelancerProfileExperence.jsx';

export default function FreelancerProfile() {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [title, setTitle] = useState(userDetails.title);
  
  console.log(userDetails.languages);

  // title,role,urls,thumbnail,desc


  const [updated,setUpdated] = useState(false)
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  
  const [formData, setNewFormData] = useState({
    title: "",
    bio: "",
    username: "",
    email: "",
    dob: "",
    phone: "",
    city: "",
    country: "",
  });

  function saveChanges(){
    console.log(formData);

    fetch(import.meta.env.VITE_APP_BACKEND_URL + "/updateuser" ,{
      method: "PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        type:"user",
        id:localStorage.getItem("userId"),
        update:{...formData}
      })
    }).then(res =>{
      res.json().then(data => {
        setUpdated(!updated)
        setShowProfilePopup(false)
      })
    })
    
  }

  console.log(userDetails.education);
  
  

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_BACKEND_URL + `/getuser/devloper/${localStorage.getItem("userId")}`, {
      method: "GET"
    }).then((res) => {
      res.json().then((data) => {
        const addressParts = data.address ? data.address.split(" ") : [];
        const zipCode = addressParts.pop() || "";
        const state = addressParts.pop() || "";
        const city = addressParts.slice(-2).join(" ") || "";
        const street = addressParts.slice(0, -2).join(" ") || "";

        setUserDetails(prevState => ({
          ...prevState,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          username: data.username || "",
          email: data.email || "",
          password: data.password || "",
          country: data.country || "India",
          bio: data.bio || "",
          dob: data.dob || "",
          street: street,
          city: city,
          state: state,
          zip: zipCode,
          phone: data.phone || "",
          profileImage: data.photo || "",
          selectedSkills: data.skills || [],
          professionalTitle: data.title || "",
          experiences: data.experience || [],
          education: data.educaton || [],
          languages: data.languages || [],

        }));
        setNewFormData(() => {
          return {
            username: data.username || "",
            email: data.email || "",
            bio: data.bio || "",
            dob: data.dob || "",
            phone: data.phone || "",
            city: city,
            country: data.country || "India",
            title: data.title || "",
          }
        })
      })
    })

  }, [updated])


  return (
    <>
      <div class="max-w-6xl mt-10 mx-auto bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-4">

          <div className='flex'>
            <div>
              <img src={userDetails.profileImage} alt="" className='h-28 w-28 rounded-full' />
            </div>
            <div className='flex-col ml-10'>
              <h1 class="font-semibold text-4xl">{userDetails.firstName}</h1>
              <p class="text-gray-500 mt-3">📍{userDetails.city + ", " + userDetails.country}</p>
            </div>
          </div>
          <div className='flex gap-5'>

            <button class="px-4 py-2 border-2 border-green-500 text-green-500 rounded-lg">See public view</button>
            <button class="px-4 py-2 bg-green-500 text-white rounded-lg">Profile Settings</button>
          </div>
        </div>


        {/* Profile Sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="md:col-span-1">
            <div className="bg-gray-200 p-4 rounded-lg">
              <div className='flex justify-between'>
                <h2 className="text-xl font-semibold">Profile Details</h2>
                <button className='border rounded-full p-1 px-2 border-green-600' onClick={() => setShowProfilePopup(true)}>
                  <i className='fas fa-pencil-alt text-green-600'></i>
                </button>
              </div>
              <ul className="mt-4 text-sm text-gray-700">
                <li><strong>UserName:</strong> {userDetails.username}</li>
                <li><strong>Email:</strong> {userDetails.email}</li>
                <li><strong>DOB:</strong> {userDetails.dob.slice(0, 10)}</li>
                <li><strong>Phone:</strong> {userDetails.phone}</li>
                <li><strong>City:</strong> {userDetails.city}</li>
                <li><strong>Country:</strong> {userDetails.country}</li>

              </ul>
            </div>
          </div>
          {showProfilePopup && (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-300/50 ">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[60dvw] ">
                <div className="flex justify-between">
                  <h2 className="font-bold">Edit Profile Details</h2>
                  <button
                    onClick={() => setShowProfilePopup(false)}
                    className="p-2 px-4 bg-red-500 text-white rounded-lg"
                  >X</button>
                </div>

                <label className="font-medium">Title</label>
                <input
                  type="text"
                  name="username"
                  value={formData.title}
                  onChange={(e)=>{ setNewFormData((prevData)=>{ return {...prevData ,title:e.target.value } } ) }}
                  className="w-full border px-3 py-2 rounded-md mt-1"
                />

                <label className="mt-3font-medium">Bio</label>
                <input
                  type="text"
                  name="username"
                  value={formData.bio}
                  onChange={(e)=>{ setNewFormData((prevData)=>{ return {...prevData ,bio:e.target.value } } ) }}
                  className="w-full border px-3 py-2 rounded-md mt-1"
                />

                <label className="block mt-3 font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={(e)=>{ setNewFormData((prevData)=>{ return {...prevData ,username:e.target.value } } ) }}
                  className="w-full border px-3 py-2 rounded-md mt-1"
                />

                <label className="block mt-3 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e)=>{ setNewFormData((prevData)=>{ return {...prevData ,email:e.target.value } } ) }}
                  className="w-full border px-3 py-2 rounded-md mt-1"
                />

                <div className='flex justify-between'>
                  <div className='w-[48%]'>
                    <label className="block mt-3 font-medium">DOB</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={(e)=>{ setNewFormData((prevData)=>{ return {...prevData ,dob:e.target.value } } ) }}
                      className="w-full border px-3 py-2 rounded-md mt-1"
                    />
                  </div>
                  <div className='w-[48%]'>
                    <label className="block mt-3 font-medium">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={(e)=>{ setNewFormData((prevData)=>{ return {...prevData ,phone:e.target.value } } ) }}

                      className="w-full border px-3 py-2 rounded-md mt-1"
                    /></div>

                </div>

                <div className="flex justify-between mt-3">
                  <div className='w-[48%]'>

                    <label className=" mt-3 font-medium">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.city}
                      onChange={(e)=>{ setNewFormData((prevData)=>{ return {...prevData ,city:e.target.value } } ) }}
                      className="w-full border px-3 py-2 rounded-md mt-1"
                    />
                  </div>

                  <div className='w-[48%]'>
                    <label className="mt-3 font-medium">Country:</label>
                    <input
                      type="text"
                      name="Country"
                      value={formData.country}
                      onChange={(e)=>{ setNewFormData((prevData)=>{ return {...prevData ,country:e.target.value } } ) }}

                      className="w-full border px-3 py-2 rounded-md mt-1"
                    />
                  </div>

                </div>

                <button
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
                  onClick={saveChanges} >
                  Save Changes
                </button>
              </div>
            </div>
          )}
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Service */}
            <div className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center">
              <h2 className="text-lg font-normal">Title:
                <p className='font-medium'>{userDetails.professionalTitle}</p>
              </h2>
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center">

              <h2 className="text-lg font-normal">Bio:
                <p className='font-medium'>{userDetails.bio}</p>
              </h2>

            </div>

            {/* Portfolio */}
            <FreelancerProfilePortfolio/>
            {/* Skills */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Selected Skills</h2>
              <div className="flex flex-wrap gap-2">
                {userDetails.selectedSkills.length > 0 ? (
                  userDetails.selectedSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 px-3 py-1 rounded-lg flex items-center space-x-2"
                    >
                      <p className="text-gray-600">{skill}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No skills selected yet.</p>
                )}
              </div>
            </div>

            {/* Education */}
            <FreelancerProfileEducation/>

            {/* Other Experiences */}
            <FreelancerProfileExperence/>

          </div>
        </div>
      </div>

    </>
  )
}
