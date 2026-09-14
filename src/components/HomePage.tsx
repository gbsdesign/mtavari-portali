import React from 'react';
import { ArrowRight, Check, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HomePageProps {
  onNavigateToProfile: () => void;
  onOpenLoginModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToProfile, onOpenLoginModal }) => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <section className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/85 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur sm:p-10 lg:p-14 dark:border-slate-800 dark:bg-slate-900/80">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/70 to-transparent" />
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              მთავარი პორტალი
            </div>

            <h1 className="max-w-3xl text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              ყველაფერი მნიშვნელოვანი — ერთ სუფთა სივრცეში.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
              მართე პროფილი, პირადი ინფორმაცია და შენი ანგარიშის პარამეტრები ზედმეტი ხმაურის გარეშე.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {isAuthenticated && user ? (
                <button
                  onClick={onNavigateToProfile}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                >
                  <User className="h-4 w-4" />
                  პროფილის გახსნა
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={onOpenLoginModal}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                >
                  ანგარიშში შესვლა
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}

              <button
                onClick={() => (isAuthenticated ? onNavigateToProfile() : onOpenLoginModal())}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                პარამეტრების ნახვა
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-slate-200/90 bg-slate-50/90 p-4 dark:border-slate-800 dark:bg-slate-950/70">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-400">ანგარიში</div>
                    <div className="mt-1 text-base font-extrabold text-slate-950 dark:text-white">
                      {isAuthenticated && user ? user.name : 'შენი პროფილი'}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {isAuthenticated && user ? user.email : 'შესვლის შემდეგ აქ გამოჩნდება შენი ინფორმაცია'}
                    </div>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                    <User className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {['პირადი ინფორმაცია', 'პროფილის პარამეტრები', 'აქტივობის ისტორია', 'თემის არჩევა'].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                        <Check className="h-3 w-3" />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ['სუფთა ინტერფეისი', 'მხოლოდ საჭირო ინფორმაცია, ზედმეტი ბეიჯებისა და გამოგონილი სტატუსების გარეშე.'],
          ['სწრაფი მართვა', 'პროფილის მთავარი მოქმედებები ერთ ადგილას და მარტივად გასაგები სტრუქტურით.'],
          ['თანამედროვე დიზაინი', 'რბილი სიღრმე, მკაფიო ტიპოგრაფია და მოწესრიგებული responsive განლაგება.'],
        ].map(([title, description]) => (
          <article key={title} className="rounded-2xl border border-slate-200/80 bg-white/75 p-5 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900/65">
            <h2 className="text-sm font-extrabold text-slate-950 dark:text-white">{title}</h2>
            <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">{description}</p>
          </article>
        ))}
      </section>
    </div>
  );
};
