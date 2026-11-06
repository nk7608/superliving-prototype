import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { screenById, screenByPath } from '../app/screens';
import { hiddenItems, noteById, notesForScreen, screenIntro, type ActionName } from '../data/notes';
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
    if (target.persona) set({ persona: target.persona });
    selectNote(id);
    set({ notesOn: true });
    if (!here) navigate(target.path);
    window.setTimeout(
      () => {
        const el = n.anchor ? document.querySelector(`[data-note-anchor="${n.anchor}"]`) : null;
        if (!el && n.reveal) runAction(n.reveal);
      },
      here ? 0 : 400,
    );
  };
}

/** "What changed here": one sentence for the screen, then each change as Before → Now. */
export function NotesPanel({ compact = false }: { compact?: boolean }) {
  const { state, selectNote, runAction } = useDemo();
  const loc = useLocation();
  const navigate = useNavigate();
  const screen = screenByPath(loc.pathname);
  const list = notesForScreen(screen.id);
  const hidden = hiddenItems[screen.id] ?? [];
  const openNote = useOpenNote();
  const name = screen.label.replace(/^S\d+ · /, '').replace(/^Courses tab.*/, 'Courses');

  return (
    <div className="flex h-full flex-col bg-[#F1EFE7] text-green-900">
      {state.tourActive && !compact && <TourBar />}
      <div className={`px-4 ${compact ? 'pb-2 pt-1' : 'pb-3 pt-4'}`}>
        <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A6A12]">What changed here</div>
        <h2 className="mt-0.5 text-[18px] font-semibold leading-tight">{name}</h2>
        {screenIntro[screen.id] && <p className="mt-1.5 text-[13.5px] leading-[1.5] text-[#5E5D58]">{screenIntro[screen.id]}</p>}
        {list.length > 0 && state.notesOn && (
          <p className="mt-2 text-[12px] text-[#8A877E]">Tap a numbered pin on the screen, or a card below.</p>
        )}
      </div>
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 pb-4">
        {list.map((n, i) => (
          <NoteCard
            key={n.id}
            note={n}
            number={n.anchor ? i + 1 : undefined}
            expanded={state.selectedNoteId === n.id}
            onToggle={() => (state.selectedNoteId === n.id ? selectNote(null) : openNote(n.id))}
            onDemo={(a: ActionName) => runAction(a)}
          />
        ))}
        {hidden.length > 0 && (
          <section className="pt-2">
            <h3 className="px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A877E]">Also removed or merged</h3>
            <ul className="mt-1.5 space-y-1.5">
              {hidden.map((h) => (
                <li key={h.text} className="flex items-start gap-2 rounded-xl border border-dashed border-[#D9D3BF] px-3 py-2 text-[12.5px] leading-snug text-[#5E5D58]">
                  <TagPill tag={h.tag} small />
                  <span>{h.text}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        {list.length === 0 && hidden.length === 0 && <p className="px-1 text-[14px] text-[#5E5D58]">Nothing changed on this screen.</p>}
      </div>
      <div className="border-t border-[#E4DFCF] bg-[#FFFDF8] px-4 py-2.5">
        <button type="button" onClick={() => navigate('/changes')} className="flex min-h-[40px] items-center gap-1.5 text-[13.5px] font-semibold text-green-700 hover:underline">
          See every change in one list <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
