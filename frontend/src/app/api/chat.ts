import api from "./api";

export const getChat = async (chatId: string) => {
  const response = await api.get(`/chats/chat/${chatId}`);
  return response.data;
};
