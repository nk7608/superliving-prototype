import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, CalendarClock, UserCheck } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { report } from '../data/report';
import { Anchor } from '../notes/Anchor';
import { BottomNav, Initials } from '../components/ui';
import { Ring } from './Health';

/** S16 — Day-30 snapshot: days not kilos, retest countdown, a person at the plateau. */
export function Day30() {
  const { state, t } = useDemo();
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);
  const done = 21;
  const weeks = [5, 6, 4, 6]; // synthetic: days with the step done in each of the 4 weeks (sums to 21)

  return (
    <div className="absolute inset-0 flex flex-col bg-cream-bg">
      <header className="bg-green-900 px-4 pb-4 text-white" style={{ paddingTop: 'calc(var(--sat) + 12px)' }}>
        <div className="text-[13px] text-white/70">{t('d30Date')}</div>
        <div className="text-[22px] font-semibold">{t('d30Title')}</div>
      </header>
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-[110px] pt-4">
        <Anchor id="d30-progress">
          <div className="rounded-card border border-[#E4DFCF] bg-card p-4">
            <div className="flex items-center gap-4">
              <Ring value={done} total={30} size={86} />
              <div>
                <div className="text-[28px] font-bold leading-none text-text-primary">{done}/30</div>
                <div className="mt-1 text-[15px] text-text-secondary">{t('d30Days')}</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {weeks.map((w, i) => (
                <div key={i} className="rounded-xl bg-[#F4F1E6] p-2 text-center">
                  <div className="text-[12px] text-text-secondary">{t('d30Week', { n: i + 1 })}</div>
                  <div className="text-[17px] font-semibold">{w}/7</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[14px] text-text-primary">{t('d30Habit')}</p>
          </div>
        </Anchor>

        <Anchor id="d30-voice" className="mt-4">
          <div className="rounded-card border border-[#D7CBEA] bg-white p-4">
            <div className="flex items-center gap-3">
              <Initials name="Ritu RD" size={46} bg="#EDE5F7" fg="#5B3B8C" />
              <div className="flex-1">
                <div className="text-[16px] font-semibold">Ritu, RD</div>
                <div className="flex items-center gap-1 text-[12.5px] font-medium text-[#5B3B8C]"><UserCheck size={14} /> {t('d30Human')}</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-[18px] bg-[#F4EEFB] p-3">
              <button type="button" onClick={() => setPlaying((p) => !p)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5B3B8C] text-white" aria-label={playing ? 'Pause' : 'Play'}>
                {playing ? <Pause size={16} fill="#fff" /> : <Play size={16} fill="#fff" />}
              </button>
              <span className="flex flex-1 items-center gap-[3px]" aria-hidden>
                {Array.from({ length: 30 }).map((_, i) => <span key={i} className={`w-[3px] rounded-full ${playing && i < 14 ? 'bg-[#5B3B8C]' : 'bg-[#BFAEDB]'}`} style={{ height: 4 + ((i * 31) % 20) }} />)}
              </span>
              <span className="text-[12px] text-[#5B3B8C]">0:24</span>
            </div>
            <p className="mt-2 text-[15px] italic leading-snug text-text-primary">“{t('d30Voice')}”</p>
            <p className="mt-1 text-[12.5px] text-text-secondary">{t('d30Why')}</p>
          </div>
        </Anchor>

        <Anchor id="d30-retest" className="mt-4">
          <div className="flex items-center gap-3 rounded-card border border-[#E4DFCF] bg-card p-4">
            <CalendarClock size={26} className="shrink-0 text-green-700" />
            <div className="flex-1">
              <div className="text-[16px] font-semibold">{t('d30Retest', { date: report.retestDay90 })}</div>
              <div className="text-[13.5px] text-text-secondary">{t('d30RetestSub')}</div>
            </div>
            <span className="rounded-full bg-green-50 px-3 py-1 text-[14px] font-semibold text-green-700">60 {t('d30DaysLeft')}</span>
          </div>
        </Anchor>

        <div className="mt-4 rounded-card border border-[#E4DFCF] bg-card p-4">
          <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#8A7A3A]">{t('stepTitle')}</div>
          <p className="mt-1 text-[17px] font-semibold">{t('stepNeha1')}</p>
          {state.invited && state.rohitShares && <p className="mt-2 text-[14px] text-green-700">{t('rohitDidStep')}</p>}
        </div>

        <button type="button" onClick={() => navigate('/changes')} className="mt-5 h-12 w-full rounded-full border-[1.5px] border-[#3B4CCA] bg-white font-['system-ui'] text-[15px] font-semibold text-[#3B4CCA]">
          See all changes →
        </button>
      </div>
      <BottomNav active="/health" />
    </div>
  );
}
