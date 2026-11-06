import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useDemo } from '../app/DemoContext';
import { effectiveScreen } from '../app/screens';
import { notesForScreen } from '../data/notes';

/** Scroll only the nearest scrolling ancestor (never the page or the phone frame). */
export function scrollIntoArea(el: Element | null, block: 'center' | 'start' = 'center') {
  if (!el) return;
  let p = el.parentElement;
  while (p && p.id !== 'app-viewport') {
    const oy = getComputedStyle(p).overflowY;
    if ((oy === 'auto' || oy === 'scroll') && p.scrollHeight > p.clientHeight) break;
    p = p.parentElement;
  }
  if (!p || p.id === 'app-viewport') return;
  const r = el.getBoundingClientRect();
  const pr = p.getBoundingClientRect();
  const delta = block === 'center' ? r.top - pr.top - (pr.height - r.height) / 2 : r.top - pr.top - 12;
  p.scrollTo({ top: p.scrollTop + delta, behavior: 'smooth' });
}

/**
 * Wraps a product element that has a Product note: numbered mustard pin at the
 * top-right corner, and a mustard outline while its note is open.
 */
export function Anchor({
  id,
  children,
  className = '',
  style,
  inset = false,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** pin sits inside the corner (for edge-to-edge elements) */
  inset?: boolean;
}) {
  const { state, selectNote } = useDemo();
  const loc = useLocation();
  const list = notesForScreen(effectiveScreen(loc.pathname, state.persona).id);
  const idx = list.findIndex((n) => n.anchor === id);
  const note = idx >= 0 ? list[idx] : undefined;
  const selected = state.notesOn && !!note && state.selectedNoteId === note.id;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) window.setTimeout(() => scrollIntoArea(ref.current), 60);
  }, [selected]);

  const roadmap = note?.tag === 'Roadmap';
  return (
    <div ref={ref} data-note-anchor={id} className={`relative ${className}`} style={style}>
      {children}
      {state.notesOn && !state.tourActive && note && (
        <motion.button
          type="button"
          initial={{ scale: 0, y: inset ? '-50%' : 0 }}
          animate={{ scale: 1, y: inset ? '-50%' : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 26 }}
          onClick={(e) => {
            e.stopPropagation();
            selectNote(selected ? null : note.id);
          }}
          aria-label={`What changed (${idx + 1}): ${note.title}`}
          className="note-marker"
          style={{
            top: inset ? '50%' : -8,
            right: inset ? -4 : -8,
            background: roadmap ? '#FFFDF8' : '#E2C04C',
            color: '#22391D',
            border: roadmap ? '1.5px dashed #38592D' : '2px solid #FFFDF8',
          }}
        >
          {idx + 1}
        </motion.button>
      )}
    </div>
  );
}
