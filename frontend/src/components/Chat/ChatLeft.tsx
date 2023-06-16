"use client";

import Icon from "../Icons/Icon";
import ChatIcon from "../Icons/Svgs/ChatIcon";

export default function ChatLeft() {
  console.log("Hi");

  return (
    <div className="flex w-1/5 border-white border-2 p-6 text-white ">
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl"> Chats</h1>
          <Icon>
            <ChatIcon width="100%" height="100%" fill="white" />
          </Icon>
        </div>
      </div>
    </div>
  );
}
