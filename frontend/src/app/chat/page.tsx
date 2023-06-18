"use client";

import ChatLeft from "@/components/Chat/ChatLeft";
import ChatMain from "@/components/Chat/ChatMain";

import { AuthContext, AuthProvider } from "@/store/use-user";
import { useContext } from "react";

export default function Chat() {
  const { auth } = useContext(AuthContext);
  console.log(auth, "in chat page");
  return (
    <div className="flex h-[95vh] mt-3">
      <ChatLeft />
      <ChatMain />
    </div>
  );
}
