import React, { useContext } from "react";
import { UserDetailsContext } from "../../Context/UserDetailsContext";

const options = [
  {
    id: "find_opportunities",
    label: "I'd like to find opportunities myself",
    description:
      "Clients post jobs on our Talent Marketplace™; you can browse and bid for them, or get invited by a client.",
    image: "📄",
  },
  {
    id: "package_work",
    label: "I'd like to package up my work for clients to buy",
    description:
      "Define your service with prices and timelines; we'll list it in our Project Catalog™ for clients to buy right away.",
    image: "📦",
  },
];

export default function StepThree() {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const toggleSelection = (id) => {
    setUserDetails((prev) => ({
      ...prev,
      workPreferences: prev.workPreferences.includes(id)
        ? prev.workPreferences.filter((item) => item !== id)
        : [...prev.workPreferences, id],
    }));
  };

  const toggleContractToHire = () => {
    setUserDetails((prev) => ({
      ...prev,
      contractToHire: !prev.contractToHire,
    }));
  };

  console.log(userDetails.workPreferences);
  

  return (
    <div className="max-w-3xl mx-auto p-6 mb-24">
      <h2 className="text-2xl font-semibold">And how would you like to work?</h2>
      <p className="text-sm text-gray-500 mt-1">
        Everybody works in different ways, so we have different ways of helping
        you win work. You can select multiple preferences now and can always
        change it later!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {options.map((option) => (
          <div
            key={option.id}
            className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition duration-200 ${
              userDetails.workPreferences.includes(option.id)
                ? "border-green-500 shadow-md"
                : "border-gray-300 hover:shadow"
            }`}
            onClick={() => toggleSelection(option.id)}
          >
            <span className="text-4xl">{option.image}</span>
            <p className="mt-3 text-center font-medium text-gray-700">
              {option.label}
            </p>
            <p className="text-sm text-gray-500 text-center mt-1">
              {option.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center">
        <input
          type="checkbox"
          id="contractToHire"
          className="mr-2"
          checked={userDetails.contractToHire}
          onChange={toggleContractToHire}
        />
        <label htmlFor="contractToHire" className="text-gray-700 font-medium">
          I'm open to contract-to-hire opportunities - Start with a contract,
          and later explore a full-time option with the client
        </label>
      </div>
    </div>
  );
}
