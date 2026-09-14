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
  timezone?: string;
  language: string;
  createdAt: string;
  lastLoginAt: string;
  twoFactorEnabled: boolean;
  role: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  device: string;
  location: string;
  ip: string;
  type: 'login' | 'security' | 'profile' | 'connected_app';
}

export interface ConnectedApp {
  id: string;
  name: string;
  icon: string;
  connectedAt: string;
  scope: string;
  status: 'active' | 'revoked';
}
