import React from 'react'
import { Link } from 'react-router-dom'

export default function FreelanerLogin() {
    return (
        <>
            <div className='max-w-xl mt-10 mx-auto p-6 rounded-lg shadow-md'>
                <div className='flex flex-col items-center justify-center mb-4 mt-2'>
                    <h2 className='text-2xl font-semibold'>Log in to Workify</h2>
                    <input type="text" className='border-[1px] mt-8 p-2 w-80 rounded-2xl' placeholder='Username or Email-id' />
                    <input type="password" className='border-[1px] mt-2 p-2 w-80 rounded-2xl' placeholder='Password' />
                    <Link to="/freelancer/home">
                        <button className='w-40 bg-green-500 h-9 text-white rounded-xl mt-5'>
                            Login
                        </button>
                    </Link>
                    <p className='mt-5 text-[15px]'>Don't have an Workify account? </p>
                    <Link to="/freelancer/signup">
                        <button className='w-40 bg- h-9 text-green-500 rounded-xl mt-2 border-2 border-green-500'>
                            Sign Up
                        </button>
                    </Link>
                </div>

            </div>
        </>
    )
}
