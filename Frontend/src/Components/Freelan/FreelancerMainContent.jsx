import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FreelancerMainContent() {
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
    const jobsList = [
        {
            date: "Posted yesterday",
            title: "Build WordPress Website",
            desc: "Fixed-price - Entry level - Est. Budget: $100",
            skill: ["WordPress", "Web Development", "Web Design", "PHP", "HTML5"],
            country: "United States",
            proposals: 50,
            spent: 900,
            verified: true,
        },
        {
            date: "Posted today",
            title: "React.js Developer Needed",
            desc: "Hourly - Intermediate level - Est. Budget: $25/hr",
            skill: ["React.js", "JavaScript", "CSS", "Frontend"],
            country: "Canada",
            proposals: 30,
            spent: 1200,
            verified: true,
        },
    ];


    return (
        <>
            <div className="p-10 flex gap-6">
                {/* Left Section: Slider */}
                <div className="w-2/3 ">

                    <div className="slider-container text-white p-6 rounded-xl relative bg-green-900">
                        <Slider {...settings}>
                            <div className="p-6">
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
                            <div className="p-6">
                                <h2 className="text-3xl font-bold">Get more visibility</h2>
                                <p className="text-lg mt-2">
                                    Stay ahead of the competition with a boosted profile.
                                </p>
                            </div>
                            <div className="p-6">
                                <h2 className="text-3xl font-bold">Get more visibility</h2>
                                <p className="text-lg mt-2">
                                    Stay ahead of the competition with a boosted profile.
                                </p>
                            </div>
                        </Slider>
                    </div>

                    {/* Jobs */}
                    <div>
                        <div className="relative my-6">
                            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                            <input
                                type="text"
                                placeholder="Search For Jobs"
                                className="border-2 rounded-[6px] pl-10 pr-3 py-2 w-full border-gray-300 focus:outline-none focus:border-slate-500"
                            />
                        </div>

                        <div className="space-y-4">
                            {jobsList.map((job, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-md border">
                                    <p className="text-gray-500 text-sm">{job.date}</p>
                                    <h3 className="font-bold text-xl text-gray-800">{job.title}</h3>
                                    <p className="text-gray-600 text-sm mt-2">{job.desc}</p>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {job.skill.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-gray-200 text-gray-700 px-3 py-1 text-xs font-medium rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Payment & Budget */}
                                    <div className="flex items-center justify-between mt-4 text-gray-600 text-sm">
                                        <div className="flex items-center gap-2">
                                            {job.verified && <i class="fas fa-check-circle"></i>}
                                            <span>Payment Verified</span>
                                        </div>
                                        <span>
                                            ${job.spent}+ spent
                                        </span>
                                    </div>

                                    {/* Proposals & Location */}
                                    <div className="flex justify-between items-center mt-2 text-gray-600 text-sm">
                                        <span>
                                            Proposals: {job.proposals}
                                        </span>
                                        <span>
                                            <i class="fas fa-map-marker-alt"></i> {job.country}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>


                {/* Right Section: Profile & Promotions */}
                <div className="w-1/3 space-y-4">
                    {/* Profile Section */}
                    <div className="bg-white p-4 rounded-xl shadow-md">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                            <div>
                                <h3 className="font-bold">Dharmik F.</h3>
                                <p className="text-sm text-gray-600">Web Designing</p>
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
