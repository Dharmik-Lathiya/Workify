import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FreelancerPublicProfile() {
    const { userId } = useParams(); // Get user ID from URL
    const [userDetails, setUserDetails] = useState(null);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setLoader(true);
        fetch(import.meta.env.VITE_APP_BACKEND_URL + `/getuser/devloper/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setUserDetails(data);
                setLoader(false);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                setLoader(false);
            });
    }, [userId]);


    if (loader) {
        return (
            <div className="fixed inset-0 bg-slate-400/30 flex items-center justify-center w-full z-50">
                <div className="loader"></div>
            </div>
        );
    }

    // After loading, if userDetails is still null, show "User not found"
    if (!userDetails) {
        return <div className="text-center mt-10">User not found</div>;
    }

    
    console.log(userDetails.educaton);
    

    return (
        <>
            {loader && (
                <div className="fixed inset-0 bg-slate-400/30 flex items-center justify-center w-full z-50">
                    <div className="loader"></div>
                </div>
            )}

            <div className="max-w-6xl mt-10 mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex">
                        <img
                            src={userDetails.photo}
                            alt="Profile"
                            className="h-28 w-28 rounded-full"
                        />
                        <div className="ml-10">
                            <h1 className="font-semibold text-4xl">{userDetails.firstName} {userDetails.lastName}</h1>
                            <p className="text-gray-500 mt-3">
                                📍{userDetails.city}, {userDetails.country}
                            </p>
                        </div>
                    </div>
                </div>

                {/* User Details */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold">Profile Details</h2>
                    <ul className="mt-4 text-sm text-gray-700">
                        <li><strong>Username:</strong> {userDetails.username}</li>
                        <li><strong>Email:</strong> {userDetails.email}</li>
                        <li><strong>Bio:</strong> {userDetails.bio}</li>
                        <li><strong>Title:</strong> {userDetails.title}</li>
                        <li><strong>Skills:</strong> {userDetails.skills?.join(", ") || "Not added"}</li>
                    </ul>
                </div>

                {/* Portfolio */}
                <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
                    <h2 className="text-lg font-semibold">Portfolio</h2>
                    {userDetails.portfolio?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            {userDetails.portfolio.map((item, index) => (
                                <div key={index} className="border p-4 rounded-lg">
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="mt-2 rounded-lg w-full"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No portfolio items yet.</p>
                    )}
                </div>

                 {/* Education Details */}
                 <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
                    <h2 className="text-lg font-semibold">Education</h2>
                    {userDetails.education?.length > 0 ? (
                        <ul className="mt-2">
                            {userDetails.education.map((edu, index) => (
                                <li key={index} className="border p-3 rounded-md mb-2">
                                    <h3 className="font-semibold">{edu.degree}</h3>
                                    <p className="text-sm text-gray-600">{edu.institution}</p>
                                    <p className="text-sm text-gray-500">📅 {edu.year}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No education details available.</p>
                    )}
                </div>

            </div>
        </>
    );
}
