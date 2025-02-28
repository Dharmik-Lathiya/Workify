import React from 'react'
import LandingHeader from '../Components/LandingCom/LandingHeader'
import { Outlet } from "react-router-dom";
import LandingMain from '../Components/LandingCom/LandingMain';
import LandingMainSec from '../Components/LandingCom/LandingMainSec';
import Footer from '../Components/Footer';

export default function Landing() {
  return (
    <>
        <LandingHeader/> 
        <LandingMain/>
        <LandingMainSec/>
        <Outlet/> 
        <Footer/>
    </>
  )
}
