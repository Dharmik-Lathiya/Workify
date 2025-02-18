import React from 'react'
import LandingHeader from '../Components/LandingCom/LandingHeader'
import { Outlet } from "react-router-dom";

export default function Landing() {
  return (
    <>
        <LandingHeader/> 
        <Outlet/> 
    </>
  )
}
