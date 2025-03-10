import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserDetailsContext } from "../../Context/UserDetailsContext";
import logo from "../../Assets/logo.png";
import StepIntro from "../../Components/Freelan/StepIntro";
import StepFirst from "../../Components/Freelan/StepFirst";
import StepSecond from "../../Components/Freelan/StepSecond";
import StepThree from "../../Components/Freelan/StepThree";
import StepFour from "../../Components/Freelan/StepFour";
import StepFive from "../../Components/Freelan/StepFive";
import StepSix from "../../Components/Freelan/StepSix";
import StepSeven from "../../Components/Freelan/StepSeven";
import StepEight from "../../Components/Freelan/StepEight";
import StepNine from "../../Components/Freelan/StepNine";
import StepTen from "../../Components/Freelan/StepTen";

export default function CreateProfile() {
  const [step, setStep] = useState(0);
  const { userDetails } = useContext(UserDetailsContext);

  const nextStep = () => setStep((prev) => (prev === 0 ? 1 : Math.min(prev + 1, 10)));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <header className="border-b p-3 flex flex-row items-center justify-between bg-white sticky top-0">
        <img src={logo} alt="logo" className="h-10" />
        <h1 className="text-2xl font-semibold">Create Profile</h1>
      </header>

      {step > 0 && (
        <div className="flex justify-center items-center p-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className={`w-10 h-10 mx-2 flex items-center justify-center rounded-full text-white font-bold transition-all ${index < step ? "bg-green-500" : "bg-gray-300"
                }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      )}

      {/* Steps */}
      {step === 0 && <StepIntro nextStep={nextStep} />}
      {step === 1 && <StepFirst nextStep={nextStep} />}
      {step === 2 && <StepSecond nextStep={nextStep} />}
      {step === 3 && <StepThree nextStep={nextStep} />}
      {step === 4 && <StepFour nextStep={nextStep} />}
      {step === 5 && <StepFive nextStep={nextStep} />}
      {step === 6 && <StepSix nextStep={nextStep} />}
      {step === 7 && <StepSeven nextStep={nextStep} />}
      {step === 8 && <StepEight nextStep={nextStep} />}
      {step === 9 && <StepNine nextStep={nextStep} />}
      {step === 10 && <StepTen nextStep={nextStep} />}

      {/* Footer Navigation */}
      {step > 0 && step <= 10 && (
        <div className="bg-white inset-x-0 bottom-0 p-5 shadow-2xs border-t-2 border-slate-300 w-full fixed">
          <div className="flex justify-between">
            {step === 1 && (
              <button onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded-lg">
                Skip For Now
              </button>
            )}
            {step > 1 && (
              <button onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded-lg">
                Back
              </button>
            )}
            {step < 10 && (
              <button
                onClick={nextStep}
                disabled={step === 1 && !userDetails.experienceLevel
                  || (step === 2 && !userDetails.freelancingGoal)
                  || (step === 3 && !userDetails.contractToHire)
                  || (step === 4 && !userDetails.selectedSkills?.length)
                  || (step === 5 && !userDetails.professionalTitle)
                  || (step === 6 && !userDetails.experiences?.length)
                  || (step === 7 && !userDetails.education?.length)
                  || (step === 8 && !userDetails.languages?.length)
                  || (step === 9 && (!userDetails.bio || !userDetails.dob || !userDetails.country || !userDetails.street || !userDetails.city || !userDetails.state || !userDetails.zip || !userDetails.phone || !userDetails.profileImage))
                }

                className={`py-2 px-4 rounded-lg ${(step === 1 && !userDetails.experienceLevel) || (step === 2 && !userDetails.freelancingGoal) || (step === 3 && !userDetails.contractToHire)
                    || (step === 4 && !userDetails.selectedSkills?.length) || (step === 5 && !userDetails.professionalTitle) || (step === 6 && !userDetails.experiences?.length)
                    || (step === 7 && !userDetails.education?.length) || (step === 8 && !userDetails.languages?.length) || (step === 9 && (!userDetails.bio || !userDetails.dob || !userDetails.country || !userDetails.street || !userDetails.city || !userDetails.state || !userDetails.zip || !userDetails.phone || !userDetails.profileImage))
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white"
                  }`}
              >
                Next 
              </button>
            )}
            {step === 10 && (
              <Link to="/freelancer/home" className="bg-green-600 text-white py-2 px-4 rounded-lg">
                Submit
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
