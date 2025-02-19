import React,  { useState } from 'react'
import logo from '../../Assets/logo.png'
import StepIntro from '../../Components/Freelan/StepIntro';
import StepFirst from '../../Components/Freelan/StepFirst';
import StepSecond from '../../Components/Freelan/StepSecond';
import StepThree from '../../Components/Freelan/StepThree';
import StepFour from '../../Components/Freelan/StepFour';
import StepFive from '../../Components/Freelan/StepFive';
import StepSix from '../../Components/Freelan/StepSix';
import StepSeven from '../../Components/Freelan/StepSeven';

export default function CreateProfile() {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep((prev) => (prev === 0 ? 1 : Math.min(prev + 1, 12)));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));
    let name = 'Dharmik';
  return (
    <>

        <header className="border-b p-3 flex flex-row items-center  justify-between bg-white sticky absolute top-0">
            <img src={logo} alt="logo" className="h-10" />
            <h1 className="text-2xl font-semibold">Create Profile</h1>
        </header> 
              
        {step > 0 && (
    
    <div className="flex justify-center items-center p-4">
    {Array.from({ length: 12 }).map((_, index) => (
      <div
        key={index}
        className={`w-10 h-10 mx-2 flex items-center justify-center rounded-full text-white font-bold transition-all ${
          index < step ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        {index + 1}
      </div>
    ))}
  </div>
    )
        }
      
      {/* Left Side */}
      {step === 0 && (<StepIntro nextStep={nextStep} /> )}
      {step === 1 && (<StepFirst nextStep={nextStep} /> )}
      {step === 2 && (<StepSecond nextStep={nextStep} /> )}
      {step === 3 && (<StepThree nextStep={nextStep} /> )}
      {step === 4 && (<StepFour nextStep={nextStep} /> )}
      {step === 5 && (<StepFive nextStep={nextStep} /> )}
      {step === 6 && (<StepSix nextStep={nextStep} />)}
      {step === 7 && (<StepSeven nextStep={nextStep} />)}
      
    {step > 0 && step <= 12 && (
          <div className="bg-white inset-x-0 bottom-0 p-5 shadow-2xs border-t-2 border-slate-300 w-full sticky">
            <div className="flex justify-between ">
              {step ===1 &&  (
                <button onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded-lg">Skip For Now</button>
              )}
              {step > 1 && (
                <button onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded-lg">Back</button>
              )}
              {step < 12 && (
                <button onClick={nextStep} className="bg-green-600 text-white py-2 px-4 rounded-lg">Next</button>
              )}
            </div>
          </div>
        )}
    </>
  )
}
