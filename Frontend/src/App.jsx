import LandingPage from './Pages/LandingPage';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { UserProvider } from './Context/HeaderComponent'; // ✅ Ensure correct file import
import Signup from './Pages/Signup';
import FreelanSignup from './Pages/Freelan/FreelanSignup';
import CreateProfile from './Pages/Freelan/CreateProfile';
import { UserDetailsProvider } from './Context/UserDetailsContext.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Chat from './Components/chat/Chat';
import FreeLancerHome from './Pages/Freelan/FreeLancerHome.jsx';
import Notification from './Components/notification/Notification.jsx';
import Temp from './Pages/Freelan/Temp.jsx';
import ClientTemp from './Pages/Client/ClientTemp.jsx';
import FreelancerProfile from './Components/Freelan/FreelancerProfile.jsx';
import Login from './Pages/Login.jsx'
import { ClientDetailsProvider } from "/src/Context/ClientDetailsContext.jsx";
import ClientSignup from './Pages/Client/ClientSignup.jsx'
import ClientCreateProfile from './Pages/Client/ClientCreateProfile.jsx';


function App() {
  return (
    <UserDetailsProvider>
      <ClientDetailsProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/freelancer" element={<Temp />}>
              <Route path="SignUp" element={<FreelanSignup />} />
              
              <Route path="create-profile" element={<CreateProfile />} />
              <Route path="home" element={<FreeLancerHome />} />
              <Route path="profile" element={<FreelancerProfile />} />
            </Route>
            <Route path="/client" element={<ClientTemp />}>
              <Route path="SignUp" element={<ClientSignup />} />
              <Route path="create-profile" element={<ClientCreateProfile />} />
            </Route>
            <Route path='/chat' element={<Chat />} />
            <Route path='/chat/:id' element={<Chat />} />
            <Route path='/freelancer-dashboard' element={<FreeLancerHome />} />
            <Route path='/notification' element={<Notification />} />
          </Routes>

        </UserProvider>
      </ClientDetailsProvider>
    </UserDetailsProvider>
  );
}

export default App;
