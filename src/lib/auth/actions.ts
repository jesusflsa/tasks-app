"use server";

import { AuthType, ErrorType, UserType } from "../types";
import { deleteTokens, getUser, setTokens } from ".";
import { apiFetch } from "../api";
import { redirect, RedirectType } from "next/navigation";

export async function setAuth(
  prevState: unknown,
  action: UserType | undefined
) {
  if (!action) return prevState;

  const user = getUser();

  return user;
}

// Login action

type LoginType = {
  username: string;
  password: string;
};

export async function loginAction(prevState: unknown, action: LoginType): Promise<UserType | ErrorType | undefined> {
  const response = await apiFetch<AuthType>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(action),
  });
  
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (response instanceof Array) {
    return { errors: response.reduce((acc, error) => ({ ...acc, [error.field]: error.message }), {}) };
  };

  await setTokens(response);

  return await getUser();
}

// Register action

type RegisterType = {
  username: string;
  email: string;
  password: string;
}

export async function registerAction(prevState: unknown, action: RegisterType): Promise<UserType | ErrorType | undefined> {
  const response = await apiFetch<AuthType>("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(action)
  });
  
  if (response instanceof Array) {
    return { errors: response.reduce((acc, error) => ({ ...acc, [error.field]: error.message }), {}) };
  };

  await setTokens(response);

  return await getUser();
}

export async function logoutAction() {
  await deleteTokens();
  redirect("/", RedirectType.replace);
}