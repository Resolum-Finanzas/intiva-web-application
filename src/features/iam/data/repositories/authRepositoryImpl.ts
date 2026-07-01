import type { AuthRepository } from '../../domain/repositories/authRepository';
import type { User } from '../../domain/models/user';
import { login, register } from '../remote/services/authService';
import { TokenStorage } from '../../../../core/storage/Token-storage';

const STORAGE_KEY_USER = 'current_user';

const tokenStorage = new TokenStorage();

function persistUser(user: User): void {
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
}

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export const authRepositoryImpl: AuthRepository = {
  async login(username: string, password: string): Promise<User> {
    const res = await login({ username, password });
    await tokenStorage.save(res.token);
    const user: User = {
      id: String(res.id),
      name: res.username,
      email: res.username,
      memberId: `INT-${String(res.id).slice(-5)}`,
    };
    persistUser(user);
    return user;
  },

  async register(fullName: string, email: string, password: string): Promise<User> {
    if (!password) {
      throw new Error('La contraseña es requerida');
    }
    const res = await register({ username: email, password });
    await tokenStorage.save(res.token);
    const user: User = {
      id: String(res.id),
      name: fullName,
      email: email,
      memberId: `INT-${String(res.id).slice(-5)}`,
    };
    persistUser(user);
    return user;
  },

  getCurrentUser(): User | null {
    return loadUser();
  },

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY_USER);
    await tokenStorage.delete();
  },
};
