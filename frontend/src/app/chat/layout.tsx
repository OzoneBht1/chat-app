"use client";

import { AuthContext, AuthProvider } from "@/store/use-user";
import jwtDecode from "jwt-decode";
import React, { useContext } from "react";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useContext(AuthContext);

  console.log(auth.user, "In layout of chat");
  return (
    <div className="sticky top-0 left-0 h-10 bg-white text-black">
      User is {auth.user?.userId}
      {children}
    </div>
  );
};

export default ChatLayout;
