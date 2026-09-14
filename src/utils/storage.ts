// Safe wrapper around localStorage that gracefully falls back to in-memory storage
// if running inside a sandboxed iframe or if third-party storage is restricted.

class SafeStorage {
  private memStorage: Record<string, string> = {};

  getItem(key: string): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Storage access blocked by iframe sandbox or privacy settings
    }
    return this.memStorage[key] ?? null;
  }

  setItem(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch {
      // Storage access blocked by iframe sandbox or privacy settings
    }
    this.memStorage[key] = value;
  }

  removeItem(key: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch {
      // Storage access blocked by iframe sandbox or privacy settings
    }
    delete this.memStorage[key];
  }
}

export const safeStorage = new SafeStorage();
