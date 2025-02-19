import React,{useState} from 'react'
  
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
  
export default function StepFour() {
  
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [skillsOptions, setSkillsOptions] = useState(initialSkillsOptions);
    const [newSkill, setNewSkill] = useState("");
  
    const toggleSelection = (id, setSelected) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };
  
    const addSkill = () => {
      if (newSkill.trim() && !skillsOptions.includes(newSkill)) {
        setSkillsOptions([...skillsOptions, newSkill]);
        setNewSkill("");
      }
    };
 
  return (
    <div className="max-w-3xl mx-auto h-[57dvh]">
      <h2 className="text-2xl font-semibold mt-8">Select Your Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {skillsOptions.map((skill) => (
          <div
            key={skill}
            className={`border rounded-lg p-3 text-center cursor-pointer transition duration-200 ${
              selectedSkills.includes(skill) ? "border-green-600 bg-green-100" : "border-gray-300 hover:shadow"
            }`}
            onClick={() => toggleSelection(skill, setSelectedSkills)}
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
    </div>

  )
}
