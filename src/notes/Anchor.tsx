import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useDemo } from '../app/DemoContext';
import { screenByPath } from '../app/screens';
import { notesForScreen } from '../data/notes';

/**
 * Wraps a product element that has a Product note. Renders the numbered
 * indigo marker (top-right) and the selection outline. Invisible when notes are off.
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
  /** place the marker inside the corner (for edge-to-edge elements) */
  inset?: boolean;
}) {
  const { state, selectNote } = useDemo();
  const loc = useLocation();
  const screen = screenByPath(loc.pathname);
  const list = notesForScreen(screen.id);
  const idx = list.findIndex((n) => n.anchor === id);
  const note = idx >= 0 ? list[idx] : undefined;
  const selected = state.notesOn && note && state.selectedNoteId === note.id;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected && ref.current) ref.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [selected]);

  return (
    <div
      ref={ref}
      data-note-anchor={id}
      className={`relative ${selected ? 'note-selected' : ''} ${className}`}
      style={style}
    >
      {children}
      {state.notesOn && note && (
        <motion.button
          type="button"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 26 }}
          onClick={(e) => {
            e.stopPropagation();
            selectNote(selected ? null : note.id);
          }}
          aria-label={`Product note ${idx + 1}: ${note.title}`}
          className="note-marker"
          style={{
            top: inset ? 6 : -9,
            right: inset ? 6 : -9,
            background: note.tag === 'Roadmap' ? '#fff' : '#3B4CCA',
            color: note.tag === 'Roadmap' ? '#3B4CCA' : '#fff',
            border: note.tag === 'Roadmap' ? '1.5px dashed #3B4CCA' : '2px solid #fff',
          }}
        >
          {idx + 1}
        </motion.button>
      )}
    </div>
  );
}
