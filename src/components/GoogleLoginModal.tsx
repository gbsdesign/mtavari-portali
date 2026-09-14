import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const GoogleLoginModal: React.FC<GoogleLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;

    const displayName = name.trim() || email.trim().split('@')[0] || 'მომხმარებელი';
    loginWithGoogle({
      email: email.trim(),
      name: displayName,
      givenName: displayName.split(' ')[0] || displayName,
      familyName: displayName.split(' ').slice(1).join(' '),
      verifiedEmail: false,
    });
    onClose();
    onSuccess?.();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div
        className="w-full max-w-md overflow-hidden rounded-[26px] border border-white/60 bg-white shadow-2xl shadow-slate-950/20 dark:border-slate-800 dark:bg-slate-900"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-100 p-6 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">პორტალში შესვლა</h2>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">ამ ვერსიაში სესია ლოკალურად ინახება ბრაუზერში. რეალური Google OAuth ჯერ არ არის მიერთებული.</p>
          </div>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200" aria-label="დახურვა">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4 p-6">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">სახელი</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="მაგ. გიორგი გაბუნია"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">ელ-ფოსტა</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600"
            />
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            გაგრძელება
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
