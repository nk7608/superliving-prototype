import { useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Mic, Plus, User, Play, FileText, Bot } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { coachById } from '../data/coaches';
import { Anchor } from '../notes/Anchor';
import { Avatar, type Who } from './Avatar';

export function WhatsAppGlyph({ size = 15, color = '#25A244' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" aria-hidden>
      <path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6z" strokeLinejoin="round" />
      <path d="M9 8.6c.2-.5.6-.6.9-.6h.4c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .4-.1.6l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.2.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.4c0 .3-.1.7-.6.9-.6.3-1.5.4-2.8-.2a9 9 0 0 1-4.1-4.1c-.6-1.3-.5-2.2-.2-2.8z" fill={color} stroke="none" />
    </svg>
  );
}

export function ChatHeader({ coachId, onMe, markMe = false, markLabel = false }: { coachId: string; onMe: () => void; markMe?: boolean; markLabel?: boolean }) {
  const { t } = useDemo();
  const navigate = useNavigate();
  const c = coachById(coachId);
  const name = coachId === 'tara' ? 'Tara' : c.name;
  const label = (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-green-100 px-1.5 py-[1px] text-[11px] font-semibold text-green-600">
      <Bot size={11} /> {t('aiCoach')}
    </span>
  );
  const me = (
    <button type="button" onClick={onMe} className="flex h-[38px] items-center gap-1.5 rounded-full border-[1.5px] border-[#2D3B28] bg-green-50 px-3 text-[15px] font-semibold text-[#22391D]">
      <User size={16} fill="#22391D" /> Me
    </button>
  );
  return (
    <header className="relative z-[45] flex items-center gap-2 border-b border-[#E7E4DA] bg-white pb-2.5 pl-1 pr-3" style={{ paddingTop: 'calc(var(--sat) + 10px)' }}>
      <button type="button" onClick={() => navigate(-1)} className="flex h-11 w-9 shrink-0 items-center justify-center" aria-label="Back">
        <ChevronLeft size={28} strokeWidth={2} />
      </button>
      <Avatar who={coachId as Who} size={46} />
      <div className="min-w-0 flex-1 pl-1">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="max-w-[120px] shrink-0 truncate text-[17px] font-semibold leading-tight text-[#1D1D1B]">{name}</span>
          {markLabel ? <Anchor id="chat-ailabel" className="shrink-0">{label}</Anchor> : label}
        </div>
        <div className="mt-0.5 truncate text-[12.5px] text-text-secondary">{c.role}</div>
      </div>
      <button type="button" className="flex h-[38px] shrink-0 items-center gap-1 rounded-full border border-[#A6DDB0] bg-[#EAF8EC] px-2.5 text-[14px] font-medium text-[#25A244]">
        <WhatsAppGlyph /> Join
      </button>
      {markMe ? <Anchor id="chat-me" className="shrink-0">{me}</Anchor> : me}
    </header>
  );
}

export function CoachBubble({ coachId, children, time, wide = false }: { coachId: string; children: ReactNode; time?: string; wide?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2">
      <Avatar who={coachId as Who} size={36} className="mt-1" />
      <div className={`rounded-[22px] rounded-tl-[8px] bg-white px-4 py-3 text-[16px] leading-[1.5] text-[#1D1D1B] shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${wide ? 'flex-1' : 'max-w-[82%]'}`}>
        {children}
        {time && <div className="mt-1 text-right text-[11px] text-[#9A9A96]">{time}</div>}
      </div>
    </motion.div>
  );
}

export function UserBubble({ children, time }: { children: ReactNode; time?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
      <div className="max-w-[80%] rounded-[22px] rounded-tr-[8px] bg-green-700 px-4 py-3 text-[16px] leading-[1.45] text-white">
        {children}
        {time && <div className="mt-1 text-right text-[11px] text-white/70">{time} ✓✓</div>}
      </div>
    </motion.div>
  );
}

export function VoiceBubble({ secs, transcript, time }: { secs: number; transcript: string; time?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
      <div className="w-[78%] rounded-[22px] rounded-tr-[8px] bg-green-700 px-3.5 py-3 text-white">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20"><Play size={16} fill="#fff" /></span>
          <span className="flex flex-1 items-center gap-[3px]" aria-hidden>
            {Array.from({ length: 26 }).map((_, i) => (
              <span key={i} className="w-[3px] rounded-full bg-white/80" style={{ height: 4 + ((i * 29) % 18) }} />
            ))}
          </span>
          <span className="text-[12px] text-white/80">0:{String(secs).padStart(2, '0')}</span>
        </div>
        <p className="mt-2 border-t border-white/15 pt-2 text-[14px] italic leading-snug text-white/90">“{transcript}”</p>
        {time && <div className="mt-1 text-right text-[11px] text-white/70">{time} ✓✓</div>}
      </div>
    </motion.div>
  );
}

export function FileCard({ name, meta, time }: { name: string; meta: string; time?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
      <div className="w-[74%] rounded-[22px] rounded-tr-[8px] bg-green-700 p-2 text-white">
        <div className="flex items-center gap-3 rounded-[16px] bg-white/12 p-2.5" style={{ background: 'rgba(255,255,255,0.12)' }}>
          <span className="flex h-12 w-10 items-center justify-center rounded-md bg-[#FCE8E6] text-[#D93025]"><FileText size={22} /></span>
          <div className="min-w-0">
            <div className="truncate text-[15px] font-semibold">{name}</div>
            <div className="text-[12.5px] text-white/80">{meta}</div>
          </div>
        </div>
        {time && <div className="mt-1 px-1 text-right text-[11px] text-white/70">{time} ✓✓</div>}
      </div>
    </motion.div>
  );
}

/** F1 — "Me mein save hua: … ✓ · Edit" */
export function MemChip({ text, onEdit }: { text: string; onEdit: () => void }) {
  const { t } = useDemo();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-[46px] -mt-1 flex">
      <span className="flex min-h-[30px] items-center gap-1.5 rounded-full border border-[#CFE3C8] bg-green-50 px-3 text-[13px] text-green-700">
        <span>{t('memSaved')}: <b className="font-semibold">{text}</b> ✓</span>
        <span className="text-[#9BB592]">·</span>
        <button type="button" onClick={onEdit} className="hit font-semibold underline underline-offset-2">{t('edit')}</button>
      </span>
    </motion.div>
  );
}

export function Typing({ coachId }: { coachId: string }) {
  return (
    <div className="flex items-start gap-2">
      <Avatar who={coachId as Who} size={36} className="mt-1" />
      <div className="flex h-[44px] items-center gap-1 rounded-[22px] rounded-tl-[8px] bg-white px-4" aria-label="typing">
        {[0, 1, 2].map((i) => <span key={i} className="typing-dot h-2 w-2 rounded-full bg-[#9A9A96]" />)}
      </div>
    </div>
  );
}

export function QuickReplies({ options, onPick }: { options: { label: string; v: string }[]; onPick: (v: string) => void }) {
  return (
    <div className="ml-[46px] flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o.v} type="button" onClick={() => onPick(o.v)} className="min-h-[40px] rounded-full border-[1.5px] border-green-700 bg-white px-4 text-[15px] font-medium text-green-700">
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function IntentChips({ onPick, anchor = 'chat-intents' }: { onPick: (v: 'listen' | 'act' | 'show') => void; anchor?: string }) {
  const { t } = useDemo();
  return (
    <Anchor id={anchor} className="mx-3 mb-2">
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {([
          ['listen', t('intentListen')],
          ['act', t('intentAct')],
          ['show', t('intentShow')],
        ] as const).map(([v, l]) => (
          <button key={v} type="button" onClick={() => onPick(v)} className="h-10 shrink-0 rounded-full border-[1.5px] border-green-700 bg-white px-3.5 text-[14.5px] font-medium text-green-700 shadow-sm">
            {l}
          </button>
        ))}
      </div>
    </Anchor>
  );
}

export function ChatInput({ coachName, actions, onPlus, onSpeak, markPlus = false }: { coachName: string; actions: { emoji: string; label: string; badge?: string }[]; onPlus?: () => void; onSpeak?: () => void; markPlus?: boolean }) {
  const { t } = useDemo();
  const plus = (
    <button type="button" onClick={onPlus} aria-label={t('uploadReport')} className="flex h-10 w-10 items-center justify-center">
      <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-green-700 text-green-700"><Plus size={16} strokeWidth={2.6} /></span>
    </button>
  );
  return (
    <div className="relative z-[45] border-t border-[#E7E4DA] bg-white pt-2.5" style={{ paddingBottom: 'calc(var(--sab) + 10px)' }}>
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-3">
        {actions.map((a) => (
          <span key={a.label} className="flex h-[46px] shrink-0 items-center gap-2 rounded-full border-[1.5px] border-[#CFDCC8] px-4 text-[16px] text-[#1D1D1B]">
            <span aria-hidden>{a.emoji}</span> {a.label}
            {a.badge && <span className="rounded-md bg-green-700 px-1.5 text-[11px] font-semibold text-white">{a.badge}</span>}
          </span>
        ))}
      </div>
      <div className="mt-2.5 flex items-center gap-2 px-3">
        <div className="flex h-[52px] flex-1 items-center rounded-full border-[1.5px] border-[#D9D6CC] pl-1.5">
          {markPlus ? <Anchor id="chat-plus">{plus}</Anchor> : plus}
          <span className="pl-1 text-[16px] text-[#A3A19A]">Type</span>
        </div>
        <button type="button" onClick={onSpeak} className="flex h-[54px] items-center gap-2 rounded-full bg-green-800 px-5 text-[17px] font-semibold text-white" aria-label={`Speak to ${coachName}`}>
          <Mic size={20} /> Speak
        </button>
      </div>
    </div>
  );
}

export function ChatBody({ children, deps }: { children: ReactNode; deps: unknown[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return (
    <div ref={ref} className="chat-doodles no-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4">
      {children}
    </div>
  );
}

export function DayDivider({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center">
      <span className="rounded-full bg-white/70 px-3 py-1 text-[12px] font-medium text-[#6A6A64]">{children}</span>
    </div>
  );
}
