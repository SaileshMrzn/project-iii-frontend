"use server";

import { signIn, signOut } from "@/auth";

export const login = async (
  type: string,
  bod?: { email: string; password: string }
) => {
  await signIn(type, bod);
};

export const logout = async () => {
  await signOut();
};
