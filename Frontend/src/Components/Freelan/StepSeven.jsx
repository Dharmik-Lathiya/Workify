import React, { useState, useContext } from 'react'
import { UserDetailsContext } from '../../Context/UserDetailsContext.jsx';

export default function StepSeven() {
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    
        // Initialize experience list
        const [education, setExperiences] = useState(userDetails.education || []);
    
        // Track whether popup is open
        const [showPopup, setShowPopup] = useState(false);
    
        // Track if we are editing an experience
        const [editingIndex, setEditingIndex] = useState(null);
    
        // Default form state
        const defaultFormState = {
            school: "",
            degree: "",
            field: "",
            location:"",
            country: "India",
            startDate: { month: "", year: "" },
            endDate: { month: "", year: "" },
            description: "",
        };
    
        const [formData, setFormData] = useState(defaultFormState);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };
        
    
        // Handle Save or Update
        const handleSave = () => {
            let updatedEducation;
            
            if (editingIndex !== null) {
                // Update existing experience
                updatedEducation = [...education];
                updatedEducation[editingIndex] = formData;
            } else {
                // Add new experience
                updatedEducation = [...education, formData];
            }
            
            // Update context and local state
            setExperiences(updatedEducation);
            setUserDetails({ ...userDetails, education: updatedEducation });
    
            // Reset state
            setShowPopup(false);
            setEditingIndex(null);
            setFormData(defaultFormState);
            document.formData.reset(); 
        };
    
        // Handle Edit
        const handleEdit = (index) => {
            setFormData(education[index]);
            setEditingIndex(index);
            setShowPopup(true);
            document.formData.reset();
        };
    
        // Handle Delete
        const handleDelete = (index) => {
            const updatedEducation = education.filter((_, i) => i !== index);
            setExperiences(updatedEducation);
            setUserDetails({ ...userDetails, education: updatedEducation });
        };
    return (
    <>
      <div className='bg-transparent'>
            <div className='ml-10 mt-4 h-[59.9dvh]'>
                <p className='text-3xl w-[50dvw] font-semibold'>Clients like to know what you know - add your education here.</p>
                <p className='w-[52dvw] mt-5'>You don’t have to have a degree. Adding any relevant education helps make your profile more visible.</p>
                <div className='flex'>
                    <button className='border-dotted border-2 w-min mt-5 p-15 rounded-[2vw]' onClick={() => {setShowPopup(true); setEditingIndex(null);}}>
                        Add Education
                    </button>
                    {education.length > 0 && education.map((edu, index)=> (
                        <div className='border-dotted border-2 w-[30vw] box-content overflow-hidden mt-5 rounded-[2vw] ml-5 flex p-5 '>
                            <i class="fas fa-graduation-cap text-3xl"></i>
                            
                            <div className='ml-2'>
                                <p className='font-bold'>{edu.school}</p>
                                    <span className='font-semibold mt-5'>{edu.degree} | {edu.startDate.month} {edu.startDate.year} - {edu.endDate.month}{edu.endDate.year}</span>
                                <p className='mt-1'>{edu.location},{edu.country}</p>
                                <p className=' mt-4'>{edu.description.slice(0,40)}</p>
                            </div>
                            <div className=' gap-2 p-1 inline-flex mt-[-15dvh] ml-10'>
                            <button onClick={() => handleEdit(index)} className=" text-green-600 rounded-md"><i class="fas fa-edit text-2xl"></i></button>
                            <button onClick={() => handleDelete(index)} className=" text-green-600 rounded-md"><i class="fas fa-trash text-2xl"></i></button>
                        </div>
                        </div>
            ))}
                </div>
            </div>



            {showPopup && (
                <form>
                <div className="fixed inset-0 flex items-center justify-center bg-gray-300/50 z-100 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[60dvw] h-[90dvh] overflow-auto">
                        <div className='flex justify-between'>
                            <h2 className="text-xl font-bold float-left">Add Your Education</h2>
                            <button
                                onClick={() => setShowPopup(false)}
                                className=" p-2 px-4 bg-red-500 text-white rounded-lg top-0 right-0"
                            > X
                            </button>

                        </div>

                        {/* Title */}
                        <label className="block font-medium">School</label>
                        <input
                            type="text"
                            name="school"
                            placeholder="Ex: Madhav School"
                            value={formData.school}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-md mt-1"
                        />

                        {/* Company */}
                        <label className="block mt-3 font-medium">Degree</label>
                        <input
                            type="text"
                            name="degree"
                            placeholder="Ex: Bechelors"
                            value={formData.degree}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-md mt-1"
                        />

                        {/* Location */}
                        <label className="block mt-3 font-medium">Field of Study</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="field"
                                placeholder="Ex: Computer Science"
                                value={formData.field}
                                onChange={handleChange}
                                className="w-1/2 border px-3 py-2 rounded-md mt-1"
                            />
                            
                        </div>

                        <label className="block mt-3 font-medium">Location</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="location"
                                placeholder="Ex: London"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-1/2 border px-3 py-2 rounded-md mt-1"
                            />
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-1/2 border px-3 py-2 rounded-md mt-1"
                            >
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                            </select>
                        </div>



                        {/* Start and End Dates */}
                        <div className="flex mt-3 gap-4">
                            <div className="w-1/2">
                                <label className="block font-medium">Start Date *</label>
                                <div className="flex gap-2">
                                    <select
                                        name="startDateMonth"
                                        value={formData.startDate.month}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                startDate: { ...formData.startDate, month: e.target.value },
                                            })
                                        }
                                        className="w-1/2 border px-2 py-1 rounded-md"
                                    >
                                        <option value="">Month</option>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                    </select>
                                    <input
                                        type="number"
                                        name="startDateYear"
                                        placeholder="Year"
                                        value={formData.startDate.year}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                startDate: { ...formData.startDate, year: e.target.value },
                                            })
                                        }
                                        className="w-1/2 border px-2 py-1 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="w-1/2">
                                <label className="block font-medium">End Date *</label>
                                <div className="flex gap-2">
                                    <select
                                        name="endDateMonth"
                                        value={formData.endDate.month}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                endDate: { ...formData.endDate, month: e.target.value },
                                            })
                                        }
                                        className="w-1/2 border px-2 py-1 rounded-md"
                                    >
                                        <option value="">Month</option>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                    </select>
                                    <input
                                        type="number"
                                        name="endDateYear"
                                        placeholder="Year"
                                        value={formData.endDate.year}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                endDate: { ...formData.endDate, year: e.target.value },
                                            })
                                        }
                                        className="w-1/2 border px-2 py-1 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <label className="block mt-3 font-medium">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-md mt-1"
                            rows="3"
                        ></textarea>

                        {/* Buttons */}
                        <div className="flex justify-between mt-4">
                            <button className="px-4 py-2 text-gray-500" onClick={() => { setShowPopup(false) }}>Cancel</button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-500 text-white rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </div>

                </div>
                </form>
            )}

        </div>
    </>
  )
}
