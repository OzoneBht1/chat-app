"use client";

import ChatLeft from "@/components/Chat/ChatLeft";
import ChatMain from "@/components/Chat/ChatMain";
import jwtDecode from "jwt-decode";

export default function Chat() {
  return (
    <div className="flex h-[95vh] mt-3">
      <ChatLeft />
      <ChatMain />
    </div>
  );
}
