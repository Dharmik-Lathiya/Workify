import LandingPage from './Pages/LandingPage';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { UserProvider } from './Context/HeaderComponent'; // ✅ Ensure correct file import
import Signup from './Pages/Signup';
import FreelanSignup from './Pages/Freelan/FreelanSignup';
import CreateProfile from './Pages/Freelan/CreateProfile';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/freelancer-signup" element={<FreelanSignup />} /> 
        <Route path='/create-profile' element={<CreateProfile/>} />
      </Routes>
    </UserProvider>
  );
}

export default App;
