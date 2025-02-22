import React, { createContext, useState } from "react";

export const ClientDetailsContext = createContext();
export default ClientDetailsContext;

export const ClientDetailsProvider = ({ children }) => {

    const [clientDetails, setClientDetails] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        country: "India",
        agreeToTerms: false,
        photo:"",
        address:"",
        phone:"",
        job: {
            jobTitle: "",
            skills: [],
            curtime: "",
            type: {
                size: "",
                time: "",
                exp: "",
                price: 0,
                desc: "",
            }
        }
    });


    return (
        <ClientDetailsContext.Provider value={{ clientDetails, setClientDetails }}>
            {children}
        </ClientDetailsContext.Provider>
    );
};
