import { INewMessage } from "@/types/message";
import api from "./api";

export const getChat = async (chatId: string) => {
  const response = await api.get(`/chats/chat/${chatId}`);
  return response.data;
};

export const getLatestMessages = async (userId: string) => {
  const response = await api.get(`/messages/message/history/${userId}`);
  return response.data;
};

export const createMessage = async ({
  userId,
  msgType,
  data,
  receiverId,
}: INewMessage) => {
  const response = await api.post(`/messages/message/${userId}`, {
    msgType,
    data,
    receiverId,
  });
  return response.data;
};
