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
    <div className='bg-white shadow-lg absolute left-[-16rem] p-6 rounded-xl w-80 border border-gray-200'>
    <h3 className='text-lg font-semibold text-gray-800 mb-3'>Notifications</h3>
    <div className='space-y-4'>
      {data && data.slice().reverse().map((node, index) => {
        i++;
        if (i <= 5)
          return (
            <div key={index} className='p-3 bg-gray-100 rounded-lg flex items-center gap-3'>
              <img src={node.reciverid.photo} alt='' className='w-12 h-12 rounded-full border border-gray-300' />
              <div>
                <p className='text-sm font-medium text-gray-900'>{node.reciverid.firstName} {node.reciverid.lastName}</p>
                <p className='text-xs text-gray-600'>{node.notificationType}</p>
                <p className='text-sm text-gray-700 mt-1'>{node.content}</p>
              </div>
            </div>
          );
      })}
    </div>
  </div>
  )
}
