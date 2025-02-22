import React, { createContext, useState } from "react";

export const ClientDetailsContext = createContext();

export const ClientDetailsProvider = ({ children }) => {

    const [clientDetails, setClientDetails] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        country: "India",
        agreeToTerms: false,
        jobTitle:"",
    });


    return (
        <ClientDetailsContext.Provider value={{ clientDetails, setClientDetails }}>
            {children}
        </ClientDetailsContext.Provider>
    );
};
