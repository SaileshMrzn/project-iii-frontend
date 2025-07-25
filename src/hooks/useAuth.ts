import { signup } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { SignupRequestBody } from "@/services/auth";

export const useSignup = () => {
  return useMutation({
    mutationFn: (body: SignupRequestBody) => signup(body),
  });
};
