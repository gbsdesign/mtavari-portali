import React, { Component, ErrorInfo, ReactNode, useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ProfilePage } from './components/ProfilePage';
import { GoogleLoginModal } from './components/GoogleLoginModal';
import { safeStorage } from './utils/storage';
import { RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-items-center bg-slate-50 p-6 dark:bg-slate-950">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <h1 className="text-xl font-black text-slate-950 dark:text-white">გვერდი ვერ ჩაიტვირთა</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">სცადე აპლიკაციის ხელახლა ჩატვირთვა.</p>
            <button onClick={() => window.location.reload()} className="mx-auto mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white dark:bg-white dark:text-slate-950">
              <RefreshCw className="h-4 w-4" /> ხელახლა ჩატვირთვა
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  const [currentView, setCurrentView] = useState<'home' | 'profile'>('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => safeStorage.getItem('app_theme_mode') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    safeStorage.setItem('app_theme_mode', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="min-h-screen text-slate-900 transition-colors dark:text-slate-100">
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((value) => !value)}
      />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
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

      <footer className="mx-auto mt-6 max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 border-t border-slate-200/70 pt-5 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <span>მთავარი პორტალი</span>
          <span>სუფთა ინტერფეისი • რეალური მონაცემების პრინციპი</span>
        </div>
      </footer>

      <GoogleLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => setCurrentView('profile')}
      />
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
