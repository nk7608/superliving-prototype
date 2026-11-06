import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Users } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { knows } from '../data/memory';
import { Sheet, PrimaryButton } from './ui';

/** Step list for the current persona, respecting forgotten memory (F1 → F3). */
export function useSteps() {
  const { state, t } = useDemo();
  if (state.persona === 'rohit') {
    return [
      { text: t('stepRohit0'), reason: t('stepReasonRohit') },
      { text: t('stepRohit1'), reason: t('stepReasonRohit2') },
    ];
  }
  const hasReport = state.report !== 'none' && knows(state, 'report');
  const list = [
    { text: t('stepNeha0'), reason: hasReport ? t('stepReasonPost') : knows(state, 'morningCook') ? t('stepReasonPre') : t('stepReasonPreNoCook') },
    { text: t('stepNeha1'), reason: hasReport ? t('stepReason1') : t('stepReason1Pre') },
  ];
  if (knows(state, 'vrat')) list.push({ text: t('stepNeha2'), reason: t('stepReason2') });
  return list;
}

function Confetti() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  const colors = ['#E2C04C', '#7BC67E', '#38592D', '#F2B84B', '#E8F5E9'];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 22 }).map((_, i) => {
        const x = (i % 11) * 9 + 4;
        return (
          <motion.span
            key={i}
            className="absolute top-[40%] h-[7px] w-[5px] rounded-[1px]"
            style={{ left: `${x}%`, background: colors[i % colors.length] }}
            initial={{ y: 0, opacity: 1, rotate: 0 }}
            animate={{ y: [-10 - (i % 5) * 14, 90], x: (i % 2 ? 1 : -1) * (6 + (i % 4) * 5), opacity: [1, 1, 0], rotate: 220 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}

export function StepCard({ compact = false }: { compact?: boolean }) {
  const { state, set, t, markStep } = useDemo();
  const navigate = useNavigate();
  const steps = useSteps();
  const p = state.persona;
  const i = state.stepIndex[p] % steps.length;
  const step = steps[i];
  const next = steps[(i + 1) % steps.length];
  const status = state.today[p];
  const [burst, setBurst] = useState(0);
  const [games, setGames] = useState(false);
  const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

  return (
    <section className="relative overflow-hidden rounded-card border border-[#E4DFCF] bg-card p-4" aria-label={t('stepTitle')}>
      <AnimatePresence>{burst > 0 && <Confetti key={burst} />}</AnimatePresence>
      <div className="flex items-center justify-between">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#8A7A3A]">{t('stepTitle')}</h2>
        {status === 'done' && <span className="rounded-full bg-green-50 px-2 py-[2px] text-[12px] font-semibold text-green-600">✓</span>}
      </div>
      <p className={`mt-1.5 font-semibold leading-snug text-text-primary ${compact ? 'text-[16px]' : 'text-[18px]'}`}>{step.text}</p>
      <p className="mt-1.5 text-[13px] leading-snug text-text-secondary">{step.reason}</p>

      {status === 'pending' && (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => {
              markStep('done');
              setBurst((b) => b + 1);
            }}
            className="flex h-10 flex-1 items-center justify-center rounded-full bg-green-700 text-[15px] font-semibold text-white"
          >
            {t('stepDone')}
          </button>
          <button type="button" onClick={() => markStep('skipped')} className="h-10 rounded-full border border-[#D9D3BF] bg-white px-3.5 text-[14px] font-medium text-text-primary">
            {t('stepSkip')}
          </button>
          <button
            type="button"
            onClick={() => set((s) => ({ stepIndex: { ...s.stepIndex, [p]: s.stepIndex[p] + 1 } }))}
            className="h-10 rounded-full border border-[#D9D3BF] bg-white px-3.5 text-[14px] font-medium text-text-primary"
          >
            {t('stepSwap')}
          </button>
        </div>
      )}

      {status === 'done' && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-2xl bg-green-50 p-3">
          <p className="text-[15px] font-semibold text-green-700">{t('stepShabaash', { next: lowerFirst(next.text) })}</p>
          <button type="button" onClick={() => setGames(true)} className="hit mt-1.5 text-[13px] text-green-600 underline decoration-dotted underline-offset-2">
            {t('stepBonus')}
          </button>
        </motion.div>
      )}

      {status === 'skipped' && (
        <div className="mt-3 flex items-center justify-between gap-2 rounded-2xl bg-[#F4F1E6] p-3">
          <p className="text-[14px] leading-snug text-text-primary">{t('stepSkipped')}</p>
          <button type="button" onClick={() => markStep('pending')} className="hit shrink-0 text-[13px] font-medium text-green-600 underline">
            {t('stepUndo')}
          </button>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-[#EFEBDD] pt-2.5">
        <button type="button" onClick={() => navigate('/health?to=day90')} className="hit flex items-center gap-1 text-[13px] font-medium text-green-700">
          {t('stepFooter')} <ChevronRight size={14} />
        </button>
        <button type="button" onClick={() => navigate('/together')} className="hit flex items-center gap-1 text-[12px] text-text-secondary">
          <Users size={13} /> {t('stepTogether')}
        </button>
      </div>

      <Sheet open={games} onClose={() => setGames(false)} label={t('gamesTitle')}>
        <div className="px-5 pb-2">
          <div className="flex h-[120px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#4B2AA8] to-[#7A3FD8] text-[44px]" aria-hidden>🧠⚡</div>
          <h3 className="mt-3 text-[20px] font-semibold">{t('gamesTitle')}</h3>
          <p className="mt-1 text-[15px] text-text-secondary">{t('gamesBody')}</p>
          <PrimaryButton full className="mt-4" onClick={() => setGames(false)}>{t('gamesPlay')}</PrimaryButton>
        </div>
      </Sheet>
    </section>
  );
}

export function StreakSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, t } = useDemo();
  const p = state.persona;
  const n = state.weekDays[p];
  const labels = t('days').split(',');
  // Demo week: today is the first day of the week for the hero journey.
  return (
    <Sheet open={open} onClose={onClose} label={t('streakSheetTitle')}>
      <div className="px-5 pb-3">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-streak-bg text-[24px]" aria-hidden>🔥</span>
          <div>
            <h3 className="text-[20px] font-semibold">{t('streakSheetTitle')}: {n}</h3>
            <p className="text-[15px] text-text-primary">{t('streakDef')}</p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-[#E4DFCF] bg-white p-3">
          <div className="text-[13px] font-medium text-text-secondary">{t('streakWeek')}</div>
          <div className="mt-2 flex justify-between">
            {labels.map((d, i) => {
              const done = i < n;
              const skipped = !done && i === n && state.today[p] === 'skipped';
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full text-[14px] font-semibold ${done ? 'bg-green-700 text-white' : skipped ? 'border-2 border-dashed border-[#C9BE95] text-[#9C8F5E]' : 'bg-[#F1EFE7] text-[#B2AE9F]'}`}>
                    {done ? '✓' : skipped ? '·' : ''}
                  </span>
                  <span className="text-[12px] text-text-secondary">{d}</span>
                </div>
              );
            })}
          </div>
        </div>
        <ul className="mt-3 space-y-2 text-[14px] text-text-primary">
          <li>• {t('streakForgive')}</li>
          <li>• {t('streakSame')}</li>
        </ul>
      </div>
    </Sheet>
  );
}
