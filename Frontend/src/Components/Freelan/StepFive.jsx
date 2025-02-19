import React from 'react'

export default function StepFive() {
  return (
    <>
      <div className='flex flex-col items-center mt-5 h-[59dvh] '>
        <p className='text-3xl w-[50dvw] font-semibold'>Got it. Now, add a title to tell the world what you do.</p>
        <p className='w-[52dvw] mt-5 ml-6'>It’s the very first thing clients see, so make it count. Stand out by describing your expertise in your own words</p>
        <p className='w-[52vw] ml-6 mt-5 font-medium'>Your professional role</p>
        <input type='text' className='border-2 border-gray-300 rounded-md w-[50dvw] h-10 mt-5' placeholder=' Example : Customer Services ' />
      </div>
    </>
  )
}
