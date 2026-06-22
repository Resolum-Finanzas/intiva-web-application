import type { AuthRepository } from '../../domain/repositories/authRepository';
import type { User } from '../../domain/models/user';
import { login, register } from '../remote/services/authService';
import { TokenStorage } from '../../../../core/storage/Token-storage';

let currentUser: User | null = null;
const tokenStorage = new TokenStorage();

export const authRepositoryImpl: AuthRepository = {
  async login(username: string, password: string): Promise<User> {
    const res = await login({ username, password });
    currentUser = {
      id: res.user.id,
      name: res.user.name,
      email: res.user.email,
      memberId: `INT-${res.user.id.slice(-5)}`,
    };
    return currentUser;
  },

  async register(fullName: string, email: string, password: string): Promise<User> {
    const res = await register({ fullName, email, password });
    currentUser = {
      id: res.user.id,
      name: res.user.name,
      email: res.user.email,
      memberId: `INT-${res.user.id.slice(-5)}`,
    };
    return currentUser;
  },

  async logout(): Promise<void> {
    currentUser = null;
    await tokenStorage.delete();
  },
};
