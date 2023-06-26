"use client";

import Icon from "../Icons/Icon";
import { AuthContext } from "@/store/use-user";
import { useContext, useEffect } from "react";
import Image from "next/image";
import { getLastMessagePeriod } from "@/utils/dateUtils";
import IconGroup from "../Icons/IconGroup";
import AddIcon from "../Icons/Svgs/AddIcon";
import SearchIcon from "../Icons/Svgs/SearchIcon";
import socket from "@/socket";

interface IChatLeftProps {
  onChange: (chatId: string) => void;
  data: any;
}

export default async function ChatLeft({ onChange, data }: IChatLeftProps) {
  const { auth } = useContext(AuthContext);
  console.log(auth);

  if (!auth.user || !auth.user.userId) {
    return <div>Error</div>;
  }

  if (!data) {
    return <p>Not Found</p>;
  }

  useEffect(() => {
    let rooms: string[] = [];
    console.log(data);
    data.history.map((chat: any) => {
      rooms.push(chat._id);
    });

    socket.emit("get-connected-users", rooms);
  }, [data]);

  const handleChatSwitch = (messageId: string) => {
    onChange(messageId);
  };

  return (
    <div className="flex w-1/5 border-r-2 border-gray-200">
      <div className="flex flex-col w-full gap-5">
        <div className="px-2 py-4 border-b-2 border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-3xl text-blue-500 rounded-md">
              Messages
            </h1>
            <IconGroup>
              <Icon>
                <AddIcon className="fill-none stroke-gray-500 stroke-2 w-6 h-6" />
              </Icon>
              <Icon>
                <SearchIcon className="fill-none stroke-gray-500 stroke-2 h-6 w-6" />
              </Icon>
            </IconGroup>
          </div>
        </div>
        {data &&
          data.history.map((message: any) => {
            return (
              <div
                className="gap-5 flex w-full p-2 items-center"
                onClick={() => handleChatSwitch(message._id)}
              >
                <Image
                  src="/14.png"
                  alt="user-image"
                  width={40}
                  height={40}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center w-full ">
                    <p className="text-lg font-semibold">
                      {message.messages[0].sender.username}
                    </p>
                    <p className="text-sm text-gray-600">
                      {getLastMessagePeriod(message.updatedAt)}
                    </p>
                  </div>
                  <p className="text-gray-700 text-md">
                    {message.messages[0].data}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
