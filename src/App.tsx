import { Component, type ReactNode, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ProfilePage } from './components/ProfilePage';
import { GoogleLoginModal } from './components/GoogleLoginModal';
import { ArrowUpRight } from 'lucide-react';
class ErrorBoundary extends Component<{
  children: ReactNode;
}, {
  failed: boolean;
}> {
  state = {
    failed: false
  };
  static getDerivedStateFromError() {
    return {
      failed: true
    };
  }
  render() {
    return this.state.failed ? <div className="error-page"><h1>გვერდი ვერ ჩაიტვირთა</h1><button className="button primary" onClick={() => location.reload()}>ხელახლა ცდა</button></div> : this.props.children;
  }
}
function Portal() {
  const {
    user,
    isLoading,
    error,
    refresh
  } = useAuth();
  const [view, setView] = useState<'home' | 'profile'>(() => location.hash === '#profile' ? 'profile' : 'home');
  const [login, setLogin] = useState(false);
  const navigate = (next: 'home' | 'profile') => {
    setView(next);
    try {
      history.replaceState(null, '', next === 'profile' ? '#profile' : location.pathname);
    } catch {/* Sandboxed previews may restrict history. */}
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };
  const enter = () => user ? navigate('profile') : setLogin(true);
  return <div className="app-shell">
    <Navbar currentView={view} onNavigate={navigate} onOpenLoginModal={() => setLogin(true)} />
    {error && <div className="connection-error" role="alert">{error}<button onClick={() => void refresh()}>ხელახლა ცდა</button></div>}
    <main id="main-content">{isLoading ? <div className="loading-page" role="status">იტვირთება…</div> : view === 'profile' ? <ProfilePage onBackToHome={() => navigate('home')} onOpenLoginModal={() => setLogin(true)} /> : <HomePage onEnter={enter} />}</main>
    <footer className="site-footer"><a className="brand" href="#" onClick={e => {
        e.preventDefault();
        navigate('home');
      }}><span className="brand-symbol">მ</span>მთავარი<span className="brand-dot">.</span></a><span>შენი ციფრული სივრცე.</span><a href="#main-content">დასაწყისში დაბრუნება <ArrowUpRight size={15} /></a><small>© {new Date().getFullYear()} მთავარი პორტალი</small></footer>
    <GoogleLoginModal isOpen={login} onClose={() => setLogin(false)} onSuccess={() => {
      setLogin(false);
      navigate('profile');
    }} />
  </div>;
}
export default function App() {
  return <ErrorBoundary><AuthProvider><Portal /></AuthProvider></ErrorBoundary>;
}
