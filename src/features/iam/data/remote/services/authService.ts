import type { LoginDto, RegisterDto, AuthResponseDto } from '../models/authDto';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const SIGN_IN_PATH = import.meta.env.VITE_AUTH_SIGN_IN ?? '/api/v1/auth/sign-in';
const SIGN_UP_PATH = import.meta.env.VITE_AUTH_SIGN_UP ?? '/api/v1/auth/sign-up';

/** Error codes that map 1-to-1 with i18n keys under auth.errors.* */
export type AuthErrorCode =
  | 'invalidCredentials'
  | 'unauthorized'
  | 'forbidden'
  | 'notFound'
  | 'invalidData'
  | 'serverError'
  | 'unknownError';

export class AuthError extends Error {
  readonly code: AuthErrorCode;
  readonly serverMessage?: string;

  constructor(code: AuthErrorCode, serverMessage?: string) {
    super(code);
    this.name = 'AuthError';
    this.code = code;
    this.serverMessage = serverMessage;
  }
}

function statusToCode(status: number, isLogin: boolean): AuthErrorCode {
  switch (status) {
    case 401: return isLogin ? 'invalidCredentials' : 'unauthorized';
    case 403: return 'forbidden';
    case 404: return 'notFound';
    case 422: return 'invalidData';
    case 500:
    case 502:
    case 503: return 'serverError';
    default:  return 'unknownError';
  }
}

async function throwAuthError(response: Response, isLogin: boolean): Promise<never> {
  const code = statusToCode(response.status, isLogin);
  let serverMessage: string | undefined;
  try {
    const body = await response.json();
    const msg: string = body.error ?? body.message ?? body.detail ?? '';
    if (msg && !msg.match(/^HTTP\s+\d{3}/i)) {
      serverMessage = msg;
    }
  } catch {
    // noop – no parseable body
  }
  throw new AuthError(code, serverMessage);
}

export async function login(body: LoginDto): Promise<AuthResponseDto> {
  const response = await fetch(`${BASE_URL}${SIGN_IN_PATH}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) await throwAuthError(response, true);
  return response.json();
}

export async function register(body: RegisterDto): Promise<AuthResponseDto> {
  const response = await fetch(`${BASE_URL}${SIGN_UP_PATH}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) await throwAuthError(response, false);
  return response.json();
}
