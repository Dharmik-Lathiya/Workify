import React from 'react'
import { Link } from 'react-router-dom'

export default function ChatMenu() {
  return (
    <div className='border h-[100vh] w-[20%]'>
      <p className='text-xl p-3'>messages</p>

      <div className='m-10'>

        <Link to={'/chat/1'}>
          <div className='flex  mt-5 mb-5' data-chat-id="1">
            <img src="https://fastly.picsum.photos/id/786/200/300.jpg?hmac=ukrca61AOMxrxsEnCf7j49AnyoIwIsyIikReiUhm6zQ" alt="userprofile" className='w-10 h-10 rounded-4xl border' />
            <p className='text-2xl ml-4'> User</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
