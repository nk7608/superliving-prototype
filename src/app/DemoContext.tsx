import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { PersonaId } from '../data/personas';
import type { ActionName } from '../data/notes';
import { tourFor, type Precondition, type TourWho } from '../data/tour';
import { tr, type Lang } from '../data/strings';

const KEY = 'sl-demo-v1';

export type StepStatus = 'pending' | 'done' | 'skipped';

export interface DemoState {
  persona: PersonaId;
  lang: Lang;
  notesOn: boolean;
  tourActive: boolean;
  tourStep: number;
  tourOf: TourWho; // whose story the guided tour follows
  selectedNoteId: string | null;
  onboarded: Record<PersonaId, boolean>;
  chaiTime: string | null;
  whoFor: string | null;
  whatsappOptIn: boolean;
  today: Record<PersonaId, StepStatus>;
  weekDays: Record<PersonaId, number>; // days this week with the step done (= streak definition)
  skipUsed: Record<PersonaId, boolean>; // one "Aaj nahi" per week is forgiven
  stepIndex: Record<PersonaId, number>; // "Badlo" rotates the step
  forgotten: string[]; // memory item ids
  edits: Record<string, string>; // memory item id -> edited value
  learned: string[]; // memory ids learned in chat
  answers: Record<string, string>; // which quick reply was chosen
  report: 'none' | 'ready' | 'reviewed';
  retestReminder: boolean;
  water: number;
  mealsLogged: string[];
  checkins: { channel: 'whatsapp' | 'app'; freq: 'daily' | 'thrice' | 'important'; time: string; style: 'hinglish' | 'hindi' | 'english'; neutral: boolean };
  futureOptIn: boolean;
  rohitShares: boolean;
  invited: boolean;
  tvFeedback: null | 'yes' | 'more';
  safetyActive: boolean;
}

export const initialState: DemoState = {
  persona: 'neha',
  lang: 'hi',
  notesOn: true,
  tourActive: false,
  tourStep: 0,
  tourOf: 'neha',
  selectedNoteId: null,
  onboarded: { neha: false, rohit: false },
  chaiTime: null,
  whoFor: null,
  whatsappOptIn: false,
  today: { neha: 'pending', rohit: 'pending' },
  weekDays: { neha: 0, rohit: 0 },
  skipUsed: { neha: false, rohit: false },
  stepIndex: { neha: 0, rohit: 0 },
  forgotten: [],
  edits: {},
  learned: [],
  answers: {},
  report: 'none',
  retestReminder: true,
  water: 0,
  mealsLogged: [],
  checkins: { channel: 'whatsapp', freq: 'daily', time: '6:30', style: 'hinglish', neutral: true },
  futureOptIn: false,
  rohitShares: false,
  invited: false,
  tvFeedback: null,
  safetyActive: false,
};

function load(): DemoState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initialState;
    return { ...initialState, ...JSON.parse(raw), tourActive: false };
  } catch {
    return initialState;
  }
}

interface Ctx {
  state: DemoState;
  set: (patch: Partial<DemoState> | ((s: DemoState) => Partial<DemoState>)) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  reset: () => void;
  action: { name: ActionName; nonce: number; at: number } | null;
  runAction: (name: ActionName) => void;
  selectNote: (id: string | null) => void;
  goTour: (step: number, who?: TourWho) => void;
  exitTour: () => void;
  ensure: (needs: Precondition[]) => void;
  markStep: (status: StepStatus, who?: PersonaId) => void;
}

const DemoCtx = createContext<Ctx | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(load);
  const [action, setAction] = useState<Ctx['action']>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const nonce = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable — demo still works in memory */
    }
  }, [state]);

  const set: Ctx['set'] = useCallback((patch) => {
    setState((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }));
  }, []);

  const t: Ctx['t'] = useCallback((key, vars) => tr(state.lang, key, vars), [state.lang]);

  const runAction = useCallback((name: ActionName) => {
    nonce.current += 1;
    setAction({ name, nonce: nonce.current, at: Date.now() });
  }, []);

  const selectNote = useCallback((id: string | null) => set({ selectedNoteId: id }), [set]);

  const markStep = useCallback((status: StepStatus, who?: PersonaId) => {
    setState((s) => {
      const p = who ?? s.persona;
      if (s.today[p] === status) return s;
      const wasDone = s.today[p] === 'done';
      const weekDays = { ...s.weekDays, [p]: Math.max(0, s.weekDays[p] + (status === 'done' ? 1 : 0) - (wasDone ? 1 : 0)) };
      return {
        ...s,
        today: { ...s.today, [p]: status },
        weekDays,
        skipUsed: status === 'skipped' ? { ...s.skipUsed, [p]: true } : s.skipUsed,
      };
    });
  }, []);

  const ensure = useCallback((needs: Precondition[]) => {
    setState((s) => {
      const n = { ...s };
      if (needs.includes('onboarded')) {
        n.onboarded = { ...n.onboarded, neha: true };
        n.chaiTime = n.chaiTime ?? '6–7';
        n.whoFor = n.whoFor ?? 'family';
        n.whatsappOptIn = true;
      }
      if (needs.includes('rohitOnboarded')) n.onboarded = { ...n.onboarded, rohit: true };
      if (needs.includes('stepDone') && n.today.neha !== 'done') {
        n.today = { ...n.today, neha: 'done' };
        n.weekDays = { ...n.weekDays, neha: Math.max(1, n.weekDays.neha) };
      }
      if (needs.includes('report') && n.report === 'none') n.report = 'ready';
      if (needs.includes('reviewed')) n.report = 'reviewed';
      return n;
    });
  }, []);

  const stateRef = useRef(state);
  stateRef.current = state;
  const goTour = useCallback(
    (step: number, who?: TourWho) => {
      const whoNow = who ?? stateRef.current.tourOf;
      const st = tourFor(whoNow)[step];
      if (!st) return;
      if (st.needs) ensure(st.needs);
      set({ tourActive: true, tourOf: whoNow, tourStep: step, selectedNoteId: st.noteId ?? null, persona: st.persona ?? whoNow, ...(st.path !== '/' ? { notesOn: true } : {}) });
      if (location.pathname !== st.path) navigate(st.path);
      if (st.action) {
        const a = st.action;
        window.setTimeout(() => runAction(a), 450);
      }
    },
    [ensure, set, navigate, location.pathname, runAction],
  );

  const exitTour = useCallback(() => set({ tourActive: false, selectedNoteId: null }), [set]);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
    setState(initialState);
    navigate('/');
  }, [navigate]);

  const value = useMemo<Ctx>(
    () => ({ state, set, t, reset, action, runAction, selectNote, goTour, exitTour, ensure, markStep }),
    [state, set, t, reset, action, runAction, selectNote, goTour, exitTour, ensure, markStep],
  );
  return <DemoCtx.Provider value={value}>{children}</DemoCtx.Provider>;
}

export function useDemo() {
  const c = useContext(DemoCtx);
  if (!c) throw new Error('useDemo outside provider');
  return c;
}

/** Run `fn` whenever the scripted action `name` is dispatched (tour or panel "reveal"). */
export function useAction(name: ActionName | ActionName[], fn: (n: ActionName) => void) {
  const { action } = useDemo();
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const seen = useRef<number | null>(null);
  const names = Array.isArray(name) ? name : [name];
  const key = names.join('|');
  useEffect(() => {
    if (!action || seen.current === action.nonce || Date.now() - action.at > 2500) return;
    if (key.split('|').includes(action.name)) {
      seen.current = action.nonce;
      fnRef.current(action.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action?.nonce]);
}

/** Small helper for scripted sequences. */
export const wait = (ms: number) => new Promise((r) => window.setTimeout(r, ms));
