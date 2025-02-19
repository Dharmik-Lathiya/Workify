import React,{useState} from 'react'

const options = [
    {
      id: "new",
      label: "I am brand new to this",
      image: "🔍",
    },
    {
      id: "some",
      label: "I have some experience",
      image: "✍️",
    },
    {
      id: "expert",
      label: "I am an expert",
      image: "💻",
    },
  ];

export default function StepFirst() {
    const [selected, setSelected] = useState(null);
  return (
    <>
      <div className="max-w-2xl mx-auto mt-5 p-6 h-[58dvh]">
      <h2 className="text-xl font-semibold">A few quick questions: first, have you freelanced before?</h2>
      <p className="text-sm text-gray-500 mt-1">
        This lets us know how much help to give you along the way. We won’t share your answer with anyone else, including potential clients.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
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
