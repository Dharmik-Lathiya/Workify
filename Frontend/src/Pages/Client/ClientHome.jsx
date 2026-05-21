import React, { useContext, useState, useEffect } from 'react';
import { ClientDetailsContext } from '../../Context/ClientDetailsContext.jsx';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import ClientOverview from '../../Components/Client/ClientOverview.jsx';
import { PlusCircle, X, CheckCircle, Search, HelpCircle, Shield, CreditCard } from 'lucide-react';
import { Button } from '../../Components/UI/Button';
import { Input } from '../../Components/UI/Input';
import apiFetch from '../../lib/api';

export default function Dashboard() {
  const { clientDetails, setClientDetails } = useContext(ClientDetailsContext);
  const [showPopup, setShowPopup] = useState(false);
  const [flag, setFlag] = useState(true);

  const [jobData, setJobData] = useState({
    jobTitle: "",
    skills: [],
    type: {
      size: "",
      time: "",
      exp: "",
      price: 0,
      desc: "",
    },
  });

  useEffect(() => {
    apiFetch(`/api/users/client/${localStorage.getItem("clientId")}`).then((data) => {
      const client = data.data;
      if (client) {
        setClientDetails(prevState => ({
          ...prevState,
          firstName: client.firstName || "",
          lastName: client.lastName || "",
          email: client.email || "",
          password: client.password || "",
          country: client.country || "India",
          photo: client.photo || "",
          address: client.address || "",
          phone: client.phone || "",
          jobs: client.postedJobs || [],
        }));
      }
    });
  }, [flag, setClientDetails]);

  const [inputSkill, setInputSkill] = useState("");
  const popularSkills = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Python", "UI/UX Design", "Figma"];

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTypeChange = (e) => {
    setJobData({
      ...jobData,
      type: {
        ...jobData.type,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = () => {
    setClientDetails(prevState => ({
      ...prevState,
      jobs: [...prevState.jobs, jobData],
    }));

    apiFetch("/api/jobs/post", {
      method: "POST",
      body: JSON.stringify({
          clientId: localStorage.getItem("clientId"),
          ...jobData
      })
    }).then(data => {
          setFlag(!flag);
          setJobData({
            jobTitle: "",
            skills: [],
            type: { size: "", time: "", exp: "", price: 0, desc: "" },
          });
    });

    setInputSkill("");
    setShowPopup(false);
  };

  const selectSkill = (skill) => {
    if (!jobData.skills.includes(skill)) {
      setJobData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setJobData(prev => ({
        ...prev,
        skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addInputSkill = () => {
    if (inputSkill.trim() && !jobData.skills.includes(inputSkill.trim())) {
      setJobData(prev => ({
        ...prev,
        skills: [...prev.skills, inputSkill.trim()],
      }));
      setInputSkill("");
    }
  };

  const handleRadioChange = (field, value) => {
    setJobData(prev => ({
      ...prev,
      type: { ...prev.type, [field]: value },
    }));
  };

  const developers = [
    {
      id: 1,
      name: "Kemar J.",
      title: "Lead Generation Expert & Data Entry",
      skills: ["Lead Generation", "Data Entry"],
      profileImage: "https://i.pravatar.cc/100?img=11",
    },
    {
      id: 2,
      name: "AJ R.",
      title: "Web Research | List Building",
      skills: ["Data Entry", "Web Research"],
      profileImage: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: 3,
      name: "Ruben V.",
      title: "Certified Ads Expert | Meta | Adwords",
      skills: ["Google Ads", "Meta Ads"],
      profileImage: "https://i.pravatar.cc/100?img=13",
    },
    {
      id: 4,
      name: "Muhammed M.",
      title: "Shopify | SMM | VA | Customer Care",
      skills: ["Shopify", "Virtual Assistant"],
      profileImage: "https://i.pravatar.cc/100?img=14",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1024,
          settings: { slidesToShow: 2, slidesToScroll: 1 }
        },
        {
          breakpoint: 600,
          settings: { slidesToShow: 1, slidesToScroll: 1 }
        }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Welcome Section */}
      <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <p className="text-3xl font-bold text-gray-900">
                Welcome back, {clientDetails?.firstName || 'Client'}!
                </p>
                <p className="text-gray-600 mt-2">Ready to find top talent for your next project?</p>
            </div>
            <Button onClick={() => setShowPopup(true)} size="lg" className="gap-2 shrink-0">
               <PlusCircle size={20} /> Post a Job
            </Button>
          </div>
      </div>

      <ClientOverview />

      {/* Suggested Talent */}
      <div className="container mx-auto max-w-7xl px-4 mt-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top talent based on your history</h2>
            <div className="px-2">
                <Slider {...settings} className="w-full">
                {developers.map((developer) => (
                    <div key={developer.id} className="p-2">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow h-full flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={developer.profileImage}
                                alt={developer.name}
                                className="w-16 h-16 rounded-full border-2 border-white shadow-sm object-cover"
                            />
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">{developer.name}</h2>
                                <p className="text-sm text-gray-600 line-clamp-1">{developer.title}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 mb-6 flex-wrap flex-1 content-start">
                            {developer.skills.map((skill, index) => (
                                <span key={index} className="bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                                {skill}
                                </span>
                            ))}
                        </div>
                        <Link to={`/client/developer-profile/${developer.id}`}>
                            <Button variant="outline" className="w-full text-green-600 border-green-600 hover:bg-green-50">
                                View Profile
                            </Button>
                        </Link>
                    </div>
                    </div>
                ))}
                </Slider>
            </div>
          </div>

          {/* Help & Resources */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Help and Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-full shrink-0 text-green-600">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Secure Payments</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">Your funds are held securely until you approve the work. Only pay for work you authorize.</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full shrink-0 text-blue-600">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Trust & Safety</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">We provide identity verification and safe communication tools to protect your account.</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-full shrink-0 text-purple-600">
                        <HelpCircle size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">Our global support team is ready to help you with any questions or issues you might face.</p>
                    </div>
                </div>
            </div>
          </div>
      </div>

      {/* Post a Job Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
              <h2 className="text-2xl font-bold text-gray-900">Post a New Job</h2>
              <button onClick={() => setShowPopup(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Job Title <span className="text-red-500">*</span></label>
                <Input
                  type="text"
                  name="jobTitle"
                  placeholder="e.g. Need a Full Stack Developer for an E-commerce Site"
                  value={jobData.jobTitle}
                  onChange={handleChange}
                />
              </div>

              {/* Skills Section */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Skills Required</label>
                
                <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
                  {jobData.skills.length === 0 && <p className="text-gray-400 text-sm py-1">No skills added yet.</p>}
                  {jobData.skills.map((skill, index) => (
                    <span key={index} className="bg-green-100 text-green-800 border border-green-200 px-3 py-1.5 text-sm font-medium rounded-full flex items-center gap-1 shadow-sm">
                      {skill}
                      <X size={14} className="cursor-pointer hover:text-green-900" onClick={() => removeSkill(skill)} />
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-sm text-gray-600 w-full mb-1 font-medium">Popular:</span>
                  {popularSkills.map((skill, index) => (
                    <button
                      key={index}
                      className="bg-white border border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-700 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                      onClick={() => selectSkill(skill)}
                    >
                      + {skill}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 max-w-md">
                  <Input
                    type="text"
                    placeholder="Add custom skill"
                    value={inputSkill}
                    onChange={(e) => setInputSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addInputSkill()}
                  />
                  <Button variant="secondary" onClick={addInputSkill}>Add</Button>
                </div>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Size */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Project Size</label>
                    <div className="space-y-3">
                        {[
                            { id: "Large", label: "Large", desc: "Longer term, complex initiatives" },
                            { id: "Medium", label: "Medium", desc: "Well-defined projects" },
                            { id: "Small", label: "Small", desc: "Quick, straightforward tasks" }
                        ].map((size) => (
                        <label key={size.id} className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${jobData.type.size === size.id ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                            <input
                                type="radio"
                                name="projectSize"
                                className="mt-1 accent-green-600"
                                checked={jobData.type.size === size.id}
                                onChange={() => handleRadioChange("size", size.id)}
                            />
                            <div>
                                <span className="block font-medium text-gray-900">{size.label}</span>
                                <span className="text-xs text-gray-500">{size.desc}</span>
                            </div>
                        </label>
                        ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Estimated Duration</label>
                    <div className="space-y-3">
                        {["More than 6 months", "3 to 6 months", "1 to 3 months", "Less than 1 month"].map((time) => (
                        <label key={time} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${jobData.type.time === time ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                            <input
                                type="radio"
                                name="projectTime"
                                className="accent-green-600"
                                checked={jobData.type.time === time}
                                onChange={() => handleRadioChange("time", time)}
                            />
                            <span className="font-medium text-gray-900">{time}</span>
                        </label>
                        ))}
                    </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Experience Level Required</label>
                    <div className="space-y-3">
                        {["Entry", "Intermediate", "Expert"].map((exp) => (
                        <label key={exp} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${jobData.type.exp === exp ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                            <input
                                type="radio"
                                name="experienceLevel"
                                className="accent-green-600"
                                checked={jobData.type.exp === exp}
                                onChange={() => handleRadioChange("exp", exp)}
                            />
                            <span className="font-medium text-gray-900">{exp} Level</span>
                        </label>
                        ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Budget (₹) <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                        <Input
                            type="number"
                            name="price"
                            placeholder="e.g. 5000"
                            className="pl-8"
                            value={jobData.type.price || ''}
                            onChange={handleTypeChange}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Enter the total fixed price for this project.</p>
                  </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Project Description <span className="text-red-500">*</span></label>
                <textarea
                  name="desc"
                  placeholder="Provide detailed requirements, goals, and any other relevant information..."
                  value={jobData.type.desc}
                  onChange={handleTypeChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 min-h-[150px] resize-y"
                ></textarea>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0 z-10">
                <Button variant="outline" onClick={() => setShowPopup(false)}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={!jobData.jobTitle || !jobData.type.desc || !jobData.type.price} className="px-8">
                    Post Job
                </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
