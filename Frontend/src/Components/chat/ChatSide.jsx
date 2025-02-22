import React, { useEffect, useState } from 'react'
import { set, ref, onValue } from "firebase/database";
import { useParams } from 'react-router-dom';
import { UserDetailsContext } from '../../Context/UserDetailsContext';
import ChatHeader from './ChatHeader';

export default function ChatSide({ db }) {

    const {userId} =useContext(UserDetailsContext);
    const { id } = useParams();
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true)
    console.log(userId);
    
    useEffect(() => {

        if (id) {
            onValue(ref(db, 'chats/' + id), (snapshot) => {
                const data = snapshot.val();
                console.log(data);
                if (data) {
                    setChats(data)
                    setIsDisabled(false)
                    console.log(isDisabled);
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
                userId: "67b62ec3e4a7216330c0307d",
                reciverid: "67b62f0fe4a7216330c03080",
                recivermodel: "client",
                notificationType:"message",
                model: "users",
                role: "sender",
                content:message
            })
        }).then(()=>{

            setMessage('');
        })
    }

    return (
        <div className='bg-amber-50 w-full  relative'>
            {id && <ChatHeader isDisabled={isDisabled} />}
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
