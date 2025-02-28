import React from 'react'
import img1 from '../../Assets/landingmainsection1.jpg'
import img2 from '../../Assets/landingmainsection2.jpg'
import slider1 from "../../Assets/1slider.jpg"
import slider2 from "../../Assets/2slider.jpg"
import slider3 from "../../Assets/3slider.jpg"
import { motion } from "motion/react" 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function LandingMain() {
  
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const slides = [
  {
    id: 1,
    title: "Freelance Opportunities",
    description: "Find the best projects and grow your career.",
    description2:"Get matched with top companies and start worki natus deserunt optio consequuntur aut temporibus doloremque, blanditiis reprehenderit, dicta vel.",
    image: slider1,
  },
  {
    id: 2,
    title: "Connect with Clients",
    description: "Work with top businesses around the world.",
    description2:"Get matched with top companies and start worki natus deserunt optio consequuntur aut temporibus doloremque, blanditiis reprehenderit, dicta vel.",
    
    image:slider2,
  },
  {
    id: 3,
    title: "Expand Your Skills",
    description: "Learn new skills and become an expert.",
    description2:"Get matched with top companies and start worki natus deserunt optio consequuntur aut temporibus doloremque, blanditiis reprehenderit, dicta vel.",
    image: slider3,
  },
];

console.log(slider1, slider2, slider3);



  return (
    <>
   <div className="slider-container w-full h-[600px]">
  <Slider {...settings}>
    {slides.map((slide) => (
      <div
        key={slide.id}
        className="relative w-full h-[600px] flex items-center justify-center bg-center"
      >
        {/* ✅ Manually adding an img tag instead of using backgroundImage */}
        <img 
          src={slide.image} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center text-white p-6">
          <h3 className="text-5xl font-bold">{slide.title}</h3>
          <p className="text-xl mt-2 text-slate-100">{slide.description}</p>
          <p className="text-sm mt-2 w-[60%] text-slate-300">{slide.description2}</p>
        </div>
      </div>
    ))}
  </Slider>
</div>

    <div className='w-full relative flex flex-col items-center'>
            <div className='w-[95%]  md:flex  p-10 fle-warp'>
                    <p className='text-3xl  mb-5 z-2'>Designing with Purpose, Creating for Impact, Innovating for You</p>

            <div className='bg-gray-200   p-5 rounded-xl z-2' >
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
