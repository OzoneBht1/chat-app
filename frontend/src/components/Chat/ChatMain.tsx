import React, { FormEvent, useContext, useRef } from "react";
import { AuthContext, AuthProvider } from "@/store/use-user";
import { baseUrl } from "@/@variables/baseurl";
import { socket } from "@/app/socket/socket";

interface IChatMainProps {
  selectedChat: string | null;
}

export const getChat = async (chatId: string) => {
  try {
    const response = await fetch(`${baseUrl}/chats/chat/${chatId}`);
    if (!response.ok) {
      throw new Error("Fetching chat messages failed");
    }

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const ChatMain = async ({ selectedChat }: IChatMainProps) => {
  const { auth } = useContext(AuthContext);
  const inputRef = useRef<HTMLInputElement>(null);
  console.log(selectedChat);

  if (!selectedChat) {
    return <div className="text-white">Select a chat</div>;
  }
  const data = await getChat(selectedChat);
  console.log(data);

  if (!auth.user) {
    return <div className="text-white">loading</div>;
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = inputRef.current?.value;
    if (!message || message.trim().length < 1) {
      return;
    }

    socket.emit("message", "Hi");
    // socket.emit("send-message", message, selectedChat, auth.user.userId);
  };

  return (
    <div className="flex w-4/5 ">
      <div className="flex flex-1 text-white">
        <div className="flex flex-col w-full gap-5 justify-end">
          {data.chat.messages.map((message: any) => {
            if (message.sender._id === auth.user?.userId) {
              return (
                <div className="flex justify-end pr-2">{message.data}</div>
              );
            } else {
              return (
                <div className="flex justify-start pl-2">{message.data}</div>
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
};

export default ChatMain;
