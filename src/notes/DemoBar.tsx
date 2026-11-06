import { useLocation, useNavigate } from 'react-router-dom';
import { RotateCcw, ListChecks, ChevronDown } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { screenByPath, screens } from '../app/screens';
import type { PersonaId } from '../data/personas';
import { Avatar } from '../components/Avatar';

function Seg<T extends string>({ value, options, onChange, label, dark = true }: { value: T; options: { v: T; l: string }[]; onChange: (v: T) => void; label: string; dark?: boolean }) {
  return (
    <div role="group" aria-label={label} className={`flex shrink-0 rounded-full p-[3px] ${dark ? 'bg-black/25' : 'bg-[#E4DFCF]'}`}>
      {options.map((o) => {
        const on = value === o.v;
        return (
          <button
            key={o.v}
            type="button"
            onClick={() => onChange(o.v)}
            aria-pressed={on}
            className={`h-8 rounded-full px-3 text-[12.5px] font-medium transition-colors ${
              on ? (dark ? 'bg-[#F1EFE7] text-green-900' : 'bg-green-900 text-[#F1EFE7]') : dark ? 'text-[#F1EFE7]/75 hover:text-white' : 'text-green-900/70'
            }`}
          >
            {o.l}
          </button>
        );
      })}
    </div>
  );
}

/** Mode, notes, persona, language, jump, reset — every change applies instantly. */
export function DemoControls({ vertical = false }: { vertical?: boolean }) {
  const { state, set, reset, goTour, exitTour } = useDemo();
  const navigate = useNavigate();
  const loc = useLocation();
  const cur = screenByPath(loc.pathname);
  const dark = !vertical;
  const Label = ({ children }: { children: string }) => (vertical ? <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A877E]">{children}</div> : null);
  return (
    <div className={vertical ? 'space-y-4' : 'flex flex-wrap items-center gap-2'}>
      <div>
        <Label>Mode</Label>
        <Seg dark={dark} label="Mode" value={state.tourActive ? 'tour' : 'explore'} onChange={(v) => (v === 'tour' ? goTour(state.tourStep) : exitTour())} options={[{ v: 'tour', l: 'Guided tour' }, { v: 'explore', l: 'Explore' }]} />
      </div>
      <div>
        <Label>Product notes</Label>
        <Seg dark={dark} label="Product notes" value={state.notesOn ? 'on' : 'off'} onChange={(v) => set({ notesOn: v === 'on' })} options={[{ v: 'on', l: 'Notes on' }, { v: 'off', l: 'Off' }]} />
      </div>
      <div>
        <Label>Whose phone</Label>
        <Seg<PersonaId> dark={dark} label="Persona" value={state.persona} onChange={(v) => {
          // A persona switch is a deliberate detour: leave the scripted tour so it sticks.
          if (state.tourActive) exitTour();
          set({ persona: v, selectedNoteId: null });
        }} options={[{ v: 'neha', l: 'Neha' }, { v: 'rohit', l: 'Rohit' }]} />
      </div>
      <div>
        <Label>App language</Label>
        <Seg dark={dark} label="App language" value={state.lang} onChange={(v) => set({ lang: v })} options={[{ v: 'hi', l: 'Hinglish' }, { v: 'en', l: 'English' }]} />
      </div>
      <div>
        <Label>Jump to screen</Label>
        <div className="relative">
        <select
          aria-label="Jump to screen"
          value={cur.path}
          onChange={(e) => {
            const s = screens.find((x) => x.path === e.target.value);
            set({ selectedNoteId: null, ...(s?.persona ? { persona: s.persona } : {}) });
            navigate(e.target.value);
          }}
          className={`h-9 appearance-none rounded-full pl-3.5 pr-9 text-[12.5px] ${dark ? 'max-w-[200px] border border-white/20 bg-black/25 text-[#F1EFE7]' : 'w-full border border-[#D9D3BF] bg-[#FFFDF8] text-green-900'}`}
        >
          {screens.map((s) => (
            <option key={s.id} value={s.path} className="text-green-900">
              {s.label}
            </option>
          ))}
        </select>
          <ChevronDown size={15} className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${dark ? 'text-[#F1EFE7]/80' : 'text-green-900/70'}`} aria-hidden />
        </div>
      </div>
      <div className={vertical ? 'flex gap-2 pt-1' : 'flex gap-1'}>
        <button type="button" onClick={() => navigate('/changes')} className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-medium ${dark ? 'text-[#F1EFE7]/85 hover:bg-white/10' : 'border border-[#D9D3BF] text-green-900'}`}>
          <ListChecks size={15} /> All changes
        </button>
        <button type="button" onClick={reset} className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-medium ${dark ? 'text-[#F1EFE7]/85 hover:bg-white/10' : 'border border-[#D9D3BF] text-green-900'}`}>
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </div>
  );
}

/** Whose phone you're looking at — the clearest signal that the persona switch worked. */
export function PhoneOwner({ light = false, short = false }: { light?: boolean; short?: boolean }) {
  const { state } = useDemo();
  const name = state.persona === 'rohit' ? 'Rohit' : 'Neha';
  return (
    <span className={`flex items-center gap-1.5 rounded-full py-[3px] pl-[3px] pr-2.5 text-[12px] font-medium ${light ? 'bg-[#FFFDF8] text-green-900' : 'bg-white/10 text-[#F1EFE7]'}`}>
      <Avatar who={state.persona} size={22} />
      {short ? name : `${name}’s phone`}
    </span>
  );
}

export function DemoBar() {
  const navigate = useNavigate();
  return (
    <header className="flex min-h-[56px] shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 bg-green-900 px-5 py-2.5">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => navigate('/')} className="flex items-baseline gap-2 text-left">
          <span className="text-[20px] font-bold tracking-[-0.3px] text-green-300">SuperLiving</span>
          <span className="hidden text-[13px] text-[#F1EFE7]/70 xl:inline">90-day add-ons</span>
        </button>
        <PhoneOwner />
      </div>
      <DemoControls />
    </header>
  );
}
