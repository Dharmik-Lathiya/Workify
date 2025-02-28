import React ,{useContext} from 'react'
import ChatContext from '../../Context/ChatContext'
import {useNavigate} from 'react-router-dom' 

export default function ChatHeader({isDisabled , message}) {
const {chat} = useContext(ChatContext)
const navigate = useNavigate()
console.log(chat);

if(!chat){
  navigate("/chat")
}

  return (
    chat && <div>
        <div className='bg-amber-100'>
        <div className='p-5 flex items-center '>
        <img src={chat.reciverid.photo} alt="userprofile" className='w-20 h-20  rounded-4xl border' />
       <div className='flex text-4xl ml-10'>
       <p> {chat.reciverid.firstName }</p>
       <p>{chat.reciverid.lastName}</p>
       </div>
        </div>
    </div>

    {isDisabled && <p>waiting for messages</p>}

    </div>
  )
}
