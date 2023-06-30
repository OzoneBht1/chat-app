import { IMessage } from "./message";
import { User } from "./user";

interface ITimestamps {
  createdAt: string;
  updatedAt: string;
}

export interface IChat extends ITimestamps {
  id: number;
  users: User[];
  messages: IMessage[];
}

export interface IChatLatestMessage extends ITimestamps {
  id: number;
  messages: IMessage[];
}
