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
