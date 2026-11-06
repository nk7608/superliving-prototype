import { useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, CircleUserRound, PlayCircle, ClipboardList, Heart, X, Play, Lock } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import type { Thumb as ThumbT } from '../data/videos';

// ───────────── Bottom nav: floating frosted pill, 5 tabs (§6.4, ref 08) ─────────────
const tabs = [
  { key: 'navHome', path: '/home', Icon: Home },
  { key: 'navExpert', path: '/experts', Icon: CircleUserRound },
  { key: 'navTv', path: '/tv', Icon: PlayCircle },
  { key: 'navCourses', path: '/courses', Icon: ClipboardList },
  { key: 'navHealth', path: '/health', Icon: Heart },
];
export function BottomNav({ active }: { active: string }) {
  const { t } = useDemo();
  const navigate = useNavigate();
  return (
    <nav
      className="absolute inset-x-[12px] z-30 flex h-[64px] items-center justify-between gap-0.5 rounded-full border border-white/70 bg-white/75 px-[5px] shadow-[0_6px_24px_rgba(35,58,29,0.14)] backdrop-blur-xl"
      style={{ bottom: 'calc(var(--sab) + 6px)' }}
      aria-label="Main"
    >
      {tabs.map(({ key, path, Icon }) => {
        const on = active === path;
        return (
          <button
            key={path}
            type="button"
            onClick={() => navigate(path)}
            aria-current={on ? 'page' : undefined}
            className={`flex h-[54px] min-w-0 flex-1 flex-col items-center justify-center gap-[3px] whitespace-nowrap rounded-full px-0 text-[12px] font-medium tracking-[-0.2px] ${on ? 'bg-nav-active text-text-primary' : 'text-[#3E3E3A]'}`}
          >
            <Icon size={22} strokeWidth={on ? 2.4 : 1.7} fill={on && (path === '/home' || path === '/health') ? '#22391D' : 'none'} color={on ? '#22391D' : '#3E3E3A'} className={on && path === '/home' ? '[&>path:last-child]:stroke-nav-active' : ''} />
            <span className="leading-none">{t(key)}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ───────────── Bottom sheet: 28px radius + grabber (§6.4) ─────────────
export function Sheet({
  open,
  onClose,
  children,
  label,
  full = false,
  dark = false,
  z = 80,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  full?: boolean;
  dark?: boolean;
  z?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <div className="absolute inset-0" style={{ zIndex: z }}>
          <motion.div className="absolute inset-0 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            role="dialog"
            aria-label={label}
            className={`absolute inset-x-0 bottom-0 flex flex-col overflow-hidden rounded-t-sheet ${dark ? 'bg-green-900 text-white' : 'bg-card'} ${full ? 'top-[calc(var(--sat)+8px)]' : 'max-h-[88%]'}`}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
          >
            <div className="flex shrink-0 justify-center pb-1 pt-2.5">
              <span className={`h-[5px] w-[40px] rounded-full ${dark ? 'bg-white/30' : 'bg-black/15'}`} />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar" style={{ paddingBottom: 'calc(var(--sab) + 12px)' }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function SheetClose({ onClick, label = 'Close' }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDEDED] text-[#333]">
      <X size={20} />
    </button>
  );
}

// ───────────── Centered modal (upload modal style, refs 05–06) ─────────────
export function CenterModal({ open, onClose, children, label }: { open: boolean; onClose: () => void; children: ReactNode; label: string }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="absolute inset-0 z-[90] flex items-center justify-center px-[16px]">
          <motion.div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            role="dialog"
            aria-label={label}
            className="relative w-full rounded-[22px] bg-white p-[26px] shadow-[0_10px_40px_rgba(0,0,0,0.18)]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Initials({ name, size = 40, bg = '#E3EBD9', fg = '#3D6B35' }: { name: string; size?: number; bg?: string; fg?: string }) {
  const ini = name.split(' ').map((p) => p[0]).slice(0, 2).join('');
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold" style={{ width: size, height: size, background: bg, color: fg, fontSize: size * 0.38 }} aria-hidden>
      {ini}
    </span>
  );
}

// ───────────── Placeholder video thumbnail (§6.5) ─────────────
export function Thumb({ v, w = 132, h = 210, showPrice = false, onClick }: { v: ThumbT; w?: number; h?: number; showPrice?: boolean; onClick?: () => void }) {
  const { state } = useDemo();
  const title = state.lang === 'en' && v.en ? v.en : v.title;
  return (
    <button type="button" onClick={onClick} className="relative shrink-0 overflow-hidden rounded-[16px] text-left" style={{ width: w, height: h, background: v.bg }} aria-label={title}>
      <div className="absolute inset-x-0 top-0 p-[10px] text-[17px] font-extrabold uppercase leading-[1.05] tracking-[-0.3px]" style={{ color: v.fg ?? '#fff', fontFamily: 'Poppins' }}>
        {title}
      </div>
      <div className="absolute inset-x-0 bottom-[22px] text-center" style={{ fontSize: h * 0.28 }} aria-hidden>
        {v.emoji}
      </div>
      <div className="absolute left-1/2 top-[52%] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/45 backdrop-blur-sm">
        <Play size={16} fill="#fff" color="#fff" />
      </div>
      {v.views && (
        <span className="absolute bottom-[8px] left-[8px] flex items-center gap-1 rounded-full bg-black/35 px-1.5 py-[1px] text-[11px] font-medium text-white">
          <Play size={9} fill="#fff" /> {v.views}
        </span>
      )}
      {v.locked && (
        <span className="absolute right-[8px] top-[8px] flex items-center gap-1 rounded-full bg-black/55 px-1.5 py-[3px] text-[10px] font-semibold text-white">
          <Lock size={11} /> {showPrice && v.price ? v.price : ''}
        </span>
      )}
    </button>
  );
}

// ───────────── Header: green-900 with wordmark + streak (ref 08) ─────────────
export function Wordmark({ size = 26 }: { size?: number }) {
  return (
    <span className="font-bold tracking-[-0.4px] text-green-300" style={{ fontSize: size, fontFamily: 'Poppins' }}>
      SuperLiving
    </span>
  );
}

export function StreakPill({ onClick }: { onClick?: () => void }) {
  const { state, t } = useDemo();
  const n = state.weekDays[state.persona];
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[34px] items-center gap-1.5 rounded-full border-[1.5px] border-[#C9A13A] bg-streak-bg px-3 text-[13px] font-semibold text-streak-fg shadow-[0_0_10px_rgba(242,184,75,0.35)]"
    >
      <span aria-hidden>🔥</span> {n === 1 ? t('streakPill1') : t('streakPill', { n })}
    </button>
  );
}

export function AppHeader({ children, right, rounded = false }: { children?: ReactNode; right?: ReactNode; rounded?: boolean }) {
  return (
    <header className={`relative z-10 bg-green-900 px-4 pb-4 ${rounded ? 'rounded-b-[26px]' : ''}`} style={{ paddingTop: 'calc(var(--sat) + 14px)' }}>
      <div className="flex items-center justify-between">
        <Wordmark />
        {right}
      </div>
      {children}
    </header>
  );
}

// ───────────── Toast ─────────────
export function Toast({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="pointer-events-none absolute inset-x-4 z-[120] flex justify-center"
          style={{ bottom: 'calc(var(--sab) + 84px)' }}
          role="status"
        >
          <div className="pointer-events-auto rounded-2xl bg-[#1f2a1b] px-4 py-3 text-[14px] text-white shadow-lg">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useActivePath() {
  return useLocation().pathname;
}

// ───────────── Buttons (§6.4) ─────────────
export function PrimaryButton({ children, onClick, className = '', full = false, disabled = false }: { children: ReactNode; onClick?: () => void; className?: string; full?: boolean; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 rounded-full bg-green-700 px-5 text-[16px] font-semibold text-white disabled:bg-[#D9D9D9] disabled:text-white ${full ? 'h-12 w-full' : 'h-10'} ${className}`}
    >
      {children}
    </button>
  );
}
export function GhostButton({ children, onClick, className = '' }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button type="button" onClick={onClick} className={`flex h-10 items-center justify-center gap-1.5 rounded-full border border-[#CFD8C6] bg-white px-4 text-[15px] font-medium text-green-700 ${className}`}>
      {children}
    </button>
  );
}
