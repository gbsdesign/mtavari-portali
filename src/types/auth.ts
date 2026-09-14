export interface GoogleUserProfile {
  id: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
  picture: string;
  locale?: string;
  verifiedEmail: boolean;
  phone?: string;
  bio?: string;
  location?: string;
  language: string;
  timezone: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  type: 'login' | 'security' | 'profile';
}
