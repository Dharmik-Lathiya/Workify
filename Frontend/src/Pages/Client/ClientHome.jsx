import React,{useContext} from 'react'
import ClientDetailsContext from '../../Context/ClientDetailsContext.jsx'

export default function ClientHome() {
  const { clientDetails } = useContext(ClientDetailsContext);
  console.log("Name",clientDetails.firstName);
  clientDetails.firstName="Dharmik";
  return (
    <>
      <div className='flex align-middle justify-between mx-auto max-w-6xl my-10'>
        <p className='text-2xl'>Welcome, <span className='font-medium'>{clientDetails.firstName}!</span></p>
        <button className='bg-green-600 text-white p-3 rounded-xl px-5'>Post a job</button>
      </div>
      <p className='text-[24px] font-medium max-w-6xl mx-auto'>Last steps before you can hire</p>
      <div className='mt-5'>
      
      </div>
    </>
  )
}
