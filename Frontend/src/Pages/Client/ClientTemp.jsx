import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Footer'
import ClientHeader from '../../Components/Client/ClientHeader'

export default function ClientTemp() {
  return (
    <>
        <ClientHeader/>
        <Outlet/>
        <Footer/> 
    </>

  )
}
