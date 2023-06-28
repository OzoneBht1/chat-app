export enum MessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VOICE = "VOICE",
}

export interface INewMessage {
  userId: string;
  msgType: MessageType;
  data: string;
  receiverId: string;
}
//

export interface IUserInfo {
  _id: string;
  username: string;
}

export interface IMessage {
  data: string;
  msgType: MessageType;
  receiver: IUserInfo;
  sender: IUserInfo;
}

export type LatestMessage = Omit<IMessage, "receiver">;
