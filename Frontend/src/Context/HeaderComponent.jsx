import { createContext, useContext, useState } from "react";

// ✅ Create context before using it
const UserContext = createContext();

// ✅ Provide the context to children
export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Corrected useUser function
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
