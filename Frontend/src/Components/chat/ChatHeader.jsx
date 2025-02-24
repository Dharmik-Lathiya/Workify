import React ,{useContext} from 'react'
import ChatContext from '../../Context/ChatContext'


export default function ChatHeader({isDisabled , message}) {
const {chat} = useContext(ChatContext)

console.log(chat);

  return (
    <div>
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
