import type { LoginDto, RegisterDto, AuthResponseDto } from '../models/authDto';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const mockResponse: AuthResponseDto = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock',
  user: {
    id: 'usr_001',
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
  },
};

const HARDCODED_EMAIL = 'admin@intiva.com';
const HARDCODED_PASSWORD = 'admin123';

export async function login(body: LoginDto): Promise<AuthResponseDto> {
  await delay(800);
  if (body.username !== HARDCODED_EMAIL || body.password !== HARDCODED_PASSWORD) {
    throw new Error('Credenciales inválidas');
  }
  return mockResponse;
}

export async function register(_body: RegisterDto): Promise<AuthResponseDto> {
  await delay(800);
  return mockResponse;
}
