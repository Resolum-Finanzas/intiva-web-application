import { TokenStorage } from '../../storage/Token-storage';

const tokenStorage = new TokenStorage();

export async function fetchWithAuth(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  const token = await tokenStorage.read();
  const headers = new Headers(init?.headers);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  headers.set('Content-Type', 'application/json');

  const response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    await tokenStorage.deleteAll();
  }

  return response;
}