import React, { useEffect,useContext } from 'react'
import FreelancerMainContent from '../../Components/Freelan/FreelancerMainContent.jsx'
import { UserDetailsContext } from "../../Context/UserDetailsContext";


export default function FreeLancerHome() {

    const { userDetails, setUserDetails ,userId,SetUserId} = useContext(UserDetailsContext);
  
    useEffect(()=>{
      fetch(import.meta.env.VITE_APP_BACKEND_URL + `/getuser/devloper/${localStorage.getItem("userId")}`,{
        method:"GET"
      }).then((res)=>{
          res.json().then((data)=>{

            console.log(data);
            
            const addressParts = data.address ? data.address.split(" ") : [];
            const zipCode = addressParts.pop() || "";
            const state = addressParts.pop() || "";
            const city = addressParts.slice(-2).join(" ") || "";
            const street = addressParts.slice(0, -2).join(" ") || "";

            setUserDetails(prevState => ({
                ...prevState,
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                username: data.username || "",
                email: data.email || "",
                password: data.password || "",
                country: data.country || "India",
                bio: data.bio || "",
                dob: data.dob || "",
                street: street,
                city: city,
                state: state,
                zip: zipCode,
                phone: data.phone || "",
                profileImage: data.photo || "",
                selectedSkills: data.skills || [],
                professionalTitle: data.title || "",
                experiences: data.experience || [],
                education: data.educaton || [],
                languages:data.languages || [],
            }));
          })
      })
        
    },[])
    
  return (
    <>
       
       <FreelancerMainContent/>
      
    </>
  )
}
