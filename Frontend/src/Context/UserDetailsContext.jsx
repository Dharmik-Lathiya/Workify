import React, { createContext, useState } from "react";

export const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    country: "India",
    agreeToTerms: false,
    experienceLevel: "",
    freelancingGoal: "",
    workPreferences: [],
    contractToHire: false,
    selectedSkills: [],
    professionalTitle: "",
    experiences: [],
    education: [],
    bio: "",
    dob: "",
    street: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    profileImage: "",
  });

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
