import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Play } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { effectiveScreen, screenById } from '../app/screens';
import { hiddenItems, noteById, notesForScreen, screenIntro } from '../data/notes';
import { chapterFor, chaptersFor, firstStepOf, tourFor } from '../data/tour';
import { TagPill, Pin } from './NoteCard';

/** Open a note: go to its screen, light it up, and reveal it if it lives in a sheet. */
export function useOpenNote() {
  const { state, selectNote, runAction, set, exitTour } = useDemo();
  const loc = useLocation();
  const navigate = useNavigate();
  return (id: string) => {
    const n = noteById(id);
    if (!n) return;
    if (n.screen === 'INDEX') {
      navigate('/changes');
      return;
    }
    if (state.tourActive) exitTour();
    const target = screenById(n.screen);
    const here = effectiveScreen(loc.pathname, state.persona).id === n.screen;
    if (target.persona) set({ persona: target.persona });
    set({ notesOn: true });
    selectNote(id);
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

/** The story map: where you are in the pitch, and what changed on this screen — nothing more. */
export function NotesPanel({ compact = false, onPick }: { compact?: boolean; onPick?: () => void }) {
  const { state, goTour } = useDemo();
  const loc = useLocation();
  const navigate = useNavigate();
  const screen = effectiveScreen(loc.pathname, state.persona);
  const list = notesForScreen(screen.id);
  const hidden = hiddenItems[screen.id] ?? [];
  const openNote = useOpenNote();
  const who = state.tourActive ? state.tourOf : state.persona;
  const chapters = chaptersFor(who);
  const current = state.tourActive ? tourFor(who)[state.tourStep]?.chapter ?? 1 : chapterFor(who, screen.id);

  return (
    <div className="flex h-full flex-col bg-[#F1EFE7] text-green-900">
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A6A12]">{who === 'rohit' ? 'Rohit’s story' : 'Neha’s story'}</div>
        <ol className="mt-2 space-y-0.5">
          {chapters.map((c, i) => {
            const n = i + 1;
            const on = n === current;
            const done = n < current;
            return (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => {
                    goTour(firstStepOf(who, n), who);
                    onPick?.();
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-2 py-1.5 text-left ${on ? 'bg-[#FFFDF8] shadow-[0_1px_0_#E4DFCF]' : 'hover:bg-white/50'}`}
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11.5px] font-bold ${on ? 'bg-green-900 text-[#F1EFE7]' : done ? 'bg-green-100 text-green-700' : 'border border-[#D9D3BF] text-[#8A877E]'}`}>
                    {done ? <Check size={13} /> : n}
                  </span>
                  <span className={`flex-1 text-[13.5px] ${on ? 'font-semibold' : 'text-[#5E5D58]'}`}>{c}</span>
                  {on && !state.tourActive && <Play size={13} className="text-green-700" />}
                </button>
              </li>
            );
          })}
        </ol>

        {screen.inPhone && (
          <section className="mt-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A6A12]">On this screen</div>
            {screenIntro[screen.id] && <p className="mt-1 text-[13.5px] leading-snug text-[#4F4E49]">{screenIntro[screen.id]}</p>}
            <ul className="mt-2 space-y-1.5">
              {list.map((n, i) => {
                const on = state.selectedNoteId === n.id && !state.tourActive;
                return (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => {
                        openNote(n.id);
                        onPick?.();
                      }}
                      className={`flex w-full items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left transition-colors ${on ? 'border-[#D9C27A] bg-[#FFFDF8]' : 'border-[#E4DFCF] bg-[#FFFDF8]/70 hover:bg-[#FFFDF8]'}`}
                    >
                      {n.anchor ? <Pin n={i + 1} roadmap={n.tag === 'Roadmap'} /> : <span className="w-6" />}
                      <span className="min-w-0 flex-1 text-[13.5px] font-medium leading-snug">{n.title}</span>
                      <TagPill tag={n.tag} small />
                    </button>
                  </li>
                );
              })}
            </ul>
            {hidden.length > 0 && (
              <ul className="mt-3 space-y-1">
                {hidden.map((h) => (
                  <li key={h.text} className="flex items-start gap-2 px-1 text-[12px] leading-snug text-[#8A877E]">
                    <TagPill tag={h.tag} small /> <span>{h.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
      {!compact && (
        <div className="border-t border-[#E4DFCF] bg-[#FFFDF8] px-4 py-2.5">
          <button type="button" onClick={() => navigate('/changes')} className="flex min-h-[40px] items-center gap-1.5 text-[13.5px] font-semibold text-green-700 hover:underline">
            Every change in one list <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
