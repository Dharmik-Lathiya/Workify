import React, { useContext } from 'react'
import ChatSide from './ChatSide'
import ChatMenu from './ChatMenu'
import { initializeApp } from "firebase/app";
import { getDatabase,set,ref } from "firebase/database";

import { ChatContextProvider } from '../../Context/ChatContext'

export default function Chat() {


    const app = initializeApp({
          apiKey: "AIzaSyCrZ6LjoNOueWJV-vDQgoxBI1PTbwsRzBM",
          authDomain: "workify-aa82c.firebaseapp.com",
          projectId: "workify-aa82c",
          storageBucket: "workify-aa82c.firebasestorage.app",
          messagingSenderId: "101890175421",
          appId: "1:101890175421:web:06458eefb4b313fdf462d4"
      });
  
      const db = getDatabase(app);

  return (
    <ChatContextProvider>
    <div className='flex border-0'>
        <ChatMenu/>
        <ChatSide db={db}/>
    </div>
    </ChatContextProvider>
  )
}
