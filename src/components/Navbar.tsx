import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
export function Navbar({
  currentView,
  onNavigate,
  onOpenLoginModal
}: {
  currentView: string;
  onNavigate: (view: 'home' | 'profile') => void;
  onOpenLoginModal: () => void;
}) {
  const {
    user
  } = useAuth();
  const [open, setOpen] = useState(false);
  const home = () => {
    onNavigate('home');
    setOpen(false);
  };
  return <><a className="skip-link" href="#main-content">მთავარ შინაარსზე გადასვლა</a><header className="site-header">
    <button className="brand" onClick={home} aria-label="მთავარი გვერდი"><span className="brand-symbol">მ</span>მთავარი<span className="brand-dot">.</span></button>
    <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="მთავარი ნავიგაცია"><button className={currentView === 'home' ? 'active' : ''} onClick={home}>მთავარი</button><a href="#possibilities" onClick={() => {
          home();
          setTimeout(() => document.getElementById('possibilities')?.scrollIntoView({
            behavior: 'smooth'
          }), 30);
        }}>შესაძლებლობები</a><a href="#how-it-works" onClick={() => {
          home();
          setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({
            behavior: 'smooth'
          }), 30);
        }}>როგორ მუშაობს</a></nav>
    <div className="header-actions"><button className="header-login" onClick={() => user ? onNavigate('profile') : onOpenLoginModal()}>{user ? 'ჩემი პროფილი' : 'შესვლა'}<ArrowUpRight size={17} /></button><button className="mobile-menu icon-button" aria-label={open ? 'მენიუს დახურვა' : 'მენიუს გახსნა'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
  </header></>;
}
