export enum MessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VOICE = "VOICE",
}

export interface INewMessage {
  userId: number;
  msgType: MessageType;
  data: string;
  receiverId: number;
}
//

export interface IUserInfo {
  id: number;
  username: string;
}

export interface IMessage {
  id: number;
  data: string;
  msgType: MessageType;
  receiver: IUserInfo;
  sender: IUserInfo;
  chatId: string;
  senderId: string;
  receiverId: string;
}
