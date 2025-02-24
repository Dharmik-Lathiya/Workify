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
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    
    const senderid = userId ? {userId:userId ,  model: "users"} : {clinetId:clinetId , model: "client"} 
    
    useEffect(() => {

        if (id) {
            onValue(ref(db, 'chats/' + id), (snapshot) => {
                const data = snapshot.val();
                console.log(data);
                if (data) {
                    setChats(data)
                    
                    
                    setIsDisabled(false)
                }else{
                    setIsDisabled(false)
                   
                }

            });

        }
    }, [])

    function addChat() {
        setChats(prevChats => {
            const updatedChats = [...prevChats, message];
            set(ref(db, 'chats/' + id), updatedChats);
            return updatedChats;
        });

        set(ref(db, 'chats/' + id), chats);
        
        fetch(import.meta.env.VITE_APP_BACKEND_URL + "/addnotification", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                senderid,
                reciverid: chat.reciverid._id,
                recivermodel: chat.reciverModel,
                notificationType:"message",
                role: "sender",
                content:message
            })
        }).then(()=>{

            setMessage('');
        })
    }

    return (
        <div className='bg-amber-50 w-full  relative'>

            {id && <ChatHeader isDisabled={isDisabled}   />}
            <div>
                {
                    chats.map((item) => {
                        return <p>{item}</p>
                    })
                }
            </div>

            <div className='absolute flex w-full h-10 p-10   self-end bottom-10 '>

                <input type="text" className='w-[80%] h-15 border' value={message} onChange={(e) => { setMessage(e.target.value) }} />

                <button className='h-15 w-fit border p-2 ml-5 bg-amber-900 text-white text-2xl text-center' onClick={addChat} disabled={isDisabled}>Send</button>
            </div>

        </div>
    )
}
