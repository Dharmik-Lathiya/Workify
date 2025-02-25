import React, { useContext, useState } from "react";
import { UserDetailsContext } from "../../Context/UserDetailsContext";

const initialSkillsOptions = [
  "Web Designing",
  "Web Development",
  "Graphic Design",
  "SEO Services",
  "App Development",
  "Cybersecurity",
  "Content Writing",
  "IT Support",
];

export default function StepFour({ nextStep }) {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [skillsOptions, setSkillsOptions] = useState(initialSkillsOptions);
  const [newSkill, setNewSkill] = useState("");

  const toggleSelection = (skill) => {
    setUserDetails((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skill)
        ? prev.selectedSkills.filter((s) => s !== skill)
        : [...prev.selectedSkills, skill],
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skillsOptions.includes(newSkill)) {
      setSkillsOptions([...skillsOptions, newSkill]);
      setUserDetails((prev) => ({
        ...prev,
        selectedSkills: [...prev.selectedSkills, newSkill], // Automatically select new skill
      }));
      setNewSkill("");
    }
  };

  const isNextEnabled = userDetails.selectedSkills.length > 0;

  return (
    <div className="max-w-3xl mx-auto h-[57dvh]">
      <h2 className="text-2xl font-semibold mt-8">Select Your Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {skillsOptions.map((skill) => (
          <div
            key={skill}
            className={`border rounded-lg p-3 text-center cursor-pointer transition duration-200 ${
              userDetails.selectedSkills.includes(skill)
                ? "border-green-600 bg-green-100"
                : "border-gray-300 hover:shadow"
            }`}
            onClick={() => toggleSelection(skill)}
          >
            {skill}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add new skill"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addSkill}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>

      {/* Next Button */}
      <button
        onClick={nextStep}
        disabled={!isNextEnabled}
        className={`mt-6 px-6 py-2 rounded-lg text-white ${
          isNextEnabled ? "bg-green-600" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
}
