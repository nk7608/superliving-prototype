import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, SlidersHorizontal, Map, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDemo } from './DemoContext';
import { effectiveScreen, screenByPath } from './screens';
import { DemoBar, DemoControls, EndTour, PhoneOwner } from '../notes/DemoBar';
import { NotesPanel } from '../notes/NotesPanel';
import { TourBar, useKeyboardShortcuts, useTourNav } from '../notes/TourController';
import { Guide } from '../notes/Guide';
import { chapterFor, chaptersFor, tourFor } from '../data/tour';
import { noteById, notesForScreen } from '../data/notes';
import { PHONE } from '../styles/tokens';

function useIsDesktop() {
  const q = '(min-width: 1024px)';
  const [d, setD] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setD(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return d;
}

function StatusBar() {
  const loc = useLocation();
  const s = screenByPath(loc.pathname);
  const c = s.statusTone === 'light' ? '#fff' : '#111';
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[60] flex h-[54px] items-center justify-between px-[34px] pt-[6px]" style={{ color: c, background: s.statusBg || 'transparent' }} aria-hidden>
      <span className="w-[54px] text-center font-[system-ui] text-[17px] font-semibold tracking-[-0.2px]">{s.clock}</span>
      <span className="flex items-center gap-[6px]">
        <svg width="18" height="12" viewBox="0 0 18 12" fill={c}><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" opacity="0.35" /></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={c}><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.1-1.2C13.2 1.6 10.7.6 8 .6S2.8 1.6.9 3.4L2 4.6c1.6-1.5 3.7-2.4 6-2.4zm0 3.2c1.4 0 2.7.5 3.7 1.4l1.1-1.2C11.5 4.5 9.8 3.8 8 3.8S4.5 4.5 3.2 5.6l1.1 1.2C5.3 5.9 6.6 5.4 8 5.4zm0 3.2c.6 0 1.2.2 1.6.6L8 11 6.4 9.2c.4-.4 1-.6 1.6-.6z" /></svg>
        <span className="flex h-[13px] min-w-[25px] items-center justify-center rounded-[4px] px-[3px] text-[10px] font-bold" style={{ background: c, color: s.statusTone === 'light' ? '#000' : '#fff' }}>78</span>
      </span>
    </div>
  );
}

/** Screens glide in, so moving through the story feels like one app, not page loads. */
function ScreenFade({ children }: { children: ReactNode }) {
  const loc = useLocation();
  return (
    <motion.div key={loc.pathname} className="absolute inset-0" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}

function PhoneFrame({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Fit the 393×852 frame into whatever space the bar and panel leave.
    const host = box.current?.parentElement;
    if (!host) return;
    const fit = () => setScale(Math.min(1, (host.clientHeight - 32) / (PHONE.height + 24), (host.clientWidth - 32) / (PHONE.width + 24)));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} style={{ width: (PHONE.width + 24) * scale, height: (PHONE.height + 24) * scale }} className="shrink-0">
      <div className="origin-top-left rounded-[62px] bg-[#141a12] p-[12px] shadow-[0_30px_70px_rgba(34,57,29,0.25),inset_0_0_0_2px_#2a3327]" style={{ transform: `scale(${scale})`, width: PHONE.width + 24, height: PHONE.height + 24 }}>
        <div id="app-viewport" className="phone-viewport relative overflow-hidden rounded-[50px] bg-cream-bg" style={{ width: PHONE.width, height: PHONE.height }}>
          <StatusBar />
          <div className="pointer-events-none absolute left-1/2 top-[11px] z-[70] h-[34px] w-[122px] -translate-x-1/2 rounded-full bg-black" aria-hidden />
          <ScreenFade>{children}</ScreenFade>
          <Guide />
          <div className="pointer-events-none absolute bottom-[8px] left-1/2 z-[70] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-black/80" aria-hidden />
        </div>
      </div>
    </div>
  );
}

/** Compact tour controls for places without the in-app guide (intro, all changes, notes off). */
function MiniTour() {
  const { next, back, step, total } = useTourNav();
  return (
    <div className="flex items-center gap-1 rounded-full bg-green-900 p-1 text-[#F1EFE7] shadow-lg">
      <button type="button" onClick={back} disabled={step === 0} className="flex h-9 w-9 items-center justify-center rounded-full disabled:opacity-30" aria-label="Previous step"><ChevronLeft size={18} /></button>
      <span className="px-1 text-[12px] font-medium">{step + 1}/{total}</span>
      <button type="button" onClick={next} className="flex h-9 items-center gap-1 rounded-full bg-mustard px-3 text-[13px] font-semibold text-green-900" aria-label="Next step">Next <ChevronRight size={16} /></button>
    </div>
  );
}

/** Mobile: one slim bar on top; the app below is never covered except by the guide. */
function MobileShell({ children, inPhone }: { children: ReactNode; inPhone: boolean }) {
  const { state } = useDemo();
  const loc = useLocation();
  const [sheet, setSheet] = useState<null | 'story' | 'controls'>(null);
  const s = effectiveScreen(loc.pathname, state.persona);
  const count = notesForScreen(s.id).length;
  const who = state.tourActive ? state.tourOf : state.persona;
  const chapters = chaptersFor(who);
  const chapter = state.tourActive ? tourFor(who)[state.tourStep]?.chapter ?? 1 : chapterFor(who, s.id);

  useEffect(() => setSheet(null), [loc.pathname]);

  return (
    <div className={`flex h-[100dvh] flex-col bg-[#F1EFE7] ${state.notesOn ? 'notes-on' : 'notes-off'}`}>
      <div className="shrink-0 bg-green-900 text-[#F1EFE7]" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="flex h-12 items-center gap-2 pl-2 pr-1">
          <PhoneOwner short />
          <button type="button" onClick={() => setSheet('story')} className="flex min-w-0 flex-1 items-center gap-2 rounded-full px-2 py-1 text-left hover:bg-white/10" aria-label="Open the story map">
            <span className="flex shrink-0 gap-[3px]" aria-hidden>
              {chapters.map((c, i) => (
                <span key={c} className={`h-1.5 rounded-full ${i + 1 === chapter ? 'w-3.5 bg-mustard' : i + 1 < chapter ? 'w-1.5 bg-mustard/60' : 'w-1.5 bg-white/25'}`} />
              ))}
            </span>
            <span className="truncate text-[12.5px] text-[#F1EFE7]/85">{chapters[chapter - 1]}</span>
          </button>
          {state.tourActive && <EndTour compact />}
          {!state.tourActive && inPhone && state.notesOn && count > 0 && (
            <button type="button" onClick={() => setSheet('story')} className="flex h-8 shrink-0 items-center gap-1 rounded-full bg-mustard px-2.5 text-[12.5px] font-semibold text-green-900">
              <Map size={14} /> {count}
            </button>
          )}
          <button type="button" onClick={() => setSheet('controls')} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10" aria-label="Demo settings">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>
      {inPhone ? (
        <div id="app-viewport" className="mobile-viewport relative min-h-0 w-full flex-1 overflow-hidden bg-cream-bg">
          <ScreenFade>{children}</ScreenFade>
          <Guide />
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      )}
      {state.tourActive && (!inPhone || !state.notesOn) && (
        <div className="fixed inset-x-0 bottom-0 z-[200] px-3" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)' }}>
          {inPhone ? <div className="flex justify-end"><MiniTour /></div> : <div className="overflow-hidden rounded-2xl shadow-xl"><TourBar dense /></div>}
        </div>
      )}
      <AnimatePresence>
        {sheet && (
          <>
            <motion.div className="fixed inset-0 z-[210] bg-black/35" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheet(null)} />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-[220] flex max-h-[85dvh] flex-col overflow-hidden rounded-t-[24px] bg-[#F1EFE7]"
              style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              role="dialog"
              aria-label={sheet === 'story' ? 'The story' : 'Demo settings'}
            >
              <div className="flex shrink-0 justify-center pb-1 pt-3"><span className="h-1 w-10 rounded-full bg-black/15" /></div>
              <button type="button" onClick={() => setSheet(null)} className="absolute right-3 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/5" aria-label="Close">
                <X size={18} />
              </button>
              <div className="min-h-0 flex-1 overflow-hidden">
                {sheet === 'story' ? (
                  <NotesPanel compact onPick={() => setSheet(null)} />
                ) : (
                  <div className="overflow-y-auto px-4 pb-6 pt-2">
                    <h2 className="mb-3 text-[18px] font-semibold text-green-900">Demo settings</h2>
                    <DemoControls vertical />
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Screens that only exist in one persona's journey.
const nehaOnly: Record<string, string> = { '/chat/tara': '/rohit-chat', '/me': '/rohit-chat', '/report': '/home', '/chat/dev': '/home', '/whatsapp': '/home', '/day30': '/home' };

export function Layout({ children }: { children: ReactNode }) {
  const desktop = useIsDesktop();
  const loc = useLocation();
  const navigate = useNavigate();
  const { state, selectNote } = useDemo();
  const s = effectiveScreen(loc.pathname, state.persona);
  useKeyboardShortcuts();

  // Drop a selection that belongs to another screen (e.g. after tapping the bottom nav).
  useEffect(() => {
    const n = state.selectedNoteId ? noteById(state.selectedNoteId) : undefined;
    if (n && n.screen !== s.id && !state.tourActive) selectNote(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.id]);

  // Switching persona takes you to that person's version of the screen.
  const prevPersona = useRef(state.persona);
  useEffect(() => {
    if (prevPersona.current === state.persona) return;
    prevPersona.current = state.persona;
    if (state.tourActive) return;
    if (state.persona === 'rohit' && nehaOnly[loc.pathname]) navigate(nehaOnly[loc.pathname]);
    if (state.persona === 'neha' && loc.pathname === '/rohit-chat') navigate('/chat/tara');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.persona]);

  if (!desktop) return <MobileShell inPhone={s.inPhone}>{children}</MobileShell>;

  if (!s.inPhone) {
    return (
      <div className={`flex h-[100dvh] flex-col bg-[#F1EFE7] ${state.notesOn ? 'notes-on' : 'notes-off'}`}>
        <DemoBar />
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        {state.tourActive && (
          <div className="fixed bottom-5 right-5 z-[200] w-[380px] overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(34,57,29,0.3)]">
            <TourBar />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex h-[100dvh] flex-col bg-[#E7E3D6] ${state.notesOn ? 'notes-on' : 'notes-off'}`}>
      <DemoBar />
      <div className="flex min-h-0 flex-1">
        <main className="flex min-w-0 flex-1 items-center justify-center p-4">
          <PhoneFrame>{children}</PhoneFrame>
        </main>
        {state.notesOn ? (
          <aside className="w-[340px] shrink-0 border-l border-[#E4DFCF]" aria-label="The story">
            <NotesPanel />
          </aside>
        ) : (
          state.tourActive && (
            <div className="fixed bottom-5 right-5 z-[200]">
              <MiniTour />
            </div>
          )
        )}
      </div>
    </div>
  );
}
