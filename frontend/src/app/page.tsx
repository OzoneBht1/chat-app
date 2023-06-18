"use client";

import { AuthProvider } from "@/store/use-user";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

let socketId: string;

socket.on("connect", () => {
  socketId = socket.id;
  console.log("Client connected with id ", socketId);
});

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const roomRef = useRef<HTMLInputElement>(null);
  const [roomId, setRoomId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  console.log(roomId);

  useEffect(() => {
    socket.on("receive-message", (data: string) => {
      console.log("Called");
      console.log(data);
      setMessages((prev) => [...prev, data]);
      console.log("New Message : " + data);
    });
  }, []);

  useEffect(() => {
    socket.on("notification", (data: string) => {
      alert(data);
    });
  }, []);
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(socketId);
    setMessages((prev) => [...prev, inputRef!.current!.value]);
    socket.emit("send-message", inputRef?.current?.value, roomId, userId);
  };

  const roomJoinHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("join-room", roomId);
  };

  const leaveRoomHandler = () => {
    socket.emit("leave-room", roomId);
    setRoomId("");
  };

  return (
    <AuthProvider>
      <form onSubmit={submitHandler}>
        <div className="h-[70vh] w-[100vh] border-2 border-gray-100">
          {messages.map((message) => (
            <p key={message} className="text-white">
              {message}
            </p>
          ))}
        </div>

        <input
          className="w-[85vh] h-[9vh] border-2 mt-2  bg-black text-white"
          ref={inputRef}
        />
        <button className="w-[15vh] h-[9vh] border-2 mt-2  bg-black text-white">
          Send
        </button>
      </form>
      <form onSubmit={roomJoinHandler}>
        <input
          className="w-[85vh] h-[9vh] border-2 mt-2  bg-black text-white"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button className="w-[15vh] h-[9vh] border-2 mt-2  bg-black text-white">
          Join Room
        </button>
      </form>

      <button
        onClick={leaveRoomHandler}
        className="w-[15vh] h-[9vh] border-2 mt-2  bg-black text-white"
      >
        Leave Room
      </button>
      <br />

      <input className="w-[85vh] h-[9vh] border-2 mt-2  bg-black text-white" />

      <button
        onClick={() => socket.emit("join-room", userId)}
        className="w-[15vh] h-[9vh] border-2 mt-2  bg-black text-white"
      >
        Leave Room
      </button>
    </AuthProvider>
  );
}
