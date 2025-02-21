import React, { useContext, useState } from 'react'
import { UserDetailsContext } from '../../Context/UserDetailsContext'

export default function FreelancerProfile() {
    const { userDetails } = useContext(UserDetailsContext);
    const [title, setTitle] = useState("Web Designing");
    const [rate, setRate] = useState("$60.00/hr");
    const [skills, setSkills] = useState("Web Design, UI/UX");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    return (
        <>
            <div class="max-w-6xl mt-10 mx-auto bg-white p-6 rounded-lg shadow-md">
                <div class="flex justify-between items-center mb-4">

                    <div className='flex'>
                        <div>
                            <img src={userDetails.profileImage} alt="" className='h-28 w-28 rounded-full' />
                        </div>
                        <div className='flex-col ml-10'>
                            <h1 class="font-semibold text-4xl">Dharmik F.</h1>
                            <p class="text-gray-500 mt-3">📍 Rajkot, India - 5:49 pm local time</p>
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
              <h2 className="text-xl font-semibold">Profile Details</h2>
              <ul className="mt-4 text-sm text-gray-700">
                <li><strong>Languages:</strong> English, Hindi</li>
                <li><strong>Location:</strong> India</li>
                <li><strong>Education:</strong> Oxford Global University</li>
              </ul>
            </div>
          </div>
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
                <h2 className="text-lg font-semibold">{title}</h2>
              )}
              <i className="fa fa-pencil-alt text-gray-500 cursor-pointer" onClick={() => setIsEditingTitle(true)}></i>
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center">
              <p className="text-gray-600">{rate}</p>
              <i className="fa fa-pencil-alt text-gray-500 cursor-pointer" onClick={() => setRate(prompt("Update Rate:", rate) || rate)}></i>
            </div>
            {/* Portfolio */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-lg font-semibold">Portfolio</h2>
              <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">[Image Placeholder]</span>
              </div>
            </div>
            {/* Skills */}
            <div className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center">
              <p className="text-gray-600">{skills}</p>
              <i className="fa fa-pencil-alt text-gray-500 cursor-pointer" onClick={() => setSkills(prompt("Update Skills:", skills) || skills)}></i>
            </div>
            {/* Education */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-lg font-semibold">Education</h2>
              <p className="text-gray-500">Add any Education that isn't covered above.</p>
            </div>
            {/* Other Experiences */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-lg font-semibold">Experiences</h2>
              <p className="text-gray-500">Add any Experience that isn't covered above.</p>
            </div>
          </div>
        </div>
    </div>

        </>
    )
}
