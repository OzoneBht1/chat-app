import React, { useContext } from "react";
import { AuthContext, AuthProvider } from "@/store/use-user";

const ChatMain = () => {
  const { auth } = useContext(AuthContext);
  console.log(auth.user);
  if (!auth.user) {
    return <div className="text-white">loading</div>;
  }
  return (
    <AuthProvider>
      <div className="pt-10 text-white">
        <div></div>
      </div>
    </AuthProvider>
  );
};

export default ChatMain;
