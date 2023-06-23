"use client";
import ChatLeft from "@/components/Chat/ChatLeft";
import ChatMain from "@/components/Chat/ChatMain";

import { AuthContext } from "@/store/use-user";

import { socket } from "../socket/socket";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getLatestMessages } from "../api/chat";

let latestMessages: any;
export default async function Chat() {
  const [selectedChat, setSelectedChat] = useState<null | string>(null);

  const { auth } = useContext(AuthContext);

  const {
    data: latestMessages,
    isLoading: latestMessagesIsLoading,
    isError: latestMessagesIsError,
  } = useQuery(
    ["latest-message"],
    () => getLatestMessages(auth?.user?.userId as string),
    {
      refetchOnWindowFocus: false,
      enabled: auth?.user?.userId !== undefined,
    }
  );

  useEffect(() => {
    if (latestMessages) {
      console.log(latestMessages);
      let rooms: string[] = [];
      latestMessages.history.map((chat: any) => {
        rooms.push(chat._id);
      });

      socket.emit("join-room", rooms);
    }
  }, [latestMessages]);

  if (!auth.user || !auth.user.userId) {
    return <p>Not found</p>;
  }

  console.log(latestMessages);

  const changeChatHandler = (chatId: string) => {
    console.log(chatId);
    setSelectedChat(chatId);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {latestMessages && (
        <ChatLeft onChange={changeChatHandler} data={latestMessages} />
      )}
      <ChatMain selectedChat={selectedChat} />
    </div>
  );
}
