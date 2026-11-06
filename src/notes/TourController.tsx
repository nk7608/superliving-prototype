import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { chapters, tour } from '../data/tour';

export function useTourNav() {
  const { state, goTour, exitTour } = useDemo();
  const navigate = useNavigate();
  const next = () => {
    if (state.tourStep >= tour.length - 1) {
      exitTour();
      navigate('/changes');
    } else goTour(state.tourStep + 1);
  };
  const back = () => state.tourStep > 0 && goTour(state.tourStep - 1);
  return { next, back, exit: exitTour, step: state.tourStep, total: tour.length };
}

/** Dark-green tour card: chapter, one caption, progress, Back/Next. */
export function TourBar({ dense = false }: { dense?: boolean }) {
  const { next, back, exit, step, total } = useTourNav();
  const s = tour[step];
  const last = step >= total - 1;
  return (
    <div className={`bg-green-900 text-[#F1EFE7] ${dense ? 'px-3 py-2.5' : 'px-4 py-3.5'}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[11px] font-semibold uppercase tracking-[0.1em] text-mustard">
          Chapter {s?.chapter} of {chapters.length} · {chapters[(s?.chapter ?? 1) - 1]}
        </span>
        <button type="button" onClick={exit} className="flex h-8 shrink-0 items-center gap-1 rounded-full px-2 text-[12px] text-[#F1EFE7]/80 hover:bg-white/10" aria-label="Leave the tour">
          <X size={14} /> Leave tour
        </button>
      </div>
      <p className={`mt-1 leading-snug ${dense ? 'line-clamp-3 text-[13.5px]' : 'text-[15px]'}`}>{s?.caption}</p>
      <div className="mt-2.5 flex items-center gap-2">
        <button type="button" onClick={back} disabled={step === 0} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 disabled:opacity-35" aria-label="Previous step">
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1">
          <div className="h-1 overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-mustard transition-all" style={{ width: `${((step + 1) / total) * 100}%` }} />
          </div>
          <div className="mt-1 text-center text-[11px] text-[#F1EFE7]/70">Step {step + 1} of {total}</div>
        </div>
        <button type="button" onClick={next} className="flex h-9 items-center gap-1 rounded-full bg-mustard px-4 text-[13.5px] font-semibold text-green-900" aria-label="Next step">
          {last ? 'All changes' : 'Next'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

/** Keyboard: N toggles notes, ←/→ steps the tour, Esc closes a sheet or leaves the tour. */
export function useKeyboardShortcuts() {
  const { state, set } = useDemo();
  const { next, back, exit } = useTourNav();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'n' || e.key === 'N') set((s) => ({ notesOn: !s.notesOn }));
      else if (state.tourActive && e.key === 'ArrowRight') next();
      else if (state.tourActive && e.key === 'ArrowLeft') back();
      else if (state.tourActive && e.key === 'Escape') {
        if (document.querySelector('#app-viewport [role="dialog"]')) return;
        exit();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
}
