import api from "./api";

export const getChat = async (chatId: string) => {
  console.log("Calling get chat");
  const response = await api.get(`/chats/chat/${chatId}`);
  return response.data;
};

// export const
