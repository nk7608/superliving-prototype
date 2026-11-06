import { Avatar } from '../components/Avatar';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Video, Phone, MoreVertical, Lock, Smile, Paperclip, Camera, Mic, Flashlight } from 'lucide-react';
import { useAction, useDemo, wait } from '../app/DemoContext';
import { Anchor } from '../notes/Anchor';
import { WhatsAppGlyph } from '../components/Chat';

/** S3 — next morning, 6:30: neutral lock-screen preview → WhatsApp chat (mock). */
export function WhatsApp() {
  const { state, t, markStep } = useDemo();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [reply, setReply] = useState<null | 'done' | 'skip'>(null);
  const viaWa = state.whatsappOptIn && state.checkins.channel === 'whatsapp';
  const preview = state.checkins.neutral ? t('previewNeutral') : t('previewDetailed');
  const time = state.checkins.time;

  const answer = (v: 'done' | 'skip') => {
    setReply(v);
    markStep(v === 'done' ? 'done' : 'skipped', 'neha');
  };

  useAction('wa-run', async () => {
    setOpen(false);
    setReply(null);
    await wait(1600);
    setOpen(true);
    await wait(1800);
    answer('done');
  });

  if (!open) {
    return (
      <div className="absolute inset-0 overflow-hidden text-white" style={{ background: 'radial-gradient(120% 80% at 30% 10%, #F2A65A 0%, #B5487A 45%, #3A2A6B 100%)' }}>
        <div className="flex flex-col items-center" style={{ paddingTop: 'calc(var(--sat) + 20px)' }}>
          <Lock size={18} className="opacity-90" />
          <div className="mt-2 text-[17px] font-medium opacity-90">{t('lockDate')}</div>
          <div className="text-[88px] font-semibold leading-none tracking-[-2px]" style={{ fontFamily: 'system-ui' }}>{time}</div>
        </div>
        <div className="absolute inset-x-3 top-[300px]">
          <Anchor id="wa-lock">
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setOpen(true)}
              className="flex w-full items-start gap-3 rounded-[22px] bg-white/30 p-3.5 text-left backdrop-blur-xl"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] ${viaWa ? 'bg-[#25D366]' : 'bg-green-900'}`}>
                {viaWa ? <WhatsAppGlyph size={24} color="#fff" /> : <span className="text-[13px] font-bold text-green-300">SL</span>}
              </span>
              <span className="min-w-0 flex-1" style={{ fontFamily: 'system-ui' }}>
                <span className="flex justify-between text-[15px] font-semibold">
                  <span>{viaWa ? 'Tara (SuperLiving)' : 'SuperLiving'}</span>
                  <span className="text-[13px] font-normal opacity-80">{t('now')}</span>
                </span>
                <span className="block text-[15px] leading-snug">{preview}</span>
              </span>
            </motion.button>
          </Anchor>
          {!viaWa && <p className="mt-3 rounded-xl bg-black/25 px-3 py-2 text-center text-[12.5px]">{t('waNotOpted')}</p>}
        </div>
        <div className="absolute inset-x-0 flex justify-between px-12" style={{ bottom: 'calc(var(--sab) + 30px)' }}>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/25"><Flashlight size={20} /></span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/25"><Camera size={20} /></span>
        </div>
      </div>
    );
  }

  if (!viaWa) return <Navigate to="/home" />;

  return (
    <div className="absolute inset-0 flex flex-col" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <header className="flex items-center gap-2 bg-[#008069] px-2 pb-2.5 text-white" style={{ paddingTop: 'calc(var(--sat) + 6px)' }}>
        <button type="button" onClick={() => setOpen(false)} className="flex h-11 w-9 items-center justify-center" aria-label="Back"><ArrowLeft size={22} /></button>
        <Avatar who="tara" size={40} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[17px] font-semibold">Tara (SuperLiving)</div>
          <div className="flex items-center gap-1.5 text-[12.5px] opacity-90">{t('waBusiness')} <span className="rounded bg-white/25 px-1.5 text-[10.5px] font-bold uppercase">{t('mock')}</span></div>
        </div>
        <Video size={20} className="mx-1.5" />
        <Phone size={19} className="mx-1.5" />
        <MoreVertical size={20} />
      </header>
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto bg-[#EFEAE2] px-3 py-3">
        <div className="mx-auto w-fit rounded-lg bg-[#FFF5C4] px-3 py-1.5 text-center text-[12px] text-[#54656F]">🔒 {t('waOptedNote')}</div>
        <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 text-[15px] leading-snug text-[#111B21] shadow-sm">
          {t('waMsg', { step: t('stepNeha0') })}
          <div className="mt-1 text-right text-[11px] text-[#667781]">{time} am</div>
        </div>
        {!reply ? (
          <Anchor id="wa-replies">
            <div className="flex max-w-[85%] gap-2">
              <button type="button" onClick={() => answer('done')} className="h-11 flex-1 rounded-lg bg-white text-[15px] font-semibold text-[#008069] shadow-sm">{t('waDone')}</button>
              <button type="button" onClick={() => answer('skip')} className="h-11 flex-1 rounded-lg bg-white text-[15px] font-semibold text-[#008069] shadow-sm">{t('stepSkip')}</button>
            </div>
          </Anchor>
        ) : (
          <>
            <div className="ml-auto max-w-[70%] rounded-lg rounded-tr-none bg-[#D9FDD3] px-3 py-2 text-[15px] text-[#111B21] shadow-sm">
              {reply === 'done' ? t('waDone') : t('stepSkip')}
              <div className="mt-0.5 text-right text-[11px] text-[#667781]">6:42 am ✓✓</div>
            </div>
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 text-[15px] leading-snug text-[#111B21] shadow-sm">
              {reply === 'done' ? t('waThanks', { n: state.weekDays.neha }) : t('stepSkipped')}
              <button type="button" onClick={() => navigate('/health')} className="mt-2 block w-full rounded-md border-t border-[#E9EDEF] pt-2 text-center text-[14.5px] font-medium text-[#008069]">
                {t('waOpenApp')}
              </button>
            </motion.div>
          </>
        )}
      </div>
      <div className="flex items-center gap-2 bg-[#F0F2F5] px-2 pt-2" style={{ paddingBottom: 'calc(var(--sab) + 8px)' }}>
        <div className="flex h-11 flex-1 items-center gap-3 rounded-full bg-white px-3 text-[#8696A0]">
          <Smile size={22} /> <span className="flex-1 text-[15px]">Message</span> <Paperclip size={20} /> <Camera size={20} />
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#008069] text-white"><Mic size={20} /></span>
      </div>
    </div>
  );
}
