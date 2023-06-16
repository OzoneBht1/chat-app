"use client";

import jwtDecode from "jwt-decode";
import React from "react";

let userId;
const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("access");
  if (token) {
    console.log(jwtDecode(token));
  }
  return (
    <div className="sticky top-0 left-0 h-10 bg-white text-black">
      User is USER1
      {children}
    </div>
  );
};

export default ChatLayout;
