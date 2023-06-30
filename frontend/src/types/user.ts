import { Dispatch, SetStateAction } from "react";

export interface IUser {
  userId: number;
}

export interface IToken {
  access: string;
  expiresIn: string;
}

export type UserContextType = {
  auth: {
    user: IUser | null;
    token: IToken | null;
  };
  setAuth: Dispatch<SetStateAction<IAuth>>;
};
export interface User {
  id: number;
  username: string;
  name: string;
  image: string;
}

export interface IAuth {
  user: IUser | null;
  token: IToken | null;
}
