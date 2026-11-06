import { useState } from 'react';
import { Play, Pause, ThumbsUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAction, useDemo, wait } from '../app/DemoContext';
import { coachMeta } from '../data/coaches';
import { knows } from '../data/memory';
import { neha, rohit } from '../data/personas';
import { originals, similarNeha, similarRohit, tarasTen, top10 } from '../data/videos';
import { Anchor } from '../notes/Anchor';
import { BottomNav, Face, Sheet, Thumb } from '../components/ui';

/** S11 — SuperTV with one pick, one reason (F5). */
export function SuperTV() {
  const { state, set, t } = useDemo();
  const isRohit = state.persona === 'rohit';
  const vrat = !isRohit && knows(state, 'vrat');
  const [all, setAll] = useState(false);
  const [player, setPlayer] = useState(false);
  const [pos, setPos] = useState(0);
  const [watched, setWatched] = useState(false);
  const [locked, setLocked] = useState<string | null>(null);
  const first = (isRohit ? rohit : neha).name.split(' ')[0];

  const pick = isRohit
    ? { title: t('pickRohitTitle'), meta: t('pickRohitMeta'), reason: t('pickRohitReason'), bg: 'linear-gradient(160deg,#E9DFCB,#BFA97A)', fg: '#5A2A10', emoji: '🧘‍♂️' }
    : vrat
      ? { title: t('pickNehaTitle'), meta: t('pickNehaMeta'), reason: t('pickNehaReason'), bg: 'linear-gradient(160deg,#C9673A,#6E2414)', fg: '#FFE7B0', emoji: '🪔' }
      : { title: t('pickNehaFallback'), meta: t('pickNehaFallbackMeta'), reason: t('pickNehaFallbackReason'), bg: 'linear-gradient(160deg,#6B2E5C,#2E1430)', fg: '#FFE7F4', emoji: '💇‍♀️' };

  const play = async () => {
    setPlayer(true);
    setWatched(false);
    setPos(0);
    for (let i = 1; i <= 10; i++) {
      await wait(220);
      setPos(i * 10);
    }
    setWatched(true);
    await wait(700); // video ended: close the player so "Kaam ka laga?" is visible
    setPlayer(false);
  };
  useAction('tv-watch', play);
  useAction('tv-all', () => setAll(true));

  return (
    <div className="absolute inset-0 flex flex-col bg-[#F5F3EC]">
      <div className="shrink-0 bg-green-900" style={{ height: 'calc(var(--sat) + 22px)' }} />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto pb-[110px]">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pt-3">
          {['All', 'Weight Control', 'Skin Care', 'Hair Care', 'Festive & Spiritual'].map((c, i) => (
            <span key={c} className={`flex h-[44px] shrink-0 items-center rounded-full px-4 text-[15px] font-medium ${i === 0 ? 'bg-green-900 text-white' : 'border-[1.5px] border-[#D8D4C6] bg-white text-[#1D1D1B]'}`}>{c}</span>
          ))}
        </div>

        <h2 className="px-4 pb-2 pt-3 text-[19px] font-medium text-[#1D1D1B]">Top 10 in India Today</h2>
        <div className="no-scrollbar flex gap-1 overflow-x-auto px-4">
          {top10.map((v, i) => (
            <div key={v.title} className="flex shrink-0 items-end">
              <span className="-mr-3 text-[110px] font-light leading-[0.8] text-transparent" style={{ WebkitTextStroke: '2.5px #22391D' }}>{i + 1}</span>
              <Thumb v={v} w={124} h={196} />
            </div>
          ))}
        </div>

        <h2 className="px-4 pb-2 pt-6 text-[19px] font-medium text-[#1D1D1B]">{t('pickedForYou')}</h2>
        <div className="px-4">
          <Anchor id="tv-banner">
            <div className="flex items-center gap-3 rounded-[18px] bg-green-900 px-4 py-3">
              <Face spec={coachMeta.tara.face} className="h-12 w-12 shrink-0 rounded-[10px]" />
              <div className="text-white">
                <div className="flex items-center gap-2"><span className="text-[15px] font-semibold">Tara</span><span className="rounded-full bg-white/15 px-2 py-[1px] text-[10px] font-semibold tracking-wide">YOUR COACH</span></div>
                <div className="mt-0.5 text-[14px] leading-snug text-white/90">{t('tvBanner', { name: first, reason: pick.reason })}</div>
              </div>
            </div>
          </Anchor>

          <Anchor id="tv-card" className="mt-3">
            <button type="button" onClick={play} className="relative block h-[210px] w-full overflow-hidden rounded-[20px] text-left" style={{ background: pick.bg }}>
              <div className="absolute left-4 top-4 max-w-[70%] text-[24px] font-extrabold uppercase leading-[1.05]" style={{ color: pick.fg }}>{pick.title}</div>
              <div className="absolute bottom-4 right-6 text-[72px]" aria-hidden>{pick.emoji}</div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white"><Play size={18} fill="#22391D" color="#22391D" /></span>
                <span className="rounded-full bg-black/35 px-2.5 py-1 text-[13px] font-semibold text-white">{pick.meta}</span>
              </div>
            </button>
          </Anchor>

          {watched && (
            <Anchor id="tv-feedback" className="mt-3">
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-[18px] border border-[#E4DFCF] bg-white p-3.5">
                {state.tvFeedback ? (
                  <p className="text-[15px] text-green-700">{state.tvFeedback === 'yes' ? t('tvThanks') : t('tvMore')}</p>
                ) : (
                  <>
                    <div className="text-[16px] font-semibold">{t('tvUseful')}</div>
                    <div className="mt-2 flex gap-2">
                      <button type="button" onClick={() => set({ tvFeedback: 'yes' })} className="flex h-10 items-center gap-1.5 rounded-full bg-green-700 px-4 text-[15px] font-semibold text-white"><ThumbsUp size={15} /> {t('tvYes')}</button>
                      <button type="button" onClick={() => set({ tvFeedback: 'more' })} className="h-10 rounded-full border border-[#CFD8C6] px-4 text-[15px] font-medium text-green-700">{t('tvOther')}</button>
                    </div>
                  </>
                )}
              </motion.div>
            </Anchor>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[15px] font-medium text-[#1D1D1B]">{t('tvSimilar')}</span>
            <Anchor id="tv-all">
              <button type="button" onClick={() => setAll(true)} className="flex min-h-[44px] items-center gap-0.5 text-[14px] font-medium text-green-700">{t('tvSeeAll')} <ChevronRight size={16} /></button>
            </Anchor>
          </div>
          <div className="flex gap-3">
            {(isRohit ? similarRohit : similarNeha).map((v) => <Thumb key={v.title} v={v} w={120} h={170} />)}
          </div>
        </div>

        <h2 className="px-4 pb-2 pt-6 text-[19px] font-medium text-[#1D1D1B]">SuperTV Originals</h2>
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4">
          {originals.map((o) => (
            <div key={o.title} className="flex h-[150px] w-[300px] shrink-0 flex-col justify-between rounded-[18px] border-2 border-mustard p-3" style={{ background: o.bg }}>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-mustard">SUPERTV</span>
              <span className="text-[22px] font-bold" style={{ color: o.fg }}>{o.emoji} {o.title}</span>
              <span className="text-[12px] text-white/80">{o.views}</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="/tv" />

      <Sheet open={player} onClose={() => setPlayer(false)} label={pick.title} dark>
        <div className="px-4 pb-2">
          <div className="flex h-[200px] items-center justify-center rounded-[18px] text-[64px]" style={{ background: pick.bg }} aria-hidden>{pick.emoji}</div>
          <div className="mt-3 text-[18px] font-semibold">{pick.title}</div>
          <div className="text-[13px] text-white/70">{pick.meta}</div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-mustard transition-all" style={{ width: `${pos}%` }} /></div>
          <div className="mt-3 flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-green-900">{watched ? <Play size={18} fill="#22391D" /> : <Pause size={18} fill="#22391D" />}</span>
            {watched && <button type="button" onClick={() => setPlayer(false)} className="h-11 rounded-full bg-white/15 px-5 text-[15px] font-semibold">{t('tvBack')}</button>}
          </div>
        </div>
      </Sheet>

      <Sheet open={all} onClose={() => setAll(false)} label={t('tvAllTitle')} full>
        <div className="px-4">
          <h3 className="text-[20px] font-semibold">{t('tvAllTitle')}</h3>
          <p className="text-[14px] text-text-secondary">{t('tvAllSub')}</p>
          <Anchor id="tv-all-grid" className="mt-3">
            <div className="grid grid-cols-3 gap-2.5">
              {tarasTen.map((v) => (
                <div key={v.title}>
                  <Thumb v={v} w={110} h={168} showPrice onClick={() => v.locked && setLocked(v.price ?? '')} />
                  <div className="mt-1 truncate text-[13px]">{v.title}</div>
                </div>
              ))}
            </div>
          </Anchor>
          {locked && <p className="mt-3 rounded-xl bg-gold-bg p-3 text-[14px]">{t('tvLockedNote', { price: locked })}</p>}
        </div>
      </Sheet>
    </div>
  );
}
