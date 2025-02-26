import React,{useContext} from 'react'
import Slider from "react-slick";
import userIcon from '../../Assets/UserIcon.png'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { UserDetailsContext } from '../../Context/UserDetailsContext';

export default function ClientStepIntro({ nextStep }) {
    const {userDetails} = useContext(UserDetailsContext)
      var settings = {
              dots: true,
              infinite: true,
              speed: 100,
              autoplaySpeed: 2000,
              slidesToShow: 1,
              slidesToScroll: 1,
            };
  return (
    <div className="flex justify-center items-center h-[78dvh] px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg  w-1/2 flex items-center flex-col mx-auto mt-10">
        <h2 className="text-3xl font-semibold mb-4">Hey {userDetails.firstName}. Ready for your next big opportunity?</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-xl">👤</span>
            <p>Answer a few questions and start building your profile</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xl">📩</span>
            <p>Apply for open roles or list services for clients to buy</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xl">💰</span>
            <p>Get paid safely and know we’re there to help</p>
          </div>
        </div>
        <button  onClick={nextStep} className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold">
          Get started
        </button>
        <p className="text-gray-500 text-sm mt-2">It only takes 5-10 minutes and you can edit it later. We’ll save as you go.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-[35vw] mx-auto  w-full relative z-[-1]">
        <Slider {...settings}>

        <div className="mt-4 text-center">
          <img
            src={userIcon}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto border-2 border-white shadow-md"
          />
          <h3 className="text-lg font-semibold mt-2">Ambika M.</h3>
          <p className="text-gray-500">Market Researcher</p>
          <div className="flex justify-center items-center space-x-2 mt-2">
            <span className="text-blue-500">⭐ 5.0</span>
            <span className="text-gray-700">$100.00/hr</span>
            <span className="text-gray-500">📂 5 jobs</span>
          </div>
          <p className="mt-4 text-gray-600 text-sm">
            “I turned to Upwork as a way to gain more control of my career. I love being able to
            choose everything from who I work with to how I spend my day.”
          </p>
        </div>
        <div className="mt-4 text-center">
          <img
            src={userIcon}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto border-2 border-white shadow-md"
          />
          <h3 className="text-lg font-semibold mt-2">Ambika M.</h3>
          <p className="text-gray-500">Market Researcher</p>
          <div className="flex justify-center items-center space-x-2 mt-2">
            <span className="text-blue-500">⭐ 5.0</span>
            <span className="text-gray-700">$100.00/hr</span>
            <span className="text-gray-500">📂 5 jobs</span>
          </div>
          <p className="mt-4 text-gray-600 text-sm">
            “I turned to Upwork as a way to gain more control of my career. I love being able to
            choose everything from who I work with to how I spend my day.”
          </p>
        </div>
        </Slider>
      </div>
    </div>
  )
}
