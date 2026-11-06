import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, Users, MapPin, BadgeCheck, CalendarDays } from 'lucide-react';
import { useAction, useDemo, wait } from '../app/DemoContext';
import { Anchor } from '../notes/Anchor';
import { BottomNav, Sheet, PrimaryButton, Toast } from '../components/ui';
import { WhatsAppGlyph } from '../components/Chat';

/** S15 — Do it together (live now) and Find your people (Roadmap · not live). */
export function Together() {
  const { t } = useDemo();
  const navigate = useNavigate();
  const [view, setView] = useState<'now' | 'roadmap'>('now');
  const [join, setJoin] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const flash = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 2000);
  };

  useAction('roadmap', async () => {
    setView('now');
    await wait(1400);
    setView('roadmap');
  });
  useAction('open-together', () => setView('now'));
  useAction('open-join', () => {
    setView('roadmap');
    setJoin('walk');
  });

  const clubs = [
    { id: 'walk', name: t('club1'), meta: t('club1m'), icon: '🚶‍♀️', verified: true },
    { id: 'kitchen', name: t('club2'), meta: t('club2m'), icon: '🍲' },
    { id: 'stretch', name: t('club3'), meta: t('club3m'), icon: '🧘' },
    { id: 'women', name: t('club4'), meta: t('club4m'), icon: '👭' },
  ];

  return (
    <div className="absolute inset-0 flex flex-col bg-cream-bg">
      <header className="flex items-center gap-2 bg-green-900 px-2 pb-3 text-white" style={{ paddingTop: 'calc(var(--sat) + 10px)' }}>
        <button type="button" onClick={() => (view === 'roadmap' ? setView('now') : navigate(-1))} className="flex h-11 w-10 items-center justify-center" aria-label="Back"><ChevronLeft size={26} /></button>
        <span className="flex-1 text-[19px] font-semibold">{view === 'now' ? t('togTitle') : t('roadTitle')}</span>
        {view === 'roadmap' && (
          <span className="mr-2 rounded-full border-[1.5px] border-dashed border-[#9AA5FF] px-2 py-[2px] font-['system-ui'] text-[11px] font-semibold text-[#C9CFFF]">Roadmap · not live</span>
        )}
      </header>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-[110px] pt-4">
        {view === 'now' ? (
          <>
            <Anchor id="tog-sheet">
              <div className="space-y-3">
                <p className="text-[15px] text-text-secondary">{t('togSub')}</p>
                <div className="rounded-card border border-[#E4DFCF] bg-card p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-gold-bg text-[24px]" aria-hidden>🧘‍♀️</span>
                    <div className="flex-1">
                      <div className="text-[17px] font-semibold">{t('togYoga')}</div>
                      <div className="text-[13px] text-text-secondary">{t('togYogaSub')}</div>
                    </div>
                  </div>
                  <PrimaryButton full className="mt-3" onClick={() => flash(t('togReminder'))}>{t('togYogaCta')}</PrimaryButton>
                </div>
                <div className="rounded-card border border-[#E4DFCF] bg-card p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#EAF8EC]"><WhatsAppGlyph size={26} /></span>
                    <div className="flex-1">
                      <div className="text-[17px] font-semibold">{t('togCommunity')}</div>
                      <div className="text-[13px] text-text-secondary">{t('togCommunitySub')}</div>
                    </div>
                  </div>
                  <button type="button" onClick={() => flash(t('demoOnly'))} className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#A6DDB0] bg-[#EAF8EC] text-[16px] font-semibold text-[#25A244]">
                    <WhatsAppGlyph /> Join
                  </button>
                </div>
              </div>
            </Anchor>
            <button type="button" onClick={() => setView('roadmap')} className="mt-5 w-full rounded-card border-[1.5px] border-dashed border-[#3B4CCA] bg-white p-4 text-left">
              <span className="font-['system-ui'] text-[11px] font-semibold uppercase tracking-wide text-[#3B4CCA]">Roadmap · not live</span>
              <span className="mt-1 block text-[17px] font-semibold text-text-primary">{t('roadTitle')} →</span>
              <span className="text-[14px] text-text-secondary">{t('roadTeaser')}</span>
            </button>
          </>
        ) : (
          <div className="rounded-[24px] border-[1.5px] border-dashed border-[#3B4CCA] p-3">
            <p className="text-[15px] text-text-secondary">{t('roadSub')}</p>
            <Anchor id="road-clubs" className="mt-3">
              <div className="space-y-2.5">
                {clubs.map((c) => (
                  <button key={c.id} type="button" onClick={() => setJoin(c.id)} className="flex w-full items-center gap-3 rounded-[18px] border border-[#E4DFCF] bg-card p-3 text-left">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-green-50 text-[24px]" aria-hidden>{c.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15.5px] font-semibold leading-snug">{c.name}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-text-secondary">{c.meta}</span>
                    </span>
                    {c.verified && <BadgeCheck size={20} className="shrink-0 text-green-600" />}
                  </button>
                ))}
              </div>
            </Anchor>
            <div className="mt-3 flex items-center gap-2 rounded-[16px] bg-green-50 p-3 text-[14.5px] text-green-700">
              <Users size={18} /> {t('roadGoal')}
            </div>
            <Anchor id="road-phases" className="mt-4">
              <div className="rounded-[18px] bg-white p-3.5">
                <div className="text-[15px] font-semibold">{t('roadPhases')}</div>
                <ol className="mt-2 space-y-3">
                  {['phase1', 'phase2', 'phase3'].map((k, i) => (
                    <li key={k} className="flex gap-3">
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${i === 0 ? 'bg-green-700 text-white' : 'border-[1.5px] border-dashed border-[#A8B3A0] text-[#6E7A66]'}`}>{i + 1}</span>
                      <div>
                        <div className="text-[13px] font-semibold uppercase tracking-wide text-text-secondary">{t(`${k}When`)}</div>
                        <div className="text-[14.5px] leading-snug">{t(k)}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Anchor>
          </div>
        )}
      </div>
      <BottomNav active="/home" />

      <Sheet open={!!join} onClose={() => setJoin(null)} label={t('joinTitle')}>
        <div className="px-5 pb-2">
          <span className="font-['system-ui'] text-[11px] font-semibold uppercase tracking-wide text-[#3B4CCA]">Roadmap · not live</span>
          <h3 className="mt-1 text-[19px] font-semibold">{clubs.find((c) => c.id === join)?.name}</h3>
          <div className="mt-1 flex items-center gap-3 text-[13px] text-text-secondary">
            <span className="flex items-center gap-1"><MapPin size={13} /> Kanpur</span>
            <span className="flex items-center gap-1"><CalendarDays size={13} /> {t('joinWhen')}</span>
          </div>
          <Anchor id="road-join" className="mt-3">
            <div className="rounded-[16px] border border-[#CFE3C8] bg-green-50 p-3">
              <div className="flex items-center gap-2 text-[15px] font-semibold text-green-700"><ShieldCheck size={18} /> {t('joinPrivacyTitle')}</div>
              <p className="mt-1 text-[14.5px] text-text-primary">{t('joinPrivacy')}</p>
            </div>
          </Anchor>
          <PrimaryButton full className="mt-4" onClick={() => { setJoin(null); flash(t('roadNotLive')); }}>{t('joinCta')}</PrimaryButton>
        </div>
      </Sheet>
      <Toast show={!!toast}>{toast}</Toast>
    </div>
  );
}
