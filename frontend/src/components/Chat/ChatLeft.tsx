"use client";

import { baseUrl } from "@/@variables/baseurl";
import Icon from "../Icons/Icon";
import ChatIcon from "../Icons/Svgs/ChatIcon";
import { AuthContext } from "@/store/use-user";
import { useContext } from "react";
import Image from "next/image";
import { getLastMessagePeriod } from "@/utils/dateUtils";

export const fetchLatestMessages = async (userId: string) => {
  try {
    const res = await fetch(`${baseUrl}/messages/message/history/${userId}`);
    if (!res.ok) {
      throw new Error("Fetching messages failed");
    }

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

interface IChatLeftProps {
  onChange: (chatId: string) => void;
}

export default async function ChatLeft({ onChange }: IChatLeftProps) {
  const { auth } = useContext(AuthContext);
  console.log(auth);

  if (!auth.user || !auth.user.userId) {
    return <div>Error</div>;
  }

  const data = await fetchLatestMessages(auth.user.userId);
  if (!data) {
    return <p>Not Found</p>;
  }

  const handleChatSwitch = (messageId: string) => {
    onChange(messageId);
  };

  return (
    <div className="flex w-1/5 border-white border-2 p-6 text-white ">
      <div className="flex flex-col w-full gap-5">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Chats</h1>
          <Icon>
            <ChatIcon width="100%" height="100%" fill="white" />
          </Icon>
        </div>
        {data &&
          data.history.map((message: any) => {
            return (
              <div
                className="border-2 gap-2 border-y-white flex w-full p-2"
                onClick={() => handleChatSwitch(message._id)}
              >
                <Image
                  src="/next.svg"
                  alt="user-image"
                  width="30"
                  height="40"
                  className="rounded border-2 border-red"
                />
                <div className="flex flex-col items-start">
                  <div className="flex justify-between items-center text-center w-full pr-4">
                    <p className="text-lg font-bold">
                      {message.messages[0].sender.username}
                    </p>
                    <p>{getLastMessagePeriod(message.updatedAt)} </p>
                  </div>
                  <p className="text-">{message.messages[0].data}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
