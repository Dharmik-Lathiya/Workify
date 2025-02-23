import React, { useContext } from "react";
import { ClientDetailsContext } from "../../Context/ClientDetailsContext";

export default function ClientStepFour() {
  const { clientDetails, setClientDetails } = useContext(ClientDetailsContext);

  // Handle price change
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;

    // Update the context
    setClientDetails((prev) => ({
      ...prev,
      job: {
        ...prev.job,
        type: {
          ...prev.job.type,
          price: newPrice, // Store updated price
        },
      },
    }));
  };

  

  return (
    <section className="flex mx-auto max-w-6xl align-center justify-center gap-10 mt-34 mb-40">
      <div>
        <h2 className="text-2xl font-medium">Job Post Details</h2>
        <p className="text-4xl font-semibold mt-3 w-80">
          Tell us about your budget.
        </p>
        <p className="text-xl w-96 mt-4">
          This will help us match you to talent within your range.
        </p>
      </div>

      <div className="flex flex-col justify-start">
        <h2 className="text-[18px] font-medium">
          What is the best cost estimate for your project?
        </h2>
        <p className="w-80 text-[14px] mt-4">
          Set a price for the project and pay at the end, or you can divide the
          project into milestones and pay as each milestone is completed.
        </p>
        <input
          type="number"
          placeholder="0 ₹"
          onkeypress="return event.keyCode === 8 || event.charCode >= 48 && event.charCode <= 57"
          className="border-2 border-slate-400 mt-5 rounded-xl p-2"
          value={clientDetails.job.type.price} // Bind input value to context
          onChange={handlePriceChange} // Call function on change
        />
      </div>
    </section>
  );
}
