"use client";
import React, {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AuthContext, AuthProvider } from "@/store/use-user";
import { baseUrl } from "@/@variables/baseurl";
import { socket } from "@/app/socket/socket";
import { useQuery } from "react-query";
import { getChat } from "@/app/api/chat";

interface IChatMainProps {
  selectedChat: string | null;
}

let data: any;
let isInitial = true;

async function ChatMain({ selectedChat }: IChatMainProps) {
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
    return <div className="text-white">Select a chat</div>;
  }

  if (!auth.user) {
    return <div className="text-white">loading</div>;
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
    <div className="flex w-4/5 ">
      <div className="flex flex-1 text-white">
        <div className="flex flex-col w-full gap-5 justify-end">
          {messages.map((message: any) => {
            if (message.sender._id === auth.user?.userId) {
              return (
                <div key={message._id} className="flex justify-end pr-2">
                  {message.data}
                </div>
              );
            } else {
              return (
                <div key={message._id} className="flex justify-start pl-2">
                  {message.data}
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

      {/* <div className="w-1/5 border-white border-l-2 text-white"> */}
      {/*   BANANANANANANNANANANANANANANANANANANANAN */}
      {/* </div> */}
    </div>
  );
}

export default ChatMain;
