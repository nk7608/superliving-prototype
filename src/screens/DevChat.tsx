import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { knows } from '../data/memory';
import { Anchor } from '../notes/Anchor';
import { ChatBody, ChatHeader, ChatInput, CoachBubble, DayDivider, QuickReplies, UserBubble } from '../components/Chat';
import { MeSheet } from '../components/MeSheet';
import { Sheet, PrimaryButton } from '../components/ui';

/** S10 — handoff from Tara to Dev with a visible, editable context summary (F2). */
export function DevChat() {
  const { state, t } = useDemo();
  const [me, setMe] = useState(false);
  const [editCtx, setEditCtx] = useState(false);
  const [reply, setReply] = useState<string | null>(null);
  const hasReport = state.report !== 'none' && knows(state, 'report');
  const loc = useLocation();
  const handoff = Boolean((loc.state as { handoff?: boolean } | null)?.handoff) || state.tourActive;

  const all = [
    ...(hasReport ? [{ id: 'b12', l: t('ctxB12') }, { id: 'vitd', l: t('ctxVitD') }] : []),
    ...(knows(state, 'house') ? [{ id: 'veg', l: t('ctxVeg') }] : []),
    ...(knows(state, 'goals') ? [{ id: 'hair', l: t('ctxHair') }] : []),
    ...(!hasReport && knows(state, 'vrat') ? [{ id: 'vrat', l: t('ctxVrat') }] : []),
  ];
  const [excluded, setExcluded] = useState<string[]>([]);
  const shown = all.filter((c) => !excluded.includes(c.id));

  return (
    <div className="absolute inset-0 flex flex-col">
      <ChatHeader coachId="dev" onMe={() => setMe(true)} />
      <ChatBody deps={[reply]}>
        <DayDivider>{handoff ? t('handoffFromTara') : t('devDirect')}</DayDivider>
        <Anchor id="dev-context">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-[92%] rounded-[18px] border border-[#CFE3C8] bg-green-50 px-4 py-3">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Avatar who="tara" size={26} />
              <span className="relative h-[2px] w-20 overflow-hidden rounded bg-[#CFE3C8]">
                <motion.span className="absolute top-0 h-full w-6 rounded bg-mustard" initial={{ x: -24 }} animate={{ x: 84 }} transition={{ duration: 1.1, repeat: 2, ease: 'easeInOut' }} />
              </span>
              <Brain size={16} className="text-green-700" />
              <span className="relative h-[2px] w-20 overflow-hidden rounded bg-[#CFE3C8]">
                <motion.span className="absolute top-0 h-full w-6 rounded bg-mustard" initial={{ x: -24 }} animate={{ x: 84 }} transition={{ duration: 1.1, delay: 0.5, repeat: 2, ease: 'easeInOut' }} />
              </span>
              <Avatar who="dev" size={26} />
            </div>
            <div className="flex items-start justify-between gap-2">
              <div className="text-[14.5px] leading-snug text-green-700">
                <b className="font-semibold">{t('devKnows')}</b> {shown.map((c) => c.l).join(', ')}
              </div>
              <button type="button" onClick={() => setEditCtx(true)} className="flex h-9 shrink-0 items-center gap-1 rounded-full bg-white px-3 text-[13px] font-semibold text-green-700">
                <Pencil size={13} /> {t('edit')}
              </button>
            </div>
            <div className="mt-1.5 text-[12px] text-text-secondary">{t('devPrivateNote')}</div>
          </motion.div>
        </Anchor>
        <Anchor id="dev-first">
          <CoachBubble coachId="dev" time="07:02 PM">{!handoff ? t('devOpenerDirect') : hasReport ? t('devOpener') : t('devOpenerNoReport')}</CoachBubble>
        </Anchor>
        {!reply && <QuickReplies options={[{ label: t('devYes'), v: 'y' }, { label: t('devAsk'), v: 'q' }]} onPick={setReply} />}
        {reply && (
          <>
            <UserBubble time="07:03 PM">{reply === 'y' ? t('devYes') : t('devAsk')}</UserBubble>
            <CoachBubble coachId="dev" time="07:03 PM">{reply === 'y' ? t('devReplyYes') : t('devReplyAsk')}</CoachBubble>
          </>
        )}
      </ChatBody>
      <ChatInput
        coachName="Dev"
        actions={[
          { emoji: '📞', label: t('callDev') },
          { emoji: '✨', label: 'Hair Analysis', badge: 'NEW' },
          { emoji: '📚', label: t('navCourses') },
        ]}
      />
      <MeSheet open={me} onClose={() => setMe(false)} />
      <Sheet open={editCtx} onClose={() => setEditCtx(false)} label={t('devCtxTitle')}>
        <div className="px-5 pb-2">
          <h3 className="text-[19px] font-semibold">{t('devCtxTitle')}</h3>
          <p className="mt-1 text-[14px] text-text-secondary">{t('devCtxSub')}</p>
          <div className="mt-3 divide-y divide-[#F0ECE0] rounded-[18px] border border-[#E6E1D1] bg-white">
            {all.map((c) => (
              <label key={c.id} className="flex min-h-[48px] items-center justify-between px-4">
                <span className="text-[15px]">{c.l}</span>
                <input type="checkbox" checked={!excluded.includes(c.id)} onChange={(e) => setExcluded((x) => (e.target.checked ? x.filter((i) => i !== c.id) : [...x, c.id]))} className="h-5 w-5 accent-[#38592D]" />
              </label>
            ))}
          </div>
          <PrimaryButton full className="mt-4" onClick={() => setEditCtx(false)}>{t('save')}</PrimaryButton>
        </div>
      </Sheet>
    </div>
  );
}
