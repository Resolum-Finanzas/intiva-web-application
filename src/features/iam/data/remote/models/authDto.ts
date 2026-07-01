export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
}

export interface AuthResponseDto {
  id: number;
  username: string;
  roles: string[];
  token: string;
}
