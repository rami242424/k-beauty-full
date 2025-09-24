import { AUTH_API_BASE_URL } from "../api/config";

export type User = {
  id: string;
  email: string;
  name: string;
};

export type LoginResponse = {
  token: string | null;
  user: User | null;
};

/* 로그인 */
export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  console.log("👉 AUTH_API_BASE_URL from env:", AUTH_API_BASE_URL);

  const res = await fetch(`${AUTH_API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("INVALID_CREDENTIALS");
  }

  return res.json();
}

/* 회원가입 */
export async function signupApi(email: string, name: string, password: string): Promise<User> {
  const res = await fetch(`${AUTH_API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, password }),
  });

  if (!res.ok) {
    throw new Error("SIGNUP_FAILED");
  }

  return res.json();
}
