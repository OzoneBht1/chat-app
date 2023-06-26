"use client";

import React, {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AuthContext } from "@/store/use-user";
import { socket } from "@/app/socket/socket";
import { useQuery } from "react-query";
import { getChat } from "@/app/api/chat";
import Image from "next/image";

interface IChatMainProps {
  selectedChat: string | null;
}

export default function ChatMain({ selectedChat }: IChatMainProps) {
  const { auth } = useContext(AuthContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<any[]>([]);
  console.log(selectedChat);

  useQuery(["getChat"], () => getChat(selectedChat as string), {
    enabled: !!selectedChat,
    refetchOnWindowFocus: false,
    onSettled: (data: any, error: unknown) => {
      console.log("Calling Set Messages");
      setMessages(data.chat.messages);
    },
  });

  useEffect(() => {
    socket.on("receive-message", (newMessage: any) => {
      console.log(newMessage);
      console.log(messages);
      setMessages((prev) => [...prev, newMessage]);
    });
  }, []);

  console.log(messages);

  if (!selectedChat) {
    return <div className="-white">Select a chat</div>;
  }

  if (!auth.user) {
    return <div className="">loading</div>;
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = inputRef.current?.value;
    if (!message || message.trim().length < 1) {
      return;
    }
    console.log("HI< EMITTING");
    console.log("MESSAGE IS ", message);

    socket.emit("send-message", {
      to: selectedChat,
      msgType: "TEXT",
      data: message,
      sender: {
        _id: auth?.user?.userId,
      },
      receiver: {
        _id: selectedChat,
      },
    });
  };

  return (
    <div className="flex w-4/5 text-black">
      <div className="flex flex-1">
        <div className="flex flex-col w-full">
          <div className="flex w-full items-start justify-between py-4">
            <div className="flex w-full items-center shadow-lg px-4 py-1">
              <div className="gap-5 flex w-full p-2 items-center">
                <Image
                  src="/14.png"
                  alt="user-image"
                  width={40}
                  height={40}
                  className="w-12 h-12 rounded-full"
                />
                <p className="text-2xl font-medium">User4444</p>
              </div>

              <div className="flex gap-5 items-center">
                <Image
                  src="/14.png"
                  alt="user-image"
                  width={40}
                  height={40}
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 h-full w-full justify-end px-6 py-3">
            {messages.map((message: any) => {
              if (message.sender._id === auth.user?.userId) {
                return (
                  <div key={message._id} className="flex justify-end pr-2">
                    <div className="flex gap-2">
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex gap-2">
                          <p className="text-gray-400">5 bajyo</p>
                          <h6>You</h6>
                        </div>
                        <div className="bg-blue-600 text-white px-3 py-2 rounded-l-lg rounded-b-lg max-w-md">
                          {message.data}
                        </div>
                      </div>
                      <Image
                        src="/14.png"
                        alt="user-image"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={message._id} className="flex justify-start pl-2">
                    <div className="flex flex-row-reverse gap-2">
                      <div className="flex flex-col items-start gap-2">
                        <div className="flex flex-row-reverse gap-2">
                          <p className="text-gray-400">5 bajyo</p>
                          <h6>You</h6>
                        </div>
                        <div className="bg-blue-600 text-white px-3 py-2 rounded-r-lg rounded-b-lg max-w-md">
                          {message.data}
                        </div>
                      </div>
                      <Image
                        src="/14.png"
                        alt="user-image"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                  </div>
                );
              }
            })}
            <form
              onSubmit={submitHandler}
              className="w-full flex border-2 border-red-500 py-1"
            >
              <input ref={inputRef} className="flex-1 h-full py-6 text-black" />
              <button className="w-20 border-2 border-white">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
