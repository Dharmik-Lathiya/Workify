import React from 'react'
import { Outlet } from 'react-router-dom'
import FreelancerHeader from '../../Components/Freelan/FreelancerHeader'
import Footer from '../../Components/Footer.jsx'
export default function Temp() {


  return (
    <>
      <FreelancerHeader/>
      <Outlet/>
      <Footer/>
      </>
  )
}
