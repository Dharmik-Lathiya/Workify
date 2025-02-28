import React, { useContext, useState } from 'react'
import logo from '../../Assets/logo.png'
import ClientStepIntro from '../../Components/Client/ClientStepIntro';
import ClientStepOne from '../../Components/Client/ClientStepOne';
import ClientStepTwo from '../../Components/Client/ClientStepTwo';
import ClientStepThree from '../../Components/Client/ClientStepThree';
import ClientStepFour from '../../Components/Client/ClientStepFour';
import ClientStepFive from '../../Components/Client/ClientStepFive';
import { ClientDetailsContext } from '../../Context/ClientDetailsContext';
import { Link } from 'react-router-dom';

export default function ClientCreateProfile() {
    const [step, setStep] = useState(0);
    const { clientDetails } = useContext(ClientDetailsContext);

    const nextStep = () => setStep((prev) => (prev === 0 ? 1 : Math.min(prev + 1, 5)));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    function savePost() {
        fetch(import.meta.env.VITE_APP_BACKEND_URL + "/postjob", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                clientId: localStorage.getItem("clientId"),
                ...clientDetails.job
            })
        }).then(res => {
            res.json().then(data => {
                console.log(data);

            })
        })
    }



    return (
        <div className='z-50'>
            <header className="border-b p-3 flex flex-row items-center justify-between bg-white sticky  top-0">
                <img src={logo} alt="logo" className="h-10" />
                <h1 className="text-2xl font-semibold">Create Profile</h1>
            </header>

            {step > 0 && (

                <div className="flex justify-center items-center p-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className={`w-10 h-10 mx-2 flex items-center justify-center rounded-full text-white font-bold transition-all ${index < step ? "bg-green-500" : "bg-gray-300"
                                }`}
                        >
                            {index + 1}
                        </div>
                    ))}
                </div>
            )
            }

            {step === 0 && (<ClientStepIntro nextStep={nextStep} />)}
            {step === 1 && (<ClientStepOne nextStep={nextStep} />)}
            {step === 2 && (<ClientStepTwo nextStep={nextStep} />)}
            {step === 3 && (<ClientStepThree nextStep={nextStep} />)}
            {step === 4 && (<ClientStepFour nextStep={nextStep} />)}
            {step === 5 && (<ClientStepFive nextStep={nextStep} />)}




            {step > 0 && step <= 5 && (
                <div className="bg-white inset-x-0 bottom-0 p-5 shadow-2xs border-t-2 border-slate-300 w-full fixed">
                    <div className="flex justify-between ">
                        {step === 1 && (
                            <button onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded-lg">Skip For Now</button>
                        )}
                        {step > 1 && (
                            <button onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded-lg">Back</button>
                        )}
                        {step < 5 && (
                            // bg-green-600 text-white
                            // "py-2 px-4 rounded-lg" 
                            <button onClick={nextStep}
                                className={`py-2 px-4 rounded-lg ${(step === 1 && !clientDetails.job.jobTitle)
                                    || (step === 2 && !clientDetails.job.skills.length)
                                    || (step === 3 && (!clientDetails.job.type.exp || !clientDetails.job.type.size || clientDetails.job.time))
                                    || (step === 4 && !clientDetails.job.type.price)
                                    || (step === 5 && !clientDetails.job.type.desc)

                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-green-600 text-white"} `}
                                disabled={(step === 1 && !clientDetails.job.jobTitle) || (step === 2 && !clientDetails.job.skills.length)
                                    || (step === 3 && (!clientDetails.job.type.exp || !clientDetails.job.type.size || clientDetails.job.time)
                                        || (step === 4 && !clientDetails.job.type.price)
                                    )}

                            >Next</button>
                        )}
                        {step === 5 && (
                            (clientDetails.job.type.desc ? (
                                <Link
                                    to='/client/profile'
                                    onClick={() => { savePost(); nextStep(); }}
                                    className="py-2 px-4 rounded-lg bg-green-600 text-white"
                                >
                                    Submit
                                </Link>
                            ) : (
                                <button
                                    className="py-2 px-4 rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed"
                                    disabled
                                >
                                    Submit
                                </button>
                            ))
                        )}

                    </div>
                </div>
            )}
        </div>
    )
}
