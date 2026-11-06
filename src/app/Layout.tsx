import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NotebookPen, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDemo } from './DemoContext';
import { screenByPath } from './screens';
import { DemoBar, DemoControls } from '../notes/DemoBar';
import { NotesPanel } from '../notes/NotesPanel';
import { useKeyboardShortcuts, useTourNav, TourBar as TourBarLazy } from '../notes/TourController';
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

function PhoneFrame({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Fit the 393×852 frame into whatever space the demo bar and panel leave.
    const host = box.current?.parentElement;
    if (!host) return;
    const fit = () => {
      const h = host.clientHeight - 32;
      const w = host.clientWidth - 32;
      setScale(Math.min(1, h / (PHONE.height + 24), w / (PHONE.width + 24)));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} style={{ width: (PHONE.width + 24) * scale, height: (PHONE.height + 24) * scale }} className="shrink-0">
      <div
        className="origin-top-left rounded-[62px] bg-[#111] p-[12px] shadow-[0_30px_80px_rgba(20,24,38,0.28),inset_0_0_0_2px_#2a2a2a]"
        style={{ transform: `scale(${scale})`, width: PHONE.width + 24, height: PHONE.height + 24 }}
      >
        <div id="app-viewport" className="phone-viewport relative overflow-hidden rounded-[50px] bg-cream-bg" style={{ width: PHONE.width, height: PHONE.height }}>
          <StatusBar />
          <div className="pointer-events-none absolute left-1/2 top-[11px] z-[70] h-[34px] w-[122px] -translate-x-1/2 rounded-full bg-black" aria-hidden />
          {children}
          <div className="pointer-events-none absolute bottom-[8px] left-1/2 z-[70] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-black/80" aria-hidden />
        </div>
      </div>
    </div>
  );
}

function MobileNotes() {
  const { state } = useDemo();
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'notes' | 'demo'>('notes');
  const s = screenByPath(loc.pathname);
  const count = notesForScreen(s.id).length;
  const { next, back, step, total } = useTourNav();

  const first = useRef(true);
  useEffect(() => {
    // Open the sheet when a marker is tapped — not on first render with a leftover selection.
    if (first.current) {
      first.current = false;
      return;
    }
    if (state.selectedNoteId && state.notesOn) {
      setTab('notes');
      setOpen(true);
    }
  }, [state.selectedNoteId, state.notesOn]);

  return (
    <>
      <div className="fixed bottom-[92px] right-3 z-[200] flex items-center gap-1 font-note">
        {state.tourActive && !open && (
          <div className="flex items-center rounded-full bg-[#3B4CCA] text-white shadow-lg">
            <button type="button" onClick={back} className="flex h-11 w-10 items-center justify-center" aria-label="Previous step"><ChevronLeft size={18} /></button>
            <span className="text-[12px] font-semibold">{step + 1}/{total}</span>
            <button type="button" onClick={next} className="flex h-11 w-10 items-center justify-center" aria-label="Next step"><ChevronRight size={18} /></button>
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-11 items-center gap-1.5 rounded-full bg-[#3B4CCA] px-4 text-[14px] font-semibold text-white shadow-[0_6px_20px_rgba(59,76,202,0.35)]"
        >
          <NotebookPen size={16} /> Notes{state.notesOn && count ? ` · ${count}` : ''}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[210] bg-black/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-[220] flex max-h-[82dvh] flex-col overflow-hidden rounded-t-[20px] bg-white font-note"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              role="dialog"
              aria-label="Product notes"
            >
              <div className="flex items-center justify-between border-b border-[#E3E5EE] px-3 py-2">
                <div className="flex gap-1 rounded-lg bg-[#EEF0F6] p-0.5">
                  {(['notes', 'demo'] as const).map((t) => (
                    <button key={t} type="button" onClick={() => setTab(t)} className={`h-8 rounded-md px-3 text-[13px] font-medium ${tab === t ? 'bg-white shadow-sm' : 'text-[#5A5F7A]'}`}>
                      {t === 'notes' ? 'Product notes' : 'Demo controls'}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#EEF0F6]" aria-label="Close notes">
                  <X size={18} />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-hidden">
                {tab === 'notes' ? <NotesPanel compact /> : <div className="overflow-y-auto p-4"><DemoControls vertical /></div>}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const desktop = useIsDesktop();
  const loc = useLocation();
  const { state, selectNote } = useDemo();
  const s = screenByPath(loc.pathname);
  useKeyboardShortcuts();

  // Drop a selection that belongs to another screen (e.g. after tapping the bottom nav).
  useEffect(() => {
    const n = state.selectedNoteId ? noteById(state.selectedNoteId) : undefined;
    if (n && n.screen !== s.id && !state.tourActive) selectNote(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.id]);

  if (!s.inPhone) {
    return (
      <div className={`min-h-[100dvh] bg-[#F6F7FB] font-note ${state.notesOn ? 'notes-on' : 'notes-off'}`}>
        {desktop && <DemoBar />}
        {children}
        {state.tourActive && (
          <div className="fixed bottom-4 right-4 z-[200] w-[360px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl shadow-[0_10px_40px_rgba(20,24,38,0.25)]">
            <TourBarLazy />
          </div>
        )}
        {!desktop && !state.tourActive && <MobileNotes />}
      </div>
    );
  }

  if (!desktop) {
    return (
      <div className={`${state.notesOn ? 'notes-on' : 'notes-off'}`}>
        <div id="app-viewport" className="mobile-viewport relative h-[100dvh] w-full overflow-hidden bg-cream-bg">{children}</div>
        <MobileNotes />
      </div>
    );
  }

  return (
    <div className={`flex h-[100dvh] flex-col bg-[#E8E9EF] ${state.notesOn ? 'notes-on' : 'notes-off'}`}>
      <DemoBar />
      <div className="flex min-h-0 flex-1">
        <main className="flex min-w-0 flex-1 items-center justify-center p-4">
          <PhoneFrame>{children}</PhoneFrame>
        </main>
        {(state.notesOn || state.tourActive) && (
          <aside className="w-[380px] shrink-0 border-l border-[#E3E5EE] bg-[#F6F7FB]" aria-label="Product notes">
            {state.notesOn ? (
              <NotesPanel />
            ) : (
              <div className="font-note">
                <NotesPanelTourOnly />
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}

function NotesPanelTourOnly() {
  return (
    <div>
      <TourOnly />
      <p className="p-4 text-[14px] text-[#4A4F66]">Notes are off. This is the app as users would see it. Press N to turn notes back on.</p>
    </div>
  );
}
function TourOnly() {
  const { state } = useDemo();
  return state.tourActive ? <TourBarLazy /> : null;
}
