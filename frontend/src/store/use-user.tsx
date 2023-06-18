"use client";
import { IToken, IUser, UserContextType } from "@/@types/user";
import {
  useContext,
  Dispatch,
  useState,
  createContext,
  SetStateAction,
} from "react";

type IAuth = {
  user: IUser | null;
  token: IToken | null;
};
export const AuthContext = createContext<UserContextType>({
  auth: { user: null, token: null },
  setAuth: (user: IUser, token: IToken) => {},
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
