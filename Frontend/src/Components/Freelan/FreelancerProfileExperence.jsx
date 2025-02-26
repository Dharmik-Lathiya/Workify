import React, { useContext, useState } from 'react';
import { UserDetailsContext } from '../../Context/UserDetailsContext';

export default function FreelancerProfileExperience() {
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        country: '',
        currentRole: false,
        startDate: { month: '', year: '' },
        endDate: { month: '', year: '' },
        description: ''
    });
    const [editingIndex, setEditingIndex] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleDateChange = (e, dateType, field) => {
        const value = e.target.value;
        setFormData(prev => ({
            ...prev,
            [dateType]: { ...prev[dateType], [field]: value }
        }));
    };

    const handleSave = () => {


        // let expId = editingIndex  ? {expId:userDetails.experiences[editingIndex]._id } : { }
        // fetch(import.meta.env.VITE_APP_BACKEND_URL + "/addexperience" ,{
        //   method: "PUT",
        //   headers:{
        //     "Content-Type":"application/json"
        //   },
        //   body:JSON.stringify({
        //     ...expId,
        //     id:localStorage.getItem("userId"),
        //     update:{...formData}
        //   })
        // }).then(res =>{
        //   res.json().then(data => {
        //     console.log(data);
            
           
        //   })
        // })
        
        let updatedExperiences = [...userDetails.experiences];
        if (editingIndex !== null) {
            updatedExperiences[editingIndex] = formData;
        } else {
            updatedExperiences.push(formData);
        }
        setUserDetails(prev => ({ ...prev, experiences: updatedExperiences }));
        setShowPopup(false);
        setEditingIndex(null);
        setFormData({
            title: '', company: '', location: '', country: '', currentRole: false,
            startDate: { month: '', year: '' },
            endDate: { month: '', year: '' }, description: ''
        });
    };

    const editExperienceEntry = (index) => {
        setFormData(userDetails.experiences[index]);
        setEditingIndex(index);
        setShowPopup(true);
    };

    const deleteExperienceEntry = (index) => {

        // fetch(import.meta.env.VITE_APP_BACKEND_URL + "/deleteexperience" ,{
        //     method: "DELETE",
        //     headers:{
        //       "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify({
        //       expId:userDetails.experiences[index]._id,
        //       id:localStorage.getItem("userId"),
              
        //     })
        //   }).then(res =>{
        //     res.json().then(data => {
        //       console.log(data);
              
            
        //     })
        //   })
        const updatedExperiences = userDetails.experiences.filter((_, i) => i !== index);
        setUserDetails(prev => ({ ...prev, experiences: updatedExperiences }));
    };

    return (
        <>
            <div className="bg-white p-4 shadow-md rounded-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold mb-2">Experience</h2>
                    <i className="fas fa-plus-circle text-2xl hover:text-green-600 mr-2 cursor-pointer"
                        onClick={() => setShowPopup(true)}></i>
                </div>
                <div className='grid grid-cols-2 w-[98%] mt-2 gap-4 mb-4 justify-between'>
                    {userDetails.experiences.length > 0 ? (
                        userDetails.experiences.map((experience, index) => (
                            <div key={index} className="rounded-xl p-3 bg-slate-100">

                                <div className='flex justify-between'>
                                    <h3 className="text-md font-bold">{experience.title} at {experience.company}</h3>
                                    <div>
                                        <i className="fas fa-pen p-2 bg-green-500 text-white rounded-lg cursor-pointer"
                                            onClick={() => editExperienceEntry(index)}></i>
                                        <i className="fas fa-trash p-2 ml-2 bg-red-500 text-white rounded-lg cursor-pointer"
                                            onClick={() => deleteExperienceEntry(index)}></i>
                                    </div>
                                </div>
                                <p className="text-gray-600">{experience.location}, {experience.country}</p>
                                <p className="text-sm text-gray-500">
                                    {experience.startDate.month} {experience.startDate.year} - {experience.currentRole ? "Present" : `${experience.endDate?.month} ${experience.endDate?.year}`}
                                </p>
                                <p className="text-gray-700 mt-2">{experience.description}</p>

                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No experiences added yet.</p>
                    )}
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-300/50 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[60dvw] h-[90dvh] overflow-auto">
                        <div className='flex justify-between'>
                            <h2 className="text-xl font-bold">{editingIndex !== null ? "Edit Experience" : "Add Experience"}</h2>
                            <button onClick={() => setShowPopup(false)} className="p-2 px-4 bg-red-500 text-white rounded-lg">X</button>
                        </div>
                        <label className="block font-medium">Title *</label>
                        <input type="text" name="title" placeholder="Ex: Software Engineer" value={formData.title} onChange={handleChange} className="w-full border px-3 py-2 rounded-md mt-1" />
                        <label className="block mt-3 font-medium">Company *</label>
                        <input type="text" name="company" placeholder="Ex: Microsoft" value={formData.company} onChange={handleChange} className="w-full border px-3 py-2 rounded-md mt-1" />
                        <label className="block mt-3 font-medium">Location</label>
                        <input type="text" name="location" placeholder="Ex: Rajkot" value={formData.location} onChange={handleChange} className="w-full border px-3 py-2 rounded-md mt-1" />
                        <div className="mt-3">
                            <input type="checkbox" name="currentRole" checked={formData.currentRole} onChange={handleChange} className="mr-2" />
                            <label>I am currently working in this role</label>
                        </div>
                        <label className="block mt-3 font-medium">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border px-3 py-2 rounded-md mt-1" rows="3"></textarea>
                        <div className="flex justify-between mt-4">
                            <button className="px-4 py-2 text-gray-500" onClick={() => setShowPopup(false)}>Cancel</button>
                            <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-md">{editingIndex !== null ? "Save Changes" : "Add Experience"}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
