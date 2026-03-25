export type ResponseMode = "citizen" | "official";

export interface ChatResponse {
  answer: string;
  law: string;
  article: string;
}

const DEFAULT_API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:8787/api"
    : "https://law-back1.vercel.app/api";

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE).replace(/\/+$/, "");
const DEFAULT_LANG = import.meta.env.VITE_DEFAULT_LANG ?? "ru";
const TOKEN_KEY = "law-back-token";
const MODE_KEY = "law-back-mode";

interface LoginResponse {
  token: string;
}

interface BackendChatResponse {
  answer: string;
  law: string;
  article: string;
}

function getCredentials(mode: ResponseMode): { username: string; password: string } {
  if (mode === "official") {
    return { username: "official", password: "official123" };
  }
  return { username: "citizen", password: "citizen123" };
}

async function ensureToken(mode: ResponseMode): Promise<string> {
  const savedToken = localStorage.getItem(TOKEN_KEY);
  const savedMode = localStorage.getItem(MODE_KEY);
  if (savedToken && savedMode === mode) {
    return savedToken;
  }

  const creds = getCredentials(mode);
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
  });

  if (!res.ok) {
    throw new Error("Не удалось выполнить авторизацию в backend");
  }

  const data = (await res.json()) as LoginResponse;
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(MODE_KEY, mode);
  return data.token;
}

function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(MODE_KEY);
}

async function sendChatRequest(message: string, mode: ResponseMode, token: string): Promise<Response> {
  return fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message,
      mode,
      lang: DEFAULT_LANG,
    }),
  });
}

export async function sendMessage(message: string, mode: ResponseMode = "citizen"): Promise<ChatResponse> {
  let token = await ensureToken(mode);
  let res = await sendChatRequest(message, mode, token);

  // If token is stale/invalid (server restart, old storage), re-login and retry once.
  if (res.status === 401) {
    clearToken();
    token = await ensureToken(mode);
    res = await sendChatRequest(message, mode, token);
  }

  if (!res.ok) {
    if (res.status === 401) clearToken();
    const err = await res.json().catch(() => ({ error: "Ошибка сервера" }));
    throw new Error(err.error ?? "Ошибка запроса");
  }

  const data = (await res.json()) as BackendChatResponse;
  return {
    answer: data.answer,
    law: data.law,
    article: data.article,
  };
}
