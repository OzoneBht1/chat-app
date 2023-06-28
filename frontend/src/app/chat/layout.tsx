"use client";

import { AuthContext } from "@/store/use-user";
import React, { useContext } from "react";
import Image from "next/image";
import { useQuery } from "react-query";
import { getUser } from "../api/user";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useContext(AuthContext);

  const { data, isLoading, isError } = useQuery(
    ["getUser"],
    async () => await getUser(auth.user?.userId as string),
    {
      enabled: !!auth.user?.userId,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <div className="">loading</div>;
  }
  if (isError) {
    return <div className="">error</div>;
  }

  console.log(data?.user.image.toString());

  return (
    <>
      <div className="sticky flex items-center justify-end pr-10 top-0 left-0 h-16 shadow-lg">
        <div className="flex items-start gap-2">
          <div className="relative">
            <Image
              className="w-11 h-11 rounded-full"
              src={"/14.png"}
              alt="user-image"
              height={60}
              width={60}
            />

            <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>

          <div className="flex-flex-col items-start">
            <h6>{data?.user?.username}</h6>
            <p className="text-blue-500">Level 10 wizard</p>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default ChatLayout;
