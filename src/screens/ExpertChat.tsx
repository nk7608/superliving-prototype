import { Avatar } from '../components/Avatar';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../app/DemoContext';
import { Anchor } from '../notes/Anchor';
import { BottomNav, StreakPill, Wordmark } from '../components/ui';
import { CoachCard } from '../components/CoachCard';
import { neha, rohit } from '../data/personas';

/** S6 — Expert Chat tab (ref 11) with the F2 Tara card and F9a/F9b fixes. */
export function ExpertChat() {
  const { state, t } = useDemo();
  const navigate = useNavigate();
  const first = (state.persona === 'rohit' ? rohit : neha).name.split(' ')[0];
  return (
    <div className="absolute inset-0 flex flex-col bg-cream-bg">
      <header className="relative z-10 rounded-b-[28px] bg-green-900 px-4 pb-4" style={{ paddingTop: 'calc(var(--sat) + 14px)' }}>
        <div className="flex items-center justify-between">
          <Wordmark />
          <div className="flex items-center gap-3">
            <span className="text-[28px]" aria-hidden>🎁</span>
            <button type="button" onClick={() => navigate('/profile')} aria-label="My Profile" className="flex h-[44px] w-[44px] items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#F3E6D8] text-[16px] font-semibold text-green-900">{first[0]}</button>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[16px] text-white">{t('hello', { name: first })}</span>
          <StreakPill />
        </div>
      </header>
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto pb-[110px]">
        <div className="flex items-center justify-between px-4 pt-4">
          <h1 className="text-[20px] font-semibold text-[#1D1D1B]">{t('navExpert')}</h1>
          <span className="flex h-[42px] items-center gap-2 rounded-full border border-[#E2DED2] bg-white px-4 text-[15px] font-medium text-green-600">
            <span aria-hidden>🤖</span> {t('coachCount')}
          </span>
        </div>

        <div className="px-4 pt-4">
          <Anchor id="exp-tara">
            <div className="flex items-center gap-3 rounded-[20px] border border-[#DCE6D4] bg-green-50 p-3">
              <Avatar who="tara" size={48} />
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-semibold text-text-primary">{t('taraCardTitle')}</div>
                <div className="text-[13px] leading-snug text-text-secondary">{t('taraCardSub')}</div>
              </div>
              <button type="button" onClick={() => navigate(state.persona === 'rohit' ? '/rohit-chat' : '/chat/tara')} className="h-10 shrink-0 rounded-full bg-green-700 px-4 text-[15px] font-semibold text-white">
                Chat
              </button>
            </div>
          </Anchor>
        </div>

        <div className="px-4 pb-3 pt-5 text-[14px] font-bold uppercase tracking-[0.1em] text-[#6E6D68]">Picked for you</div>
        <div className="grid grid-cols-2 gap-3 px-4">
          <CoachCard id="rashmi" markLabel />
          <CoachCard id="sandy" />
          <CoachCard id="tara" markCount />
          <CoachCard id="arjun" />
          <CoachCard id="dev" />
        </div>
      </div>
      <BottomNav active="/experts" />
    </div>
  );
}
