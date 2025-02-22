import React from 'react'

export default function ClientStepTwo() {
  return (
    <>
        <section className="flex mx-auto max-w-6xl items-center justify-center gap-10">
        <div>
          <h2 className="text-2xl font-medium">Job Post Details</h2>
          <p className="text-4xl font-semibold mt-3 w-80">
          What are the main skills required for your work?
          </p>
        </div>
        <div className="flex flex-col justify-start">
        <span className="text-[16px] font-medium">Popular skills for Web Design</span>
          <div className='text-[15px] '>
            <button>Html</button>
          </div>
          <input
            type="text" 
            className="border-2 border-slate-300 w-80 rounded m-2"
          />
          
          <ul className="list-disc ml-8 *:w-80 *:mt-2 mt-2">
            <li>Build responsive WordPress site with booking/payment functionality</li>
            <li>Graphic designer needed to design ad creative for multiple campaigns</li>
            <li>Facebook ad specialist needed for product launch</li>
          </ul>
        </div>
      </section>   
    </>
  )
}
