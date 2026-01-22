export type ApiError = { error: string; details?: any };

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export function resolveMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = String(url).trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  // Normalize to /path
  const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  // Uploads are served by the API under /uploads/*
  if (path.startsWith("/uploads/")) return `${API_URL}${path}`;
  // Some older records may store bare filenames
  if (!path.includes("/")) return `${API_URL}/uploads/${trimmed}`;
  return `${API_URL}${path}`;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    }
  });

  if (!res.ok) {
    let body: any = null;
    try {
      body = await res.json();
    } catch {
      body = { error: `HTTP_${res.status}` };
    }
    const msg = (body && (body.error || body.message)) || `HTTP_${res.status}`;
    const err: any = new Error(msg);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return (await res.json()) as T;
}
