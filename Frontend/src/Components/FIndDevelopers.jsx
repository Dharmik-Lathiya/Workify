import React, { useEffect, useState ,useContext} from 'react'
import { Link, useParams } from 'react-router-dom';
import { ClientDetailsContext } from '../Context/ClientDetailsContext';

export default function FIndDevelopers() {
  const {searchQuery} = useParams()
  const [developers,setDeveloper] = useState(null)
  const { id } = useParams(); 
      const [loader, setLoader] = useState(false);
  
  
  const {clinetId } = useContext(ClientDetailsContext);
  
    function createChat() {
  
      let chatId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`
      fetch(import.meta.env.VITE_APP_BACKEND_URL + "/addchat", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clientId: clinetId,
            reciverid: id,
            recivermodel: "users",
            model: "client",
            role: "sender",
            chatId:chatId
        })
    }).then(()=>{
  
       
    })
      
    }
  useEffect(()=>{
    setLoader(true);

    fetch(import.meta.env.VITE_APP_BACKEND_URL + "/searchusers", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: searchQuery })
  })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
        setDeveloper([...data.users]); 
        setLoader(false);

       
      })
      .catch(err => console.error("Error:", err));
  },[searchQuery])

  console.log(developers);
  

  return (
    <>
    {loader && (
                <div className="fixed inset-0 bg-slate-400/30 flex items-center justify-center w-full z-50">
                    <div className="loader"></div>
                </div>
            )}
        <div className="mt-10 flex gap-6 mx-10">
        {/* Left Sidebar (Sorting & Filters) */}
        <div className="w-1/4 bg-white p-5 rounded-lg shadow-md ">
          <h2 className="text-xl font-semibold mb-4">Filter & Sort</h2>

          <div className="mb-5">
            <h3 className="font-medium text-gray-700 mb-2">Hourly Rate</h3>
            <label className="flex items-center gap-2">
              <input type="radio" name="rate" className="w-4 h-4" /> $0 - $10/hr
            </label>
            <label className="flex items-center gap-2 mt-1">
              <input type="radio" name="rate" className="w-4 h-4" /> $10 - $30/hr
            </label>
            <label className="flex items-center gap-2 mt-1">
              <input type="radio" name="rate" className="w-4 h-4" /> $30 - $50/hr
            </label>
          </div>

          {/* Job Success Filter */}
          <div className="mb-5">
            <h3 className="font-medium text-gray-700 mb-2">Job Success</h3>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" /> 90% & Up
            </label>
            <label className="flex items-center gap-2 mt-1">
              <input type="checkbox" className="w-4 h-4" /> 80% & Up
            </label>
          </div>

          {/* Skills Filter */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Skills</h3>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" /> Data Entry
            </label>
            <label className="flex items-center gap-2 mt-1">
              <input type="checkbox" className="w-4 h-4" /> Web Research
            </label>
            <label className="flex items-center gap-2 mt-1">
              <input type="checkbox" className="w-4 h-4" /> Lead Generation
            </label>
          </div>
        </div>

        {/* Right Side - Developers List */}
        <div className="w-3/4 space-y-6">
        {developers &&
          developers.map((developer) => (
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={developer.photo}
                    alt={developer.firstName}
                    className="w-20 h-20 rounded-full border"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">
                      {developer.firstName} {developer.lastName}{" "}
                      <span className="text-blue-500">✔</span>
                    </h2>
                    <p className="text-sm text-gray-500">{developer.address}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    to={`/freelancer/public/${localStorage.getItem("userId")}`}
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/chat"
                    className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-white hover:text-black hover:border-2 hover:border-green-600 transition"
                    onClick={createChat}
                  >
                    Hire
                  </Link>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {developer.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 px-3 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>  
    </>
  )
}
