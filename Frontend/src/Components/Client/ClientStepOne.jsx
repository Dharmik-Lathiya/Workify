import React, { useState, useContext } from "react";
import { ClientDetailsContext } from "../../Context/ClientDetailsContext";

export default function ClientStepOne() {
  const { clientDetails, setClientDetails } = useContext(ClientDetailsContext);
  const [title, setTitle] = useState(clientDetails.title || ""); 

  const handleChange = (e) => {
    setTitle(e.target.value);
    setClientDetails((prev) => ({ ...prev, title: e.target.value })); 
  };

  return (
    <>
      <section className="flex gap-20 mx-auto max-w-6xl items-center justify-center mt-44 mb-40">
        <div>
          <h2 className="text-2xl font-medium">Job Post Details</h2>
          <p className="text-4xl font-semibold mt-3 w-9/12">
            Let's start with a strong title.
          </p>
          <p className="text-[16px] w-96 mt-3">
            This helps your job post stand out to the right candidates. It’s the first thing they’ll see, so make it count!
          </p>
        </div>
        <div className="flex flex-col justify-start">
          <p className="text-[20px]">Write a title for your job post</p>
          <input
            type="text"
            value={title}
            onChange={handleChange} 
            className="border-2 border-slate-300 w-80 rounded m-2"
          />
          <span className="text-[16px] font-medium">Example titles</span>
          <ul className="list-disc ml-8 *:w-80 *:mt-2 mt-2">
            <li>Build responsive WordPress site with booking/payment functionality</li>
            <li>Graphic designer needed to design ad creative for multiple campaigns</li>
            <li>Facebook ad specialist needed for product launch</li>
          </ul>
        </div>
      </section>
    </>
  );
}
