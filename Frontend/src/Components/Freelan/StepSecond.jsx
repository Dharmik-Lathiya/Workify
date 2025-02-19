import React,{useState} from 'react'


const options = [
    {
      id: "main_income",
      label: "To earn my main income",
      image: "💰",
    },
    {
      id: "side_money",
      label: "To make money on the side",
      image: "💵",
    },
    {
      id: "experience",
      label: "To get experience, for a full-time job",
      image: "🏅",
    },
    {
      id: "no_goal",
      label: "I don't have a goal in mind yet",
      image: "📱",
    },
  ];
export default function StepSecond() {
    const [selected, setSelected] = useState(null);
  return (
    <>
        <div className="max-w-3xl mx-auto p-6 h-[62dvh]">
      <h2 className="text-2xl font-semibold">Got it. What's your biggest goal for freelancing?</h2>
      <p className="text-sm text-gray-500 mt-1">
        Different people come to Upwork for various reasons. We want to highlight the opportunities that fit your goals best while still showing you all the possibilities.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {options.map((option) => (
          <div
            key={option.id}
            className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition duration-200 ${
              selected === option.id ? "border-green-500 shadow-md" : "border-gray-300 hover:shadow"
            }`}
            onClick={() => setSelected(option.id)}
          >
            <span className="text-4xl">{option.image}</span>
            <p className="mt-3 text-center font-medium text-gray-700">{option.label}</p>
          </div>
        ))}
      </div>
    </div> 
    </>
  )
}
