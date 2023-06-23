import api from "./api";

export const getChat = async (chatId: string) => {
  const response = await api.get(`/chats/chat/${chatId}`);
  return response.data;
};

export const getLatestMessages = async (userId: string) => {
  const response = await api.get(`/messages/message/history/${userId}`);
  return response.data;
};
