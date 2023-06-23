import api from "./api";
import { User } from "@/types/user";

export const login = async (data: {
  username: string;
  password: string;
}): Promise<{ token: string }> => {
  const response = await api.post(`/users/login`, data);
  return response.data;
};

export const getUser = async (userId: string): Promise<{ user: User }> => {
  const response = await api.get(`/users/user/${userId}`);
  return response.data;
};
