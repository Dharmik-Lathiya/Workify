import React, { useContext } from "react";
import ChatContext from "../../Context/ChatContext";
import { useNavigate } from "react-router-dom";

export default function ChatHeader({ isDisabled, message }) {
  const { chat } = useContext(ChatContext);
  const navigate = useNavigate();
  console.log(chat);

  if (!chat) {
    navigate("/chat");
  }

  return (
    chat && (
      <div>
        {/* Header Container */}
        <div className="bg-gray-900 border-0 text-white h-20 flex items-center px-5 shadow-md">
          {/* Profile Image */}
          <img
            src={chat.reciverid.photo}
            alt="User Profile"
            className="w-14 h-14 rounded-full border-2 border-white shadow-md"
          />

          {/* Name Section */}
          <div className="ml-4 text-lg font-semibold">
            <p>
              {chat.reciverid.firstName} {chat.reciverid.lastName}
            </p>
          </div>
        </div>

        {/* Waiting Message */}
        {isDisabled && (
          <p className="text-gray-600 text-center mt-3 italic">Waiting for messages...</p>
        )}
      </div>
    )
  );
}
