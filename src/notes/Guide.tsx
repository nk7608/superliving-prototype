import { motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, ChevronDown, Undo2 } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { effectiveScreen } from '../app/screens';
import { noteById, notesForScreen, type ProductNote } from '../data/notes';
import { useTourNav } from './TourController';
import { TagPill } from './NoteCard';
import { penRef } from '../components/pen';

interface Box { x: number; y: number; w: number; h: number }

/** Measures an anchor relative to the app viewport (works inside the scaled phone frame). */
function useAnchorBox(anchor: string | undefined, active: boolean) {
  const [box, setBox] = useState<Box | null>(null);
  useEffect(() => {
    if (!active || !anchor) {
      setBox(null);
      return;
    }
    let timer = 0;
    let last = '';
    const tick = () => {
      const vp = document.getElementById('app-viewport');
      const el = vp?.querySelector(`[data-note-anchor="${anchor}"]`) as HTMLElement | null;
      if (vp && el) {
        const v = vp.getBoundingClientRect();
        const s = v.width / vp.offsetWidth || 1;
        const r = el.getBoundingClientRect();
        let x = (r.left - v.left) / s;
        let y = (r.top - v.top) / s;
        let w = r.width / s;
        let h = r.height / s;
        // clip to the visible viewport
        const W = vp.offsetWidth;
        const H = vp.offsetHeight;
        const x2 = Math.min(W - 4, x + w);
        const y2 = Math.min(H - 4, y + h);
        x = Math.max(4, x);
        y = Math.max(4, y);
        w = Math.max(0, x2 - x);
        h = Math.max(0, y2 - y);
        const key = [x, y, w, h].map(Math.round).join(',');
        if (key !== last) {
          last = key;
          setBox(h > 4 && w > 4 ? { x, y, w, h } : null);
        }
      } else if (last !== 'none') {
        last = 'none';
        setBox(null);
      }
    };
    tick();
    // a light timer (not rAF) so it keeps up while scrolling and in throttled tabs
    timer = window.setInterval(tick, 60);
    return () => clearInterval(timer);
  }, [anchor, active]);
  return box;
}

function WhyMore({ note }: { note: ProductNote }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex items-center gap-1 text-[12.5px] font-semibold text-green-700" aria-expanded={open}>
        Why it matters <ChevronDown size={14} className={open ? 'rotate-180' : ''} />
      </button>
      {open && (
        <div className="mt-1.5 space-y-1 text-[12.5px] leading-snug text-[#4F4E49]">
          <p>{note.why}</p>
          {note.measure !== '—' && <p><span className="font-semibold text-green-900">We’d measure:</span> {note.measure}</p>}
          {note.safety && <p><span className="font-semibold text-green-900">Safety:</span> {note.safety}</p>}
          {note.hypothesis && <p className="text-[#8A6A12]">A hypothesis to test against SuperLiving’s own numbers.</p>}
        </div>
      )}
    </div>
  );
}

/** A hand-drawn arrow from the note to the thing it's talking about. */
function SketchArrow({ from, to, id }: { from: { x: number; y: number }; to: { x: number; y: number }; id: string }) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  // a loose curve that bows sideways, like a pen stroke
  const bow = Math.max(-40, Math.min(40, dx === 0 ? 28 : -dx * 0.35 + 18));
  const c1 = { x: from.x + bow, y: from.y + dy * 0.35 };
  const c2 = { x: to.x + bow * 0.4, y: to.y - dy * 0.35 };
  const ang = Math.atan2(to.y - c2.y, to.x - c2.x);
  const head = (a: number) => `${to.x - 10 * Math.cos(ang - a)},${to.y - 10 * Math.sin(ang - a)}`;
  return (
    <svg className="pointer-events-none absolute inset-0 z-[5] h-full w-full overflow-visible" aria-hidden>
      <path
        key={`a${id}`}
        d={`M ${from.x} ${from.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${to.x} ${to.y}`}
        ref={penRef}
        className="pen-draw"
        style={{ animationDuration: '0.5s', animationDelay: '0.1s' }}
        fill="none"
        stroke="#E2C04C"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        key={`h${id}`}
        d={`M ${head(0.45)} L ${to.x} ${to.y} L ${head(-0.45)}`}
        ref={penRef}
        className="pen-draw"
        style={{ animationDuration: '0.25s', animationDelay: '0.55s' }}
        fill="none"
        stroke="#E2C04C"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A sketchy double outline around the highlighted element, drawn in. */
function SketchRing({ box, id }: { box: Box; id: string }) {
  const r = (pad: number, tilt: number, opacity: number, delay: number) => (
    <rect
      key={`${id}${pad}`}
      x={box.x - pad}
      y={box.y - pad}
      width={box.w + pad * 2}
      height={box.h + pad * 2}
      rx={16}
      ref={penRef}
      className="pen-draw"
      transform={`rotate(${tilt} ${box.x + box.w / 2} ${box.y + box.h / 2})`}
      opacity={opacity}
      style={{ animationDuration: '0.55s', animationDelay: `${delay}s` }}
      fill="none"
      stroke="#E2C04C"
      strokeWidth={pad > 7 ? 1.4 : 2.6}
      strokeLinecap="round"
    />
  );
  return (
    <svg className="pointer-events-none absolute inset-0 z-[4] h-full w-full overflow-visible" aria-hidden>
      {r(6, 0, 1, 0)}
      {r(9, -0.6, 0.55, 0.15)}
    </svg>
  );
}

/**
 * The explainer, done like a PM sketching on a printout: dim the screen, circle the one
 * thing that changed, draw an arrow to it, and say it in a sentence on a sticky note.
 */
export function Guide() {
  const { state, selectNote, runAction, goTour, exitTour } = useDemo();
  const loc = useLocation();
  const screen = effectiveScreen(loc.pathname, state.persona);
  const { next, back, exit, step, total, tour, chapters } = useTourNav();
  const tourStep = state.tourActive ? tour[step] : undefined;
  const onThisScreen = notesForScreen(screen.id);
  const offTour = !!(state.tourActive && tourStep && tourStep.path !== loc.pathname && tourStep.path !== '/');

  let note: ProductNote | undefined;
  let mode: 'tour' | 'explore' | null = null;
  if (state.notesOn && tourStep && tourStep.path === loc.pathname) {
    mode = 'tour';
    note = tourStep.noteId ? noteById(tourStep.noteId) : undefined;
  } else if (state.notesOn && !state.tourActive && state.selectedNoteId) {
    const n = noteById(state.selectedNoteId);
    if (n && n.screen === screen.id) {
      mode = 'explore';
      note = n;
    }
  }
  const box = useAnchorBox(note?.anchor, !!mode);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardH, setCardH] = useState(180);
  useLayoutEffect(() => {
    if (cardRef.current && Math.abs(cardRef.current.offsetHeight - cardH) > 2) setCardH(cardRef.current.offsetHeight);
  });

  useEffect(() => {
    if (mode !== 'explore') return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && selectNote(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, selectNote]);

  // Stepped off the tour (tapped around)? Offer a way back, or out — never a dead end.
  if (offTour && tourStep) {
    return (
      <div className="pointer-events-none absolute inset-x-3 bottom-[92px] z-[150] flex justify-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto flex w-full max-w-[360px] items-center gap-2 rounded-2xl bg-green-900 p-2 pl-3.5 text-[#F1EFE7] shadow-xl"
          role="status"
        >
          <span className="min-w-0 flex-1 font-hand text-[19px] leading-tight text-mustard">Exploring on your own?</span>
          <button type="button" onClick={() => goTour(step)} className="flex h-9 shrink-0 items-center gap-1 rounded-full bg-mustard px-3 text-[13px] font-semibold text-green-900">
            <Undo2 size={14} /> Back to tour
          </button>
          <button type="button" onClick={exitTour} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-white/10" aria-label="End the tour">
            <X size={16} />
          </button>
        </motion.div>
      </div>
    );
  }

  if (!mode) return null;

  const vp = document.getElementById('app-viewport');
  const H = vp?.offsetHeight ?? 852;
  const W = vp?.offsetWidth ?? 393;
  const sat = vp?.classList.contains('phone-viewport') ? 54 : 8;
  const gap = 40; // room for the hand-drawn arrow
  let top: number;
  let side: 'below' | 'above' | null = null;
  if (box) {
    const below = H - (box.y + box.h) - gap - 12;
    const above = box.y - gap - sat;
    if (below >= cardH) {
      top = box.y + box.h + gap;
      side = 'below';
    } else if (above >= cardH) {
      top = box.y - gap - cardH;
      side = 'above';
    } else {
      top = H - cardH - 16;
    }
  } else {
    top = H - cardH - 96;
  }
  top = Math.max(sat, Math.min(top, H - cardH - 8));
  const key = (mode === 'tour' ? `t${state.tourOf}${step}` : note?.id) ?? 'none';

  // arrow: from the note's edge toward the highlighted element
  let arrowFrom: { x: number; y: number } | null = null;
  let arrowTo: { x: number; y: number } | null = null;
  if (box && side) {
    const cx = Math.max(40, Math.min(W - 40, box.x + box.w / 2));
    const startX = Math.max(60, Math.min(W - 60, cx + (cx < W / 2 ? 46 : -46)));
    if (side === 'below') {
      arrowFrom = { x: startX, y: top - 4 };
      arrowTo = { x: cx, y: box.y + box.h + 12 };
    } else {
      arrowFrom = { x: startX, y: top + cardH + 4 };
      arrowTo = { x: cx, y: box.y - 12 };
    }
  }

  const idx = note ? onThisScreen.findIndex((n) => n.id === note!.id) : -1;
  const cycle = (d: number) => {
    const list = onThisScreen.filter((n) => n.anchor);
    const i = list.findIndex((n) => n.id === note?.id);
    const nx = list[(i + d + list.length) % list.length];
    if (!nx) return;
    selectNote(nx.id);
    window.setTimeout(() => {
      if (!document.querySelector(`[data-note-anchor="${nx.anchor}"]`) && nx.reveal) runAction(nx.reveal);
    }, 60);
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-[150]" aria-live="polite">
      {box && (
        <>
          <div
            className="absolute z-0 rounded-[16px] transition-all duration-300 ease-out"
            style={{ left: box.x - 6, top: box.y - 6, width: box.w + 12, height: box.h + 12, boxShadow: '0 0 0 9999px rgba(18, 28, 15, 0.58)' }}
          />
          <SketchRing box={box} id={key} />
        </>
      )}
      {arrowFrom && arrowTo && <SketchArrow from={arrowFrom} to={arrowTo} id={key} />}

      <motion.div
        key={key}
        ref={cardRef}
        role="dialog"
        aria-label={note?.title ?? 'Tour'}
        initial={{ opacity: 0, y: 8, rotate: -1.2 }}
        animate={{ opacity: 1, y: 0, rotate: -0.4 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className="pointer-events-auto absolute z-10 rounded-[18px] bg-[#FFFDF8] px-4 pb-3.5 pt-4 text-green-900 shadow-[0_14px_40px_rgba(18,28,15,0.4)]"
        style={{ left: 12, right: 12, top, transition: 'top 300ms ease-out' }}
      >
        {/* a strip of tape, like a note stuck on a printout */}
        <span className="absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 rotate-[-3deg] rounded-[3px] bg-mustard/70 shadow-sm" aria-hidden />
        {mode === 'tour' && tourStep ? (
          <>
            <div className="flex items-start justify-between gap-2">
              <span className="font-hand text-[21px] leading-none text-green-700">
                {tourStep.chapter}. {chapters[tourStep.chapter - 1]}
              </span>
              <button type="button" onClick={exit} className="-mr-1 -mt-1 flex h-8 shrink-0 items-center gap-1 rounded-full px-2 text-[12px] font-medium text-[#8A877E] hover:bg-black/5" aria-label="End the tour">
                End tour <X size={13} />
              </button>
            </div>
            {note && <div className="mt-1.5 text-[16px] font-semibold leading-snug">{note.title}</div>}
            <p className="mt-1 text-[14px] leading-snug text-[#3E4A39]">{tourStep.caption}</p>
            {note && note.before !== '—' && (
              <p className="mt-2 border-l-2 border-[#E4DFCF] pl-2.5 text-[12.5px] leading-snug text-[#8A877E]">
                <span className="font-hand text-[15px] text-[#B5541C]">before:</span> {note.before}
              </p>
            )}
            {note && <WhyMore key={note.id} note={note} />}
            <div className="mt-3 flex items-center gap-2">
              <button type="button" onClick={back} disabled={step === 0} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4DFCF] disabled:opacity-30" aria-label="Previous step">
                <ChevronLeft size={18} />
              </button>
              <div className="flex flex-1 flex-col items-center gap-1">
                <div className="flex items-center gap-1" aria-hidden>
                  {chapters.map((c, i) => (
                    <span key={c} className={`h-1.5 rounded-full transition-all ${i + 1 === tourStep.chapter ? 'w-5 bg-green-700' : i + 1 < tourStep.chapter ? 'w-1.5 bg-green-700/60' : 'w-1.5 bg-[#E4DFCF]'}`} />
                  ))}
                </div>
                <span className="text-[10.5px] text-[#8A877E]">{step + 1} of {total}</span>
              </div>
              <button type="button" onClick={next} className="flex h-9 items-center gap-1 rounded-full bg-green-900 px-4 text-[13.5px] font-semibold text-[#F1EFE7]" aria-label="Next step">
                {step >= total - 1 ? 'Wrap up' : 'Next'} <ChevronRight size={16} />
              </button>
            </div>
          </>
        ) : note ? (
          <>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mustard text-[12px] font-bold">{idx + 1}</span>
                <TagPill tag={note.tag} small />
              </div>
              <button type="button" onClick={() => selectNote(null)} className="-mr-1 -mt-1 flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5" aria-label="Close">
                <X size={16} />
              </button>
            </div>
            <div className="mt-1.5 text-[16px] font-semibold leading-snug">{note.title}</div>
            {note.before !== '—' && (
              <p className="mt-2 border-l-2 border-[#E4DFCF] pl-2.5 text-[13px] leading-snug text-[#8A877E]">
                <span className="font-hand text-[16px] text-[#B5541C]">before:</span> {note.before}
              </p>
            )}
            <p className="mt-1.5 border-l-2 border-green-cta-light pl-2.5 text-[13.5px] leading-snug text-[#3E4A39]">
              <span className="font-hand text-[16px] text-green-700">now:</span> {note.now}
            </p>
            <WhyMore key={note.id} note={note} />
            {note.demo && (
              <div className="mt-2 flex flex-wrap gap-2">
                {note.demo.map((d) => (
                  <button key={d.label} type="button" onClick={() => runAction(d.action)} className="h-8 rounded-full bg-green-900 px-3.5 text-[12.5px] font-semibold text-[#F1EFE7]">{d.label}</button>
                ))}
              </div>
            )}
            {onThisScreen.filter((n) => n.anchor).length > 1 && (
              <div className="mt-3 flex items-center justify-between border-t border-dashed border-[#E4DFCF] pt-2.5">
                <button type="button" onClick={() => cycle(-1)} className="flex h-8 items-center gap-1 text-[12.5px] font-medium text-green-700"><ChevronLeft size={15} /> Previous</button>
                <span className="text-[12px] text-[#8A877E]">{idx + 1} of {onThisScreen.length} here</span>
                <button type="button" onClick={() => cycle(1)} className="flex h-8 items-center gap-1 text-[12.5px] font-medium text-green-700">Next <ChevronRight size={15} /></button>
              </div>
            )}
          </>
        ) : null}
      </motion.div>
    </div>
  );
}
