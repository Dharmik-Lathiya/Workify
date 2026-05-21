import React, { useEffect, useState } from "react";
import ChatUserList from "./ChatUserList";
import apiFetch from "../../lib/api";

export default function ChatMenu() {
  const clinetId = localStorage.getItem("clientId");
  const userId = localStorage.getItem("userId");
  const [chats, setChat] = useState(null);

  useEffect(() => {
    apiFetch("/api/chats/get", {
      method: "POST",
      body: JSON.stringify({
        type: userId ? "user" : "client",
        id: userId ? userId : clinetId,
      }),
    }).then((data) => {
      if (data.data) {
        setChat(data.data);
      }
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
