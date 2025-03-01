import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ChatContext from "../../Context/ChatContext";

export default function ChatUserList({ chat }) {
  const { setChat } = useContext(ChatContext);

  return (
    <Link to={`/chat/${chat.chatid}`} onClick={() => setChat(() => chat)}>
      <div className="flex items-center gap-4 mt-3 mb-3 bg-gray-800 hover:bg-gray-700 mx-2 p-3 rounded-lg transition-all duration-200 shadow-md cursor-pointer">
        {/* Profile Image */}
        <img
          src={chat.reciverid.photo}
          alt="userprofile"
          className="w-12 h-12 rounded-full border-2 border-gray-600"
        />

        {/* User Name */}
        <p className="text-lg font-medium text-white">
          {chat.reciverid.firstName} {chat.reciverid.lastName}
        </p>
      </div>
    </Link>
  );
}
