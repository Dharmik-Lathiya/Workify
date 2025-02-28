import React, { useEffect, useState, useContext } from "react";
import { set, ref, onValue } from "firebase/database";
import { useParams } from "react-router-dom";
import { UserDetailsContext } from "../../Context/UserDetailsContext";
import { ClientDetailsContext } from "../../Context/ClientDetailsContext";
import ChatContext from "../../Context/ChatContext";
import ChatHeader from "./ChatHeader";

export default function ChatSide({ db }) {
  const { chat } = useContext(ChatContext);
  const { userId, userDetails } = useContext(UserDetailsContext);
  const { clinetId, clientDetails } = useContext(ClientDetailsContext);

  const { id } = useParams();
  const [messages, setMessage] = useState({
    message: "",
    role: "",
  });
  const [chats, setChats] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const senderid = localStorage.getItem("userId")
    ? { userId: localStorage.getItem("userId"), model: "users" }
    : { clientId: localStorage.getItem("clientId"), model: "client" };
  const user = localStorage.getItem("userId") ? userDetails : clientDetails;

  console.log(user);

  useEffect(() => {
    if (id) {
      console.log(id);
      onValue(ref(db, "chats/" + id), (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
          setChats(data);
          setIsDisabled(false);
        } else {
          setIsDisabled(false);
          setChats([]);
        }
      });
    }
  }, [id]);

  function addChat() {
    setChats((prevChats) => {
      const updatedChats = [...prevChats, messages];
      set(ref(db, "chats/" + id), updatedChats);
      return updatedChats;
    });

    fetch(import.meta.env.VITE_APP_BACKEND_URL + "/addnotification", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...senderid,
        reciverid: chat.reciverid._id,
        recivermodel: chat.reciverModel,
        notificationType: "message",
        role: "sender",
        content: messages.message,
      }),
    }).then(() => {
      console.log("Message Sent");
      setMessage({
        message: "",
        role: "",
      });
    });
  }

  return (
    <div className="bg-gray-100 w-4/6 flex flex-col h-screen">
      {/* Chat Header */}
      {id && <ChatHeader isDisabled={isDisabled} />}

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-800">
        {id &&
          chats.map((item, index) => (
            <div
              key={index}
              className={`flex ${
                item.role === "sender" ? "justify-end" : "justify-start"
              }`}
            >
              <p
                className={`max-w-xs px-4 py-2 rounded-lg text-white ${
                  item.role === "sender"
                    ? "bg-gray-700"
                    : "bg-gray-700"
                }`}
              >
                {item.message}
              </p>
            </div>
          ))}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-gray-900 border-t flex items-center">
        <input
          type="text"
          className="w-full p-2 border rounded-lg outline-none bg-gray-700 text-white"
          placeholder="Type a message..."
          value={messages.message}
          onChange={(e) => setMessage({ message: e.target.value, role: "sender" })}
        />
        <button
          className="ml-3 bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
          onClick={addChat}
        >
          Send
        </button>
      </div>
    </div>
  );
}
