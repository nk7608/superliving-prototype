import { Avatar } from '../components/Avatar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Smartphone, Search } from 'lucide-react';
import { useAction, useDemo, wait } from '../app/DemoContext';
import { Anchor } from '../notes/Anchor';
import { Initials } from '../components/ui';
import { OnboardingFlow } from './Onboarding';

type Phase = 'share' | 'sent' | 'rohit';

/** S13 — Neha invites Rohit; Rohit's onboarding is prefilled from the household (F10). */
export function Invite() {
  const { state, set, t } = useDemo();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>(state.persona === 'rohit' && !state.onboarded.rohit && state.invited ? 'rohit' : 'share');

  const send = () => {
    set({ invited: true });
    setPhase('sent');
  };
  const toRohit = () => {
    set({ persona: 'rohit', invited: true });
    setPhase('rohit');
  };

  useAction('invite-flow', async () => {
    setPhase('share');
    await wait(1200);
    send();
    await wait(1500);
    toRohit();
  });

  if (phase === 'rohit') {
    return <OnboardingFlow variant="rohit" onDone={() => navigate('/home')} />;
  }

  const card = (
    <div className="overflow-hidden rounded-[12px] bg-[#F7F8FA]">
      <div className="flex h-[96px] items-center justify-center bg-green-900">
        <span className="text-[24px] font-bold text-green-300">SuperLiving</span>
      </div>
      <div className="p-3">
        <div className="text-[14.5px] font-semibold text-[#111B21]">{t('invCardTitle')}</div>
        <div className="mt-0.5 text-[13px] leading-snug text-[#54656F]">{t('invCardBody')}</div>
        <div className="mt-1 text-[12px] text-[#008069]">superliving.app/ghar/sharma</div>
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0 flex flex-col" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <header className="flex items-center gap-2 bg-[#008069] px-2 pb-2.5 text-white" style={{ paddingTop: 'calc(var(--sat) + 6px)' }}>
        <button type="button" onClick={() => (phase === 'sent' ? setPhase('share') : navigate(-1))} className="flex h-11 w-9 items-center justify-center" aria-label="Back"><ArrowLeft size={22} /></button>
        {phase === 'share' ? (
          <>
            <span className="flex-1 text-[18px] font-semibold">{t('invSendTo')}</span>
            <Search size={20} className="mr-2" />
          </>
        ) : (
          <>
            <Avatar who="rohit" size={40} />
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[17px] font-semibold">Rohit <span className="rounded bg-white/25 px-1.5 text-[11px] font-bold uppercase">{t('mock')}</span></div>
              <div className="text-[12.5px] opacity-85">online</div>
            </div>
          </>
        )}
      </header>

      {phase === 'share' ? (
        <div className="min-h-0 flex-1 overflow-y-auto bg-white">
          <div className="px-4 pt-3 text-[13px] font-medium uppercase tracking-wide text-[#008069]">{t('invRecent')}</div>
          {[
            ['Rohit Sharma', t('invHusband'), true],
            ['Maa', '', false],
            ['Priya (didi)', '', false],
          ].map(([n, sub, sel]) => (
            <div key={n as string} className="flex min-h-[64px] items-center gap-3 px-4">
              {sel ? <Avatar who="rohit" size={44} /> : <Initials name={n as string} size={44} bg="#DFE5E7" fg="#54656F" />}
              <div className="flex-1">
                <div className="text-[16px] text-[#111B21]">{n}</div>
                {sub && <div className="text-[13px] text-[#667781]">{sub}</div>}
              </div>
              <span className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${sel ? 'border-[#008069] bg-[#008069] text-white' : 'border-[#C7CDD1]'}`}>{sel ? '✓' : ''}</span>
            </div>
          ))}
          <div className="px-4 pt-3">
            <div className="text-[13px] font-medium text-[#667781]">{t('invPreview')}</div>
            <Anchor id="inv-share" className="mt-2">
              <div className="rounded-[14px] border border-[#E9EDEF] bg-white p-2 shadow-sm">
                {card}
                <p className="px-1 pt-2 text-[14.5px] leading-snug text-[#111B21]">{t('invMessage')}</p>
              </div>
            </Anchor>
          </div>
          <div className="sticky bottom-0 mt-4 flex justify-end bg-white/90 px-4 py-3" style={{ paddingBottom: 'calc(var(--sab) + 12px)' }}>
            <button type="button" onClick={send} className="flex h-14 w-14 items-center justify-center rounded-full bg-[#008069] text-white shadow-lg" aria-label={t('invSend')}>
              <Send size={22} />
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto bg-[#EFEAE2] px-3 py-3">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="ml-auto max-w-[82%] rounded-lg rounded-tr-none bg-[#D9FDD3] p-1.5 shadow-sm">
            {card}
            <p className="px-1.5 pt-1.5 text-[14.5px] text-[#111B21]">{t('invMessage')}</p>
            <div className="px-1.5 text-right text-[11px] text-[#667781]">9:10 pm ✓✓</div>
          </motion.div>
          <div className="pt-6 text-center">
            <button type="button" onClick={toRohit} className="inline-flex h-12 items-center gap-2 rounded-full bg-mustard px-5 text-[15px] font-semibold text-green-900 shadow-lg">
              <Smartphone size={18} /> {t('invOpenAsRohit')}
            </button>
            <p className="mt-2 text-[12px] text-[#667781]">{t('invDemoHint')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
