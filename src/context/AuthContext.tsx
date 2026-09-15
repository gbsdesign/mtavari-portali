import { createContext, useContext, useState, type ReactNode } from 'react';
import { type GoogleUserProfile } from '../types/auth';
import { safeStorage } from '../utils/storage';
const KEY = 'mtavari_demo_profile_v3';
export type ProfileUpdate = Pick<GoogleUserProfile, 'name' | 'bio' | 'location' | 'phone'>;
function loadUser(): GoogleUserProfile | null {
  try {
    const value = JSON.parse(safeStorage.getItem(KEY) || 'null');
    return value?.id === 'demo-user' && typeof value.name === 'string' ? value : null;
  } catch {
    return null;
  }
}
function demoUser(): GoogleUserProfile {
  return {
    id: 'demo-user',
    name: 'გიორგი',
    email: 'giorgi@example.com',
    givenName: 'გიორგი',
    familyName: '',
    picture: '',
    verifiedEmail: false,
    bio: '',
    location: '',
    phone: '',
    language: 'ქართული',
    timezone: 'Asia/Tbilisi',
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  };
}
interface AuthState {
  user: GoogleUserProfile | null;
  isLoading: boolean;
  error: string;
  refresh: () => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => void;
  updateProfile: (value: ProfileUpdate) => void;
}
const AuthContext = createContext<AuthState | null>(null);
export function AuthProvider({
  children
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<GoogleUserProfile | null>(loadUser);
  const save = (value: GoogleUserProfile) => {
    setUser(value);
    safeStorage.setItem(KEY, JSON.stringify(value));
  };
  return <AuthContext.Provider value={{
    user,
    isLoading: false,
    error: '',
    refresh: async () => {},
    loginWithGoogle: () => {
      const previous = loadUser();
      save({
        ...(previous || demoUser()),
        lastLoginAt: new Date().toISOString()
      });
    },
    logout: () => {
      setUser(null);
      safeStorage.removeItem(KEY);
    },
    updateProfile: value => {
      if (user) save({
        ...user,
        ...value
      });
    }
  }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthProvider is required');
  return context;
}
