import LandingPage from './Pages/LandingPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { UserProvider } from './Context/HeaderComponent'; // ✅ Ensure correct file import
import Signup from './Pages/Signup';
import FreelanSignup from './Pages/Freelan/FreelanSignup';
import CreateProfile from './Pages/Freelan/CreateProfile';
import { UserDetailsProvider } from './Context/UserDetailsContext.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Chat from './Components/chat/Chat';
import FreeLancerHome from './Pages/Freelan/FreeLancerHome.jsx';
import Temp from './Pages/Freelan/Temp.jsx';
import ClientTemp from './Pages/Client/ClientTemp.jsx';
import FreelancerProfile from './Components/Freelan/FreelancerProfile.jsx';
import Login from './Pages/Login.jsx'
import { ClientDetailsProvider } from "/src/Context/ClientDetailsContext.jsx";
import ClientSignup from './Pages/Client/ClientSignup.jsx'
import ClientCreateProfile from './Pages/Client/ClientCreateProfile.jsx';
import ClientHome from './Pages/Client/ClientHome.jsx';
import ClientProfile from './Components/Client/ClientProfile.jsx';
import ClientDevelperSearch from './Components/Client/ClientDevelperSearch.jsx';
import DeveloperProfile from './Components/Client/DeveloperProfile.jsx';
import { UserDetailsContext } from "./Context/UserDetailsContext";
import { ClientDetailsContext } from './Context/ClientDetailsContext';
// import FreelancerFindJobs from './Components/FindJobs.jsx';
import FindJobs from './Components/FindJobs.jsx';
import FIndDevelopers from './Components/FIndDevelopers.jsx';
import PaymentForm from './Components/PaymentForm';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe("pk_test_51QwTKoGbnzXJuBBeAJJ4po5FiZSejRHh78Ka6hyrqHEDYbkmQJoSk5j3JhbcDXLOeA98N4Msp0umg7RPGtpuKKaA00D6MVrlj6"); // Replace with your actual key

function App() {
  const { userId, SetUserId } = useContext(UserDetailsContext);
  const { clinetId, setClientId } = useContext(ClientDetailsContext);

  useEffect(() => {
    SetUserId(localStorage.getItem("userId"));
    setClientId(localStorage.getItem("clientId"));


  })


  return (

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/pay" element={<Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>} />
    
      <Route path="/freelancer" element={<Temp />}>
        <Route path="SignUp" element={<FreelanSignup />} />
        {localStorage.getItem("userId") ? <Route path="create-profile" element={<CreateProfile />} /> : <Route path="create-profile" element={<Navigate to={'/freelancer/signup'} />} />}
        {localStorage.getItem("userId") ? <Route path="profile" element={<FreelancerProfile />} /> : <Route path="profile" element={<Navigate to={'/freelancer/signup'} />} />}
        {localStorage.getItem("userId") ? <Route path="home" element={<FreeLancerHome />} /> : <Route path="home" element={<Navigate to={'/freelancer/signup'} />} />}
        <Route path="find-jobs/:searchQuery" element={<FindJobs />} /> 
        <Route path="find-developer/:searchQuery" element={<FIndDevelopers />} /> 
      </Route>
      <Route path="/client" element={<ClientTemp />}>
        <Route path="SignUp" element={<ClientSignup />} />
        {localStorage.getItem("clientId") ? <Route path="find-developer" element={<ClientDevelperSearch />} /> : <Route path="find-developer" element={<Navigate to={'/client/signup'} />} />}
        {localStorage.getItem("clientId") ? <Route path="developer-profile/:id" element={<DeveloperProfile />} /> : <Route path="developer-profile/:id" element={<Navigate to={'/client/signup'} />} />}
        {localStorage.getItem("clientId") ? <Route path="create-profile" element={<ClientCreateProfile />} /> : <Route path="create-profile" element={<Navigate to={'/client/signup'} />} />}
        {localStorage.getItem("clientId") ? <Route path="home" element={<ClientHome />} /> : <Route path="home" element={<Navigate to={'/client/signup'} />} />}
        {localStorage.getItem("clientId") ? <Route path="profile" element={<ClientProfile />} /> : <Route path="profile" element={<Navigate to={'/client/signup'} />} />}
        <Route path="find-jobs/:searchQuery" element={<FindJobs />} /> 
        <Route path="find-developer/:searchQuery" element={<FIndDevelopers />} /> 
      </Route>
     
      <Route path='/chat' element={<Chat />} />
      <Route path='/chat/:id' element={<Chat />} />
      <Route path='/freelancer-dashboard' element={<FreeLancerHome />} />
      <Route path='/notification' element={<Notification />} />
    </Routes>

    
      

     
     

  );
}

export default App;
