import React, { useContext } from "react";
import FreelancerMainJobs from './FreelancerMainJobs.jsx'
import { UserDetailsContext } from "../../Context/UserDetailsContext.jsx";
import { Link } from "react-router-dom";
import { TrendingUp, Award, ExternalLink } from "lucide-react";
import { Button } from "../UI/Button";
import { Card, CardContent } from "../UI/Card";

export default function FreelancerMainContent() {
    const { userDetails } = useContext(UserDetailsContext);

    return (
        <div className="container mx-auto px-4 py-8 lg:px-8 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Section: Main Feed */}
                <div className="w-full lg:w-2/3">
                    {/* Welcome Banner */}
                    <Card className="bg-gradient-to-r from-gray-900 to-green-900 text-white border-0 shadow-lg mb-8 overflow-hidden relative">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-20">
                            <TrendingUp size={200} />
                        </div>
                        <CardContent className="p-8 relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-3">
                                Welcome back, {userDetails?.firstName || 'Freelancer'}!
                            </h2>
                            <p className="text-gray-200 text-lg mb-6 max-w-lg">
                                Ready to find your next big project? We have new opportunities tailored to your skills.
                            </p>
                            <Button className="bg-white text-green-900 hover:bg-gray-100 font-semibold px-6 py-2 h-auto text-base">
                                Explore Matches
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Jobs Feed */}
                    <FreelancerMainJobs />
                </div>

                {/* Right Section: Profile Sidebar */}
                <div className="w-full lg:w-1/3 space-y-6">
                    {/* Profile Summary Card */}
                    <Card className="shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 relative">
                                    {userDetails?.profileImage ? (
                                        <img src={userDetails.profileImage} className="w-24 h-24 object-cover rounded-full border-4 border-gray-100 shadow-sm" alt="Profile" />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-green-600 text-white flex items-center justify-center text-3xl font-bold border-4 border-white shadow-sm">
                                            {userDetails?.firstName?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-bold text-xl text-gray-900">{userDetails?.firstName} {userDetails?.lastName}</h3>
                                <p className="text-gray-600 font-medium mb-4">{userDetails?.professionalTitle || "Freelance Professional"}</p>
                                
                                <div className="w-full mb-4">
                                    <div className="flex justify-between text-sm font-medium mb-1">
                                        <span className="text-gray-700">Profile Completion</span>
                                        <span className="text-green-600">85%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                </div>

                                <Link to="/freelancer/profile" className="w-full">
                                    <Button variant="outline" className="w-full">Complete Profile</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats & Proposals Card */}
                    <Card className="shadow-sm">
                        <CardContent className="p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Award size={20} className="text-green-600" />
                                Your Stats
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">Available Connects</span>
                                    <span className="font-bold text-gray-900">50</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">Active Proposals</span>
                                    <span className="font-bold text-gray-900">3</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">Profile Views</span>
                                    <span className="font-bold text-gray-900">12</span>
                                </div>
                            </div>
                            <Button variant="link" className="w-full mt-2 justify-between px-0 text-green-600">
                                View full stats <ExternalLink size={16} />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
