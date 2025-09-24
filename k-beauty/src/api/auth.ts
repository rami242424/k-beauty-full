export type User = {
  id: string;
  email: string;
  name: string;
};

export type LoginResponse = {
  token: string | null;
  user: User | null;
};

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:3001";
  console.log("👉 API_BASE from env:", import.meta.env.VITE_API_URL);


/* 로그인 */
export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/login`, {
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
  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, password }),
  });

  if (!res.ok) {
    throw new Error("SIGNUP_FAILED");
  }

  return res.json();
}
