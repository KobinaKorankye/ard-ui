"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

const Loader = dynamic(() => import("@/components/animations/Loader"), {
  ssr: false, // This ensures the component is only rendered on the client
});

const MessageInput = dynamic(() => import("@/components/inputs/MessageInput"), {
  ssr: false,
});

const Message = dynamic(() => import("@/components/Message"), {
  ssr: false,
});

const ObjSelect = dynamic(() => import("@/components/inputs/ObjSelect"), {
  ssr: false,
});

import { BiEdit } from "react-icons/bi";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import axios from "axios";
import { CgMaximize, CgMinimize } from "react-icons/cg";

const SOURCES = {
  // database: "https://pkhsns2xwi.execute-api.eu-west-1.amazonaws.com/Prod/query", 
  // database: "http://54.246.247.31:5001/query", 
  database: "/api/proxy", 
  osis: "https://pkhsns2xwi.execute-api.eu-west-1.amazonaws.com/Prod/qa"
}

const urlOptions = {
  // "https://pkhsns2xwi.execute-api.eu-west-1.amazonaws.com/Prod/query": "Database",
  // "http://54.246.247.31:5001/query": "Database",
  "/api/proxy": "Database",
  "https://pkhsns2xwi.execute-api.eu-west-1.amazonaws.com/Prod/qa": "Osis Docs",
}


// Define the message type with a specific structure
type Message = {
  from: "bot" | "person"; // Who sent the message
  text: string; // The message content
  chart_data?: { // Optional chart data
    labels: string[];
    values: number[];
    colors: string[];
  };
  table_data?: any; // Optional table data, you can refine this if needed
};

// Define the chat type, which includes an id and a list of messages
type Chat = {
  id: string; // Unique identifier for the chat
  messages: Message[]; // List of messages in this chat
};

export default function Chat() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [chatID, setChatID] = useState<string>((new Date()).toString());
  const [chatList, setChatList] = useState<Chat[]>([{ id: chatID, messages: [] }]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isFullScreenChat, setIsFullScreenChat] = useState(false);
  const [url, setURL] = useState<string>(Object.keys(urlOptions)[0]);

  const getResponse = async (query: string) => {
    setLoading(true);
    try {
      // const { data } = await client.post("/query", { query });
      const body = url == SOURCES.database ? { id: chatID, query } : { query }
      const { data } = await axios.post(url, body);
      console.log(data)
      const newMessage: Record<string, any> = {
        from: "bot", text: data?.response
      }
      if (data?.chart_data) {
        const { labels, values } = data?.chart_data;
        const colors = labels.map(
          () =>
            `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)}, 0.6)`
        );
        newMessage['chart_data'] = (values?.length > 0 ?
          { ...data?.chart_data, colors }
          : false)
      }
      if (data?.table_data) {
        console.log("Table data", data?.table_data)
        newMessage['table_data'] = data?.table_data
      }

      setMessages((prevMessages) => [...prevMessages, newMessage]);

    } catch (error) {
      // alert("Error");
      setMessages((prevMessages) => [...prevMessages, { from: "bot", text: "My apologies, an internal error occured :(" }]);;
    }
    setLoading(false);
  };

  const handleKeyDown = (event: any) => {
    const inputValue = event.target.value.trim();

    if (!loading && event.key === "Enter" && inputValue !== "") {
      // Use functional state update to ensure the latest messages array is used
      setMessages((prevMessages) => [...prevMessages, { from: "person", text: inputValue }]);
      getResponse(inputValue);
      setMessage("");
    }
  };

  const onSendPress = () => {
    if (!loading && message !== "") {
      // Use functional state update to ensure the latest messages array is used
      setMessages((prevMessages) => [...prevMessages, { from: "person", text: message }]);
      getResponse(message);
      setMessage("");
    }
  };

  const handleNewChat = () => {
    const updatedChatList = chatList.map((chat) => {
      if (chat.id == chatID) {
        chat.messages = [...JSON.parse(JSON.stringify(messages))]
      }
      return chat
    })
    const newChatID = (new Date()).toString(); // Generate a new unique chat ID
    setChatID(newChatID);  // Set the new chat ID first
    setChatList([...updatedChatList, { id: newChatID, messages: [] }]);  // Add new chat with updated ID
    setMessages([]);  // Reset messages for the new chat
  };

  return (
    <div className="flex-1 flex gap-10 overflow-y-auto">
      <div className="flex flex-[3] flex-col overflow-y-auto pb-5 pt-[2rem]">

        <div className="ml-8 pl-1 flex flex-col gap-4 mt-4 mb-10">
          <div className="font-medium text-[0.6rem] uppercase text-dark dark:text-gray-300">Conversations</div>
          <div className="flex">
            <div onClick={handleNewChat} className={`cursor-pointer border-4 border-gray-700 flex items-center gap-[0.74rem] hover:tracking-wide duration-300 bg-teal-900 text-xs font-bold px-4 py-3 rounded-lg`}>
              <div className="text-teal-200">{"Let's have a chat"}</div>
              <div className={`text-2xl flex text-teal-300 items-center justify-center rounded-xl`}>
                <BiEdit />
              </div>
            </div>
          </div>
        </div>
        <div className="text-[0.6rem] uppercase font-medium text-dark dark:text-gray-400 ml-10">History</div>
        <div className={` ml-10 relative flex-1 text-xs shadow rounded overflow-hidden mt-3`}>
          <div className="absolute top-0 w-full h-full overflow-y-auto flex-col">
            {chatList.map((chat, index) => (
              <div onClick={() => {
                const updatedChatList = chatList.map((chat) => {
                  if (chat.id == chatID) {
                    chat.messages = [...JSON.parse(JSON.stringify(messages))]
                  }
                  return chat
                })
                setChatList(updatedChatList)
                setChatID(chat.id); setMessages(chat.messages)
              }} key={index}
                className={`cursor-pointer ${chatID == chat.id ? 'border border-white/20 tracking-wide text-teal-100/70' : 'text-teal-100/50'} text-[0.8rem] shadow py-5 px-3 truncate`}>
                {chat.id}
              </div>
            ))
            }
          </div>
        </div>
      </div>
      <div className={`${isFullScreenChat ? 'fixed top-0 left-0 right-0 bottom-0 w-full h-screen' : 'flex-[8] relative'} duration-300  flex flex-col light:border dark:border-2 border-gray-300 dark:border-gray-800 rounded-t-xl overflow-hidden shadow dark:bg-[#111111] bg-[#f1f1f1] mr-10`}>
        <div className={`flex absolute bottom-0 w-full h-full overflow-y-auto overflow-x-hidden flex-col border-x rounded-t-lg dark:border-x-0 dark:border-gray-900 flex-1 pb-4`}>
          <div onClick={() => { setIsFullScreenChat((prev) => !prev) }} className="absolute top-5 left-5 w-10 h-10 border-2 border-white/50 hover:text-white/80 cursor-pointer text-white/60 text-lg rounded-lg flex items-center justify-center">
            {
              isFullScreenChat ?
                <CgMinimize /> :
                <CgMaximize />
            }
          </div>
          <div className="absolute top-5 right-5">
            <div className="flex gap-4 items-center">
              <div className="text-white/40 text-[0.8rem]">Knowledge Base</div>
              <ObjSelect value={url} options={urlOptions} onChange={(e) => { setURL(e.target.value) }} />
            </div>
          </div>
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <Loader animationName="bot" style={{ width: "10rem" }} />
              <div className={`text-sm text-dull dark:text-gray-400 font-bold`}>Hi, how can I help you today?</div>
            </div>
          ) : (
            <div className={`flex flex-col-reverse h-full gap-10 overflow-y-auto px-32 py-2`}>
              {loading && <div className="animate-pulse ml-1 mb-3 text-sm dark:text-white">Typing...</div>}
              {[...messages].reverse().map((msg, index) => (
                <Message key={index} {...msg} />
              ))}
            </div>
          )}
          <div className="px-32">
            <MessageInput
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onSendPress={onSendPress}
              onKeyDown={handleKeyDown}
              className="shadow"
              icon={PiPaperPlaneRightFill}
              placeholder="Type here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
