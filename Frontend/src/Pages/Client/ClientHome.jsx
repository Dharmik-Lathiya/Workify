import React, { useContext, useState, useEffect } from 'react';
import ClientDetailsContext from '../../Context/ClientDetailsContext.jsx';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import ClientOverview from '../../Components/Client/ClientOverview.jsx';

export default function Dashboard() {
  const { clientDetails, setClientDetails } = useContext(ClientDetailsContext);
  const [showPopup, setShowPopup] = useState(false);
    const [flag,setFlag] = useState(true)

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
  let [allJobs, setAllJobs] = useState([]);
  useEffect(() => {

    fetch(import.meta.env.VITE_APP_BACKEND_URL + `/getuser/client/${localStorage.getItem("clientId")}`, {
      method: "GET"
    }).then((res) => {
      res.json().then((data) => {



        setAllJobs(() => { return data.postedJobs });

        setClientDetails(prevState => ({
          ...prevState,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          password: data.password || "",
          country: data.country || "India",
          photo: data.photo || "",
          address: data.address || "",
          phone: data.phone || "",
          jobs: data.postedJobs || [],

        }));
        console.log(clientDetails);



      })
    })

  }, [flag])

  // State for adding custom skills
  const [inputSkill, setInputSkill] = useState("");

  // Popular skills array (you can modify as needed)
  const popularSkills = ["HTML", "CSS", "JavaScript", "React", "Figma"];

  // Basic field handler (for jobTitle only)
  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  // For updating nested fields in jobData.type
  const handleTypeChange = (e) => {
    setJobData({
      ...jobData,
      type: {
        ...jobData.type,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Submit handler: add jobData to context and reset
  const handleSubmit = () => {
    setClientDetails(prevState => ({
      ...prevState,
      jobs: [...prevState.jobs, jobData],
    }));

    fetch(import.meta.env.VITE_APP_BACKEND_URL + "/postjob", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          clientId: localStorage.getItem("clientId"),
          ...jobData
      })
  }).then(res => {
      res.json().then(data => {
          console.log(data);

          setFlag(!flag);
    setJobData({
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

      })
  })

    
    setInputSkill("");
    setShowPopup(false);
  };

  const selectSkill = (skill) => {
    if (!jobData.skills.includes(skill)) {
      setJobData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const addInputSkill = () => {
    if (inputSkill.trim()) {
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
      title: "Lead Generation Expert, Email Researcher and List Builder, Data Entry",
      hourlyRate: "$15/hr",
      jobSuccess: "95%",
      earnings: "$50k+",
      skills: ["Lead Generation", "Data Entry", "Data Mining", "Email Research"],
      profileImage: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "AJ R.",
      title: "Data Entry | LinkedIn lead generation | Web Research | List Building",
      hourlyRate: "$7/hr",
      jobSuccess: "85%",
      earnings: "$25k+",
      skills: ["Data Entry", "Web Research", "List Building", "Data Scraping"],
      profileImage: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Ruben V.",
      title: "Certified Facebook Ads & Google Ads Expert | Meta | Adwords | PPC",
      hourlyRate: "$20/hr",
      jobSuccess: "100%",
      earnings: "$100k+",
      skills: ["Google Ads", "Meta Ads", "Adwords", "PPC"],
      profileImage: "https://via.placeholder.com/100",
    },
    {
      id: 4,
      name: "Muhammed M.",
      title: "Dropshipping | Shopify | SMM | VA | Customer Care | DMCA",
      hourlyRate: "$9/hr",
      jobSuccess: "90%",
      earnings: "$30k+",
      skills: ["Shopify", "Virtual Assistant", "Customer Support"],
      profileImage: "https://via.placeholder.com/100",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };



  return (
    <div className="p-6 min-h-screen mx-auto">
      {/* Welcome Section */}
      <div className="flex align-middle justify-between mx-auto max-w-6xl mt-10 mb-8">
        <p className="text-2xl">
          Welcome, <span className="font-medium">{clientDetails.firstName}!</span>
        </p>
        <button onClick={() => setShowPopup(true)} className="bg-green-600 text-white p-3 rounded-xl px-5">
          Post a job
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-300/50 z-100 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[70vw] h-[70vh] overflow-auto">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Post a Job</h2>
              <button onClick={() => setShowPopup(false)} className="p-2 px-4 bg-red-500 text-white rounded-lg">X</button>
            </div>

            {/* Job Title Input */}
            <label className="block mt-3 font-medium">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={jobData.jobTitle}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md mt-1"
            />

            {/* Skills Section */}
            <p className="text-[16px] font-medium mt-4">Selected Skills</p>
            <div className="text-[15px] mt-2 border border-slate-200 my-1 p-2 h-10 rounded-xl mx-1">
              {jobData.skills.map((skill, index) => (
                <button key={index} className="border-2 border-slate-300 px-3 py-1 rounded-xl">
                  {skill}
                </button>
              ))}
            </div>

            <span className="text-[16px] font-medium mt-4">Popular skills for Web Design</span>
            <div id="allSkils" className="text-[15px] mt-2 border border-slate-200 my-1 p-2 rounded-2xl mx-1">
              {popularSkills.map((skill, index) => (
                <button
                  key={index}
                  className="border-2 border-slate-300 px-3 py-1 rounded-xl mx-1"
                  onClick={() => selectSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>

            <p className="text-[16px] font-medium mt-4">Add Your Own Skills</p>
            <div className="flex">
              <input
                type="text"
                className="border-2 border-slate-300 w-80 rounded m-2"
                value={inputSkill}
                onChange={(e) => setInputSkill(e.target.value)}
              />
              <button
                className="p-1 border-2 border-slate-200 px-5 rounded-xl"
                onClick={addInputSkill}
              >
                Add
              </button>
            </div>

            {/* Project Size Selection */}
            <p className="mt-5 text-[18px] font-semibold">Project Size</p>
            {["Large", "Medium", "Small"].map((size) => (
              <div key={size} className="flex mt-5">
                <input
                  type="radio"
                  name="projectSize"
                  id={size}
                  checked={jobData.type.size === size}
                  onChange={() => handleRadioChange("size", size)}
                />
                <div className="flex-col ml-3">
                  <label htmlFor={size} className="text-xl font-medium">
                    {size}
                  </label>
                  <p className="w-80 text-[16px]">
                    {size === "Large"
                      ? "Longer term or complex initiatives (ex. design and build a full website)"
                      : size === "Medium"
                        ? "Well-defined projects (ex. a landing page)"
                        : "Quick and straightforward tasks (ex. update text and images on a webpage)"}
                  </p>
                </div>
              </div>
            ))}

            {/* Project Duration Selection */}
            <p className="mt-5 text-[18px] font-semibold">How long will your work take?</p>
            {["More than 6 months", "3 to 6 months", "1 to 3 months"].map((time) => (
              <div key={time} className="flex mt-3">
                <input
                  type="radio"
                  name="projectTime"
                  id={time}
                  checked={jobData.type.time === time}
                  onChange={() => handleRadioChange("time", time)}
                />
                <div className="flex-col ml-3">
                  <label htmlFor={time} className="text-[16px]">
                    {time}
                  </label>
                </div>
              </div>
            ))}

            {/* Experience Level Selection */}
            <p className="mt-5 text-[18px] font-semibold">Experience Level</p>
            {["Entry", "Intermediate", "Expert"].map((exp) => (
              <div key={exp} className="flex mt-5">
                <input
                  type="radio"
                  name="experienceLevel"
                  id={exp}
                  checked={jobData.type.exp === exp}
                  onChange={() => handleRadioChange("exp", exp)}
                />
                <div className="flex-col ml-3">
                  <label htmlFor={exp} className="text-[15px] font-medium">
                    {exp}
                  </label>
                  <p className="w-80 text-[14px]">
                    {exp === "Entry"
                      ? "Looking for someone relatively new to this field"
                      : exp === "Intermediate"
                        ? "Looking for substantial experience in this field"
                        : "Looking for comprehensive and deep expertise in this field"}
                  </p>
                </div>
              </div>
            ))}

            {/* Price and Description remain as inputs */}
            <label className="block mt-3 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={jobData.type.price}
              onChange={handleTypeChange}
              className="w-full border px-3 py-2 rounded-md mt-1"
            />

            <label className="block mt-3 font-medium">Description</label>
            <textarea
              name="desc"
              value={jobData.type.desc}
              onChange={handleTypeChange}
              className="w-full border px-3 py-2 rounded-md mt-1"
            ></textarea>

            <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg">
              Submit
            </button>
          </div>
        </div>
      )}

     <ClientOverview />

      {/* Additional sections (e.g., slider, Help & Resources) remain unchanged */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 h-96">
        <h2 className="text-xl font-semibold mb-4">Review your project's goals with an expert, one-on-one</h2>
        <div className="flex gap-10 h-74">
          <div className="w-3/12 text-white bg-green-600 rounded-xl">
            <p className="p-2 font-semibold ml-2 text-xl ">Guild tour</p>
            <p className="p-2 font-medium w-60 mx-auto">Book a consultation with an expert to review your project’s budget, timeline, and scope one-on-one.</p>
            <button className='ml-4 bg-slate-100 mt-8 text-black p-2 rounded-xl'>Learn more</button>
          </div>
          <div className="w-9/12 h-full p-2">
            <Slider {...settings} className="w-full flex">
              {developers.map((developer) => (
                <div key={developer.id} className="px-2"> {/* Adds spacing between slides */}
                  <div className="bg-white p-5 rounded-lg shadow-md flex items-center justify-between">
                    <div className="items-center gap-4">
                      <img
                        src={developer.profileImage}
                        alt={developer.name}
                        className="w-16 h-16 rounded-full border mx-auto"
                      />
                      <div>
                        <h2 className="text-lg font-bold">{developer.name}</h2>
                        <p className="text-sm text-gray-600">{developer.title}</p>

                        <div className="flex gap-2 mt-2 flex-wrap my-4">
                          {developer.skills.map((skill, index) => (
                            <span key={index} className="bg-gray-200 px-2 py-1 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <Link to={`/client/developer-profile/${developer.id}`} className="px-4 py-1 bg-green-500 text-white rounded-lg">
                          Invite to Job
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </Slider>

          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Help and resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex shadow-lg bg-white p-6 rounded-2xl justify-center items-center">
            <div>
              <p>Payment</p>
              <p className="text-xl font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, impedit!</p>
            </div>
            <div>
              <img width="200vw" height="200vw" src="https://img.icons8.com/bubbles/100/card-in-use.png" alt="card-in-use" className="mx-auto my-auto" />
            </div>
          </div>
          <div className="flex shadow-lg bg-white p-6 rounded-2xl justify-center items-center">
            <div>
              <p>Payment</p>
              <p className="text-xl font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, impedit!</p>
            </div>
            <div>
              <img width="200vw" height="200vw" src="https://img.icons8.com/clouds/100/bank-card-back-side.png" alt="card-in-use" className="mx-auto my-auto" />
            </div>
          </div>
          <div className="flex shadow-lg bg-white p-6 rounded-2xl justify-center items-center">
            <div>
              <p>Payment</p>
              <p className="text-xl font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, impedit!</p>
            </div>
            <div>
              <img width="200vw" height="200vw" src="https://img.icons8.com/clouds/100/trust.png" alt="card-in-use" className="mx-auto my-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
