"use client";
import { IAuth, UserContextType } from "@/types/user";
import { useState, createContext } from "react";

export const AuthContext = createContext<UserContextType>({
  auth: { user: null, token: null },
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<IAuth>({ user: null, token: null });

  // let contextData = { auth, setAuth };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
