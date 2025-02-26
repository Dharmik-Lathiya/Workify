import React, { useContext, useState } from 'react';
import { UserDetailsContext } from '../../Context/UserDetailsContext';

export default function FreelancerProfileEducation() {
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);

    const [isEditing, setIsEditing] = useState(false);
    const [showEducationPopup, setShowEducationPopup] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const initialEducationState = {
        degree: "",
        field: "",
        school: "",
        location: "",
        country: "",
        startDate: { month: "", year: "" },
        endDate: { month: "", year: "" },
        description: "",
    };

    const [educationData, setEducationData] = useState(initialEducationState);

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setEducationData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (e, type, key) => {
        const { value } = e.target;
        setEducationData((prev) => ({
            ...prev,
            [type]: { ...prev[type], [key]: value },
        }));
    };

    const addOrUpdateEducation = () => {
        setUserDetails((prev) => {
            let updatedEducation;
            if (isEditing && editIndex !== null) {
                updatedEducation = prev.education.map((edu, index) =>
                    index === editIndex ? educationData : edu
                );
            } else {
                updatedEducation = [...prev.education, educationData];
            }
            return { ...prev, education: updatedEducation };

        });
        // let eduId = isEditing  ? {eduId:userDetails.education[editIndex]._id } : { }
        // fetch(import.meta.env.VITE_APP_BACKEND_URL + "/addeducation" ,{
        //   method: "PUT",
        //   headers:{
        //     "Content-Type":"application/json"
        //   },
        //   body:JSON.stringify({
        //     ...eduId,
        //     id:localStorage.getItem("userId"),
        //     update:{...educationData}
        //   })
        // }).then(res =>{
        //   res.json().then(data => {
        //     console.log(data);
            
      closePopup();
        //   })
        // })
        
    };

    const editEducationEntry = (index) => {
        setEducationData(userDetails.education[index]);
        setIsEditing(true);
        setEditIndex(index);
        setShowEducationPopup(true);
    };

    const deleteEducationEntry = (index) => {

        // fetch(import.meta.env.VITE_APP_BACKEND_URL + "/deleteeducation" ,{
        //     method: "DELETE",
        //     headers:{
        //       "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify({
        //       eduId:userDetails.education[index]._id,
        //       id:localStorage.getItem("userId"),
              
        //     })
        //   }).then(res =>{
        //     res.json().then(data => {
        //       console.log(data);
              
        //       closePopup();
        //     })
        //   })
        setUserDetails((prev) => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index),
        }));
    };

    const closePopup = () => {
        setShowEducationPopup(false);
        setIsEditing(false);
        setEditIndex(null);
        setEducationData(initialEducationState);  // Reset form
    };

    return (
        <>
            <div className="bg-white p-4 shadow-md rounded-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold mb-2">Education</h2>
                    <i className="fas fa-plus-circle text-2xl hover:text-green-600 cursor-pointer" onClick={() => setShowEducationPopup(true)}></i>
                </div>

                <div className='grid grid-cols-2 justify-between '>
                    {userDetails.education.length > 0 ? (
                        userDetails.education.map((edu, index) => (
                            <div key={index} className="py-3 bg-slate-100 w-[96%] rounded-xl p-3 my-2">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-md font-bold">
                                        {edu.degree} in {edu.field}
                                    </h3>
                                    <div>
                                        <i className="fas fa-pen p-2 h-8 bg-green-500 text-white rounded-lg cursor-pointer" onClick={() => editEducationEntry(index)}></i>
                                        <i className="fas fa-trash p-2 ml-2 h-8 bg-red-500 text-white rounded-lg cursor-pointer" onClick={() => deleteEducationEntry(index)}></i>
                                    </div>
                                </div>
                                <p className="text-gray-600">{edu.school}, {edu.location}, {edu.country}</p>
                                <p className="text-sm text-gray-500">
                                    {edu.startDate.month} {edu.startDate.year} -{" "}
                                    {edu.endDate?.month ? `${edu.endDate.month} ${edu.endDate.year}` : "Present"}
                                </p>
                                <p className="text-gray-700 mt-2">{edu.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No education records added yet.</p>
                    )}
                </div>

                {showEducationPopup  && (
                    <form>
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-300/50 z-100 bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-[60dvw] h-[90dvh] overflow-auto">
                                <div className='flex justify-between'>
                                    <h2 className="text-xl font-bold float-left">
                                        {isEditing ? "Edit Education" : "Add Your Education"}
                                    </h2>
                                    <button
                                        onClick={closePopup}
                                        className=" p-2 px-4 bg-red-500 text-white rounded-lg top-0 right-0"
                                    > X </button>
                                </div>

                                <label className="block font-medium">School</label>
                                <input
                                    type="text"
                                    name="school"
                                    placeholder="Ex: Madhav School"
                                    value={educationData.school}
                                    onChange={handleEducationChange}
                                    className="w-full border px-3 py-2 rounded-md mt-1"
                                />

                                <label className="block mt-3 font-medium">Degree</label>
                                <input
                                    type="text"
                                    name="degree"
                                    placeholder="Ex: Bachelor's"
                                    value={educationData.degree}
                                    onChange={handleEducationChange}
                                    className="w-full border px-3 py-2 rounded-md mt-1"
                                />

                                <label className="block mt-3 font-medium">Field of Study</label>
                                <input
                                    type="text"
                                    name="field"
                                    placeholder="Ex: Computer Science"
                                    value={educationData.field}
                                    onChange={handleEducationChange}
                                    className="w-full border px-3 py-2 rounded-md mt-1"
                                />

                                <label className="block mt-3 font-medium">Location</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="Ex: Rajkot"
                                        value={educationData.location}
                                        onChange={handleEducationChange}
                                        className="w-1/2 border px-3 py-2 rounded-md mt-1"
                                    />
                                    <select
                                        name="country"
                                        value={educationData.country}
                                        onChange={handleEducationChange}
                                        className="w-1/2 border px-3 py-2 rounded-md mt-1"
                                    >
                                        <option value="">Select Country</option>
                                        <option value="India">India</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                    </select>
                                </div>

                                <div className="flex mt-3 gap-4">
                                    <div className="w-1/2">
                                        <label className="block font-medium">Start Date *</label>
                                        <div className="flex gap-2">
                                            <select
                                                name="startDateMonth"
                                                value={educationData.startDate.month}
                                                onChange={(e) => handleDateChange(e, "startDate", "month")}
                                                className="w-1/2 border px-2 py-1 rounded-md"
                                            >
                                                <option value="">Month</option>
                                                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                                                    .map((month) => <option key={month} value={month}>{month}</option>)}
                                            </select>
                                            <input
                                                type="number"
                                                name="startDateYear"
                                                placeholder="Year"
                                                value={educationData.startDate.year}
                                                onChange={(e) => handleDateChange(e, "startDate", "year")}
                                                className="w-1/2 border px-2 py-1 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="w-1/2">
                                        <label className="block font-medium">End Date *</label>
                                        <div className="flex gap-2">
                                            <select
                                                name="endDateMonth"
                                                value={educationData.endDate.month}
                                                onChange={(e) => handleDateChange(e, "endDate", "month")}
                                                className="w-1/2 border px-2 py-1 rounded-md"
                                            >
                                                <option value="">Month</option>
                                                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                                                    .map((month) => <option key={month} value={month}>{month}</option>)}
                                            </select>
                                            <input
                                                type="number"
                                                name="endDateYear"
                                                placeholder="Year"
                                                value={educationData.endDate.year}
                                                onChange={(e) => handleDateChange(e, "endDate", "year")}
                                                className="w-1/2 border px-2 py-1 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <label className="block mt-3 font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={educationData.description}
                                    onChange={handleEducationChange}
                                    className="w-full border px-3 py-2 rounded-md mt-1"
                                    rows="3"
                                ></textarea>

                                <div className="flex justify-between mt-4">
                                    <button className="px-4 py-2 text-gray-500" onClick={closePopup}>Cancel</button>
                                    <button
                                        onClick={addOrUpdateEducation}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                                    >
                                        {isEditing ? "Save Changes" : "Add Education"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}

            </div>
        </>
    );
}
