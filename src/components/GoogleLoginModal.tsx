import { useEffect, useRef } from 'react';
import { ArrowUpRight, LockKeyhole, X } from 'lucide-react';
import { GoogleIcon } from './GoogleIcon';
import { useAuth } from '../context/AuthContext';
export function GoogleLoginModal({
  isOpen,
  onClose,
  onSuccess
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const {
    loginWithGoogle
  } = useAuth();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        dialog.current?.close();
        document.body.style.overflow = previous;
      };
    }
  }, [isOpen]);
  return <dialog ref={dialog} className="login-dialog" onCancel={onClose} onClick={e => {
    if (e.target === dialog.current) onClose();
  }}><div className="login-inner"><button className="icon-button close-modal" aria-label="დახურვა" onClick={onClose}><X size={20} /></button><span className="modal-symbol">მ<span>.</span></span><div className="eyebrow muted">კეთილი იყოს შენი დაბრუნება</div><h2>შენი სივრცე<br />გელოდება<span>.</span></h2><p>ერთი ნაბიჯი შენს პერსონალურ<br />სამყარომდე.</p><button className="button google-button" onClick={() => {
        loginWithGoogle();
        onSuccess?.();
        onClose();
      }}><GoogleIcon className="google-icon" />გაგრძელება Google-ით<ArrowUpRight size={18} /></button><div className="demo-note"><LockKeyhole size={13} /><span>დემო ვერსია — Google-ს არ უკავშირდება.</span></div></div></dialog>;
}
