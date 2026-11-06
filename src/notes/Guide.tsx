import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, ChevronDown } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { screenByPath } from '../app/screens';
import { noteById, notesForScreen, type ProductNote } from '../data/notes';
import { chapters, tour } from '../data/tour';
import { useTourNav } from './TourController';
import { TagPill } from './NoteCard';

interface Box { x: number; y: number; w: number; h: number }

/** Measures an anchor relative to the app viewport (works inside the scaled phone frame). */
function useAnchorBox(anchor: string | undefined, active: boolean) {
  const [box, setBox] = useState<Box | null>(null);
  useEffect(() => {
    if (!active || !anchor) {
      setBox(null);
      return;
    }
    let raf = 0;
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
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
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

/**
 * The explainer, in the style of interactive product demos: dim the screen, light up
 * the one thing that changed, and say it in a sentence right next to it.
 */
export function Guide() {
  const { state, selectNote, runAction } = useDemo();
  const loc = useLocation();
  const screen = screenByPath(loc.pathname);
  const { next, back, exit, step, total } = useTourNav();
  const tourStep = state.tourActive ? tour[step] : undefined;
  const onThisScreen = notesForScreen(screen.id);

  // What to explain right now
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
    if (cardRef.current) setCardH(cardRef.current.offsetHeight);
  });

  useEffect(() => {
    if (mode !== 'explore') return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && selectNote(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, selectNote]);

  if (!mode) return null;

  const vp = document.getElementById('app-viewport');
  const H = vp?.offsetHeight ?? 852;
  const W = vp?.offsetWidth ?? 393;
  const sat = vp?.classList.contains('phone-viewport') ? 54 : 8;
  const gap = 14;
  let top: number;
  let arrow: { side: 'top' | 'bottom'; x: number } | null = null;
  if (box) {
    const below = H - (box.y + box.h) - gap - 12;
    const above = box.y - gap - sat;
    if (below >= cardH) {
      top = box.y + box.h + gap;
      arrow = { side: 'top', x: box.x + box.w / 2 };
    } else if (above >= cardH) {
      top = box.y - gap - cardH;
      arrow = { side: 'bottom', x: box.x + box.w / 2 };
    } else {
      top = H - cardH - 16; // overlap the bottom gracefully
    }
  } else {
    top = H - cardH - 96;
  }
  top = Math.max(sat, Math.min(top, H - cardH - 8));

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
      {/* Backdrop with a cut-out around the element being explained */}
      {box ? (
        <div
          className="absolute z-0 rounded-[16px] transition-all duration-300 ease-out"
          style={{
            left: box.x - 6,
            top: box.y - 6,
            width: box.w + 12,
            height: box.h + 12,
            boxShadow: '0 0 0 2.5px #E2C04C, 0 0 0 9999px rgba(18, 28, 15, 0.55)',
          }}
        />
      ) : null}

      <div
          key={(mode === 'tour' ? `t${step}` : note?.id) ?? 'none'}
          ref={cardRef}
          role="dialog"
          aria-label={note?.title ?? 'Tour'}
          className="pointer-events-auto absolute z-10 rounded-[20px] bg-[#FFFDF8] p-4 text-green-900 shadow-[0_12px_40px_rgba(18,28,15,0.35)]"
          style={{ left: 12, right: 12, top, transition: 'top 300ms ease-out', fontFamily: 'Poppins, system-ui, sans-serif' }}
        >
          {arrow && (
            <span
              className="absolute h-3.5 w-3.5 rotate-45 bg-[#FFFDF8]"
              style={{ left: Math.max(20, Math.min(W - 44, arrow.x - 19)), [arrow.side === 'top' ? 'top' : 'bottom']: -6 } as React.CSSProperties}
              aria-hidden
            />
          )}
          {mode === 'tour' && tourStep ? (
            <>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A6A12]">
                  {tourStep.chapter}/{chapters.length} · {chapters[tourStep.chapter - 1]}
                </span>
                <button type="button" onClick={exit} className="-mr-1 flex h-8 items-center gap-1 rounded-full px-2 text-[12px] text-[#8A877E] hover:bg-black/5" aria-label="Leave the tour">
                  <X size={14} /> Leave
                </button>
              </div>
              {note && <div className="mt-1 text-[16px] font-semibold leading-snug">{note.title}</div>}
              <p className="mt-1 text-[14px] leading-snug text-[#3E4A39]">{tourStep.caption}</p>
              {note && note.before !== '—' && (
                <p className="mt-1.5 text-[12.5px] leading-snug text-[#8A877E]"><span className="font-semibold">Before:</span> {note.before}</p>
              )}
              {note && <WhyMore key={note.id} note={note} />}
              <div className="mt-3 flex items-center gap-2">
                <button type="button" onClick={back} disabled={step === 0} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4DFCF] disabled:opacity-30" aria-label="Previous step">
                  <ChevronLeft size={18} />
                </button>
                <div className="flex flex-1 items-center justify-center gap-1" aria-label={`Step ${step + 1} of ${total}`}>
                  {chapters.map((c, i) => (
                    <span key={c} className={`h-1.5 rounded-full transition-all ${i + 1 === tourStep.chapter ? 'w-5 bg-green-700' : i + 1 < tourStep.chapter ? 'w-1.5 bg-green-700/60' : 'w-1.5 bg-[#E4DFCF]'}`} />
                  ))}
                </div>
                <button type="button" onClick={next} className="flex h-9 items-center gap-1 rounded-full bg-green-900 px-4 text-[13.5px] font-semibold text-[#F1EFE7]" aria-label="Next step">
                  {step >= total - 1 ? 'See all changes' : 'Next'} <ChevronRight size={16} />
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
              {note.before !== '—' && <p className="mt-1.5 text-[13px] leading-snug text-[#8A877E]"><span className="font-semibold">Before:</span> {note.before}</p>}
              <p className="mt-1 text-[13.5px] leading-snug text-[#3E4A39]"><span className="font-semibold text-green-900">Now:</span> {note.now}</p>
              <WhyMore key={note.id} note={note} />
              {note.demo && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {note.demo.map((d) => (
                    <button key={d.label} type="button" onClick={() => runAction(d.action)} className="h-8 rounded-full bg-green-900 px-3.5 text-[12.5px] font-semibold text-[#F1EFE7]">{d.label}</button>
                  ))}
                </div>
              )}
              {onThisScreen.filter((n) => n.anchor).length > 1 && (
                <div className="mt-3 flex items-center justify-between border-t border-[#EFEADB] pt-2.5">
                  <button type="button" onClick={() => cycle(-1)} className="flex h-8 items-center gap-1 text-[12.5px] font-medium text-green-700"><ChevronLeft size={15} /> Previous</button>
                  <span className="text-[12px] text-[#8A877E]">{idx + 1} of {onThisScreen.length} on this screen</span>
                  <button type="button" onClick={() => cycle(1)} className="flex h-8 items-center gap-1 text-[12.5px] font-medium text-green-700">Next <ChevronRight size={15} /></button>
                </div>
              )}
            </>
          ) : null}
        </div>
    </div>
  );
}
