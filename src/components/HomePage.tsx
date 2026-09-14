import React from 'react';
import { GoogleIcon } from './GoogleIcon';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  User,
  KeyRound,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Smartphone,
  Globe,
  BellRing,
  ExternalLink,
} from 'lucide-react';

interface HomePageProps {
  onNavigateToProfile: () => void;
  onOpenLoginModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToProfile, onOpenLoginModal }) => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="space-y-10 sm:space-y-14 py-4 sm:py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-50/60 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-12 shadow-sm">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>ოფიციალური Google Identity & SSO პლატფორმა</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-snug">
            სწრაფი და უსაფრთხო შესვლა{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Google ანგარიშით
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            შედით სისტემაში ერთი დაკლიკებით თქვენი Google პროფილით, მართეთ პირადი მონაცემები,
            ორფაქტორიანი უსაფრთხოება და დაკავშირებული სერვისები ერთიან სივრცეში.
          </p>

          {/* Dynamic Actions based on Auth status */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            {isAuthenticated && user ? (
              <>
                <button
                  onClick={onNavigateToProfile}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <User className="w-4 h-4" />
                  <span>პროფილის გვერდზე გადასვლა</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ავტორიზებულია: {user.email}</span>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={onOpenLoginModal}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.02]"
                  id="hero-google-signin"
                >
                  <GoogleIcon className="w-5 h-5" />
                  <span>Google-ით ავტორიზაცია</span>
                </button>

                <button
                  onClick={onOpenLoginModal}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>დაიწყე ახლავე</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* User preview status banner if logged in */}
        {isAuthenticated && user && (
          <div className="mt-10 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 max-w-2xl mx-auto">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-2xs">
              <div className="flex items-center gap-3.5">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/40"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {user.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      აქტიური სესია
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {user.email} • {user.role}
                  </span>
                </div>
              </div>
              <button
                onClick={onNavigateToProfile}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                მართვა
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Core Features Grid */}
      <section className="space-y-6" aria-label="პლატფორმის შესაძლებლობები">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            პლატფორმის ძირითადი ფუნქციები
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            ყველაფერი რაც გჭირდებათ Google SSO ავტორიზაციისა და პროფილის სრულფასოვანი მართვისთვის
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-blue-400 dark:hover:border-blue-500 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <GoogleIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
              Google Single Sign-On (SSO)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              მყისიერი შესვლა პაროლების დამახსოვრების გარეშე. Google Identity Services-ის ოფიციალური OAuth 2.0 პროტოკოლი.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-blue-400 dark:hover:border-blue-500 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <User className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
              მომხმარებლის პროფილი
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              პირადი მონაცემების რედაქტირება, ავატარის მართვა, საკონტაქტო ინფორმაცია და ლოკალიზაციის პარამეტრები.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-blue-400 dark:hover:border-blue-500 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/80 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
              ორფაქტორიანი დაცვა (2FA)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              ანგარიშის გაძლიერებული უსაფრთხოება, ბოლო აქტივობების ჟურნალი, მოწყობილობების მონიტორინგი და სესიების კონტროლი.
            </p>
          </div>
        </div>
      </section>

      {/* Security & Reliability Section */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              უსაფრთხოების სტანდარტები
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              თქვენი Google მონაცემები სრულად დაცულია
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              აპლიკაცია არ ინახავს თქვენს პაროლებს. ავტორიზაცია ხორციელდება პირდაპირ Google-ის დაშიფრული ტოკენებით.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>OAuth 2.0 Ready</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>GDPR / Privacy Compliant</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
