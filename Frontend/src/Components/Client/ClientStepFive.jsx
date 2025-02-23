import React, { useContext } from "react";
import { ClientDetailsContext } from "../../Context/ClientDetailsContext";

export default function ClientStepFive() {
  const { clientDetails, setClientDetails } = useContext(ClientDetailsContext);

  // Handle description change
  const handleDescriptionChange = (e) => {
    const newDesc = e.target.value;

    // Update the context
    setClientDetails((prev) => ({
      ...prev,
      job: {
        ...prev.job,
        type: {
          ...prev.job.type,
          desc: newDesc, // Store updated description
        },
      },
    }));
  };

  

  return (
    <section className="flex mx-auto max-w-6xl align-center justify-center gap-10 mt-34 mb-40">
      <div>
        <h2 className="text-2xl font-medium">Job Post Details</h2>
        <p className="text-4xl font-semibold mt-3 w-80">
          Start the conversation.
        </p>
        <p className="text-xl w-96 mt-4">
          This will help us match you to talent within your range.
        </p>
      </div>

      <div className="flex flex-col justify-start">
        <p className="text-[18px] font-medium">Describe what you need</p>
        <textarea
          placeholder="Already have a description? Paste it here!"
          className="border-2 border-slate-400 w-80 mt-5 rounded-xl p-3"
          value={clientDetails.job.type.desc} // Bind input value to context
          onChange={handleDescriptionChange} // Call function on change
        />
      </div>
    </section>
  );
}
