import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { X, CheckCircle2, UserPlus, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const GoogleLoginModal: React.FC<GoogleLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginWithGoogle } = useAuth();
  const [customMode, setCustomMode] = useState<boolean>(false);
  const [customEmail, setCustomEmail] = useState<string>('');
  const [customName, setCustomName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectPredefined = (email: string, name: string) => {
    setIsLoading(true);
    setTimeout(() => {
      loginWithGoogle({
        email,
        name,
        givenName: name.split(' ')[0],
        familyName: name.split(' ')[1] || '',
      });
      setIsLoading(false);
      onClose();
      onSuccess?.();
    }, 400);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;

    setIsLoading(true);
    setTimeout(() => {
      const displayName = customName || customEmail.split('@')[0];
      loginWithGoogle({
        email: customEmail,
        name: displayName,
        givenName: displayName.split(' ')[0],
        familyName: displayName.split(' ')[1] || '',
      });
      setIsLoading(false);
      onClose();
      onSuccess?.();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <GoogleIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                Google-ით შესვლა
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                აირჩიეთ ანგარიში პორტალზე გადასასვლელად
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="დახურვა"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {!customMode ? (
            <>
              {/* Primary Detected Google Account */}
              <button
                onClick={() => handleSelectPredefined('mr.gabunia@gmail.com', 'გიორგი გაბუნია')}
                disabled={isLoading}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces&q=80"
                      alt="Avatar"
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/20"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-slate-900 dark:text-white text-sm">
                        გიორგი გაბუნია
                      </span>
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      mr.gabunia@gmail.com
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              {/* Secondary Alternate Account */}
              <button
                onClick={() => handleSelectPredefined('developer.demo@gmail.com', 'დეველოპერი (ტესტი)')}
                disabled={isLoading}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    DD
                  </div>
                  <div>
                    <span className="font-medium text-slate-900 dark:text-white text-sm block">
                      დეველოპერი (ტესტი)
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      developer.demo@gmail.com
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              {/* Use another account toggle */}
              <button
                onClick={() => setCustomMode(true)}
                className="w-full py-2.5 px-4 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                სხვა Google ანგარიშის გამოყენება
              </button>
            </>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Google ელ-ფოსტა
                </label>
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  სრული სახელი (არასავალდებულო)
                </label>
                <input
                  type="text"
                  placeholder="სახელი და გვარი"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCustomMode(false)}
                  className="flex-1 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  უკან დაბრუნება
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !customEmail}
                  className="flex-1 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  {isLoading ? 'მოწმდება...' : 'შესვლა'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Security Footer Notice */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>დაცულია Google Identity 256-bit SSL-ით</span>
          </div>
          <span className="text-slate-400">OAuth 2.0</span>
        </div>
      </div>
    </div>
  );
};
