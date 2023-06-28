import { IMessage, LatestMessage } from "./message";

interface ITimestamps {
  createdAt: string;
  updatedAt: string;
}

export interface IChat extends ITimestamps {
  _id: string;
  user1: string;
  user2: string;
  messages: IMessage[];
}

export type ChatLatestMessage = Omit<IChat, "messages"> & {
  messages: LatestMessage;
};
