import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GoogleUserProfile, ActivityLog } from '../types/auth';
import { safeStorage } from '../utils/storage';

interface AuthContextType {
  user: GoogleUserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  activities: ActivityLog[];
  loginWithGoogle: (customData?: Partial<GoogleUserProfile>) => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<GoogleUserProfile>) => void;
  clearActivityLogs: () => void;
}

const STORAGE_KEY = 'mtavari_portali_user_v2';
const ACTIVITIES_KEY = 'mtavari_portali_activities_v2';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const nowLabel = () =>
  new Intl.DateTimeFormat('ka-GE', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<GoogleUserProfile | null>(null);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = safeStorage.getItem(STORAGE_KEY);
      const savedActivities = safeStorage.getItem(ACTIVITIES_KEY);
      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedActivities) setActivities(JSON.parse(savedActivities));
    } catch (error) {
      console.error('Failed to restore local session', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addActivity = (action: string, description: string, type: ActivityLog['type']) => {
    setActivities((previous) => {
      const next = [
        {
          id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
          action,
          description,
          timestamp: nowLabel(),
          type,
        },
        ...previous,
      ].slice(0, 20);
      safeStorage.setItem(ACTIVITIES_KEY, JSON.stringify(next));
      return next;
    });
  };

  const loginWithGoogle = (customData: Partial<GoogleUserProfile> = {}) => {
    const email = customData.email || '';
    const displayName = customData.name || email.split('@')[0] || 'მომხმარებელი';
    const nextUser: GoogleUserProfile = {
      id: customData.id || `user-${Date.now()}`,
      email,
      name: displayName,
      givenName: customData.givenName || displayName.split(' ')[0] || displayName,
      familyName: customData.familyName || displayName.split(' ').slice(1).join(' '),
      picture: customData.picture || '',
      locale: customData.locale,
      verifiedEmail: Boolean(customData.verifiedEmail),
      phone: customData.phone || '',
      bio: customData.bio || '',
      location: customData.location || '',
      language: customData.language || 'ქართული',
      timezone: customData.timezone || 'Asia/Tbilisi (UTC+4)',
      createdAt: customData.createdAt || new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    setUser(nextUser);
    safeStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    addActivity('ანგარიშში შესვლა', email ? `${email} — სესია დაიწყო` : 'სესია დაიწყო', 'login');
  };

  const logout = () => {
    if (user) addActivity('ანგარიშიდან გასვლა', 'სესია დასრულდა', 'security');
    setUser(null);
    safeStorage.removeItem(STORAGE_KEY);
  };

  const updateProfile = (updatedData: Partial<GoogleUserProfile>) => {
    if (!user) return;
    const next = { ...user, ...updatedData };
    setUser(next);
    safeStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    addActivity('პროფილის განახლება', 'შენახულია პროფილის ცვლილებები', 'profile');
  };

  const clearActivityLogs = () => {
    setActivities([]);
    safeStorage.removeItem(ACTIVITIES_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      activities,
      loginWithGoogle,
      logout,
      updateProfile,
      clearActivityLogs,
    }),
    [user, isLoading, activities],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
