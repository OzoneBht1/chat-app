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
import { useMutation, useQuery } from "react-query";
import { createMessage, getChat } from "@/app/api/chat";
import Image from "next/image";
import { IMessage, INewMessage, MessageType } from "@/types/message";
import Icon from "../Icons/Icon";
import CheckMark from "../Icons/Svgs/CheckmarkIcon";
import { IChat } from "@/types/chat";

interface IChatMainProps {
  selectedChat: number | null;
}

export default function ChatMain({ selectedChat }: IChatMainProps) {
  const { auth } = useContext(AuthContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<IMessage[]>([]);
  console.log(selectedChat);

  const {
    data: chatData,
    isLoading: chatDataIsLoading,
    isError: chatDataIsError,
  } = useQuery<IChat>(
    ["getChat"],
    () => getChat(selectedChat as number),
    {
      enabled: !!selectedChat,
      refetchOnWindowFocus: false,
      onSettled: (data , error: unknown) => {
        console.log(data);
        console.log("Calling Set Messages");
        if (data){
        setMessages(data.messages);
        }
      },
    }
  );

  const {
    mutate: sendMessage,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMessage);

  useEffect(() => {
    socket.on("receive-message", (newMessage: IMessage) => {
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

  if (chatDataIsLoading) {
    return <div className="">loading</div>;
  }
  if (chatDataIsError) {
    return <div className="">error</div>;
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

      const receiverUser = chatData?.users.find((user)=>user.id !== auth?.user?.userId)
    if (!receiverUser){
      throw new Error();
    }
    sendMessage({
      userId: auth!.user!.userId,
      msgType: MessageType.TEXT,
      data: message,
      receiverId : receiverUser?.id 
    });
  };

  return (
    <div className="flex w-4/5 text-black">
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
              <p className="text-2xl font-medium">{chatData?.users[0].name}</p>
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
        <div className="flex-grow overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-5 w-full justify-end px-6 py-3">
            {messages.map((message, idx) => {
              if (message.sender.id=== auth.user?.userId) {
                return (
                  <>
                    <div key={message.id} className="flex justify-end pr-2">
                      <div className="flex gap-2">
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex gap-2">
                            <p className="text-gray-400">5 bajyo</p>
                            <h6>You</h6>
                          </div>
                          {idx === messages.length - 1 ? (
                            <div className="flex gap-2 items-center">
                              {isLoading && (
                                <Icon bgColor="none">
                                  <CheckMark className="fill-none stroke-gray-500 stroke-2 w-6 h-6" />
                                </Icon>
                              )}
                              {isSuccess && (
                                <Icon bgColor="none">
                                  <CheckMark className="fill-none stroke-green-500 stroke-2 w-6 h-6" />
                                </Icon>
                              )}

                              <div className="bg-blue-600 text-white px-3 py-2 rounded-l-lg rounded-b-lg max-w-md">
                                {message.data}
                              </div>
                            </div>
                          ) : (
                            <div className="bg-blue-600 text-white px-3 py-2 rounded-l-lg rounded-b-lg max-w-md">
                              {message.data}
                            </div>
                          )}
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
                  </>
                );
              } else {
                return (
                  <div key={message.id} className="flex justify-start pl-2">
                    <div className="flex flex-row-reverse gap-2">
                      <div className="flex flex-col items-start gap-2">
                        <div className="flex flex-row-reverse gap-2">
                          <p className="text-gray-400">5 bajyo</p>
                          <h6>{message.sender.username}</h6>
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
          </div>
        </div>

        <form
          onSubmit={submitHandler}
          className="w-full flex border-2 border-red-500 py-1"
        >
          <input ref={inputRef} className="flex-1 h-full py-6 text-black" />
          <button className="w-20 border-2 border-white">Send</button>
        </form>
      </div>
    </div>
  );
}
