import React, { useContext, useState } from 'react'
import { UserDetailsContext } from '../../Context/UserDetailsContext'

export default function FreelancerProfile() {
  const { userDetails } = useContext(UserDetailsContext);
  const [title, setTitle] = useState(userDetails.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);


  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  // const [formData,setNewFormData] = useState(
  // );  



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
              <p class="text-gray-500 mt-3">📍{userDetails.bio}</p>
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
                <li><strong>Location:</strong> {userDetails.street + userDetails.city + userDetails.state}</li>
              </ul>
            </div>
          </div>
          {showProfilePopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-300/50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[60dvw]">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold">Edit Profile Details</h2>
                  <button
                    onClick={() => setShowProfilePopup(false)}
                    className="p-2 px-4 bg-red-500 text-white rounded-lg"
                  >X</button>
                </div>

                <label className="block mt-3 font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={userDetails.username}
                  className="w-full border px-3 py-2 rounded-md mt-1"
                />

                <label className="block mt-3 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  className="w-full border px-3 py-2 rounded-md mt-1"
                />

                <label className="block mt-3 font-medium">DOB</label>
                <input
                  type="date"
                  name="dob"
                  value={userDetails.dob}
                  className="w-full border px-3 py-2 rounded-md mt-1"
                />

                <label className="block mt-3 font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={userDetails.phone}
                  className="w-full border px-3 py-2 rounded-md mt-1"
                />

                <label className="block mt-3 font-medium">Languages</label>
                <input
                  type="text"
                  name="languages"
                  value={userDetails.languages}
                  className="w-full border px-3 py-2 rounded-md mt-1"
                />

                <label className="block mt-3 font-medium">Location</label>
                <input
                  type="text"
                  name="location"
                  value= {userDetails.street + userDetails.city + userDetails.state}
                  className="w-full border px-3 py-2 rounded-md mt-1"
                />

                <button
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Service */}
            <div className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center">
              {isEditingTitle ? (
                <input
                  type="text"
                  className="border p-1 rounded"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onBlur={() => { setTitle(newTitle); setIsEditingTitle(false); }}
                  autoFocus
                />
              ) : (
                <h2 className="text-lg font-normal">Title:
                  <p className='font-medium'>{userDetails.professionalTitle}</p>
                </h2>
              )}
              <i className="fa fa-pencil-alt text-gray-500 cursor-pointer" onClick={() => setIsEditingTitle(true)}></i>
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center">
              {isEditingTitle ? (
                <input
                  type="text"
                  className="border p-1 rounded"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onBlur={() => { setTitle(newTitle); setIsEditingTitle(false); }}
                  autoFocus
                />
              ) : (
                <h2 className="text-lg font-normal">Bio:
                  <p className='font-medium'>{userDetails.bio}</p>
                </h2>
              )}
              <i className="fa fa-pencil-alt text-gray-500 cursor-pointer" onClick={() => setIsEditingTitle(true)}></i>
            </div>

            {/* Portfolio */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-lg font-semibold">Portfolio</h2>
              <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">[Image Placeholder]</span>
              </div>
            </div>
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
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Education</h2>
              {userDetails.education.length > 0 ? (
                userDetails.education.map((edu, index) => (
                  <div key={index} className="border-b py-3">
                    <h3 className="text-md font-bold">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-600">{edu.school}, {edu.location}, {edu.country}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate.month} {edu.startDate.year} - {edu.endDate ? `${edu.endDate.month} ${edu.endDate.year}` : "Present"}
                    </p>
                    <p className="text-gray-700 mt-2">{edu.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No education records added yet.</p>
              )}
            </div>

            {/* Other Experiences */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Experiences</h2>
              {userDetails.experiences.length > 0 ? (
                userDetails.experiences.map((experience, index) => (
                  <div key={index} className="border-b py-3">
                    <h3 className="text-md font-bold">{experience.title} at {experience.company}</h3>
                    <p className="text-gray-600">{experience.location}, {experience.country}</p>
                    <p className="text-sm text-gray-500">
                      {experience.startDate.month} {experience.startDate.year} -{" "}
                      {experience.currentRole ? "Present" : `${experience.endDate?.month} ${experience.endDate?.year}`}
                    </p>
                    <p className="text-gray-700 mt-2">{experience.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No experiences added yet.</p>
              )}
            </div>

          </div>
        </div>
      </div>

    </>
  )
}
