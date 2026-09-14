import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { useAuth } from '../context/AuthContext';
import {
  User,
  LogOut,
  Shield,
  Sun,
  Moon,
  ChevronDown,
  LayoutDashboard,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'profile';
  onNavigate: (view: 'home' | 'profile') => void;
  onOpenLoginModal: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenLoginModal,
  darkMode,
  onToggleDarkMode,
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white text-base tracking-tight">
                AuthPortal
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
                Google SSO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              ავტორიზაცია & პროფილის მართვა
            </p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/50">
          <button
            onClick={() => onNavigate('home')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'home'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            მთავარი გვერდი
          </button>

          <button
            onClick={() => {
              if (isAuthenticated) {
                onNavigate('profile');
              } else {
                onOpenLoginModal();
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentView === 'profile'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            პროფილის გვერდი
          </button>
        </nav>

        {/* Right Actions: Theme toggle + Auth State */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="თემის შეცვლა"
            title={darkMode ? 'ღია რეჟიმი' : 'მუქი რეჟიმი'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* User Logged in / Guest */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer shadow-xs"
              >
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-blue-500/30"
                />
                <div className="hidden sm:block text-left">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white block leading-tight">
                    {user.givenName || user.name}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight truncate max-w-[120px]">
                    {user.email}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* User Dropdown */}
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-40 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <GoogleIcon className="w-4 h-4 shrink-0" />
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Google ანგარიში
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="p-1 space-y-0.5">
                      <button
                        onClick={() => {
                          onNavigate('profile');
                          setDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4 text-blue-500" />
                        პროფილის ნახვა
                      </button>

                      <button
                        onClick={() => {
                          onNavigate('home');
                          setDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                        მთავარი გვერდი
                      </button>
                    </div>

                    <div className="p-1 border-t border-slate-100 dark:border-slate-800 mt-1">
                      <button
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                          onNavigate('home');
                        }}
                        className="w-full px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        სისტემიდან გასვლა
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer font-semibold text-xs sm:text-sm shadow-xs"
              id="google-signin-btn"
            >
              <GoogleIcon className="w-4 h-4" />
              <span>Google-ით შესვლა</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
