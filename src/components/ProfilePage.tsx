import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GoogleIcon } from './GoogleIcon';
import {
  User,
  Shield,
  KeyRound,
  History,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Edit3,
  Save,
  X,
  Smartphone,
  Laptop,
  Globe,
  Clock,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  Trash2,
  Upload,
} from 'lucide-react';

interface ProfilePageProps {
  onBackToHome: () => void;
  onOpenLoginModal: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBackToHome, onOpenLoginModal }) => {
  const {
    user,
    isAuthenticated,
    updateProfile,
    logout,
    toggleTwoFactor,
    activities,
    connectedApps,
    disconnectApp,
    connectApp,
    clearActivityLogs,
  } = useAuth();

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'info' | 'security' | 'apps' | 'history'>('info');

  // Edit Mode state for Personal Info
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    givenName: user?.givenName || '',
    familyName: user?.familyName || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || '',
    language: user?.language || 'ქართული',
    timezone: user?.timezone || 'Asia/Tbilisi (UTC+4)',
    picture: user?.picture || '',
  });

  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            პროფილზე წვდომა შეზღუდულია
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            პროფილის სანახავად და მონაცემების სამართავად გთხოვთ გაიაროთ ავტორიზაცია Google ანგარიშით.
          </p>
        </div>
        <button
          onClick={onOpenLoginModal}
          className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <GoogleIcon className="w-4 h-4" />
          <span>Google-ით შესვლა</span>
        </button>
      </div>
    );
  }

  const handleStartEdit = () => {
    setFormData({
      name: user.name,
      givenName: user.givenName,
      familyName: user.familyName,
      phone: user.phone || '',
      bio: user.bio || '',
      location: user.location || '',
      language: user.language || 'ქართული',
      timezone: user.timezone || 'Asia/Tbilisi (UTC+4)',
      picture: user.picture,
    });
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      givenName: formData.givenName,
      familyName: formData.familyName,
      phone: formData.phone,
      bio: formData.bio,
      location: formData.location,
      language: formData.language,
      timezone: formData.timezone,
      picture: formData.picture,
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 py-4 sm:py-8 max-w-5xl mx-auto">
      {/* Top Banner & Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs overflow-hidden relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Avatar with Verified Badge */}
            <div className="relative shrink-0">
              <img
                src={user.picture}
                alt={user.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-blue-500/20 shadow-md"
              />
              <div
                className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-slate-900 rounded-xl shadow-xs"
                title="Google-ით დამოწმებული"
              >
                <div className="p-1 bg-blue-50 dark:bg-blue-950/60 rounded-lg border border-blue-200 dark:border-blue-800">
                  <GoogleIcon className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {user.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Google Verified
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {user.role}
                </span>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {user.email}
              </p>

              <p className="text-xs text-slate-400 dark:text-slate-500 pt-0.5">
                რეგისტრაციის თარიღი: {user.createdAt} • ბოლო შესვლა: დღეს, 16:15
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                logout();
                onBackToHome();
              }}
              className="px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>გასვლა</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="mt-5 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>თქვენი პროფილის მონაცემები წარმატებით განახლდა და შეინახა.</span>
          </div>
        )}
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-2xs">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'info'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          პირადი ინფორმაცია
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'security'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          უსაფრთხოება & 2FA
        </button>

        <button
          onClick={() => setActiveTab('apps')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'apps'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          Google სერვისები ({connectedApps.filter((a) => a.status === 'active').length})
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          აქტივობის ისტორია
        </button>
      </div>

      {/* Tab 1: Personal Information */}
      {activeTab === 'info' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                პროფილის დეტალური მონაცემები
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                მართეთ თქვენი სახელი, საკონტაქტო ნომერი და ლოკალიზაციის პარამეტრები
              </p>
            </div>

            {!isEditing ? (
              <button
                onClick={handleStartEdit}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>რედაქტირება</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>გაუქმება</span>
              </button>
            )}
          </div>

          {!isEditing ? (
            /* Readonly View */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  სრული სახელი
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user.name}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Google ელ-ფოსტა
                </span>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {user.email}
                  </p>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                    დამოწმებული
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  ტელეფონის ნომერი
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user.phone || 'მითითებული არ არის'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  ადგილმდებარეობა & დროის სარტყელი
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user.location} • {user.timezone}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1 md:col-span-2">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  მოკლე ბიოგრაფია
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {user.bio || 'ინფორმაცია არ არის დამატებული'}
                </p>
              </div>
            </div>
          ) : (
            /* Editable Form */
            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    სახელი
                  </label>
                  <input
                    type="text"
                    value={formData.givenName}
                    onChange={(e) => {
                      const g = e.target.value;
                      setFormData({
                        ...formData,
                        givenName: g,
                        name: `${g} ${formData.familyName}`.trim(),
                      });
                    }}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    გვარი
                  </label>
                  <input
                    type="text"
                    value={formData.familyName}
                    onChange={(e) => {
                      const f = e.target.value;
                      setFormData({
                        ...formData,
                        familyName: f,
                        name: `${formData.givenName} ${f}`.trim(),
                      });
                    }}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ტელეფონი
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ადგილმდებარეობა
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ბიოგრაფია
                  </label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  გაუქმება
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>ცვლილებების შენახვა</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Tab 2: Security & 2FA */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                უსაფრთხოების პარამეტრები
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Google SSO დაცვა და ორფაქტორიანი ავთენტიფიკაცია
              </p>
            </div>

            {/* 2FA Toggle Card */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    ორფაქტორიანი ავთენტიფიკაცია (2FA)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    შესვლისას დამატებითი დადასტურება Google Authenticator-ით ან SMS-ით
                  </p>
                </div>
              </div>

              <button
                onClick={toggleTwoFactor}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  user.twoFactorEnabled
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {user.twoFactorEnabled ? 'აქტიურია (ჩართული)' : 'გათიშულია'}
              </button>
            </div>

            {/* Active Devices */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                აქტიური მოწყობილობები & სესიები
              </h3>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        macOS Sonoma • Chrome 128
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        მიმდინარე მოწყობილობა
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      თბილისი, საქართველო • IP: 178.134.42.19
                    </p>
                  </div>
                </div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  ონლაინ
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      iPhone 15 Pro • Safari 18
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      ბათუმი, საქართველო • ბოლო აქტივობა: 2 საათის წინ
                    </p>
                  </div>
                </div>
                <button className="text-xs text-rose-500 hover:text-rose-600 font-medium cursor-pointer">
                  სესიის გათიშვა
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Connected Google Apps */}
      {activeTab === 'apps' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              დაკავშირებული Google სერვისები
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              აპლიკაციები რომლებსაც მინიჭებული აქვთ წვდომა თქვენი Google პროფილის მონაცემებზე
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {connectedApps.map((app) => {
              const isActive = app.status === 'active';
              return (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between gap-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-2xs">
                        <GoogleIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {app.name}
                        </h3>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          დაკავშირდა: {app.connectedAt}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        isActive
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                      }`}
                    >
                      {isActive ? 'აქტიურია' : 'გაუქმებულია'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono bg-white dark:bg-slate-800/80 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                    ნებართვები: {app.scope}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                    {isActive ? (
                      <button
                        onClick={() => disconnectApp(app.id)}
                        className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                      >
                        წვდომის გაუქმება
                      </button>
                    ) : (
                      <button
                        onClick={() => connectApp(app.id)}
                        className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        წვდომის აღდგენა
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Activity History */}
      {activeTab === 'history' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                უსაფრთხოების & შესვლის ჟურნალი
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ბოლო მოქმედებების ქრონოლოგია თქვენს Google ანგარიშზე
              </p>
            </div>

            {activities.length > 0 && (
              <button
                onClick={clearActivityLogs}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ისტორიის გასუფთავება</span>
              </button>
            )}
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {activities.length === 0 ? (
              <p className="py-8 text-center text-xs text-slate-400">
                აქტივობის ისტორია ცარიელია
              </p>
            ) : (
              activities.map((act) => (
                <div key={act.id} className="py-3.5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {act.action}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {act.description}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {act.device} • {act.location}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">
                    {act.timestamp}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
