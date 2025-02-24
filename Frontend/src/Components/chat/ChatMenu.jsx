import React ,{useEffect,useContext, useState}from 'react'
import { UserDetailsContext } from "../../Context/UserDetailsContext";
import { ClientDetailsContext } from '../../Context/ClientDetailsContext';
import ChatUserList from './ChatUserList';


export default function ChatMenu() {
  
  const {clinetId } = useContext(ClientDetailsContext);
  const { userId} = useContext(UserDetailsContext);
  const [chats,setChat] = useState(null)
  useEffect(()=>{

    fetch(import.meta.env.VITE_APP_BACKEND_URL + "/getchat", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body:JSON.stringify({
        type: userId ? "user" : "client",
        id: userId ? userId : clinetId
      })
    }).then((res) =>{
        res.json().then(data =>{
          console.log(data);
          
          if(data){
            setChat(() => {return data})
          }
        })
    })
  },[])

  return (
    <div className='border h-[100vh] w-[20%]'>
      <p className='text-xl p-3'>messages</p>

      <div className='m-10'>
      {
       chats &&  chats.map((chat) =>{
        console.log("hjk");
        
        return  <ChatUserList chat={chat}/>
        })
      }
       
      </div>
    </div>
  )
}
