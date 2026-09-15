import { ArrowDown, ArrowUpRight, Check, Fingerprint, Layers3, LockKeyhole, Sparkles, UserRound, MoveUpRight, SlidersHorizontal } from 'lucide-react';
import { GoogleIcon } from './GoogleIcon';
import { useAuth } from '../context/AuthContext';
export function HomePage({
  onEnter
}: {
  onEnter: () => void;
}) {
  const {
    user
  } = useAuth();
  return <>
    <section className="hero page-width">
      <div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> შენი სივრცის ახალი დასაწყისი</div>
        <h1>ყველაფერი იწყება<br /><span>შენით.</span><span className="heading-star" aria-hidden="true">✳</span></h1>
        <p className="hero-description">ერთი ანგარიში. შენი პერსონალური სივრცე.<br />შედი მარტივად და მოაწყვე ყველაფერი შენებურად.</p>
        <div className="hero-actions"><button className="button primary" onClick={onEnter}>{user ? <UserRound size={20} /> : <GoogleIcon className="google-icon" />}{user ? 'ჩემი სივრცის გახსნა' : 'გაგრძელება Google-ით'}<ArrowUpRight size={19} /></button><a className="text-link" href="#possibilities">აღმოაჩინე მეტი <ArrowDown size={17} /></a></div>
        <div className="hero-assurance"><span><Check size={14} /> პაროლის გარეშე</span><span><Check size={14} /> შენი კონტროლით</span></div>
      </div>
      <div className="hero-art" aria-label="პერსონალური პროფილის ილუსტრაცია">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orb" /><span className="art-coordinate">YOUR WORLD, CONNECTED.</span><span className="orbit-point" />
        <div className="floating-tag tag-secure"><span className="mini-icon"><LockKeyhole size={16} /></span><div>მხოლოდ შენთვის<small>პერსონალური სივრცე</small></div><span className="tiny-dot" /></div>
        <div className="preview-card"><div className="preview-top"><span>მთავარი ID</span><span className="preview-label">პროფილის ნიმუში</span></div><div className="preview-avatar"><UserRound size={43} strokeWidth={1.1} /><span><Check size={12} /></span></div><h2>შენი სახელი</h2><p>შენი სივრცე იწყება აქ</p><div className="preview-divider" /><div className="preview-meta"><span>ანგარიში<small>Google</small></span><span>სივრცე<small>პერსონალური</small></span></div><div className="preview-bottom"><span className="mini-bars">▥</span><span>ერთი ანგარიში. მეტი შესაძლებლობა.</span><ArrowUpRight size={18} /></div></div>
        <div className="floating-tag tag-yours"><span className="lime-icon"><Sparkles size={18} /></span><div>შენებურად.<small>ყველა დეტალში</small></div></div><span className="art-index">01 / შენი ციფრული იდენტობა</span>
      </div>
    </section>
    <div className="principles page-width"><span className="principles-intro">მარტივი იდეა.<br /><strong>უკეთესი გამოცდილება.</strong></span><span><Fingerprint />ერთი იდენტობა</span><span><Layers3 />ერთიანი სივრცე</span><span><SlidersHorizontal />სრული კონტროლი</span><span className="principles-arrow"><MoveUpRight /></span></div>
    <section className="features page-width" id="possibilities"><div className="section-heading"><div><div className="eyebrow muted">01 — შესაძლებლობები</div><h2>შენი ყოველდღიურობა.<br /><span>ახალი პერსპექტივით.</span></h2></div><p>ნაკლები ზედმეტი ნაბიჯი.<br />მეტი ადგილი იმისთვის, რაც შენია.</p></div>
      <div className="feature-grid"><article className="feature-card feature-lime"><span className="feature-number">01 / მარტივი დასაწყისი</span><div className="google-visual"><GoogleIcon className="google-large" /><span className="connection-line" /><span className="connection-check"><Check /></span></div><h3>ერთი შეხებით შიგნით.</h3><p>შედი Google-ის ანგარიშით.<br />ახალი პაროლის დამახსოვრების გარეშე.</p><button className="round-link" aria-label="Google-ით შესვლა" onClick={onEnter}><ArrowUpRight /></button></article>
      <article className="feature-card"><span className="feature-number">02 / შენი პროფილი</span><div className="profile-visual"><span className="abstract-avatar"><UserRound /></span><span><i /><i /></span><span className="edit-chip"><SlidersHorizontal size={15} /></span></div><h3>შენ შესახებ. შენებურად.</h3><p>სახელი, ფოტო და შენს შესახებ ინფორმაცია —<br />ყველაფერი ერთ პერსონალურ გვერდზე.</p><button className="round-link" aria-label="პროფილის გახსნა" onClick={onEnter}><ArrowUpRight /></button></article>
      <article className="feature-card"><span className="feature-number">03 / სიმარტივე</span><div className="control-visual"><span>შენი სივრცე</span><span className="visual-toggle"><Check size={12} /></span><div className="control-line" /><span>შენი არჩევანი</span><span className="visual-toggle"><Check size={12} /></span></div><h3>ყველაფერი თავის ადგილზე.</h3><p>განაახლე პროფილი და მართე სესია<br />კომპიუტერიდან ან ტელეფონიდან.</p><button className="round-link" aria-label="პერსონალური სივრცის გახსნა" onClick={onEnter}><ArrowUpRight /></button></article></div>
    </section>
    <section className="how-section page-width" id="how-it-works"><div><div className="eyebrow muted">02 — პირველი ნაბიჯი</div><h2>დაიწყე მარტივად.<br /><span>დანარჩენი შენია.</span></h2><button className="text-link" onClick={onEnter}>გახსენი შენი სივრცე <ArrowUpRight size={19} /></button></div><ol className="steps"><li><span>01</span><div><h3>აირჩიე Google-ის ანგარიში</h3><p>გამოიყენე ანგარიში, რომელსაც უკვე ენდობი.</p></div></li><li><span>02</span><div><h3>შეავსე შენი პროფილი</h3><p>დაამატე ინფორმაცია, რომელიც შენ წარმოგაჩენს.</p></div></li><li><span>03</span><div><h3>იგრძენი თავი შენს სივრცეში</h3><p>დაბრუნდი და განაახლე ინფორმაცია ნებისმიერ დროს.</p></div></li></ol></section>
    <section className="bottom-cta page-width"><span className="cta-star" aria-hidden="true">✳</span><div><div className="eyebrow">მზად ხარ?</div><h2>შენი შემდეგი ნაბიჯი — აქ.</h2></div><button className="button dark-button" onClick={onEnter}>შემოდი შენს სივრცეში <ArrowUpRight size={20} /></button></section>
  </>;
}
