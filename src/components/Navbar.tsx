import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChevronDown, LogOut, Moon, Sun, User } from 'lucide-react';

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
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button onClick={() => onNavigate('home')} className="group flex items-center gap-3 text-left">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-sm font-black text-white shadow-sm dark:bg-white dark:text-slate-950">მ</div>
          <div className="hidden sm:block">
            <div className="text-sm font-extrabold tracking-tight text-slate-950 dark:text-white">მთავარი პორტალი</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">პროფილი და პარამეტრები</div>
          </div>
        </button>

        <nav className="hidden items-center gap-1 rounded-xl border border-slate-200/80 bg-slate-100/70 p-1 md:flex dark:border-slate-800 dark:bg-slate-900/70">
          {([
            ['home', 'მთავარი'],
            ['profile', 'პროფილი'],
          ] as const).map(([view, label]) => (
            <button
              key={view}
              onClick={() => (view === 'profile' && !isAuthenticated ? onOpenLoginModal() : onNavigate(view))}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                currentView === view
                  ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white'
                  : 'text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDarkMode}
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="თემის შეცვლა"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setOpen((value) => !value)}
                className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <div className="grid h-6 w-6 place-items-center overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                  {user.picture ? <img src={user.picture} alt="" className="h-full w-full object-cover" /> : <User className="h-3.5 w-3.5" />}
                </div>
                <span className="hidden max-w-28 truncate sm:block">{user.givenName || user.name}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {open && (
                <>
                  <button className="fixed inset-0 z-30 cursor-default" onClick={() => setOpen(false)} aria-label="მენიუს დახურვა" />
                  <div className="absolute right-0 z-40 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900">
                    <div className="border-b border-slate-100 px-3 py-2.5 dark:border-slate-800">
                      <div className="truncate text-sm font-bold text-slate-950 dark:text-white">{user.name}</div>
                      <div className="truncate text-xs text-slate-500">{user.email}</div>
                    </div>
                    <button
                      onClick={() => {
                        onNavigate('profile');
                        setOpen(false);
                      }}
                      className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <User className="h-4 w-4" /> პროფილი
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        onNavigate('home');
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                    >
                      <LogOut className="h-4 w-4" /> გასვლა
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="h-9 rounded-xl bg-slate-950 px-4 text-xs font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              შესვლა
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
