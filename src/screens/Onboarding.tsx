import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mic, PersonStanding, Send, Check, ShieldCheck, ChevronDown } from 'lucide-react';
import { useAction, useDemo, wait } from '../app/DemoContext';
import { Anchor } from '../notes/Anchor';
import { Sheet, PrimaryButton } from '../components/ui';
import { neha, rohit } from '../data/personas';

type Phase = 'idle' | 'recording' | 'typing' | 'chips' | 'fallback';

export interface ChipDef { id: string; text: string; inferred?: boolean; note?: string; prefilled?: boolean }

export function LogoBadge() {
  return (
    <div className="mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white/10">
      <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[#E9DDB8]">
        <PersonStanding size={32} color="#2F502D" strokeWidth={2.2} />
      </div>
    </div>
  );
}

export function Waveform() {
  return (
    <div className="waveform flex h-12 items-center justify-center gap-[4px]" aria-hidden>
      {Array.from({ length: 28 }).map((_, i) => (
        <span key={i} className="block w-[4px] rounded-full bg-green-cta-light" style={{ height: 10 + ((i * 37) % 30), animationDelay: `${(i % 7) * 90}ms` }} />
      ))}
    </div>
  );
}

const goalTiles = [
  ['⚖️', 'Weight Loss'], ['💇‍♀️', 'Hair'], ['😴', 'Sleep & Mind'], ['🌟', 'Confidence & Stress'], ['✨', 'Skin Care'], ['🫀', 'Sugar & Heart'],
  ['🧘‍♀️', 'Weight Gain'], ['🦵', 'Joint Pain'], ['❤️', 'PCOS/PCOD'], ['🏠', 'Ghar'], ['😓', 'Addiction'], ['🦠', 'Gut Health'],
];

export function OnboardingFlow({ variant = 'neha', onDone }: { variant?: 'neha' | 'rohit'; onDone: () => void }) {
  const { t, set, state } = useDemo();
  const isRohit = variant === 'rohit';
  const persona = isRohit ? rohit : neha;
  const [phase, setPhase] = useState<Phase>('idle');
  const [typed, setTyped] = useState('');
  const [shown, setShown] = useState(0);
  const [text, setText] = useState('');
  const [chai, setChai] = useState<string | null>(null);
  const [who, setWho] = useState<string | null>(null);
  const [wa, setWa] = useState(false);
  const [share, setShare] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<ChipDef | null>(null);
  const [confirmed, setConfirmed] = useState<string[]>([]);
  const [age, setAge] = useState(String(persona.age));
  // Rohit's voice note doesn't say his age, so it is the one thing we ask (F0: only missing essentials).
  const [rohitAge, setRohitAge] = useState<string | null>(null);
  const [guardian, setGuardian] = useState(false);
  const [fb, setFb] = useState<{ goals: string[]; age?: string; food?: string; lang?: string; more: boolean }>({ goals: [], more: false });
  const timers = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const chips: ChipDef[] = isRohit
    ? [
        { id: 'name', text: t('chipRohitName') },
        { id: 'work', text: t('chipRohitWork') },
        { id: 'goals', text: t('chipRohitGoals') },
        { id: 'sleep', text: t('chipRohitSleep') },
        { id: 'sex', text: t('chipRohitSex'), inferred: true, note: t('chipRohitSexWhy') },
      ]
    : [
        { id: 'name', text: t('chipName', { name: 'Neha', age }) },
        { id: 'city', text: t('chipCity') },
        { id: 'lang', text: t('chipLang') },
        { id: 'food', text: t('chipFood') },
        { id: 'house', text: t('chipHouse') },
        { id: 'goals', text: t('chipGoals') },
        { id: 'sex', text: t('chipSex'), inferred: true, note: t('chipSexWhy') },
      ];

  const prefilled: ChipDef[] = isRohit
    ? [
        { id: 'p-kitchen', text: t('chipRohitKitchen'), prefilled: true },
        { id: 'p-city', text: t('chipCity'), prefilled: true },
        { id: 'p-lang', text: t('chipLang'), prefilled: true },
      ]
    : [];

  const transcript = isRohit ? t('transcriptRohit') : t('transcriptNeha');

  const startTyping = (src: string) => {
    setPhase('typing');
    setTyped('');
    let i = 0;
    const step = () => {
      i += 3;
      setTyped(src.slice(0, i));
      if (i < src.length) timers.current.push(window.setTimeout(step, 22));
      else timers.current.push(window.setTimeout(() => revealChips(), 300));
    };
    step();
  };
  const revealChips = () => {
    setPhase('chips');
    setShown(0);
    chips.forEach((_, i) => timers.current.push(window.setTimeout(() => setShown(i + 1), 260 * (i + 1))));
    timers.current.push(window.setTimeout(() => scrollRef.current?.scrollTo({ top: 260, behavior: 'smooth' }), 260 * chips.length + 100));
  };
  const speak = () => {
    timers.current.forEach(clearTimeout);
    setPhase('recording');
    timers.current.push(window.setTimeout(() => startTyping(transcript), 6000));
  };
  const stopEarly = () => {
    timers.current.forEach(clearTimeout);
    startTyping(transcript);
  };

  useAction('onb-speak', () => {
    if (phase === 'idle' || phase === 'fallback') speak();
  });
  useAction('onb-answer', async () => {
    if (phase !== 'chips') {
      timers.current.forEach(clearTimeout);
      setTyped(transcript);
      setPhase('chips');
      setShown(chips.length);
    }
    await wait(500);
    scrollRef.current?.scrollTo({ top: 9999, behavior: 'smooth' });
    await wait(600);
    setChai('6–7');
    await wait(500);
    setWho('family');
    await wait(700);
    setWa(true);
  });
  useAction('onb-fallback', () => setPhase('fallback'));

  const ready = phase === 'chips' || phase === 'fallback';
  const allShown = phase === 'fallback' || shown >= chips.length;
  const fbReady = phase !== 'fallback' || (fb.goals.length > 0 && fb.age && fb.food && fb.lang);
  const canGo = ready && allShown && (isRohit ? !!rohitAge : chai && who) && fbReady;

  const finish = () => {
    const minor = isRohit ? rohitAge === '<18' : Number(age) < 18 || (phase === 'fallback' && fb.age === '<18');
    if (minor) {
      setGuardian(true);
      return;
    }
    if (isRohit) {
      set((s) => ({ onboarded: { ...s.onboarded, rohit: true }, rohitShares: share, persona: 'rohit' }));
    } else {
      const time = chai === '6 se pehle' ? '5:45' : chai === '7–8' ? '7:30' : chai === '8 ke baad' ? '8:15' : '6:30';
      set((s) => ({ onboarded: { ...s.onboarded, neha: true }, chaiTime: chai, whoFor: who, whatsappOptIn: wa, checkins: { ...s.checkins, time, channel: wa ? 'whatsapp' : 'app' } }));
    }
    onDone();
  };

  const female = !isRohit;

  return (
    <div className="absolute inset-0 flex flex-col text-white" style={{ background: 'linear-gradient(180deg,#1C3E1A 0%,#22461F 45%,#2E5A29 100%)' }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-[#1C3E1A]" style={{ height: 'var(--sat)' }} />
      <div ref={scrollRef} className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-6" style={{ paddingTop: 'calc(var(--sat) + 30px)' }}>
        <LogoBadge />
        <h1 className="mt-5 text-center text-[24px] font-semibold">{isRohit ? t('rohitOnbTitle') : t('onbTitle')}</h1>
        <p className="mx-auto mt-1.5 max-w-[330px] text-center text-[15px] leading-snug text-white/80">{isRohit ? t('rohitOnbSub') : t('onbSub')}</p>

        {isRohit && (
          <Anchor id="inv-prefill" className="mt-5">
            <div className="rounded-[18px] border border-white/20 bg-green-tile p-3.5">
              <div className="text-[13px] font-semibold uppercase tracking-[0.06em] text-white/70">{t('rohitAlready')}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {prefilled.map((c) => (
                  <span key={c.id} className="rounded-full bg-white/12 px-3 py-1.5 text-[14px] font-medium" style={{ background: 'rgba(255,255,255,0.12)' }}>{c.text}</span>
                ))}
              </div>
              <p className="mt-2 text-[12.5px] text-white/65">{t('rohitPrivateNote')}</p>
            </div>
          </Anchor>
        )}

        {phase !== 'fallback' && (
          <Anchor id="onb-speak" className="mt-6">
            <div>
              {phase === 'recording' ? (
                <div className="rounded-[18px] border border-white/20 bg-white/5 p-4 text-center">
                  <Waveform />
                  <div className="mt-2 text-[14px] text-white/80">{t('onbListening')}</div>
                  <button type="button" onClick={stopEarly} className="mt-3 h-10 rounded-full bg-white/15 px-5 text-[14px] font-semibold">{t('onbStop')}</button>
                </div>
              ) : phase === 'idle' ? (
                <>
                  <button type="button" onClick={speak} className="flex h-[60px] w-full items-center justify-center gap-2 rounded-[16px] bg-green-cta-light text-[18px] font-bold text-[#163015] shadow-[0_6px_20px_rgba(0,0,0,0.18)]">
                    <Mic size={22} strokeWidth={2.4} /> {t('onbSpeak')}
                  </button>
                  <form
                    className="mt-3 flex items-center gap-2 rounded-[16px] border border-white/25 bg-white/[0.07] pl-4 pr-1.5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      startTyping(text.trim() || transcript);
                    }}
                  >
                    <input value={text} onChange={(e) => setText(e.target.value)} placeholder={t('onbType')} className="h-[52px] min-w-0 flex-1 bg-transparent text-[15px] text-white placeholder:text-white/50 focus:outline-none" aria-label={t('onbType')} />
                    <button type="submit" className="flex h-10 items-center gap-1 rounded-full bg-white/15 px-3 text-[14px] font-semibold" aria-label={t('onbTypeGo')}>
                      <Send size={15} /> {t('onbTypeGo')}
                    </button>
                  </form>
                  <p className="mt-3 text-[13px] italic leading-snug text-white/55">{isRohit ? t('rohitExample') : t('onbExample')}</p>
                </>
              ) : (
                <div className="rounded-[18px] border border-white/15 bg-white/[0.06] p-3.5">
                  <div className="flex items-center gap-2 text-[12px] font-medium text-white/60"><Mic size={13} /> {isRohit ? 'Rohit' : 'Neha'}</div>
                  <p className="mt-1 text-[15px] leading-snug text-white/95">“{typed}{phase === 'typing' && <span className="animate-pulse">▍</span>}”</p>
                </div>
              )}
            </div>
          </Anchor>
        )}

        {/* Humne yeh samjha */}
        {phase === 'chips' && (
          <Anchor id="onb-understood" className="mt-4">
            <div className="rounded-[18px] border border-white/20 bg-green-tile p-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-[17px] font-semibold">{t('onbUnderstood')}</h2>
                <motion.span key={shown} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="rounded-full bg-green-cta-light px-2.5 py-[2px] text-[12.5px] font-bold text-[#163015]">
                  ✨ {Math.min(shown, chips.length)}
                </motion.span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <AnimatePresence>
                  {chips.slice(0, shown).map((c) => {
                    const guess = c.inferred && !confirmed.includes(c.id);
                    return (
                      <motion.button
                        key={c.id}
                        type="button"
                        initial={{ opacity: 0, scale: 0.85, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        onClick={() => setEditing(c)}
                        className={`flex min-h-[36px] items-center gap-1.5 rounded-full px-3 py-1.5 text-left text-[14px] font-medium ${guess ? 'border-[1.5px] border-dashed border-white/60 bg-transparent' : 'border border-white/15 bg-white/[0.12]'}`}
                      >
                        {c.id === 'name' && !isRohit ? t('chipName', { name: 'Neha', age }) : c.text}
                        {guess && <span className="rounded-full bg-white/15 px-1.5 text-[11px] text-white/80">{t('onbGuess')}</span>}
                        {c.inferred && !guess && <Check size={14} className="text-green-cta-light" />}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
              {allShown && <p className="mt-2.5 text-[12.5px] text-white/60">{t('onbTapEdit')}</p>}
            </div>
          </Anchor>
        )}

        {phase === 'fallback' && <Fallback fb={fb} setFb={setFb} />}

        {(phase === 'idle' || phase === 'fallback') && (
          <button type="button" onClick={() => setPhase(phase === 'fallback' ? 'idle' : 'fallback')} className="mx-auto mt-4 flex min-h-[44px] items-center text-[14px] font-medium text-white/80 underline decoration-white/40 underline-offset-4">
            {phase === 'fallback' ? t('onbBackToVoice') : t('onbFallback')}
          </button>
        )}

        {ready && allShown && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            {isRohit && (
              <div className="mt-5">
                <h2 className="text-[17px] font-semibold">{t('onbOneMore')}</h2>
                <div className="mt-2.5 text-[15px] text-white/90">{t('onbAgeQ')}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['<18', '18–29', '30–44', '45–59', '60+'].map((a) => (
                    <button key={a} type="button" onClick={() => setRohitAge(a)} aria-pressed={rohitAge === a} className={`h-11 min-w-[60px] rounded-[14px] border px-3 text-[14px] font-medium ${rohitAge === a ? 'border-green-cta-light bg-green-cta-light text-[#163015]' : 'border-white/25 bg-green-tile'}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {!isRohit && (
              <div className="mt-5">
                <h2 className="text-[17px] font-semibold">{t('onbTwoMore')}</h2>
                <div className="mt-2.5 text-[15px] text-white/90">{female ? t('onbChaiQ') : t('onbChaiQm')}</div>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {[t('chai1'), t('chai2'), t('chai3'), t('chai4')].map((c, i) => {
                    const v = ['6 se pehle', '6–7', '7–8', '8 ke baad'][i];
                    return (
                      <button key={v} type="button" onClick={() => setChai(v)} aria-pressed={chai === v} className={`h-11 rounded-[14px] border text-[14px] font-medium ${chai === v ? 'border-green-cta-light bg-green-cta-light text-[#163015]' : 'border-white/25 bg-green-tile'}`}>
                        {c}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 text-[15px] text-white/90">{t('onbWhoQ')}</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {[
                    ['me', t('whoMe')],
                    ['family', t('whoFamily')],
                  ].map(([v, l]) => (
                    <button key={v} type="button" onClick={() => setWho(v)} aria-pressed={who === v} className={`min-h-[44px] rounded-[14px] border px-2 text-[14px] font-medium ${who === v ? 'border-green-cta-light bg-green-cta-light text-[#163015]' : 'border-white/25 bg-green-tile'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Anchor id={isRohit ? 'inv-privacy' : 'onb-consent'} className="mt-5">
              <div className="rounded-[18px] border border-white/15 bg-black/10 p-3.5">
                <p className="flex gap-2 text-[14px] leading-snug text-white/90">
                  <ShieldCheck size={18} className="mt-[1px] shrink-0 text-green-cta-light" />
                  <span>
                    {female ? t('onbPrivacy') : t('onbPrivacyM')}{' '}
                    <button type="button" onClick={() => setSaved(true)} className="font-semibold text-green-cta-light underline underline-offset-2">
                      {t('onbWhatSaved')}
                    </button>
                  </span>
                </p>
                {isRohit ? (
                  <label className="mt-3 flex min-h-[44px] cursor-pointer items-center gap-3">
                    <input type="checkbox" checked={share} onChange={(e) => setShare(e.target.checked)} className="h-5 w-5 shrink-0 accent-[#7BC67E]" />
                    <span className="text-[14px]">{t('rohitShareToggle')}</span>
                  </label>
                ) : (
                  <label className="mt-3 flex min-h-[44px] cursor-pointer items-center gap-3">
                    <input type="checkbox" checked={wa} onChange={(e) => setWa(e.target.checked)} className="h-5 w-5 shrink-0 accent-[#7BC67E]" />
                    <span className="text-[14px]">{t('onbWhatsapp')}</span>
                  </label>
                )}
              </div>
            </Anchor>
          </motion.div>
        )}
      </div>

      {ready && allShown && (
        <div className="shrink-0 px-4 pt-2" style={{ paddingBottom: 'calc(var(--sab) + 14px)' }}>
          <button type="button" disabled={!canGo} onClick={finish} className="h-[56px] w-full rounded-[16px] bg-green-cta-light text-[18px] font-bold text-[#163015] disabled:opacity-45">
            {t('onbCta')} →
          </button>
        </div>
      )}

      <Sheet open={saved} onClose={() => setSaved(false)} label={t('savedTitle')}>
        <div className="px-5 pb-2 text-text-primary">
          <h3 className="text-[20px] font-semibold">{t('savedTitle')}</h3>
          <ul className="mt-3 space-y-2.5 text-[15px] leading-snug">
            {['saved1', 'saved2', 'saved3', 'saved4', 'saved5'].map((k) => (
              <li key={k} className="flex gap-2"><span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-green-700" />{t(k)}</li>
            ))}
          </ul>
          <PrimaryButton full className="mt-4" onClick={() => setSaved(false)}>{t('close')}</PrimaryButton>
        </div>
      </Sheet>

      <Sheet open={!!editing} onClose={() => setEditing(null)} label={t('editChip')}>
        {editing && (
          <div className="px-5 pb-2 text-text-primary">
            <h3 className="text-[19px] font-semibold">{t('editChip')}</h3>
            {editing.inferred && <p className="mt-1 text-[14px] text-text-secondary">{t('onbGuess')}: {editing.note}</p>}
            {editing.id === 'name' && !isRohit ? (
              <label className="mt-3 block text-[14px] font-medium">
                {t('fbAge')}
                <input inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, '').slice(0, 2))} className="mt-1 h-12 w-full rounded-[14px] border border-[#D5D0C0] px-3 text-[16px]" />
              </label>
            ) : (
              <input defaultValue={editing.text} className="mt-3 h-12 w-full rounded-[14px] border border-[#D5D0C0] px-3 text-[16px]" aria-label={t('editChip')} />
            )}
            <PrimaryButton
              full
              className="mt-4"
              onClick={() => {
                if (editing.inferred) setConfirmed((c) => [...c, editing.id]);
                setEditing(null);
                if (editing.id === 'name' && !isRohit && Number(age) < 18) setGuardian(true);
              }}
            >
              {editing.inferred ? t('confirmChip') : t('save')}
            </PrimaryButton>
          </div>
        )}
      </Sheet>

      <Sheet open={guardian} onClose={() => setGuardian(false)} label={t('guardianTitle')}>
        <div className="px-5 pb-2 text-text-primary">
          <div className="text-[32px]" aria-hidden>👨‍👩‍👧</div>
          <h3 className="mt-1 text-[20px] font-semibold">{t('guardianTitle')}</h3>
          <p className="mt-1.5 text-[15px] leading-snug text-text-secondary">{t('guardianBody')}</p>
          <PrimaryButton full className="mt-4" onClick={() => setGuardian(false)}>{t('guardianCta')}</PrimaryButton>
          <button type="button" onClick={() => { setGuardian(false); if (isRohit) setRohitAge(null); else setEditing(chips[0]); }} className="mt-2 h-11 w-full text-[15px] font-medium text-green-700">{t('guardianBack')}</button>
        </div>
      </Sheet>
      {state.lang && null}
    </div>
  );
}

function Fallback({ fb, setFb }: { fb: { goals: string[]; age?: string; food?: string; lang?: string; more: boolean }; setFb: (f: typeof fb) => void }) {
  const { t } = useDemo();
  const tiles = fb.more ? goalTiles : goalTiles.slice(0, 6);
  const pill = (on: boolean) => `min-h-[44px] rounded-[14px] border px-3 text-[14px] font-medium ${on ? 'border-green-cta-light bg-green-cta-light text-[#163015]' : 'border-white/25 bg-green-tile'}`;
  return (
    <div className="mt-6 space-y-5">
      <div>
        <div className="text-[15px] font-semibold">{t('fbGoal')}</div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {tiles.map(([e, g]) => {
            const on = fb.goals.includes(g);
            return (
              <button
                key={g}
                type="button"
                aria-pressed={on}
                onClick={() => setFb({ ...fb, goals: on ? fb.goals.filter((x) => x !== g) : fb.goals.length < 3 ? [...fb.goals, g] : fb.goals })}
                className={`flex h-[78px] flex-col items-center justify-center gap-1 rounded-[16px] border text-[12.5px] font-medium ${on ? 'border-green-cta-light bg-[#3E6B39]' : 'border-white/20 bg-green-tile'}`}
              >
                <span className="text-[22px]" aria-hidden>{e}</span>
                {g}
              </button>
            );
          })}
        </div>
        {!fb.more && (
          <button type="button" onClick={() => setFb({ ...fb, more: true })} className="mt-2 flex min-h-[40px] items-center gap-1 text-[14px] text-white/80">
            {t('fbMore')} <ChevronDown size={16} />
          </button>
        )}
      </div>
      <div>
        <div className="text-[15px] font-semibold">{t('fbAge')}</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {['<18', '18–29', '30–44', '45–59', '60+'].map((a) => (
            <button key={a} type="button" aria-pressed={fb.age === a} onClick={() => setFb({ ...fb, age: a })} className={pill(fb.age === a)}>{a}</button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-[15px] font-semibold">{t('fbFood')}</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {['fbVeg', 'fbNonveg', 'fbEgg', 'fbJain'].map((k) => (
            <button key={k} type="button" aria-pressed={fb.food === k} onClick={() => setFb({ ...fb, food: k })} className={pill(fb.food === k)}>{t(k)}</button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-[15px] font-semibold">{t('fbLang')}</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {['Hinglish', 'हिन्दी', 'English'].map((k) => (
            <button key={k} type="button" aria-pressed={fb.lang === k} onClick={() => setFb({ ...fb, lang: k })} className={pill(fb.lang === k)}>{k}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Onboarding() {
  const navigate = useNavigate();
  const { state } = useDemo();
  // Whose phone it is decides whose onboarding you see (Rohit's is pre-filled from the household).
  return <OnboardingFlow key={state.persona} variant={state.persona} onDone={() => navigate('/home')} />;
}
