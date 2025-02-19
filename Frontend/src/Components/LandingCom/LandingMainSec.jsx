import React from 'react'

export default function LandingMainSec() {
  return (
    <>
    <div className='p-20'>
        <div>
            <div className='flex justify-between'>
            <p className='text-4xl w-90'>Tailored Design Solutions to Bring Your Vision to Life</p>
            <button className='bg-slate-400 text-2xl h-fit p-5 rounded-xl '  >Learn More</button>
            </div>
        </div>

        <div className='flex mt-20 justify-between '>
            <div className='hover:bg-[#a8ff36] bg-gray-200 rounded-xl p-5 group/1'>
            <i className=" fas fa-pencil-ruler mb-5" style={{fontSize:"3rem"}} ></i>
            <p className='group-hover/1:text-blue-400 text-2xl mb-[20rem]'>Product Design & Development</p>

            <p className='text-xl w-110 mb-5' >Crafting user-centered digital products from concept to completion. Includes wireframing, prototyping, and delivering intuitive designs tailored to enhance user experiences.</p>
            </div>
           
            <div className='bg-[#a8ff36] rounded-xl p-5 group/2'>
            <i className="fas fa-pencil-ruler mb-5" style={{fontSize:"3rem"}} ></i>
            <p className='group-hover/2:text-blue-400 text-2xl mb-[20rem]'>Product Design & Development</p>

            <p className='text-xl w-110 mb-5' >Crafting user-centered digital products from concept to completion. Includes wireframing, prototyping, and delivering intuitive designs tailored to enhance user experiences.</p>
            </div>
           
            <div className='hover:bg-[#a8ff36] bg-gray-200 rounded-xl p-5 group/3'>
            <i className="fas fa-pencil-ruler mb-5" style={{fontSize:"3rem"}} ></i>
            <p className='group-hover/3:text-blue-400 text-2xl mb-[20rem]'>Product Design & Development</p>

            <p className='text-xl w-110 mb-5' >Crafting user-centered digital products from concept to completion. Includes wireframing, prototyping, and delivering intuitive designs tailored to enhance user experiences.</p>
            </div>
           
        </div>
    </div>


    <div>
        
    </div>
    </>
  )
}
