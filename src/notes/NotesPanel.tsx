import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { screenById, screenByPath } from '../app/screens';
import { hiddenItems, noteById, notesForScreen, type ActionName, type Tag } from '../data/notes';
import { NoteCard, TagPill } from './NoteCard';
import { TourBar } from './TourController';

export function useOpenNote() {
  const { selectNote, runAction, set } = useDemo();
  const loc = useLocation();
  const navigate = useNavigate();
  return (id: string) => {
    const n = noteById(id);
    if (!n) return;
    if (n.screen === 'INDEX') {
      navigate('/changes');
      return;
    }
    const target = screenById(n.screen);
    const here = screenByPath(loc.pathname).id === n.screen;
    selectNote(id);
    set({ notesOn: true });
    if (!here) navigate(target.path);
    window.setTimeout(
      () => {
        const el = n.anchor ? document.querySelector(`[data-note-anchor="${n.anchor}"]`) : null;
        if (!el && n.reveal) runAction(n.reveal);
      },
      here ? 0 : 350,
    );
  };
}

export function NotesPanel({ compact = false }: { compact?: boolean }) {
  const { state, selectNote, runAction } = useDemo();
  const loc = useLocation();
  const navigate = useNavigate();
  const screen = screenByPath(loc.pathname);
  const list = notesForScreen(screen.id);
  const hidden = hiddenItems[screen.id] ?? [];
  const openNote = useOpenNote();

  const counts = new Map<Tag, number>();
  list.forEach((n) => counts.set(n.tag, (counts.get(n.tag) ?? 0) + 1));
  hidden.forEach((h) => counts.set(h.tag, (counts.get(h.tag) ?? 0) + 1));
  const countText = [...counts.entries()].map(([t, c]) => `${c} ${t === 'Roadmap' ? 'Roadmap' : t}`).join(' · ');

  const onDemo = (a: ActionName) => runAction(a);

  return (
    <div className="flex h-full flex-col font-note text-[#141826]">
      {state.tourActive && <TourBar />}
      <div className={`border-b border-[#E3E5EE] bg-[#F6F7FB] ${compact ? 'px-4 pb-2 pt-1' : 'px-4 pb-3 pt-4'}`}>
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-[16px] font-bold">On this screen</h2>
          <span className="truncate text-[12px] text-[#6A6F85]">{screen.label}</span>
        </div>
        <p className="mt-0.5 text-[13px] text-[#4A4F66]">{countText || 'No changes on this screen'}</p>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto bg-[#F6F7FB] px-3 py-3">
        {list.map((n, i) => (
          <NoteCard
            key={n.id}
            note={n}
            number={n.anchor ? i + 1 : undefined}
            expanded={state.selectedNoteId === n.id}
            onToggle={() => (state.selectedNoteId === n.id ? selectNote(null) : openNote(n.id))}
            onRelated={openNote}
            onDemo={onDemo}
          />
        ))}
        {hidden.length > 0 && (
          <section className="pt-2">
            <h3 className="px-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#6A6F85]">Hidden or merged here</h3>
            <ul className="mt-1.5 space-y-1.5">
              {hidden.map((h) => (
                <li key={h.text}>
                  <button
                    type="button"
                    onClick={() => h.noteId && openNote(h.noteId)}
                    className="flex w-full items-start gap-2 rounded-lg border border-dashed border-[#C9CCDA] bg-white px-2.5 py-2 text-left text-[13px] leading-snug text-[#2A2F45] hover:border-[#3B4CCA]"
                  >
                    <TagPill tag={h.tag} small />
                    <span>{h.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
        {list.length === 0 && hidden.length === 0 && (
          <p className="px-1 text-[14px] text-[#4A4F66]">Nothing changed on this screen.</p>
        )}
      </div>
      <div className="border-t border-[#E3E5EE] bg-white px-4 py-2.5">
        <button type="button" onClick={() => navigate('/changes')} className="flex min-h-[36px] items-center gap-1.5 text-[13px] font-semibold text-[#3B4CCA] hover:underline">
          All changes, metrics and sources <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
