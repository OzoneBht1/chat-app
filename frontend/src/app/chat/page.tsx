"use client";

import ChatLeft from "@/components/Chat/ChatLeft";
import ChatMain from "@/components/Chat/ChatMain";

import { AuthContext, AuthProvider } from "@/store/use-user";
import { useContext, useState } from "react";

export default function Chat() {
  const { auth } = useContext(AuthContext);
  const [selectedChat, setSelectedChat] = useState<null | string>(null);

  const changeChatHandler = (chatId: string) => {
    console.log(chatId);
    setSelectedChat(chatId);
  };
  return (
    <div className="flex h-[95vh] mt-3">
      <ChatLeft onChange={changeChatHandler} />
      <ChatMain selectedChat={selectedChat} />
    </div>
  );
}
