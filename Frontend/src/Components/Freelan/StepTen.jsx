import React, { useContext } from "react";
import { UserDetailsContext } from "../../Context/UserDetailsContext.jsx";
import thankYouLogo from "../../Assets/UserIcon.png";

export default function StepTen() {
  const { userDetails } = useContext(UserDetailsContext);
  console.log(userDetails);
  console.log(userDetails.experienceLevel);
  

  return (
    <div className="flex flex-col items-center justify-center h-[55dvh]">
      <img src={thankYouLogo} alt="Thank You" className="w-28 h-28 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800">Thank You!</h1>
      <p className="text-lg text-gray-600 mt-2">
        Welcome, {userDetails.firstName || "User"} {userDetails.experienceLevel}! 🎉
      </p>
      <p className="text-gray-500 mt-1">
        Your profile setup is complete. We are excited to have you on board!
      </p>
    </div>
  );
}
