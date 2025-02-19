import React, { useState, useContext } from 'react'
import { UserDetailsContext } from '../../Context/UserDetailsContext.jsx';

export default function StepSix() {

    const { userDetails, setUserDetails } = useContext(UserDetailsContext);

    // Initialize experience list
    const [experiences, setExperiences] = useState(userDetails.experiences || []);

    // Track whether popup is open
    const [showPopup, setShowPopup] = useState(false);

    // Track if we are editing an experience
    const [editingIndex, setEditingIndex] = useState(null);

    // Default form state
    const defaultFormState = {
        title: "",
        company: "",
        location: "",
        country: "India",
        currentRole: false,
        startDate: { month: "", year: "" },
        endDate: { month: "", year: "" },
        description: "",
    };

    const [formData, setFormData] = useState(defaultFormState);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle Save or Update
    const handleSave = () => {
        let updatedExperiences;
        
        if (editingIndex !== null) {
            // Update existing experience
            updatedExperiences = [...experiences];
            updatedExperiences[editingIndex] = formData;
        } else {
            // Add new experience
            updatedExperiences = [...experiences, formData];
        }
        
        // Update context and local state
        setExperiences(updatedExperiences);
        setUserDetails({ ...userDetails, experiences: updatedExperiences });

        // Reset state
        setShowPopup(false);
        setEditingIndex(null);
        setFormData(defaultFormState);
        document.formData.reset();
    };

    // Handle Edit
    const handleEdit = (index) => {
        setFormData(experiences[index]);
        setEditingIndex(index);
        setShowPopup(true);
        document.formData.reset();
    };

    // Handle Delete
    const handleDelete = (index) => {
        const updatedExperiences = experiences.filter((_, i) => i !== index);
        setExperiences(updatedExperiences);
        setUserDetails({ ...userDetails, experiences: updatedExperiences });
    };

    return (
        <div className='bg-transparent'>
            <div className='ml-10 mt-4 h-[59.9dvh]'>
                <p className='text-3xl w-[50dvw] font-semibold'>If you have relevant work experience, add it here.</p>
                <p className='w-[52dvw] mt-5'>Freelancers who add their experience are twice as likely to win work. But if you’re just starting out, you can still create a great profile. Just head on to the next page.</p>
                <div className='flex'>
                    <button className='border-dotted border-2 w-min mt-5 p-15 rounded-[2vw]' onClick={() => {setShowPopup(true); setEditingIndex(null);}}>
                        Add Work Experience
                    </button>
                    {experiences.length > 0 && experiences.map((exp, index)=> (
                        <div className='border-dotted border-2 w-[30vw] box-content overflow-hidden mt-5 rounded-[2vw] ml-5 flex p-5 '>
                            <i class="fas fa-graduation-cap text-3xl"></i>
                            
                            <div className='ml-2'>
                                <p className='font-bold'>{exp.title}</p>
                                    <span className='font-semibold mt-5'>{exp.company} | {exp.startDate.month} {exp.startDate.year} - {exp.endDate.month}{exp.endDate.year}</span>
                                <p className='mt-1'>{exp.location},{exp.country}</p>
                                <p className='w-20 mt-4'>{exp.description.slice(0,40)}</p>
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
                <div className="fixed inset-0 flex items-center justify-center bg-gray-300/50 z-100 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[60dvw] h-[90dvh] overflow-auto">
                        <div className='flex justify-between'>
                            <h2 className="text-xl font-bold float-left">Add Your Work Experience</h2>
                            <button
                                onClick={() => setShowPopup(false)}
                                className=" p-2 px-4 bg-red-500 text-white rounded-lg top-0 right-0"
                            > X
                            </button>

                        </div>

                        {/* Title */}
                        <label className="block font-medium">Title *</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Ex: Software Engineer"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-md mt-1"
                        />

                        {/* Company */}
                        <label className="block mt-3 font-medium">Company *</label>
                        <input
                            type="text"
                            name="company"
                            placeholder="Ex: Microsoft"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-md mt-1"
                        />

                        {/* Location */}
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

                        {/* Checkbox */}
                        <div className="mt-3">
                            <input
                                type="checkbox"
                                name="currentRole"
                                checked={formData.currentRole}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label>I am currently working in this role</label>
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

            )}

        </div>
    )
}
