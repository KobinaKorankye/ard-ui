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

const urlOptions = {
  "http://54.246.247.31:5000/qa": "Osis Docs",
  "https://pkhsns2xwi.execute-api.eu-west-1.amazonaws.com/Prod/query": "Database"
}

export default function Chat() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [url, setURL] = useState<string>(Object.keys(urlOptions)[0])

  const getResponse = async (query: string) => {
    setLoading(true);
    try {
      // const { data } = await client.post("/query", { query });
      const { data } = await axios.post(url, { query });

      // Use functional state update to ensure the latest messages array is used
      setMessages((prevMessages) => [...prevMessages, { from: "bot", text: data.response }]);
    } catch (error) {
      // alert("Error");
      setMessages((prevMessages) => [...prevMessages, { from: "bot", text: "My apologies, an internal error occured :(" }]);;
    }
    setLoading(false);
  };

  const handleKeyDown = (event: any) => {
    const inputValue = event.target.value.trim();

    if (event.key === "Enter" && inputValue !== "") {
      // Use functional state update to ensure the latest messages array is used
      setMessages((prevMessages) => [...prevMessages, { from: "person", text: inputValue }]);
      getResponse(inputValue);
      setMessage("");
    }
  };

  return (
    <div className="flex-1 flex gap-28 overflow-y-auto">
      <div className="flex-[4] flex-col overflow-y-auto pb-5  pt-[2.88rem]">
        <div className="ml-12 flex gap-5">
          <IconTextButton invert alt text="Let's have a chat" icon={BiEdit} />
          <ObjSelect value={url} options={urlOptions} onChange={(e) => { setURL(e.target.value) }} />
        </div>
        <div className="text-xs font-bold text-dark mt-3 dark:text-white ml-12">Conversations</div>
        <div className={` ml-12 text-xs shadow rounded overflow-hidden mt-3`}>
          <div className="cursor-pointer bg-white text-secondary/90 font-bold shadow py-3 px-4 truncate">New chat</div>
        </div>
      </div>
      <div className="flex-[7] relative flex flex-col light:border dark:border-2 border-gray-300 dark:border-gray-800 rounded-t-xl overflow-hidden shadow dark:bg-[#111111] bg-[#f1f1f1] mr-10">
        <div className="flex absolute bottom-0 w-full h-full overflow-y-auto overflow-x-hidden flex-col border-x rounded-t-lg dark:border-x-0 dark:border-gray-900 flex-1 pb-4">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <Loader animationName="bot" style={{ width: "20%" }} />
              <div className={`text-sm text-dull dark:text-gray-400 font-semibold`}>Hi, how can I help you today?</div>
            </div>
          ) : (
            <div className={`flex flex-col-reverse h-full gap-2 overflow-y-auto px-4 py-2`}>
              {loading && <div className="animate-pulse mx-8 text-sm dark:text-white">Typing...</div>}
              {[...messages].reverse().map((msg, index) => (
                <Message key={index} text={msg.text} from={msg.from} />
              ))}
            </div>
          )}
          <div className="px-4">
            <MessageInput
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
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
