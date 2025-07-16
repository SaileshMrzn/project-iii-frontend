import api from "./api";
import { AxiosError } from "axios";

export type SignupRequestBody = {
  username?: string;
  email: string;
  password: string;
};

export const signup = async (body: SignupRequestBody) => {
  try {
    const response = await api.post("/auth/register", body);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "An unknown API error occurred"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};
