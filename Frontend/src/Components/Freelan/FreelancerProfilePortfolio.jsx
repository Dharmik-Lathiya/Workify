import React, { useContext, useState } from 'react'
import { UserDetailsContext } from '../../Context/UserDetailsContext'


export default function FreelancerProfilePortfolio() {
      const { userDetails, setUserDetails } = useContext(UserDetailsContext);

    const [showPortfolioPopup, setShowPortfolioPopup] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [portfolioData, setPortfolioData] = useState({
        title: '',
        role: '',
        urls: '',
        thumbnail: '',
        desc: ''
      });
  
    const handlePortfolioChange = (e) => {
      const { name, value } = e.target;
      setPortfolioData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleThumbnailUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPortfolioData((prev) => ({ ...prev, thumbnail: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    };
  
   
    const addOrUpdatePortfolioEntry = () => {
      setUserDetails((prev) => {
        let updatedPortfolio;
    
        if (isEditing && editIndex !== null) {
          // Editing existing entry
          updatedPortfolio = prev.portfolio.map((item, index) =>
            index === editIndex ? portfolioData : item
          );
        } else {
          // Adding new entry
          updatedPortfolio = [...prev.portfolio, portfolioData];
        }
    
        return { ...prev, portfolio: updatedPortfolio };
      });
    
      closePopup();
    };
    
    
    
  
    const deletePortfolioEntry = (index) => {
      const updatedPortfolio = userDetails.portfolio.filter((_, i) => i !== index);
      setUserDetails((prev) => ({ ...prev, portfolio: updatedPortfolio }));
    };
  
    const editPortfolioEntry = (index) => {
      setPortfolioData(userDetails.portfolio[index]);
      setIsEditing(true);
      setEditIndex(index);
      setShowPortfolioPopup(true);
    };
    
    
  
    const closePopup = () => {
      setShowPortfolioPopup(false);
      setIsEditing(false);
      setEditIndex(null);
      setPortfolioData({ title: "", role: "", urls: "", thumbnail: "", desc: "" });
    };
   
  return (
    <>
       <div className="bg-white p-4 shadow-md rounded-lg">
      <div className='flex justify-between'>
        <h2 className="text-lg font-semibold">Portfolio</h2>
        <button onClick={() => setShowPortfolioPopup(true)}>
          <i className="fas fa-plus-circle text-2xl hover:text-green-600 mr-2"></i>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-10">
        {userDetails.portfolio.length > 0 ? (
          userDetails.portfolio.map((item, index) => (
            <div key={index} className="py-3">
              <img src={item.thumbnail} alt={item.title} className="h-auto w-full rounded-md" />
              <div className='flex mt-2 justify-between'>
                <h3 className="text-md font-bold">{item.title}</h3>
                <div>
                  <i className="fas fa-pen p-2 h-8 bg-green-500 text-white rounded-lg cursor-pointer" onClick={() => editPortfolioEntry(index)}></i>
                  <i className="fas fa-trash p-2 ml-2 h-8 bg-red-500 text-white rounded-lg cursor-pointer" onClick={() => deletePortfolioEntry(index)}></i>
                </div>
              </div>
              <p className="text-gray-600">{item.role}</p>
              <a href={item.urls} className="text-blue-500" target="_blank" rel="noopener noreferrer">View Project</a>
              <p className="text-gray-700 w-20">{item.desc}</p>
            </div>
          ))
        ) : (
          <p className="h-32 mt-2 bg-gray-200 rounded-lg flex items-center justify-center w-full">No portfolio entries yet.</p>
        )}
      </div>
      {showPortfolioPopup && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-300/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[60dvw]">
            <div className="flex justify-between">
              <h2 className="font-bold">{isEditing ? 'Edit' : 'Add'} Portfolio Entry</h2>
              <button onClick={closePopup} className="p-2 px-4 bg-red-500 text-white rounded-lg">X</button>
            </div>
            <label className="font-medium">Title</label>
            <input type="text" name="title" value={portfolioData.title} onChange={handlePortfolioChange} className="w-full border px-3 py-2 rounded-md mt-1" placeholder='Enter Title' />
            <label className="mt-3 font-medium">Role</label>
            <input type="text" name="role" value={portfolioData.role} onChange={handlePortfolioChange} className="w-full border px-3 py-2 rounded-md mt-1" placeholder='Enter Role' />
            <label className="mt-3 font-medium">Project URL</label>
            <input type="url" name="urls" value={portfolioData.urls} onChange={handlePortfolioChange} className="w-full border px-3 py-2 rounded-md mt-1" placeholder="https://example.com" pattern="https://.*" size="30" />
            <label className="mt-3 font-medium">Thumbnail</label>
            <input type="file" accept="image/*" onChange={handleThumbnailUpload} className="w-full border px-3 py-2 rounded-md mt-1" />
            {portfolioData.thumbnail && <img src={portfolioData.thumbnail} alt="Preview" className="h-20 w-20 mt-2" />}
            <label className="mt-3 font-medium">Description</label>
            <textarea name="desc" value={portfolioData.desc} onChange={handlePortfolioChange} className="w-full border px-3 py-2 rounded-md mt-1" placeholder='Enter Description'></textarea>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg" onClick={addOrUpdatePortfolioEntry}>
              {isEditing ? 'Update' : 'Save'} Portfolio Entry
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  )
}
