import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { useAction, useDemo, wait } from '../app/DemoContext';
import { knows } from '../data/memory';
import { report, reportFileName } from '../data/report';
import { Anchor } from '../notes/Anchor';
import { ChatBody, ChatHeader, ChatInput, CoachBubble, DayDivider, FileCard, IntentChips, MemChip, QuickReplies, Typing, UserBubble } from '../components/Chat';
import { MeSheet } from '../components/MeSheet';
import { NextStepsSheet, UploadModal } from '../components/Report';

type Mode = 'chat' | 'me' | 'report';

/** S7 chat with Tara; S8 opens the Me card on top; S9 opens the report flow on top. */
export function TaraChat({ mode = 'chat' }: { mode?: Mode }) {
  const { state, set, t } = useDemo();
  const navigate = useNavigate();
  const [me, setMe] = useState(mode === 'me');
  const [upload, setUpload] = useState(mode === 'report' && state.report === 'none');
  const [steps, setSteps] = useState(mode === 'report' && state.report !== 'none');
  const [intent, setIntent] = useState<null | 'act' | 'show' | 'listen'>(null);
  const [typing, setTyping] = useState(false);
  const [askShown, setAskShown] = useState(false);
  const [autoStart, setAutoStart] = useState(0);
  const [handoffDeclined, setHandoffDeclined] = useState(false);
  // The handoff is offered only after Neha herself asks about her hair.
  const [askedHair, setAskedHair] = useState(false);

  const vratKnown = knows(state, 'vrat');
  const learnedKey = vratKnown ? 'vratFood' : 'breakfast';
  const actDone = state.learned.includes('vratFood') || state.learned.includes('breakfast');
  const pickedB = state.answers[learnedKey] === 'b';
  const tuitionAsked = state.learned.includes('tuition') || state.learned.includes('tuitionNone');
  const showAct = intent === 'act' || actDone;
  const hasReport = state.report !== 'none';

  useEffect(() => {
    setMe(mode === 'me');
    if (mode === 'report') {
      if (state.report === 'none') setUpload(true);
      else setSteps(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const chooseIntent = async (v: 'act' | 'show' | 'listen') => {
    setIntent(v);
    setTyping(true);
    await wait(900);
    setTyping(false);
    if (v === 'act') setAskShown(true);
  };
  const answer = async (v: string) => {
    setTyping(true);
    await wait(900);
    setTyping(false);
    set((s) => ({
      learned: s.learned.includes(learnedKey) ? s.learned : [...s.learned, learnedKey],
      // the Me card stores what she actually said
      edits: { ...s.edits, [learnedKey]: v === 'b' ? (vratKnown ? t('ansFruit') : t('ansParatha')) : vratKnown ? t('ansSabudana') : t('ansPoha') },
      answers: { ...s.answers, [learnedKey]: v },
    }));
  };
  const answerTuition = async (v: string) => {
    setTyping(true);
    await wait(800);
    setTyping(false);
    set((s) => ({ learned: [...s.learned.filter((x) => x !== 'tuition' && x !== 'tuitionNone'), v === 'a' ? 'tuition' : 'tuitionNone'] }));
  };

  useAction('intent-act', async () => {
    if (actDone) return;
    await chooseIntent('act');
    await wait(900);
    await answer('a');
    await wait(1300);
    await answerTuition('a');
  });
  useAction('show-handoff', () => {
    if (!hasReport) set({ report: 'ready' });
    setAskedHair(true);
  });
  useAction('report-upload', () => {
    if (state.report !== 'none') setSteps(true);
    else {
      setUpload(true);
      setAutoStart(Date.now());
    }
  });
  useAction('report-review', () => {
    if (!steps) setSteps(true);
  });

  const goals = state.edits.goals ?? t('taraGoals');
  // Sheets live on their own routes (S8, S9) so their product notes show in the panel.
  const openMe = () => (mode === 'me' ? setMe(true) : navigate('/me'));
  const openUpload = () => (mode === 'report' ? setUpload(true) : navigate('/report'));
  const openSteps = () => (mode === 'report' ? setSteps(true) : navigate('/report'));

  return (
    <div className="absolute inset-0 flex flex-col">
      <ChatHeader coachId="tara" onMe={openMe} markMe markLabel />
      <ChatBody deps={[intent, typing, askShown, actDone, hasReport, tuitionAsked, handoffDeclined, askedHair]}>
        <DayDivider>{t('today')}</DayDivider>
        {/* source of the Health tab's "Tara ke chat se: 2 glass paani" auto-fill (F6) */}
        <UserBubble time="08:49 AM">{t('nehaWater')}</UserBubble>
        <CoachBubble coachId="tara" time="08:50 AM">
          {knows(state, 'goals') ? t('taraOpener', { goals }) : t('taraOpenerNoGoals')}
        </CoachBubble>

        {intent === 'listen' && (
          <>
            <UserBubble time="08:51 AM">{t('intentListen')}</UserBubble>
            {!typing && <CoachBubble coachId="tara">{t('taraListen')}<div className="mt-1.5 text-[12.5px] text-text-secondary">{t('aiDisclosure')}</div></CoachBubble>}
          </>
        )}
        {intent === 'show' && (
          <>
            <UserBubble time="08:51 AM">{t('intentShow')}</UserBubble>
            {!typing && (
              <CoachBubble coachId="tara">
                {vratKnown ? t('taraShowVrat') : t('taraShowHair')}
                <button type="button" onClick={() => navigate('/tv')} className="mt-2.5 flex w-full items-center gap-3 rounded-[16px] bg-[#7C3A2D] p-3 text-left text-white">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/25"><Play size={16} fill="#fff" /></span>
                  <span className="text-[14.5px] font-semibold">{vratKnown ? t('pickNehaTitle') : t('pickNehaFallback')}</span>
                </button>
              </CoachBubble>
            )}
          </>
        )}

        {showAct && (
          <>
            <UserBubble time="08:51 AM">{t('intentAct')}</UserBubble>
            {(askShown || actDone) && <CoachBubble coachId="tara">{vratKnown ? t('taraAskVrat') : t('taraAskBreakfast')}</CoachBubble>}
            {askShown && !actDone && !typing && (
              <QuickReplies
                options={vratKnown ? [{ label: t('ansSabudana'), v: 'a' }, { label: t('ansFruit'), v: 'b' }] : [{ label: t('ansPoha'), v: 'a' }, { label: t('ansParatha'), v: 'b' }]}
                onPick={answer}
              />
            )}
            {actDone && (
              <>
                <UserBubble time="08:52 AM">{state.edits[learnedKey] ?? (vratKnown ? t('ansSabudana') : t('ansPoha'))}</UserBubble>
                <CoachBubble coachId="tara">
                  {vratKnown ? (pickedB ? t('taraVratStepFruit') : t('taraVratStep')) : pickedB ? t('taraBreakfastStepParatha') : t('taraBreakfastStep')}
                </CoachBubble>
                <Anchor id="chat-memchip">
                  <MemChip text={`${vratKnown ? t('memVratFoodLabel') : t('memBreakfastLabel')} · ${state.edits[learnedKey] ?? ''}`} onEdit={openMe} />
                </Anchor>
                <CoachBubble coachId="tara">{t('taraAskTuition')}</CoachBubble>
                {!tuitionAsked && !typing && (
                  <QuickReplies options={[{ label: t('ansTuition'), v: 'a' }, { label: t('ansNoFixed'), v: 'b' }]} onPick={answerTuition} />
                )}
                {tuitionAsked && (
                  <>
                    <UserBubble time="08:53 AM">{state.learned.includes('tuition') ? t('ansTuition') : t('ansNoFixed')}</UserBubble>
                    <CoachBubble coachId="tara">{state.learned.includes('tuition') ? t('taraTuitionAck') : t('taraNoFixedAck')}</CoachBubble>
                    {state.learned.includes('tuition') && <MemChip text={t('memTuition')} onEdit={openMe} />}
                  </>
                )}
                {tuitionAsked && !hasReport && (
                  <CoachBubble coachId="tara">
                    {t('taraAskReport')}
                    <button type="button" onClick={openUpload} className="mt-2.5 h-11 w-full rounded-full bg-green-700 text-[15px] font-semibold text-white">{t('uploadReport')}</button>
                  </CoachBubble>
                )}
              </>
            )}
          </>
        )}

        {hasReport && (
          <>
            <FileCard name={reportFileName} meta={`PDF · ${report.pages} pages · ${report.sizeMB} MB`} time="06:53 PM" />
            <CoachBubble coachId="tara" time="06:54 PM">
              {t('taraReportRead')}
              <button type="button" onClick={openSteps} className="mt-2.5 h-11 w-full rounded-full bg-green-700 text-[15px] font-semibold text-white">{t('repOpen')}</button>
            </CoachBubble>
            {!askedHair ? (
              <QuickReplies options={[{ label: t('askHair'), v: 'h' }, { label: t('thanksTara'), v: 'x' }]} onPick={(v) => v === 'h' && setAskedHair(true)} />
            ) : (
            <Anchor id="chat-handoff">
              <div className="space-y-2">
                <UserBubble time="06:55 PM">{t('askHair')}</UserBubble>
                <CoachBubble coachId="tara" time="06:55 PM">{t('taraHandoff')}</CoachBubble>
                {handoffDeclined ? (
                  <>
                    <UserBubble>{t('notNow')}</UserBubble>
                    <CoachBubble coachId="tara">{t('taraHandoffLater')}</CoachBubble>
                  </>
                ) : (
                  <QuickReplies options={[{ label: t('yes'), v: 'y' }, { label: t('notNow'), v: 'n' }]} onPick={(v) => (v === 'y' ? navigate('/chat/dev', { state: { handoff: true } }) : setHandoffDeclined(true))} />
                )}
              </div>
            </Anchor>
            )}
          </>
        )}
        {typing && <Typing coachId="tara" />}
      </ChatBody>
      {!intent && !actDone && <IntentChips onPick={chooseIntent} />}
      <ChatInput
        coachName="Tara"
        markPlus
        onPlus={openUpload}
        actions={[
          { emoji: '📞', label: t('callTara') },
          { emoji: '✨', label: t('mealPlan'), badge: 'NEW' },
          { emoji: '📚', label: t('navCourses') },
        ]}
      />
      <MeSheet open={me} onClose={() => (mode === 'me' ? navigate('/chat/tara') : setMe(false))} />
      <UploadModal
        autoStart={autoStart}
        open={upload}
        onClose={() => {
          setUpload(false);
          if (mode === 'report') navigate('/chat/tara');
        }}
        onDone={() => {
          set({ report: 'ready' });
          setUpload(false);
          setSteps(true);
        }}
      />
      <NextStepsSheet open={steps} onClose={() => { setSteps(false); if (mode === 'report') navigate('/chat/tara'); }} />
    </div>
  );
}
