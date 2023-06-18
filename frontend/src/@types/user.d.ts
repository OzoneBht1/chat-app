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
