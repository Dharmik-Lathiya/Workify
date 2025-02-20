import React from 'react'
import {io} from 'socket.io-client'

export default function Notification() {

    const socket = io("http://localhost:3000");

    socket.emit("join","67b62ec3e4a7216330c0307d")
      socket.on("notification", (data) => {
        console.log(data); // true
      })
      


  return (
    <div>Notification</div>
  )
}
