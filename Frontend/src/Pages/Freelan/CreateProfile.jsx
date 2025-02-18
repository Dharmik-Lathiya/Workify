import React from 'react'
import logo from '../../Assets/logo.png'
export default function CreateProfile() {
    let name = 'Dharmik';
  return (
    <>
        <header className="border-b p-3 flex flex-row items-center justify-between">
            <img src={logo} alt="logo" className="h-10" />
            <h1 className="text-2xl font-semibold">Create Profile</h1>
        </header> 
        <main className="p-4 flex flex-col mt-10 font-semibold">
            <div className='w-1/2 px-5'>
                <p className='text-3xl'>Hey <span>{name}.</span> Ready for your next big opportunity?</p>
                <ol className='mt-10 *:flex *:justify-between items-center'>
                    <li className='flex justify-between items-center'><i class="fas fa-user"></i> Answer a few questions and start building your profile</li>
                    <li className=''><i class="fas fa-inbox"></i> Apply for open roles or list services for clients to buy</li>
                    <li><i class="far fa-money-bill-alt mr-10"></i> Apply for open roles or list services for clients to buy</li>
                </ol>
            </div>
            <div></div>
        </main>
    </>
  )
}
