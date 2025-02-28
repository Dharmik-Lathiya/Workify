import React, { useEffect, useState, useContext } from 'react'
import { set, ref, onValue } from "firebase/database";
import { useParams } from 'react-router-dom';
import { UserDetailsContext } from '../../Context/UserDetailsContext';
import { ClientDetailsContext } from '../../Context/ClientDetailsContext';
import ChatContext from '../../Context/ChatContext'
import ChatHeader from './ChatHeader';



export default function ChatSide({ db }) {
    
    
    const {chat} = useContext(ChatContext);
   
    const {userId} =useContext(UserDetailsContext);
    const {clinetId } = useContext(ClientDetailsContext);
   
    const { id } = useParams();
    const [messages, setMessage] = useState({
        message:"",
        role:""
    })
    const [chats, setChats] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    
    const senderid = localStorage.getItem("userId") ? {userId: localStorage.getItem("userId") ,  model: "users"} : {clientId: localStorage.getItem("clientId") , model: "client"} 
    
    useEffect(() => {

        if (id) {
            console.log(id);
            
            onValue(ref(db, 'chats/' + id), (snapshot) => {
                const data = snapshot.val();
                console.log(data);
                if (data) {
                    console.log(data);
                    
                    setChats(data) 
                    setIsDisabled(false)
                }else{
                    setIsDisabled(false)
                    setChats([]) 
                }

            });

        }
    }, [id])

    function addChat() {

        setChats(prevChats => {
            const updatedChats = [...prevChats, messages];
            set(ref(db, 'chats/' + id), updatedChats);
            return updatedChats;
        });

        
        fetch(import.meta.env.VITE_APP_BACKEND_URL + "/addnotification", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...senderid,
                reciverid: chat.reciverid._id,
                recivermodel: chat.reciverModel,
                notificationType:"message",
                role: "sender",
                content:messages.message
            })
        }).then(()=>{
            console.log("fghjk");
            
            setMessage('');
        })
    }

    return (
        <div className='bg-amber-50 w-full  relative'>

            {id && <ChatHeader isDisabled={isDisabled}   />}
            <div>
                {
                    id && chats.map((item) => {
                        return(
                        <div className='  mt-5 mb-5' >
                            <div className='flex '> 
                            <img src={item.role ? senderid.photo : chat.reciverid.photo} alt="userprofile" className='w-10 h-10 rounded-4xl border' />
                            <p className='text-xl ml-4'> {chat.reciverid.firstName } { chat.reciverid.lastName}</p>
                            </div>
                            <p className='text-xl ml-10'>{item.message}</p>
                      </div>)
                    })
                }
            </div>

            <div className='absolute flex w-full h-10 p-10   self-end bottom-10 '>

                <input type="text" className='w-[80%] h-15 border' value={messages.message} onChange={(e) => { setMessage({message:e.target.value,role:"sender"}) }} />

                <button className='h-15 w-fit border p-2 ml-5 bg-amber-900 text-white text-2xl text-center' onClick={addChat} disabled={isDisabled}>Send</button>
            </div>

        </div>
    )
}
