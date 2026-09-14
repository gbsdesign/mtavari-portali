import React, { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, CheckCircle2, Clock3, Edit3, LogOut, Save, Trash2, User, X } from 'lucide-react';

interface ProfilePageProps {
  onBackToHome: () => void;
  onOpenLoginModal: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBackToHome, onOpenLoginModal }) => {
  const { user, isAuthenticated, updateProfile, logout, activities, clearActivityLogs } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const initialForm = useMemo(
    () => ({
      givenName: user?.givenName || '',
      familyName: user?.familyName || '',
      phone: user?.phone || '',
      location: user?.location || '',
      bio: user?.bio || '',
      language: user?.language || 'ქართული',
      timezone: user?.timezone || 'Asia/Tbilisi (UTC+4)',
    }),
    [user],
  );

  const [formData, setFormData] = useState(initialForm);

  if (!isAuthenticated || !user) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          <User className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-2xl font-black tracking-tight text-slate-950 dark:text-white">პროფილზე წვდომისთვის შედი ანგარიშში</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">შესვლის შემდეგ აქ გამოჩნდება მხოლოდ შენს სესიასთან დაკავშირებული პროფილის ინფორმაცია.</p>
        <button onClick={onOpenLoginModal} className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white dark:bg-white dark:text-slate-950">შესვლა</button>
      </div>
    );
  }

  const beginEdit = () => {
    setFormData(initialForm);
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const saveProfile = (event: React.FormEvent) => {
    event.preventDefault();
    const name = `${formData.givenName} ${formData.familyName}`.trim() || user.name;
    updateProfile({ ...formData, name });
    setIsEditing(false);
    setSaveSuccess(true);
    window.setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="mx-auto max-w-6xl py-8 sm:py-12">
      <div className="mb-5 flex items-center justify-between gap-3">
        <button onClick={onBackToHome} className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white">
          <ArrowLeft className="h-4 w-4" /> მთავარი
        </button>
        <button
          onClick={() => {
            logout();
            onBackToHome();
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-rose-950/20"
        >
          <LogOut className="h-4 w-4" /> გასვლა
        </button>
      </div>

      <section className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/85 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <div className="border-b border-slate-100 p-6 sm:p-8 dark:border-slate-800">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-slate-100 text-slate-500 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                {user.picture ? <img src={user.picture} alt="" className="h-full w-full object-cover" /> : <User className="h-6 w-6" />}
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">{user.name}</h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{user.email || 'ელ-ფოსტა არ არის მითითებული'}</p>
              </div>
            </div>

            {!isEditing ? (
              <button onClick={beginEdit} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">
                <Edit3 className="h-4 w-4" /> რედაქტირება
              </button>
            ) : (
              <button onClick={() => setIsEditing(false)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <X className="h-4 w-4" /> გაუქმება
              </button>
            )}
          </div>

          {saveSuccess && (
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-semibold text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4" /> ცვლილებები შენახულია
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-[1fr_340px]">
          <div className="p-6 sm:p-8 lg:border-r lg:border-slate-100 dark:lg:border-slate-800">
            <div className="mb-5">
              <h2 className="text-base font-extrabold text-slate-950 dark:text-white">პირადი ინფორმაცია</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">შეცვალე მხოლოდ ის ველები, რომელთა შენახვაც გჭირდება.</p>
            </div>

            {!isEditing ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['სახელი', user.givenName || '—'],
                  ['გვარი', user.familyName || '—'],
                  ['ტელეფონი', user.phone || '—'],
                  ['ადგილმდებარეობა', user.location || '—'],
                  ['ენა', user.language || '—'],
                  ['დროის სარტყელი', user.timezone || '—'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                    <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{label}</div>
                    <div className="mt-1.5 text-sm font-bold text-slate-800 dark:text-slate-100">{value}</div>
                  </div>
                ))}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 sm:col-span-2 dark:border-slate-800 dark:bg-slate-950/50">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">ბიოგრაფია</div>
                  <div className="mt-1.5 text-sm leading-6 text-slate-700 dark:text-slate-200">{user.bio || '—'}</div>
                </div>
              </div>
            ) : (
              <form onSubmit={saveProfile} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ['givenName', 'სახელი'],
                    ['familyName', 'გვარი'],
                    ['phone', 'ტელეფონი'],
                    ['location', 'ადგილმდებარეობა'],
                    ['language', 'ენა'],
                    ['timezone', 'დროის სარტყელი'],
                  ].map(([key, label]) => (
                    <label key={key} className="block">
                      <span className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">{label}</span>
                      <input
                        value={formData[key as keyof typeof formData]}
                        onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      />
                    </label>
                  ))}
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">ბიოგრაფია</span>
                  <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </label>
                <div className="flex justify-end">
                  <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700">
                    <Save className="h-4 w-4" /> შენახვა
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-950 dark:text-white">აქტივობა</h2>
                <p className="mt-1 text-xs text-slate-500">ამ პორტალში შესრულებული მოქმედებები</p>
              </div>
              {activities.length > 0 && (
                <button onClick={clearActivityLogs} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20" aria-label="ისტორიის გასუფთავება">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="mt-5 space-y-3">
              {activities.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 p-5 text-center text-xs text-slate-400 dark:border-slate-800">ჯერ აქტივობა არ არის</div>
              ) : (
                activities.slice(0, 8).map((activity) => (
                  <div key={activity.id} className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/40">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100">{activity.action}</div>
                      <div className="mt-0.5 text-[11px] leading-5 text-slate-500">{activity.description}</div>
                      <div className="mt-1 text-[10px] text-slate-400">{activity.timestamp}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
