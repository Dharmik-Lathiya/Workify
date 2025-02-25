import React, { useState, useContext } from "react";
import { UserDetailsContext } from "../../Context/UserDetailsContext.jsx";

export default function StepEight() {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  // Initialize languages from context or set a default value
  const [languages, setLanguages] = useState(
    userDetails.languages.length > 0 ? userDetails.languages : [{ name: "English", proficiency: "Basic" }]
  );  

  // Function to add a new language input
  const addLanguage = () => {
    setLanguages([...languages, { name: "", proficiency: "Basic" }]);
  };

  // Function to handle input change
  const handleLanguageChange = (index, value) => {
    const newLanguages = [...languages];
    newLanguages[index].name = value;
    setLanguages(newLanguages);
  };

  // Function to handle proficiency change
  const handleProficiencyChange = (index, value) => {
    const newLanguages = [...languages];
    newLanguages[index].proficiency = value;
    setLanguages(newLanguages);
  };

  // Function to save languages to context
  const saveLanguages = () => {
    setUserDetails((prevDetails) => ({
      ...prevDetails, // Preserve other user details
      languages, // Update languages
    }));
  };

  
  console.log("Updated User Languages:", userDetails.languages);

  return (
    <div className="mb-5 flex flex-col justify-center items-center min-h-80 mt-[2.3dvh]">
      <div className="p-6 w-full max-w-lg mx-auto border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold text-center mb-4">
          Looking good. Next, tell us which languages you speak.
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Upwork is global, so clients are often interested to know what languages you speak. English is a must, but do you speak any other languages?
        </p>
        {languages.map((language, index) => (
          <div key={index} className="flex items-center space-x-4 mb-3">
            <input
              type="text"
              placeholder="Language"
              className="border p-2 rounded w-full"
              value={language.name}
              onChange={(e) => handleLanguageChange(index, e.target.value)}
            />
            <select
              className="border p-2 rounded"
              value={language.proficiency}
              onChange={(e) => handleProficiencyChange(index, e.target.value)}
            >
              <option value="Basic">Basic</option>
              <option value="Conversational">Conversational</option>
              <option value="Fluent">Fluent</option>
              <option value="Native">Native</option>
            </select>
          </div>
        ))}
        <div className="flex gap-4">
          <button onClick={addLanguage} className="mt-2 w-full bg-green-500 text-white py-2 rounded">
            + Add a language
          </button>
          <button onClick={saveLanguages} className="mt-2 w-full bg-green-500 text-white py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
