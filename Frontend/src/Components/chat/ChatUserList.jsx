import React from 'react'
import { Link } from 'react-router-dom'

export default function ChatUserList({ chat }) {
    return (
        <Link to={`/chat/${chat.chatid}`}>
            <div className='flex  mt-5 mb-5' data-chat-id="1">
                <img src={chat.reciverid.photo} alt="userprofile" className='w-10 h-10 rounded-4xl border' />
                <p className='text-2xl ml-4'> {chat.reciverid.firstName + " " + chat.reciverid.lastName}</p>
            </div>
        </Link>
    )
}
