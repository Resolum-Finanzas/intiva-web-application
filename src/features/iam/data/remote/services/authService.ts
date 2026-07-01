import type { LoginDto, RegisterDto, AuthResponseDto } from '../models/authDto';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const SIGN_IN_PATH = import.meta.env.VITE_AUTH_SIGN_IN ?? '/api/v1/auth/sign-in';
const SIGN_UP_PATH = import.meta.env.VITE_AUTH_SIGN_UP ?? '/api/v1/auth/sign-up';

export async function login(body: LoginDto): Promise<AuthResponseDto> {
  const response = await fetch(`${BASE_URL}${SIGN_IN_PATH}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Invalid credentials' }));
    throw new Error(error.error ?? `HTTP ${response.status}`);
  }

  return response.json();
}

export async function register(body: RegisterDto): Promise<AuthResponseDto> {
  const response = await fetch(`${BASE_URL}${SIGN_UP_PATH}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Registration failed' }));
    throw new Error(error.error ?? `HTTP ${response.status}`);
  }

  return response.json();
}
