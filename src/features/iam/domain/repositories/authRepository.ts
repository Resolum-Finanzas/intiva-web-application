import type { User } from '../models/user';

export interface AuthRepository {
  login(username: string, password: string): Promise<User>;
  register(fullName: string, email: string, password: string): Promise<User>;
  getCurrentUser(): User | null;
  logout(): Promise<void>;
}
