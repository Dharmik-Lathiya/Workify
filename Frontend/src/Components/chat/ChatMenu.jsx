import React, { useEffect, useState } from "react";
import ChatUserList from "./ChatUserList";

export default function ChatMenu() {
  const clinetId = localStorage.getItem("clientId");
  const userId = localStorage.getItem("userId");
  const [chats, setChat] = useState(null);

  console.log(chats);
  

  useEffect(() => {
    console.log(userId, clinetId);

    fetch(import.meta.env.VITE_APP_BACKEND_URL + "/getchat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: userId ? "user" : "client",
        id: userId ? userId : clinetId,
      }),
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        if (data) {
          setChat(() => {
            return data;
          });
        }
      });
    });
  }, []);

  return (
    <div className="rounded box-border w-2/6 bg-gray-900 text-white shadow-lg">
      {/* Header */}
      <p className="text-2xl font-semibold p-5 h-20 flex items-center border-b border-gray-700">
        Messages
      </p>

      {/* Chat List Container */}
      <div className="overflow-y-auto h-[calc(100vh-80px)]">
        {chats &&
          chats.map((chat) => {
            return <ChatUserList key={chat.chatid} chat={chat} />;
          })}
      </div>
    </div>
  );
}
