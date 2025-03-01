import React, { useEffect, useState, useContext } from 'react'
import { set, ref, onValue } from "firebase/database";
import { useParams } from 'react-router-dom';
import { UserDetailsContext } from '../../Context/UserDetailsContext';
import { ClientDetailsContext } from '../../Context/ClientDetailsContext';
import ChatContext from '../../Context/ChatContext'
import ChatHeader from './ChatHeader';



export default function ChatSide({ db }) {
    
    
    const {chat} = useContext(ChatContext);
   
    const {userId , userDetails} =useContext(UserDetailsContext);
    const {clinetId ,clientDetails } = useContext(ClientDetailsContext);
   
    const { id } = useParams();
    const [messages, setMessage] = useState({
        message:"",
        role:""
    })
    const [chats, setChats] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    
    const senderid = localStorage.getItem("userId") ? {userId: localStorage.getItem("userId") ,  model: "users"} : {clientId: localStorage.getItem("clientId") , model: "client"} 
    const user = localStorage.getItem("userId") ? userDetails  :  clientDetails;
  
    useEffect(() => {
        console.log(clientDetails);
        
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
            
            setMessage({
                message:"",
                role:""
            });
        })
    }

    return (
        <div className='bg-amber-50 w-full  relative'>

            {id && <ChatHeader isDisabled={isDisabled}   />}
            <div className='fixed h-100 overflow-scroll w-100'>
                {
                    id && chats.map((item) => {
                        return(
                        <div className='  mt-5 mb-5 flex' >
                            <p>{item.role}</p>
                            <p className='text-xl ml-10'>{item.message}</p>
                      </div>)
                    })
                }
            </div>

            <div className='absolute flex w-full h-10 p-10   self-end bottom-10 '>

                <input type="text" className='w-[80%] h-15 border' value={messages.message} onChange={(e) => { setMessage({message:e.target.value,role:user.username}) }} />

                <button className='h-15 w-fit border p-2 ml-5 bg-amber-900 text-white text-2xl text-center' onClick={addChat} >Send</button>
            </div>

        </div>
    )
}
