"use client";

import React, { useState } from "react";
import { Loader } from "@/components/animations/Loader";
import IconTextButton from "@/components/buttons/IconTextButton";
import MessageInput from "@/components/inputs/MessageInput";
import Message from "@/components/Message";
import client from "@/api/client";
import { BiEdit } from "react-icons/bi";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { Poppins } from "next/font/google";
import ObjSelect from "@/components/inputs/ObjSelect";
import axios from "axios";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const SOURCES = {
  database: "https://pkhsns2xwi.execute-api.eu-west-1.amazonaws.com/Prod/query", osis: "http://54.246.247.31:5000/qa"
}

const urlOptions = {
  "https://pkhsns2xwi.execute-api.eu-west-1.amazonaws.com/Prod/query": "Database",
  "http://54.246.247.31:5000/qa": "Osis Docs",
}

export default function Chat() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [chats, setChats] = useState<any[]>([]);
  const [chatID, setChatID] = useState<string>(Date.now().toString());
  const [messages, setMessages] = useState<any[]>([]);
  const [url, setURL] = useState<string>(Object.keys(urlOptions)[0])

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

  return (
    <div className="flex-1 flex gap-10 overflow-y-auto">
      <div className="flex flex-[3] flex-col overflow-y-auto pb-5  pt-[2rem]">
        <div className="ml-8 flex flex-col gap-5">
          <div className="flex ml-1">
            <ObjSelect label="Knowledge base" value={url} options={urlOptions} onChange={(e) => { setURL(e.target.value) }} />
          </div>
        </div>
        <div className="ml-8 pl-1 flex flex-col gap-4 my-10">
          <div className="font-medium text-[0.6rem] uppercase text-dark dark:text-gray-300">Conversations</div>
          <div className="flex">
            <div onClick={() => { }} className={`cursor-pointer border-4 border-gray-700 flex items-center gap-[0.74rem] bg-gray-900 text-xs font-bold px-4 py-3 rounded-lg`}>
              <div className="text-teal-400">{"Let's have a chat"}</div>
              <div className={`text-2xl flex text-teal-500 items-center justify-center rounded-xl`}>
                <BiEdit />
              </div>
            </div>
          </div>
          {/* <IconTextButton invert alt text="Let's have a chat" icon={BiEdit} /> */}
        </div>
        <div className="text-[0.6rem] uppercase font-medium text-dark dark:text-gray-400 ml-10">History</div>
        <div className={` ml-10 relative flex-1 text-xs shadow rounded overflow-hidden mt-3`}>
          <div className="absolute top-0 w-full h-full overflow-y-auto flex-col">
            <div className="cursor-pointer text-teal-400 font-medium text-[0.8rem] bg-gray-800 rounded-lg tracking-wide shadow py-3 px-3 truncate">New chat</div>
            <div className="cursor-pointer text-gray-400 font-medium text-[0.8rem] tracking-wide shadow py-3 px-3 truncate">Student enrollment trends by grade and year</div>
            <div className="cursor-pointer text-gray-400 font-medium text-[0.8rem] tracking-wide shadow py-3 px-3 truncate">Enrollment statistics for international students</div>
            <div className="cursor-pointer text-gray-400 font-medium text-[0.8rem] tracking-wide shadow py-3 px-3 truncate">Special needs student enrollment and resources</div>
            <div className="cursor-pointer text-gray-400 font-medium text-[0.8rem] tracking-wide shadow py-3 px-3 truncate">Tracking the history of school funding by department</div>
            <div className="cursor-pointer text-gray-400 font-medium text-[0.8rem] tracking-wide shadow py-3 px-3 truncate">Examining the diversity of student populations</div>
          </div>
        </div>
      </div>
      <div className="flex-[8] relative flex flex-col light:border dark:border-2 border-gray-300 dark:border-gray-800 rounded-t-xl overflow-hidden shadow dark:bg-[#111111] bg-[#f1f1f1] mr-10">
        <div className="flex absolute bottom-0 w-full h-full overflow-y-auto overflow-x-hidden flex-col border-x rounded-t-lg dark:border-x-0 dark:border-gray-900 flex-1 pb-4">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <Loader animationName="bot" style={{ width: "20%" }} />
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
