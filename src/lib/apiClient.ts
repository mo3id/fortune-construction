const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export const API = `${BASE}/api`

export async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`)
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`)
  return res.json() as Promise<T>
}
