import { Avatar } from '../components/Avatar';
import { useRef, useState } from 'react';
import { ChevronRight, Headset, Play, Star, ArrowRight } from 'lucide-react';
import { useAction, useDemo } from '../app/DemoContext';
import { Anchor } from '../notes/Anchor';
import { AppHeader, BottomNav, StreakPill, Thumb } from '../components/ui';
import { StepCard, StreakSheet } from '../components/StepCard';
import { PriceSheet } from '../components/PriceSheet';
import { CoachCard, WhoMakesSheet } from '../components/CoachCard';
import { exclusiveVideos } from '../data/videos';

function BloodCard({ name, tests, old, price, icon, tint, best = false }: { name: string; tests: string; old: string; price: string; icon: string; tint: string; best?: boolean }) {
  const { t } = useDemo();
  return (
    <div className={`w-[205px] shrink-0 overflow-hidden rounded-[18px] bg-card ${best ? 'border-[2px] border-mustard-light' : 'border border-[#ECE8DC]'}`}>
      <div className="relative flex h-[104px] items-center justify-center" style={{ background: tint }}>
        {best && (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-mustard-light px-2 py-[3px] text-[14px] font-bold text-[#2B2205]">
            <span aria-hidden>⭐</span> {t('mostSelling')}
          </span>
        )}
        <span className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-white/50 text-[32px]" aria-hidden>{icon}</span>
      </div>
      <div className="px-3 pb-3 pt-2.5">
        <div className="min-h-[44px] text-[16px] font-bold leading-tight text-[#1D1D1B]">{name}</div>
        <div className="text-[14px] text-text-secondary">{tests}</div>
        <div className="mt-2 text-[13px] text-[#8A8A86] line-through">{old}</div>
        <div className="text-[18px] font-bold text-[#1D1D1B]">{price}</div>
        <button type="button" className="mt-2.5 h-[52px] w-full rounded-[14px] bg-green-700 text-[16px] font-semibold text-white">{t('book')}</button>
      </div>
    </div>
  );
}

function CourseCard({ title, chips, reviews, old, price, art, artBg }: { title: string; chips: string[]; reviews: string; old: string; price: string; art: string; artBg: string }) {
  const { t } = useDemo();
  return (
    <div className="overflow-hidden rounded-card border border-[#ECE8DC] bg-card">
      <div className="flex gap-3 p-3">
        <div className="flex h-[150px] w-[104px] shrink-0 items-center justify-center rounded-[14px] p-2 text-center text-[15px] font-extrabold uppercase leading-tight text-[#2A3D2A]" style={{ background: artBg }}>
          {art}
        </div>
        <div className="min-w-0 flex-1 pt-6">
          <div className="text-[18px] font-semibold leading-snug text-[#1D1D1B]">{title}</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {chips.map((c) => (
              <span key={c} className="rounded-md bg-[#EEF0E6] px-2 py-[3px] text-[12px] text-[#3A3A36]">✅ {c}</span>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between text-[14px]">
            <span className="flex items-center gap-1 text-mustard"><Star size={14} fill="#E2C04C" /> <span className="text-[#B9962E]">{reviews}</span></span>
            <span className="flex items-center text-text-secondary">{t('details')} <ChevronRight size={14} /></span>
          </div>
        </div>
      </div>
      <div className="border-t border-[#ECE8DC] p-3">
        <button type="button" className="flex h-[48px] w-full items-center justify-center gap-1.5 rounded-[14px] bg-green-700 text-[15px] text-white">
          {t('startCourseA')} <span className="line-through opacity-70">{old}</span> {price} {t('perMonthLong')} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export function Home() {
  const { t } = useDemo();
  const [streak, setStreak] = useState(false);
  const [price, setPrice] = useState(false);
  const [who, setWho] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);

  useAction('scroll-stories', () => storiesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  useAction('open-price', () => setPrice(true));
  useAction('open-streak', () => setStreak(true));

  const stories = [
    { n: t('story1'), q: t('story1q'), tag: t('story1t'), bg: 'linear-gradient(170deg,#C9673A,#7A2E1F)', who: 'sunita' as const },
    { n: t('story2'), q: t('story2q'), tag: t('story2t'), bg: 'linear-gradient(170deg,#3F6E8C,#1F3346)', who: 'imran' as const },
    { n: t('story3'), q: t('story3q'), tag: t('story3t'), bg: 'linear-gradient(170deg,#4E7A45,#22391D)', who: 'kavya' as const },
  ];

  return (
    <div className="absolute inset-0 flex flex-col bg-cream-bg">
      <AppHeader
        right={
          <Anchor id="home-streak">
            <StreakPill onClick={() => setStreak(true)} />
          </Anchor>
        }
      />
      <div ref={scroller} className="no-scrollbar min-h-0 flex-1 overflow-y-auto pb-[110px]">
        <div className="px-4 pt-4">
          <Anchor id="home-step">
            <StepCard />
          </Anchor>
        </div>

        <h2 className="px-4 pb-3 pt-6 text-[20px] font-bold text-text-primary">{t('homeBlood')}</h2>
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
          <BloodCard best name={t('fullBody')} tests={t('tests10')} old="₹3800" price="₹1299" icon="🧍" tint="#E6E2F6" />
          <BloodCard name={t('energyTest')} tests={t('tests4')} old="₹1746" price="₹799" icon="🩸" tint="#E3F0E1" />
          <BloodCard name={t('detoxTest')} tests={t('tests3')} old="₹1099" price="₹699" icon="🫁" tint="#DDE9F6" />
        </div>

        <h2 className="px-4 pb-3 pt-7 text-[20px] font-bold text-text-primary">{t('exclusive')}</h2>
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4">
          {exclusiveVideos.map((v) => (
            <Thumb key={v.title} v={v} w={136} h={216} />
          ))}
        </div>

        <h2 className="px-4 pb-3 pt-7 text-[20px] font-bold text-text-primary">{t('superPlans')}</h2>
        <div className="space-y-4 px-4">
          <div className="relative">
            <span className="absolute right-0 top-[18px] z-[1] rounded-l-md bg-mustard-light px-2.5 py-[3px] text-[12px] font-bold tracking-wide text-[#3B2E05]">{t('personalised')}</span>
            <CourseCard title={t('course1')} chips={[t('course1a'), t('course1b'), t('course1c')]} reviews={t('reviews12k')} old="₹999" price="₹189" art="Fix Work-Life Balance" artBg="#DCE9DF" />
          </div>
          <CourseCard title={t('course2')} chips={[t('course2a'), t('course2b'), t('course2c')]} reviews={t('reviews16k')} old="₹449" price="₹159" art="15-Days Sleep Routine Reset" artBg="#9FCB98" />
        </div>

        <h2 className="px-4 pb-3 pt-7 text-[20px] font-bold text-text-primary">{t('freeChats')}</h2>
        <div className="grid grid-cols-2 gap-3 px-4">
          <CoachCard id="tara" />
          <CoachCard id="rashmi" />
        </div>

        <div className="px-4 pt-6">
          <Anchor id="home-upgrade">
            <div className="rounded-[22px] bg-green-900b px-5 py-6 text-center">
              <div className="text-[19px] font-bold text-white">{t('proTitle')}</div>
              <div className="mt-1.5 text-[15px] leading-snug text-white/85">{t('proBody')}</div>
              <button type="button" onClick={() => setPrice(true)} className="mt-5 flex h-[60px] w-full items-center justify-center gap-1.5 rounded-[14px] bg-gold-cta text-[17px] font-semibold text-[#2E2405]">
                {t('proCta')} <ArrowRight size={18} />
              </button>
            </div>
          </Anchor>
        </div>

        <h2 className="px-4 pb-3 pt-7 text-[19px] font-bold text-text-primary">{t('createdBy')}</h2>
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4">
          {([
            { n: t('expertName1'), r: t('expertRole1'), w: 'yoga' },
            { n: t('expertName2'), r: t('expertRole2'), w: 'advisor' },
          ] as const).map((e) => (
            <button key={e.n} type="button" onClick={() => setWho(true)} className="flex w-[270px] shrink-0 items-center gap-3 rounded-[18px] border border-[#ECE8DC] bg-card p-3 text-left">
              <Avatar who={e.w} size={58} square />
              <div>
                <div className="text-[16px] font-semibold">{e.n}</div>
                <div className="text-[13px] leading-snug text-text-secondary">{e.r}</div>
              </div>
            </button>
          ))}
        </div>

        <div ref={storiesRef} className="px-4 pt-7">
          <Anchor id="home-stories">
            <div>
              <h2 className="text-[19px] font-bold text-text-primary">{t('storiesTitle')}</h2>
              <p className="text-[13px] text-text-secondary">{t('storiesSub')}</p>
              <div className="no-scrollbar -mx-4 mt-3 flex gap-3 overflow-x-auto px-4">
                {stories.map((s) => (
                  <div key={s.n} className="w-[168px] shrink-0">
                    <div className="relative h-[250px] overflow-hidden rounded-[16px]" style={{ background: s.bg }}>
                      <div className="absolute inset-x-0 top-[28px] flex justify-center"><Avatar who={s.who} size={92} className="border-[3px] border-white/70" /></div>
                      <div className="absolute left-1/2 top-[132px] flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm"><Play size={17} fill="#fff" color="#fff" /></div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2.5 pt-8">
                        <div className="text-[13px] font-semibold text-white">{s.n}</div>
                        <div className="text-[12px] leading-snug text-white/90">{s.q}</div>
                      </div>
                    </div>
                    <div className="mt-1.5 text-[12px] font-medium text-text-primary">{s.tag}</div>
                    <div className="mt-0.5 flex items-center gap-1 text-[11.5px] text-green-600">✓ {t('storyReal')}</div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[12px] text-text-secondary">{t('storyVary')}</p>
            </div>
          </Anchor>
        </div>

        <div className="px-4 pt-6">
          <div className="flex items-center gap-3 rounded-[18px] border border-[#ECE8DC] bg-card px-4 py-3">
            <Headset size={24} className="text-green-700" />
            <div className="flex-1 text-[14px] leading-snug text-[#2D4A27]">
              {t('support')}
              <br />
              {t('supportHours')}
            </div>
            <ChevronRight size={20} className="text-green-700" />
          </div>
        </div>
      </div>
      <BottomNav active="/home" />
      <StreakSheet open={streak} onClose={() => setStreak(false)} />
      <PriceSheet open={price} onClose={() => setPrice(false)} />
      <WhoMakesSheet open={who} onClose={() => setWho(false)} />
    </div>
  );
}
