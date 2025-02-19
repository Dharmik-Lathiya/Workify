import React from 'react'
import img1 from '../../Assets/landingmainsection1.jpg'
import img2 from '../../Assets/landingmainsection2.jpg'
export default function LandingMain() {
  return (
    <>
    <div className='w-full relative flex flex-col items-center'>
            <div className='w-[95%]  md:flex  p-10 fle-warp'>
                    <p className='text-3xl  mb-5 z-2'>Designing with Purpose, Creating for Impact, Innovating for You</p>

            <div className='bg-gray-200   p-5 rounded-xl z-2'>
                <p className='text-lg mb-5'>The Journey of Sophia Michelle</p>

                <div className='flex'>
                 <p className='text-xl '>              
                          Sophia Michelle’s journey as a product designer began with a fascination for solving problems through creative solutions
                 </p>
                <img src={img2} alt="" className=' w-50 h-30' style={{objectFit:'cover' ,objectPosition:'top center'}}/>
               </div>
            </div>
            </div>
        <img src={img1} alt=""  className='rounded-xl h-130 w-[90%] mt-[-10%]' style={{objectFit:'cover' ,objectPosition:'top center'}}/>
    </div>

    <div className='flex items-center justify-center mt-4 pl-20 pr-20'>
            <div className='border rounded-l-lg p-2'>
                <h2 className='mt-2'>01</h2>
                <p className='text-2xl mt-3 '> Junior Product Designer (2018–2020)</p>
                <p className='md:text-lg mt-3 text-md'>Began my journey in product design, focusing on user research and prototyping. Collaborated with cross-functional teams to deliver intuitive.</p>
            </div>
            <div className='border p-2'>
                <h2 className='mt-2 '>02</h2>
                <p className='text-2xl mt-3 '>Junior Product Designer (2018–2020)</p>
                <p  className='md:text-lg mt-3 text-md'>Began my journey in product design, focusing on user research and prototyping. Collaborated with cross-functional teams to deliver intuitive.</p>
            </div>
             <div className='border rounded-r-lg p-2'>
                <h2 className='mt-2'>03</h2>
                <p className='text-2xl mt-3 '>Junior Product Designer (2018–2020)</p>
                <p  className='md:text-lg mt-3 text-md'>Began my journey in product design, focusing on user research and prototyping. Collaborated with cross-functional teams to deliver intuitive.</p>
            </div>
    </div>
    </>
  )
}
