import { useState } from 'react';
import { Phone, MessageCircle, PhoneCall, Play, Pause, HeartHandshake } from 'lucide-react';
import { useAction, useDemo, wait } from '../app/DemoContext';
import { rohit } from '../data/personas';
import { Anchor } from '../notes/Anchor';
import { ChatBody, ChatHeader, ChatInput, CoachBubble, DayDivider, IntentChips, QuickReplies, Typing, UserBubble, VoiceBubble } from '../components/Chat';
import { MeSheet } from '../components/MeSheet';
import { Toast } from '../components/ui';

type Stage = 'start' | 'voice' | 'listen' | 'feel' | 'offer' | 'breathing' | 'tomorrow';

/** S14 — Rohit's 9:40 pm "Bas sun lo" chat and the safety path (F11). */
export function RohitChat() {
  const { state, set, t } = useDemo();
  const [stage, setStage] = useState<Stage>('start');
  const [typing, setTyping] = useState(false);
  const [feel, setFeel] = useState<string | null>(null);
  const [me, setMe] = useState(false);
  const [safety, setSafety] = useState(state.safetyActive);
  const [callback, setCallback] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [listened, setListened] = useState(false);
  const flash = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 2200);
  };

  const coachSays = async (next: Stage, ms = 1000) => {
    setTyping(true);
    await wait(ms);
    setTyping(false);
    setStage(next);
  };

  const sendVoice = async () => {
    if (stage !== 'start') return;
    setStage('voice');
  };
  const pickListen = async () => {
    if (stage === 'start') setStage('voice');
    setListened(true);
    await wait(300);
    await coachSays('listen', 1300);
  };

  useAction('rohit-voice-listen', async () => {
    if (stage !== 'start') return;
    setStage('voice');
    await wait(1200);
    setListened(true);
    await coachSays('listen', 1300);
    await wait(1600);
    setFeel('tired');
    await coachSays('offer', 1000);
    await wait(1200);
    setStage('breathing');
    setPlaying(true);
  });

  useAction('safety', async () => {
    if (stage === 'start') setStage('voice');
    await wait(400);
    setSafety(true);
    set({ safetyActive: true });
  });

  const order: Stage[] = ['start', 'voice', 'listen', 'feel', 'offer', 'breathing', 'tomorrow'];
  const past = (s: Stage) => order.indexOf(stage) >= order.indexOf(s);

  return (
    <div className="absolute inset-0 flex flex-col">
      <ChatHeader coachId="tara" onMe={() => setMe(true)} />
      <ChatBody deps={[stage, typing, safety, callback, feel]}>
        <DayDivider>{t('today')} · 7:00 AM</DayDivider>
        <CoachBubble coachId="tara" time="07:00 AM">{t('rohitMorning')}</CoachBubble>
        <DayDivider>9:40 PM</DayDivider>

        {past('voice') && <VoiceBubble secs={6} transcript={rohit.eveningVoiceNote} time="09:40 PM" />}
        {past('listen') && (
          <>
            {listened && (<>
            <UserBubble time="09:40 PM">{t('intentListen')}</UserBubble>
            <Anchor id="r-listen">
              <CoachBubble coachId="tara" time="09:41 PM">
                {t('rohitReflect')}
                <div className="mt-2 font-medium">{t('rohitGentleQ')}</div>
              </CoachBubble>
            </Anchor>
            <Anchor id="r-ai-line" className="ml-[46px] mr-8">
              <p className="rounded-xl bg-white/70 px-3 py-1.5 text-[12.5px] text-[#5E5E58]">{t('aiDisclosure')}</p>
            </Anchor>
            {stage === 'listen' && !typing && !safety && (
              <QuickReplies
                options={[{ label: t('feelTired'), v: 'tired' }, { label: t('feelHeavy'), v: 'heavy' }]}
                onPick={(v) => {
                  setFeel(v);
                  coachSays('offer');
                }}
              />
            )}
            {feel && <UserBubble time="09:42 PM">{feel === 'tired' ? t('feelTired') : t('feelHeavy')}</UserBubble>}
            </>)}
            {past('offer') && listened && (
              <>
                <CoachBubble coachId="tara" time="09:42 PM">{t('rohitOffer')}</CoachBubble>
                {stage === 'offer' && !safety && (
                  <QuickReplies
                    options={[{ label: t('offerBreath'), v: 'b' }, { label: t('offerTomorrow'), v: 't' }]}
                    onPick={(v) => {
                      if (v === 'b') {
                        setStage('breathing');
                        setPlaying(true);
                      } else coachSays('tomorrow');
                    }}
                  />
                )}
              </>
            )}
            {stage === 'breathing' && (
              <>
                <UserBubble>{t('offerBreath')}</UserBubble>
                <CoachBubble coachId="tara" wide>
                  <div className="overflow-hidden rounded-[16px] bg-gradient-to-br from-[#E9DFCB] to-[#CDBF9F]">
                    <div className="flex h-[150px] flex-col items-center justify-center">
                      <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-white/60 text-[34px] ${playing ? 'animate-[pulse_4s_ease-in-out_infinite]' : ''}`} aria-hidden>🧘‍♂️</div>
                      <div className="mt-2 text-[13px] font-semibold text-[#5A3A10]">{playing ? t('breathIn') : '2:00'}</div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 px-3 py-2">
                      <button type="button" onClick={() => setPlaying((p) => !p)} className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-white" aria-label={playing ? 'Pause' : 'Play'}>
                        {playing ? <Pause size={15} fill="#fff" /> : <Play size={15} fill="#fff" />}
                      </button>
                      <div className="min-w-0">
                        <div className="truncate text-[14px] font-semibold">{t('pickRohitTitle')}</div>
                        <div className="text-[12px] text-text-secondary">SuperTV · 2 min</div>
                      </div>
                    </div>
                  </div>
                </CoachBubble>
              </>
            )}
            {stage === 'tomorrow' && (
              <>
                <UserBubble>{t('offerTomorrow')}</UserBubble>
                <CoachBubble coachId="tara">{t('rohitTomorrow')}</CoachBubble>
              </>
            )}
          </>
        )}

        {safety && (
          <>
            <UserBubble time="09:43 PM">{t('crisisMsg')}</UserBubble>
            <Anchor id="r-safety">
              <div className="rounded-[20px] border-2 border-[#2F5D8A] bg-white p-4">
                <div className="flex items-center gap-2 text-[17px] font-semibold text-[#1F3E5C]"><HeartHandshake size={20} /> {t('safetyTitle')}</div>
                <div className="mt-2 rounded-[14px] bg-[#EEF4FA] p-3">
                  <div className="text-[18px] font-bold text-[#1F3E5C]">Tele-MANAS 14416</div>
                  <div className="text-[13.5px] text-[#3F5870]">{t('safetyTele')}</div>
                </div>
                <div className="mt-3 space-y-2">
                  <button type="button" onClick={() => flash(t('demoOnly'))} className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2F5D8A] text-[16px] font-semibold text-white"><Phone size={18} /> {t('safetyCall')}</button>
                  <button type="button" onClick={() => flash(t('demoOnly'))} className="flex h-12 w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-[#2F5D8A] text-[15px] font-semibold text-[#2F5D8A]"><MessageCircle size={18} /> {t('safetyMsg')}</button>
                  <button type="button" onClick={() => setCallback(true)} className="flex h-12 w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-[#2F5D8A] text-[15px] font-semibold text-[#2F5D8A]"><PhoneCall size={18} /> {t('safetyCallback')}</button>
                </div>
                {callback && <p className="mt-3 rounded-xl bg-green-50 p-2.5 text-[14px] text-green-700">{t('safetyCallbackDone')}</p>}
                <p className="mt-3 text-[12.5px] text-text-secondary">{t('safetyQuiet')}</p>
              </div>
            </Anchor>
          </>
        )}
        {typing && <Typing coachId="tara" />}
      </ChatBody>
      {(stage === 'start' || stage === 'voice') && !safety && !typing && (
        <>
          <p className="mx-3 mb-1 text-[12px] text-text-secondary">{t('intentGap')}</p>
          <IntentChips
            anchor="r-intents"
            onPick={(v) => {
              if (v === 'listen') pickListen();
              else if (v === 'act') { setStage('voice'); coachSays('tomorrow'); }
              else { setStage('breathing'); setPlaying(true); }
            }}
          />
        </>
      )}
      <ChatInput coachName="Tara" onSpeak={sendVoice} actions={[{ emoji: '📞', label: t('callTara') }, { emoji: '🌙', label: t('sleepStory') }]} />
      <MeSheet open={me} onClose={() => setMe(false)} />
      <Toast show={!!toast}>{toast}</Toast>
    </div>
  );
}
