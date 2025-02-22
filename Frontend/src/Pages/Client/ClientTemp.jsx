import React from 'react'
import { Outlet } from 'react-router-dom'
import FreelancerHeader from '../../Components/Freelan/FreelancerHeader'
import Footer from '../../Components/Footer'

export default function ClientTemp() {
  return (
    <>
        <FreelancerHeader/>
        <Outlet/>
        <Footer/> 
    </>

  )
}
