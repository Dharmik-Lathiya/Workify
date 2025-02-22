import React, { useContext } from "react";
import { ClientDetailsContext } from "../../Context/ClientDetailsContext";

export default function ClientStepThree() {
  const { clientDetails, setClientDetails } = useContext(ClientDetailsContext);

  const handleChange = (field, value) => {
    setClientDetails((prev) => ({
      ...prev,
      job: {
        ...prev.job,
        type: {
          ...prev.job.type,
          [field]: value,
        },
      },
    }));
  };

  console.log(clientDetails.job);
  

  return (
    <section className="flex mx-auto max-w-6xl justify-center gap-10 mt-34 mb-40">
      <div className="mt-20">
        <h2 className="text-2xl font-medium">Job Post Details</h2>
        <p className="text-4xl font-semibold mt-3 w-80">
          Next, estimate the scope of your work.
        </p>
        <p className="text-xl w-96 mt-2">
          Consider the size of your project and the time it will take.
        </p>
      </div>

      <div className="flex flex-col justify-start">
        <h2 className="text-2xl font-semibold">Project Type</h2>

        {/** Project Size Selection */}
        {["Large", "Medium", "Small"].map((size) => (
          <div key={size} className="flex mt-5">
            <input
              type="radio"
              name="projectSize"
              id={size}
              checked={clientDetails.job.type.size === size}
              onChange={() => handleChange("size", size)}
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

        {/** Project Duration Selection */}
        <p className="mt-5 text-[18px] font-semibold">
          How long will your work take?
        </p>
        {["More than 6 months", "3 to 6 months", "1 to 3 months"].map((time) => (
          <div key={time} className="flex mt-3">
            <input
              type="radio"
              name="projectTime"
              id={time}
              checked={clientDetails.job.type.time === time}
              onChange={() => handleChange("time", time)}
            />
            <div className="flex-col ml-3">
              <label htmlFor={time} className="text-[16px]">
                {time}
              </label>
            </div>
          </div>
        ))}

        {/** Experience Level Selection */}
        <p className="mt-5 text-[18px] font-semibold">
          What level of experience will it need?
        </p>
        {["Entry", "Intermediate", "Expert"].map((exp) => (
          <div key={exp} className="flex mt-5">
            <input
              type="radio"
              name="experienceLevel"
              id={exp}
              checked={clientDetails.job.type.exp === exp}
              onChange={() => handleChange("exp", exp)}
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
      </div>
    </section>
  );
}
