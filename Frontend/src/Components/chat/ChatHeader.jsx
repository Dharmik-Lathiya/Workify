import React from 'react'

export default function ChatHeader({isDisabled}) {

  return (
    <div>
        <div className='bg-amber-100'>
        <div className='p-5 flex items-center '>
        <img src="https://fastly.picsum.photos/id/786/200/300.jpg?hmac=ukrca61AOMxrxsEnCf7j49AnyoIwIsyIikReiUhm6zQ" alt="userprofile" className='w-20 h-20  rounded-4xl border' />
       <div className='flex text-4xl ml-10'>
       <p>User</p>
       <p>120</p>
       </div>
        </div>
    </div>
    {isDisabled && <p>waiting for message</p>}

    </div>
  )
}
