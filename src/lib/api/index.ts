import { ApiErrorType } from "../types";

const { API_URL } = process.env;

export async function apiFetch<T>(path: string, request?: RequestInit): Promise<T | ApiErrorType[]> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
        ...request,
        mode: "cors",
      });

    if (!response.ok) {
        return await response.json() as ApiErrorType[];
    }

    return await response.json() as T;
  } catch (error) {
    if (error instanceof Error) {
      return [{ field: "unknown", message: error.message }];
    } else {
      return [{ field: "unknown", message: "An unknown error occurred" }];
    }
  }

}

