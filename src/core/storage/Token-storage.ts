import { StorageKeys } from './Storage-key';

export class TokenStorage {
  async save(token: string): Promise<void> {
    localStorage.setItem(StorageKeys.accessToken, token);
  }

  async read(): Promise<string | null> {
    return localStorage.getItem(StorageKeys.accessToken);
  }

  async delete(): Promise<void> {
    localStorage.removeItem(StorageKeys.accessToken);
  }

  async deleteAll(): Promise<void> {
    localStorage.clear();
  }
}