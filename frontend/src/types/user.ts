import { Dispatch, SetStateAction } from "react";

export interface IUser {
  userId: string;
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
  _id: string;
  username: string;
  name: string;
  image: File;
}

export interface IAuth {
  user: IUser | null;
  token: IToken | null;
}