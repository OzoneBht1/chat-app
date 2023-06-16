export interface IUser {
  token: string;
  expiresIn: string;
}

export type UserContextType = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setUser: (user: IUser) => void;
};
