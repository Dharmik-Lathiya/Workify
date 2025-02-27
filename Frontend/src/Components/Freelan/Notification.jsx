import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function Notification() {
  const socket = io("http://localhost:3000");

  const [flag,setFlag] = useState(true);
  socket.on("notification", (data) => {
    console.log(data);
    setFlag(!flag)
  })

  const [data, SetData] = useState([]);

  let i = 0;
  useEffect(() => {

    console.log("erender");
    
    const UserData = localStorage.getItem("userId") ? {type:"devloper",id: localStorage.getItem("userId") ,  model: "users"} : {id: localStorage.getItem("clientId") , model: "client"} 

    console.log("ghjkl");
    fetch("http://localhost:3000" + "/getnotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
       ...UserData
      })
    }).then((res) => {
      res.json().then(data => {
      
      
        if(!data.message){

          SetData((prev) => data)
        }
        
      })
    })

  },[flag])

  console.log(data);
  
  return (
    <div className='bg-blue-50 absolute left-[-10rem] p-10 rounded-xl '>

      {
        
        data && data.slice().reverse().map((node,index) => {
          i++
        if(i <= 5)
          return (<div key={index}>
            <p>{node.notificationType}</p>
            <div className='flex items-center justify-between'>

              <img src={node.reciverid.photo} alt="" className='w-10 h-10 rounded-2xl border' />

              <div className='flex'>
                <p>{node.reciverid.firstName}</p>
                <p>{node.reciverid.lastName}</p>
              </div>
            </div>
            <p>{node.content}</p>
          </div>)
        })
      }

    </div>
  )
}
