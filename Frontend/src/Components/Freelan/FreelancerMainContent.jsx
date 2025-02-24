import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FreelancerMainJobs from './FreelancerMainJobs.jsx'
import { UserDetailsContext } from "../../Context/UserDetailsContext.jsx";

export default function FreelancerMainContent() {
    const {userDetails} = useContext(UserDetailsContext);
    console.log(userDetails.firstName);
    
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        cssEase: "linear",
    };
    return (
        <>
            <div className="p-10 flex gap-6">
                {/* Left Section: Slider */}
                <div className="w-2/3 ">

                    <div className="slider-container text-amber-50 relative">
                        <Slider {...settings}>
                            <div className="p-12 mx-1 bg-[#13544e] rounded-xl">
                                <h2 className="text-3xl font-bold">
                                    Rise to the top of the client's list
                                </h2>
                                <p className="text-lg mt-2">
                                    Boosted Proposals deliver 10x more earnings on ad spend
                                </p>
                                <button className="mt-4 bg-white text-green-900 px-6 py-2 rounded-full font-bold">
                                    Boost now
                                </button>
                            </div>
                            <div className="p-12 mx-1 bg-[#14a800] rounded-xl">
                                <h2 className="text-3xl font-bold">Get more visibility</h2>
                                <p className="text-lg mt-2">
                                    Stay ahead of the competition with a boosted profile.
                                </p>
                                <button className="mt-4 bg-white text-green-900 px-6 py-2 rounded-full font-bold">
                                    Boost now
                                </button>
                            </div>
                            <div className="p-12 mx-1 bg-[#13544e] rounded-xl">
                                <h2 className="text-3xl font-bold">Get more visibility</h2>
                                <p className="text-lg mt-2">
                                    Stay ahead of the competition with a boosted profile.
                                </p>
                                <button className="mt-4 bg-white text-green-900 px-6 py-2 rounded-full font-bold">
                                    Boost now
                                </button>
                            </div>
                        </Slider>
                    </div>

                    {/* Jobs */}
                    <FreelancerMainJobs/>
                </div>


                {/* Right Section: Profile & Promotions */}
                <div className="w-1/3 space-y-4">
                    {/* Profile Section */}
                    <div className="bg-white p-4 rounded-xl shadow-md">
                        <div className="flex items-center space-x-3">
                            <div className="">
                                <img src={userDetails.profileImage} className="w-12 h-12 bg-gray-300 rounded-full" alt="" />
                            </div>
                            <div>
                                <h3 className="font-bold">{userDetails.firstName}</h3>
                                <p className="text-sm text-gray-600">{userDetails.professionalTitle}</p>
                            </div>
                        </div>
                        <a href="#" className="text-green-600 font-semibold text-sm mt-2 block">
                            Complete your profile
                        </a>
                        <div className="w-full bg-gray-300 h-1 mt-2">
                            <div className="bg-black h-1 w-2/3"></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">65%</p>
                    </div>

                    {/* Promote with Ads Section */}
                    <div className="bg-white p-4 rounded-xl shadow-md">
                        <h3 className="font-bold">Promote with ads</h3>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-gray-600">Availability badge</p>
                            <span className="text-sm text-gray-400">Off</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-gray-600">Boost your profile</p>
                            <span className="text-sm text-gray-400">Off</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
