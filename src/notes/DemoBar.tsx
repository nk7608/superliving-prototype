import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Play, RotateCcw, Compass } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { screenByPath, screens } from '../app/screens';
import type { PersonaId } from '../data/personas';

const Seg = <T extends string>({ value, options, onChange, label }: { value: T; options: { v: T; l: string }[]; onChange: (v: T) => void; label: string }) => (
  <div role="group" aria-label={label} className="flex rounded-lg bg-[#EEF0F6] p-0.5">
    {options.map((o) => (
      <button
        key={o.v}
        type="button"
        onClick={() => onChange(o.v)}
        aria-pressed={value === o.v}
        className={`h-8 rounded-md px-2.5 text-[13px] font-medium ${value === o.v ? 'bg-white text-[#141826] shadow-sm' : 'text-[#5A5F7A] hover:text-[#141826]'}`}
      >
        {o.l}
      </button>
    ))}
  </div>
);

export function DemoControls({ vertical = false }: { vertical?: boolean }) {
  const { state, set, reset, goTour, exitTour } = useDemo();
  const navigate = useNavigate();
  const loc = useLocation();
  const cur = screenByPath(loc.pathname);
  return (
    <div className={`flex font-note ${vertical ? 'flex-col items-stretch gap-3' : 'flex-wrap items-center gap-2'}`}>
      <Seg
        label="Mode"
        value={state.tourActive ? 'tour' : 'explore'}
        onChange={(v) => (v === 'tour' ? goTour(state.tourStep) : exitTour())}
        options={[
          { v: 'tour', l: 'Tour' },
          { v: 'explore', l: 'Explore' },
        ]}
      />
      <button
        type="button"
        onClick={() => set((s) => ({ notesOn: !s.notesOn }))}
        aria-pressed={state.notesOn}
        className={`flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[13px] font-medium ${state.notesOn ? 'bg-[#3B4CCA] text-white' : 'bg-[#EEF0F6] text-[#5A5F7A]'}`}
        title="Toggle notes (N)"
      >
        {state.notesOn ? <Eye size={15} /> : <EyeOff size={15} />} Notes {state.notesOn ? 'on' : 'off'}
        <kbd className="ml-1 rounded border border-current/30 px-1 text-[10px] opacity-70">N</kbd>
      </button>
      <Seg<PersonaId>
        label="Persona"
        value={state.persona}
        onChange={(v) => set({ persona: v })}
        options={[
          { v: 'neha', l: 'Neha' },
          { v: 'rohit', l: 'Rohit' },
        ]}
      />
      <Seg
        label="App language"
        value={state.lang}
        onChange={(v) => set({ lang: v })}
        options={[
          { v: 'hi', l: 'Hinglish' },
          { v: 'en', l: 'English' },
        ]}
      />
      <label className="flex items-center gap-1.5 text-[13px] text-[#5A5F7A]">
        <Compass size={15} />
        <span className="sr-only">Jump to screen</span>
        <select
          value={cur.path}
          onChange={(e) => {
            const s = screens.find((x) => x.path === e.target.value);
            if (s?.persona) set({ persona: s.persona });
            set({ selectedNoteId: null });
            navigate(e.target.value);
          }}
          className="h-9 max-w-[220px] rounded-lg border border-[#D9DCEA] bg-white px-2 text-[13px] text-[#141826]"
        >
          {screens.map((s) => (
            <option key={s.id} value={s.path}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
      <button type="button" onClick={reset} className="flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[13px] font-medium text-[#5A5F7A] hover:bg-[#EEF0F6]">
        <RotateCcw size={15} /> Reset demo
      </button>
    </div>
  );
}

export function DemoBar() {
  const { state, goTour } = useDemo();
  return (
    <header className="flex min-h-[52px] shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-b border-[#E3E5EE] bg-white px-4 py-2 font-note">
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#3B4CCA] text-[11px] font-bold text-white">PN</span>
        <span className="whitespace-nowrap text-[14px] font-semibold text-[#141826]">SuperLiving add-ons · first 90 days</span>
        <span className="hidden text-[13px] text-[#8A8FA6] xl:inline">Prototype with product notes</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {!state.tourActive && (
          <button type="button" onClick={() => goTour(0)} className="hidden h-9 items-center gap-1.5 rounded-lg border border-[#3B4CCA] px-2.5 text-[13px] font-semibold text-[#3B4CCA] hover:bg-[#3B4CCA]/5 2xl:flex">
            <Play size={14} /> Start tour
          </button>
        )}
        <DemoControls />
      </div>
    </header>
  );
}
