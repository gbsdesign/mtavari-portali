import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleUserProfile, ActivityLog, ConnectedApp } from '../types/auth';
import { safeStorage } from '../utils/storage';

interface AuthContextType {
  user: GoogleUserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  activities: ActivityLog[];
  connectedApps: ConnectedApp[];
  loginWithGoogle: (customData?: Partial<GoogleUserProfile>) => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<GoogleUserProfile>) => void;
  toggleTwoFactor: () => void;
  disconnectApp: (appId: string) => void;
  connectApp: (appId: string) => void;
  clearActivityLogs: () => void;
}

const STORAGE_KEY = 'google_auth_user_session';
const ACTIVITIES_KEY = 'google_auth_activities';

export const DEFAULT_USER: GoogleUserProfile = {
  id: 'g-user-7492148',
  email: 'mr.gabunia@gmail.com',
  name: 'გიორგი გაბუნია',
  givenName: 'გიორგი',
  familyName: 'გაბუნია',
  picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&h=240&fit=crop&crop=faces&q=80',
  verifiedEmail: true,
  phone: '+995 599 12 34 56',
  bio: 'პროდუქტის დიზაინერი და დეველოპერი. ტექნოლოგიური ენთუზიასტი.',
  location: 'თბილისი, საქართველო',
  timezone: 'Asia/Tbilisi (UTC+4)',
  language: 'ქართული',
  createdAt: '2024-03-15',
  lastLoginAt: new Date().toISOString(),
  twoFactorEnabled: true,
  role: 'ადმინისტრატორი',
};

const DEFAULT_CONNECTED_APPS: ConnectedApp[] = [
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    icon: 'workspace',
    connectedAt: '2026-09-10',
    scope: 'profile, email, drive.file',
    status: 'active',
  },
  {
    id: 'google-drive',
    name: 'Google Drive Sync',
    icon: 'drive',
    connectedAt: '2026-09-12',
    scope: 'drive.readonly',
    status: 'active',
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    icon: 'calendar',
    connectedAt: '2026-09-14',
    scope: 'calendar.events',
    status: 'active',
  },
];

const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act-1',
    action: 'წარმატებული შესვლა Google ანგარიშით',
    description: 'OAuth 2.0 Token დამოწმდა Google Identity Services-ის მეშვეობით',
    timestamp: 'დღეს, 16:15',
    device: 'Chrome 128 / macOS Sonoma',
    location: 'თბილისი, საქართველო',
    ip: '178.134.42.19',
    type: 'login',
  },
  {
    id: 'act-2',
    action: 'ორფაქტორიანი უსაფრთხოების შემოწმება',
    description: 'Google Authenticator / Security Key აქტიურია',
    timestamp: 'დღეს, 14:02',
    device: 'Chrome 128 / macOS Sonoma',
    location: 'თბილისი, საქართველო',
    ip: '178.134.42.19',
    type: 'security',
  },
  {
    id: 'act-3',
    action: 'პროფილის სინქრონიზაცია',
    description: 'მონაცემები სინქრონიზებულია Google Profile API-დან',
    timestamp: 'გუშინ, 19:30',
    device: 'Mobile Safari / iOS 18',
    location: 'ბათუმი, საქართველო',
    ip: '188.129.80.12',
    type: 'profile',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<GoogleUserProfile | null>(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activities, setActivities] = useState<ActivityLog[]>(INITIAL_ACTIVITIES);
  const [connectedApps, setConnectedApps] = useState<ConnectedApp[]>(DEFAULT_CONNECTED_APPS);

  // Load user from safe storage on mount
  useEffect(() => {
    try {
      const savedUser = safeStorage.getItem(STORAGE_KEY);
      const savedActivities = safeStorage.getItem(ACTIVITIES_KEY);

      if (savedUser === 'null') {
        setUser(null);
      } else if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // First run: provide active Google account so user immediately sees profile & features
        setUser(DEFAULT_USER);
      }

      if (savedActivities) {
        setActivities(JSON.parse(savedActivities));
      }
    } catch (e) {
      console.error('Failed to parse saved user', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addActivity = (action: string, description: string, type: ActivityLog['type']) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      action,
      description,
      timestamp: 'ახლახანს',
      device: typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.includes('Mac')
        ? 'Chrome / macOS'
        : 'Browser / Desktop',
      location: 'თბილისი, საქართველო',
      ip: '178.134.42.19',
      type,
    };
    const updated = [newLog, ...activities.slice(0, 19)];
    setActivities(updated);
    safeStorage.setItem(ACTIVITIES_KEY, JSON.stringify(updated));
  };

  const loginWithGoogle = (customData?: Partial<GoogleUserProfile>) => {
    const newUser: GoogleUserProfile = {
      id: 'g-user-7492148',
      email: customData?.email || 'mr.gabunia@gmail.com',
      name: customData?.name || 'გიორგი გაბუნია',
      givenName: customData?.givenName || 'გიორგი',
      familyName: customData?.familyName || 'გაბუნია',
      picture: customData?.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&h=240&fit=crop&crop=faces&q=80',
      verifiedEmail: true,
      phone: '+995 599 12 34 56',
      bio: 'პროდუქტის დიზაინერი და დეველოპერი. ტექნოლოგიური ენთუზიასტი.',
      location: 'თბილისი, საქართველო',
      timezone: 'Asia/Tbilisi (UTC+4)',
      language: 'ქართული',
      createdAt: '2024-03-15',
      lastLoginAt: new Date().toISOString(),
      twoFactorEnabled: true,
      role: 'ადმინისტრატორი',
      ...customData,
    };

    setUser(newUser);
    safeStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    addActivity('შესვლა Google ანგარიშით', `${newUser.email} წარმატებით შემოვიდა სისტემაში`, 'login');
  };

  const logout = () => {
    if (user) {
      addActivity('გამოსვლა ანგარიშიდან', `${user.email} გავიდა სისტემიდან`, 'security');
    }
    setUser(null);
    safeStorage.setItem(STORAGE_KEY, 'null');
  };

  const updateProfile = (updatedData: Partial<GoogleUserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    setUser(updated);
    safeStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    addActivity('პროფილის განახლება', 'პირადი მონაცემები წარმატებით შეინახა', 'profile');
  };

  const toggleTwoFactor = () => {
    if (!user) return;
    const nextState = !user.twoFactorEnabled;
    const updated = { ...user, twoFactorEnabled: nextState };
    setUser(updated);
    safeStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    addActivity(
      nextState ? '2FA გააქტიურდა' : '2FA გაითიშა',
      nextState ? 'ორფაქტორიანი დაცვა ჩაირთო' : 'ორფაქტორიანი დაცვა დროებით გაითიშა',
      'security'
    );
  };

  const disconnectApp = (appId: string) => {
    setConnectedApps((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: 'revoked' as const } : app))
    );
    addActivity('სერვისის გათიშვა', `სერვისის წვდომა გაუქმდა (${appId})`, 'connected_app');
  };

  const connectApp = (appId: string) => {
    setConnectedApps((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: 'active' as const } : app))
    );
    addActivity('სერვისის დაკავშირება', `Google სერვისის ნებართვა განახლდა (${appId})`, 'connected_app');
  };

  const clearActivityLogs = () => {
    setActivities([]);
    safeStorage.removeItem(ACTIVITIES_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        activities,
        connectedApps,
        loginWithGoogle,
        logout,
        updateProfile,
        toggleTwoFactor,
        disconnectApp,
        connectApp,
        clearActivityLogs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
