"use client";

import { AuthContext, AuthProvider } from "@/store/use-user";
import jwtDecode from "jwt-decode";
import React, { useContext } from "react";
import Image from "next/image";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useContext(AuthContext);

  // User is {auth.user?.userId}

  console.log(auth.user, "In layout of chat");
  return (
    <>
      <div className="sticky flex items-center justify-end pr-10 top-0 left-0 h-16 bg-gray-200 text-red">
        <div className="flex items-start gap-2">
          <div className="relative">
            <Image
              className="w-11 h-11 rounded-full"
              src="/14.png"
              alt="user-image"
              height={60}
              width={60}
            />

            <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>

          <div className="flex-flex-col items-start">
            <h6>{auth.user?.userId}</h6>
            <p className="text-blue-500">Level 10 wizard</p>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default ChatLayout;
