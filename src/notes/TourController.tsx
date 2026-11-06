import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { tour } from '../data/tour';

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

export function TourBar({ dense = false }: { dense?: boolean }) {
  const { next, back, exit, step, total } = useTourNav();
  const last = step >= total - 1;
  return (
    <div className={`bg-[#3B4CCA] text-white ${dense ? 'px-3 py-2' : 'px-4 py-3'}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/80">
          Tour · Step {step + 1} of {total}
        </span>
        <button type="button" onClick={exit} className="flex min-h-[32px] items-center gap-1 rounded px-1.5 text-[12px] text-white/85 hover:bg-white/10" aria-label="Exit tour">
          <X size={14} /> Explore freely
        </button>
      </div>
      <p className="mt-1 text-[14px] leading-snug">{tour[step]?.caption}</p>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
          <div className="h-full rounded-full bg-white transition-all" style={{ width: `${((step + 1) / total) * 100}%` }} />
        </div>
        <button type="button" onClick={back} disabled={step === 0} className="flex h-9 items-center gap-0.5 rounded-lg bg-white/15 px-2.5 text-[13px] font-semibold disabled:opacity-40" aria-label="Previous step">
          <ChevronLeft size={16} /> Back
        </button>
        <button type="button" onClick={next} className="flex h-9 items-center gap-0.5 rounded-lg bg-white px-3 text-[13px] font-semibold text-[#3B4CCA]" aria-label="Next step">
          {last ? 'All changes' : 'Next'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

/** Keyboard: N toggles notes, ←/→ steps the tour, Esc exits the tour (§7.2). */
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
        // Esc closes an open in-app sheet first; it only leaves the tour when nothing is open.
        if (document.querySelector('#app-viewport [role="dialog"]')) return;
        exit();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
}
