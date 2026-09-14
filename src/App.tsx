import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ProfilePage } from './components/ProfilePage';
import { GoogleLoginModal } from './components/GoogleLoginModal';
import { GoogleIcon } from './components/GoogleIcon';
import { safeStorage } from './utils/storage';
import { Shield, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xl space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">ინტერფეისის განახლება</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              დაფიქსირდა დროებითი შეცდომა ჩატვირთვისას. გთხოვთ დააჭიროთ ღილაკს აპლიკაციის თავიდან ჩასატვირთად.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>ხელახლა ჩატვირთვა</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [currentView, setCurrentView] = useState<'home' | 'profile'>('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Theme state using safe storage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return safeStorage.getItem('app_theme_mode') === 'dark';
  });

  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        safeStorage.setItem('app_theme_mode', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        safeStorage.setItem('app_theme_mode', 'light');
      }
    } catch {
      // safe fallback
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentView === 'home' ? (
          <HomePage
            onNavigateToProfile={() => setCurrentView('profile')}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
          />
        ) : (
          <ProfilePage
            onBackToHome={() => setCurrentView('home')}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
          />
        )}
      </main>

      {/* Google Login Account Chooser Modal */}
      <GoogleLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => {
          // Switch to profile on successful login
          setCurrentView('profile');
        }}
      />

      {/* Global Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 py-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <GoogleIcon className="w-4 h-4" />
            <span className="font-semibold text-slate-900 dark:text-white">
              Google Auth & Profile Portal
            </span>
            <span>—</span>
            <span>Google Identity Services SSO</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-blue-600 transition-colors">კონფიდენციალურობა</span>
            <span>•</span>
            <span className="hover:text-blue-600 transition-colors">მომსახურების პირობები</span>
            <span>•</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">OAuth 2.0 Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}
