import { LoginSchemaType } from "@/components/Chat/validations/loginValidation";
import api from "./api";

export const login = async (data: {
  username: string;
  password: string;
}): Promise<{ token: string }> => {
  const response = await api.post(`/users/login`, data);
  return response.data;
};
