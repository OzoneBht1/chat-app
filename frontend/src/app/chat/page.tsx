"use client";
import ChatLeft from "@/components/Chat/ChatLeft";
import ChatMain from "@/components/Chat/ChatMain";

import { AuthContext, AuthProvider } from "@/store/use-user";
// import { useContext, useEffect, useState } from "react";

import { socket } from "../socket/socket";
import { baseUrl } from "@/@variables/baseurl";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

async function getLatestMessages(userId: string) {
  try {
    const res = await fetch(`${baseUrl}/messages/message/history/${userId}`, {
      cache: "force-cache",
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
}

let data: any;
export default async function Chat() {
  const [selectedChat, setSelectedChat] = useState<null | string>(null);

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (data) {
      console.log(data);
      let rooms: string[] = [];
      data.history.map((chat: any) => {
        rooms.push(chat._id);
      });

      socket.emit("join-room", rooms);
    }
  }, [data]);

  if (!auth.user || !auth.user.userId) {
    return <p>Not found</p>;
  }

  data = await getLatestMessages(auth.user?.userId);

  console.log(data);

  const changeChatHandler = (chatId: string) => {
    console.log(chatId);
    setSelectedChat(chatId);
  };

  return (
    <div className="flex mt-16">
      {data && <ChatLeft onChange={changeChatHandler} data={data} />}
      <ChatMain selectedChat={selectedChat} />
    </div>
  );
}
