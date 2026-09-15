import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowUpRight, Check, CheckCheck, Globe2, LayoutGrid, LogOut, Mail, MapPin, Pencil, ShieldCheck, UserRound, X } from 'lucide-react';
import { useAuth, type ProfileUpdate } from '../context/AuthContext';
import { GoogleIcon } from './GoogleIcon';
export function ProfilePage({
  onBackToHome,
  onOpenLoginModal
}: {
  onBackToHome: () => void;
  onOpenLoginModal: () => void;
}) {
  const {
    user,
    logout,
    updateProfile
  } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<'overview' | 'settings'>('overview');
  const [draft, setDraft] = useState<ProfileUpdate>({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    phone: user?.phone || ''
  });
  if (!user) return <section className="empty-profile page-width"><span className="modal-symbol"><UserRound size={36} /></span><h1>შენი სივრცე გელოდება.</h1><p>გახსენი დემო ანგარიში და აღმოაჩინე შენი პროფილი.</p><button className="button primary" onClick={onOpenLoginModal}>პროფილის გახსნა <ArrowUpRight size={18} /></button></section>;
  const edit = () => {
    setDraft({
      name: user.name,
      bio: user.bio || '',
      location: user.location || '',
      phone: user.phone || ''
    });
    setSaved(false);
    setEditing(true);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim()) return;
    updateProfile({
      ...draft,
      name: draft.name.trim()
    });
    setEditing(false);
    setSaved(true);
  };
  const initials = user.name.trim().split(/\s+/).slice(0, 2).map(p => p[0]).join('');
  const fields = [!!user.name, !!user.bio, !!user.location, !!user.phone];
  const completion = fields.filter(Boolean).length * 25;
  return <div className="profile-layout page-width"><aside className="profile-sidebar"><div className="eyebrow muted">პერსონალური სივრცე</div><button className={tab === 'overview' ? 'sidebar-link selected' : 'sidebar-link'} onClick={() => {
        setTab('overview');
        setEditing(false);
      }}><LayoutGrid size={18} />მიმოხილვა<span>01</span></button><button className={tab === 'settings' ? 'sidebar-link selected' : 'sidebar-link'} onClick={() => {
        setTab('settings');
        setEditing(false);
      }}><ShieldCheck size={18} />ანგარიში<ArrowUpRight size={16} /></button><div className="sidebar-bottom"><div className="demo-badge"><span />დემო სივრცე</div><p>გამოსცადე შენი ახალი<br />პერსონალური გვერდი.</p><button className="text-link" onClick={onBackToHome}><ArrowLeft size={16} /> მთავარზე დაბრუნება</button></div></aside>
    <section className="profile-main"><div className="profile-heading"><div><div className="eyebrow muted">შენი მთავარი</div><h1>გამარჯობა, {user.name.split(' ')[0]}<span className="greeting-star">✳</span></h1><p>კარგია, რომ აქ ხარ. ეს შენი სივრცეა.</p></div><span className="profile-date">{new Intl.DateTimeFormat('ka-GE', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }).format(new Date())}</span></div>
    {saved && <div className="save-message" role="status"><CheckCheck size={18} /> ცვლილებები შენახულია.<button className="icon-button" aria-label="შეტყობინების დახურვა" onClick={() => setSaved(false)}><X size={16} /></button></div>}
    {tab === 'overview' ? <><article className="identity-card"><div className="identity-cover"><span>შენი სივრცე. შენი წესები.</span><span className="cover-star">✳</span><div className="cover-orbit" /></div><div className="identity-content"><div className="identity-top"><span className="user-avatar">{initials}</span><button className="button secondary" onClick={edit}><Pencil size={15} />რედაქტირება</button></div><div className="identity-name"><h2>{user.name}</h2><span className="demo-badge">დემო პროფილი</span></div><span className="profile-email"><Mail size={15} />{user.email}</span><div className="identity-details"><span><MapPin size={15} />{user.location || 'დაამატე შენი ქალაქი'}</span><span><Globe2 size={15} />ქართული</span></div></div></article>
    <div className="profile-grid"><article className="info-panel"><div className="panel-title"><h3>ჩემ შესახებ</h3><button className="icon-button" aria-label="ბიოგრაფიის რედაქტირება" onClick={edit}><Pencil size={16} /></button></div><p className={user.bio ? 'bio-content' : 'empty-bio'}>{user.bio || 'ეს ადგილი შენს ამბავს ეკუთვნის. დაწერე რამდენიმე სიტყვა შენზე, შენს ინტერესებსა და იდეებზე.'}</p>{!user.bio && <button className="text-link" onClick={edit}>მოყევი შენი ამბავი <ArrowUpRight size={17} /></button>}</article><article className="completion-panel"><div className="panel-title"><h3>შეავსე შენი პროფილი</h3><span>{completion}%</span></div><div className="progress-track"><span style={{
                width: `${completion}%`
              }} /></div><p>{completion === 100 ? 'ყველაფერი მზადაა. შენი პროფილი სრულად შევსებულია.' : 'კიდევ რამდენიმე დეტალი და შენი სივრცე მზადაა.'}</p><div className="completion-checks">{['სახელი', 'ბიო', 'ქალაქი', 'ტელეფონი'].map((label, i) => <span className={fields[i] ? 'done' : ''} key={label}><Check size={12} />{label}</span>)}</div></article></div></> : <article className="settings-panel"><div className="panel-title"><h2>ანგარიშის პარამეტრები</h2><ShieldCheck size={22} /></div><div className="settings-row"><div className="google-provider"><GoogleIcon className="google-icon" /><div><h3>Google</h3><p>{user.email}</p></div></div><span className="demo-badge">დემო</span></div><div className="settings-row"><div><h3>შენახვა ამ ბრაუზერში</h3><p>პროფილის ცვლილებები ამ მოწყობილობაზე ინახება.<br />გასვლისას დემო მონაცემები წაიშლება.</p></div></div><div className="settings-row"><div><h3>სესიის დასრულება</h3><p>დაბრუნდი მთავარ გვერდზე.</p></div><button className="button secondary logout-button" onClick={() => {
            logout();
            onBackToHome();
          }}><LogOut size={17} />გასვლა</button></div></article>}
    {editing && <form className="edit-profile-panel" onSubmit={submit}><div className="panel-title"><div><div className="eyebrow muted">შენებურად</div><h2>პროფილის რედაქტირება</h2></div><button type="button" className="icon-button" aria-label="რედაქტირების დახურვა" onClick={() => setEditing(false)}><X /></button></div><div className="form-grid"><label>სახელი<input autoFocus required maxLength={60} value={draft.name} onChange={e => setDraft({
              ...draft,
              name: e.target.value
            })} placeholder="შენი სახელი" /></label><label>ქალაქი<input maxLength={80} value={draft.location} onChange={e => setDraft({
              ...draft,
              location: e.target.value
            })} placeholder="მაგ. თბილისი, საქართველო" /></label><label>ელფოსტა<input value={user.email} disabled /><small>დემო ანგარიშის ელფოსტა</small></label><label>ტელეფონი<input type="tel" maxLength={30} value={draft.phone} onChange={e => setDraft({
              ...draft,
              phone: e.target.value
            })} placeholder="+995" /></label><label className="full-width">შენ შესახებ<textarea rows={3} maxLength={400} value={draft.bio} onChange={e => setDraft({
              ...draft,
              bio: e.target.value
            })} placeholder="რამდენიმე სიტყვა შენ შესახებ…" /><small>{draft.bio?.length || 0} / 400</small></label></div><div className="form-actions"><button type="button" className="button secondary" onClick={() => setEditing(false)}>გაუქმება</button><button className="button primary" type="submit">ცვლილებების შენახვა <Check size={16} /></button></div></form>}
    <div className="profile-footnote"><span><span className="status-dot" />შენი პერსონალური სივრცე</span><button className="text-link" onClick={() => {
          logout();
          onBackToHome();
        }}><LogOut size={15} />გასვლა</button></div></section></div>;
}
