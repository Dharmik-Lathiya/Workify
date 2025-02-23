import React, { useState, useContext } from "react";
import { ClientDetailsContext } from "../../Context/ClientDetailsContext";

export default function ClientStepTwo() {
  const { clientDetails, setClientDetails } = useContext(ClientDetailsContext);
  const [inputSkill, setInputSkill] = useState("");
  const [skills, setSkills] = useState(["Html", "Css", "Js", "Php", "React.js", "Node.js"]);
  // Initialize from the nested job object
  const [selectedSkills, setSelectedSkills] = useState(clientDetails.job.skills || []);

  const selectedSkill = (e) => {
    const selSkill = e.target.dataset.skill;
    if (!selectedSkills.includes(selSkill)) {
      const updatedSkills = [...selectedSkills, selSkill];
      setSelectedSkills(updatedSkills);
      // Update the nested job object's skills array
      setClientDetails((prev) => ({
        ...prev,
        job: {
          ...prev.job,
          skills: updatedSkills,
        },
      }));
    }
    console.log(clientDetails.job.skills);
  };

  const addInputSkill = () => {
    if (inputSkill.trim() !== "") {
      setSkills([...skills, inputSkill]);
      setInputSkill("");
    }
  };

  return (
    <>
      <section className="flex mx-auto max-w-6xl items-center justify-center gap-10 mt-34 mb-40">
        <div>
          <h2 className="text-2xl font-medium">Job Post Details</h2>
          <p className="text-4xl font-semibold mt-3 w-80">
            What are the main skills required for your work?
          </p>
        </div>

        <div className="flex flex-col justify-start">
          <p className="text-[16px] font-medium mt-4">Selected List</p>
          <div className="text-[15px] mt-2 border-slate-200 my-1 border-2 p-2 rounded-2xl mx-1 w-80">
            {selectedSkills.map((skill, index) => (
              <button key={index} className="border-2 border-slate-300 px-3 py-1 rounded-xl">
                {skill}
              </button>
            ))}
          </div>

          {/* Skills section */}
          <span className="text-[16px] font-medium mt-4">Popular skills for Web Design</span>
          <div id="allSkils" className="text-[15px] mt-2 border-slate-200 my-1 border-2 p-2 rounded-2xl mx-1 w-80">
            {skills.map((skill, index) => (
              <button
                key={index}
                className="border-2 border-slate-300 px-3 py-1 rounded-xl"
                data-skill={skill}
                onClick={selectedSkill}
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Input field to add new skills */}
          <p className="text-[16px] font-medium mt-4">Add Your Own Skills</p>
          <div className="flex">
            <input
              type="text"
              className="border-2 border-slate-300 w-80 rounded m-2"
              id="inputSkill"
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
        </div>
      </section>
    </>
  );
}