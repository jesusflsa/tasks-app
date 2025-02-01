import { cookies } from "next/headers";
import { apiFetch } from "../api";
import { ApiUserType, AuthType, UserType } from "../types";

export async function isAuthenticated() {
  const cookiesStore = await cookies();

  const token = cookiesStore.get("token");
  const refresh_token = cookiesStore.get("refresh_token");

  if (!token && !refresh_token) return false;

  return true;
}

export async function getAuth() {
  const cookiesStore = await cookies();

  const token = cookiesStore.get("token");
  const refresh_token = cookiesStore.get("refresh_token");

  if (!token && !refresh_token) return undefined;

  await updateTokens();

  return await getUser();
}

export async function getUser() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")!.value;

  const response = await apiFetch<ApiUserType>("/profile", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "force-cache"
  });

  if (response instanceof Array) return undefined;

  return { username: response.username } as UserType;
}

async function updateTokens() {
  const cookiesStore = await cookies();

  const token = cookiesStore.get("token");
  const refresh_token = cookiesStore.get("refresh_token");

  if (!token && !refresh_token) return;

  if (!!refresh_token && !token) {
    const response = await apiFetch<AuthType>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refresh_token.value }),
    });

    if (response instanceof Array) return;

    cookiesStore.set("token", response.token);
    cookiesStore.set("refresh_token", response.refresh_token);
  }
}

export async function setTokens(auth: AuthType) {
  const cookiesStore = await cookies();

  cookiesStore.set("token", auth.token, { maxAge: auth.expires });
  cookiesStore.set("refresh_token", auth.refresh_token, { maxAge: 60 * 60 * 24 * 30 });
}

export async function deleteTokens() {
  const cookiesStore = await cookies();

  cookiesStore.delete("token");
  cookiesStore.delete("refresh_token");
}