import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../Components/Footer';
import logo from '../Assets/logo.png'
import { UserDetailsContext } from "../Context/UserDetailsContext.jsx";
import { ClientDetailsContext } from '../Context/ClientDetailsContext';

export default function Login() {
    
    const {userId , SetUserId} = useContext(UserDetailsContext);
    const { clinetId , setClientId} = useContext(ClientDetailsContext);
    
    const navigate = useNavigate()
    const [data, setData] = useState({
        value: "",
        password: ""
    })

    function handleSubmit() {

        fetch(import.meta.env.VITE_APP_BACKEND_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((res) => {
            res.json().then((data) => {
                console.log(data);
                if (data.success) {
                    if(data.type == "devloper"){
                        SetUserId(data._id)
                        localStorage.setItem("userId",data._id);
                        navigate('/freelancer/home');
                        localStorage.setItem("clientId",null);
                    }else{
                        setClientId(data._id)
                        localStorage.setItem("clientId",data._id);
                        navigate('/client/home');
                        localStorage.setItem("userId",null);
                    }
                }
                if (!data.success && data.message) {

                    toast.error(data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",

                    });
                } else {
                    
                    data.details.map((detail) => {
                        toast.error(detail.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
    
                        });
                        
                    })
                }
            })
        })

    }
    return (
        <>
            <header className="border-b p-3 flex flex-row items-center  justify-between bg-white sticky  top-0">
                    <img src={logo} alt="logo" className="h-10" />
                    <h1 className="text-2xl font-semibold">Create Profile</h1>
                  </header>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='max-w-xl mt-10 mx-auto p-6 rounded-lg shadow-md'>
                <div className='flex flex-col items-center justify-center mb-4 mt-2'>
                    <h2 className='text-2xl font-semibold'>Log in to Workify</h2>
                    <input type="text" className='border-[1px] mt-8 p-2 w-80 rounded-2xl' placeholder='Username or Email-id' value={data.value} onChange={(e) => { setData({ ...data, value: e.target.value }) }} />
                    <input type="password" className='border-[1px] mt-2 p-2 w-80 rounded-2xl' placeholder='Password' value={data.password} onChange={(e) => { setData({ ...data, password: e.target.value }) }} />

                    <button className='w-40 bg-green-500 h-9 text-white rounded-xl mt-5' onClick={handleSubmit}>
                        Login
                    </button>

                    <p className='mt-5 text-[15px]'>Don't have an Workify account? </p>
                    <Link to="/signup">
                        <button className='w-40 bg- h-9 text-green-500 rounded-xl mt-2 border-2 border-green-500'>
                            Sign Up
                        </button>
                    </Link>
                </div>

            </div>
            <Footer/>
        </>
    )
}
