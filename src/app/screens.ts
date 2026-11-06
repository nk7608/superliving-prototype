import type { PersonaId } from '../data/personas';

export type ScreenId =
  | 'S0' | 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7' | 'S8' | 'S9' | 'S10'
  | 'S11' | 'S12' | 'S13' | 'S14' | 'S15' | 'S16' | 'S17' | 'COURSES';

export interface ScreenDef {
  id: ScreenId;
  path: string;
  label: string;
  persona?: PersonaId;
  /** false = rendered outside the phone (S0, S17) */
  inPhone: boolean;
  /** status-bar clock shown in the phone frame */
  clock: string;
  /** status bar text colour */
  statusTone: 'light' | 'dark';
  /** background behind the status bar */
  statusBg: string;
}

export const screens: ScreenDef[] = [
  { id: 'S0', path: '/', label: 'S0 · Intro', inPhone: false, clock: '', statusTone: 'dark', statusBg: '' },
  { id: 'S1', path: '/onboarding', label: 'S1 · Onboarding (one shot)', persona: 'neha', inPhone: true, clock: '6:40', statusTone: 'light', statusBg: '#1C3E1A' },
  { id: 'S2', path: '/home', label: 'S2 · Home', persona: 'neha', inPhone: true, clock: '8:54', statusTone: 'light', statusBg: '#22391D' },
  { id: 'S3', path: '/whatsapp', label: 'S3 · WhatsApp check-in (mock)', persona: 'neha', inPhone: true, clock: '6:30', statusTone: 'light', statusBg: 'transparent' },
  { id: 'S4', path: '/health', label: 'S4 · Health tab', persona: 'neha', inPhone: true, clock: '8:58', statusTone: 'light', statusBg: '#22391D' },
  { id: 'S5', path: '/meal', label: 'S5 · Meal scanner', persona: 'neha', inPhone: true, clock: '8:53', statusTone: 'light', statusBg: '#0F1A0D' },
  { id: 'S6', path: '/experts', label: 'S6 · Expert Chat tab', persona: 'neha', inPhone: true, clock: '8:54', statusTone: 'light', statusBg: '#22391D' },
  { id: 'S7', path: '/chat/tara', label: 'S7 · Chat with Tara', persona: 'neha', inPhone: true, clock: '8:54', statusTone: 'dark', statusBg: '#FFFFFF' },
  { id: 'S8', path: '/me', label: 'S8 · Me card', persona: 'neha', inPhone: true, clock: '8:55', statusTone: 'dark', statusBg: '#FFFFFF' },
  { id: 'S9', path: '/report', label: 'S9 · Report → next steps', persona: 'neha', inPhone: true, clock: '6:53', statusTone: 'dark', statusBg: '#FFFFFF' },
  { id: 'S10', path: '/chat/dev', label: 'S10 · Handoff to Dev', persona: 'neha', inPhone: true, clock: '7:02', statusTone: 'dark', statusBg: '#FFFFFF' },
  { id: 'S11', path: '/tv', label: 'S11 · SuperTV', inPhone: true, clock: '8:57', statusTone: 'light', statusBg: '#22391D' },
  { id: 'S12', path: '/profile', label: 'S12 · Profile, check-ins, price card', persona: 'neha', inPhone: true, clock: '8:58', statusTone: 'light', statusBg: '#2A5B2B' },
  { id: 'S13', path: '/invite', label: 'S13 · Invite Rohit', inPhone: true, clock: '9:10', statusTone: 'light', statusBg: 'transparent' },
  { id: 'S14', path: '/rohit-chat', label: 'S14 · Rohit: evening chat', persona: 'rohit', inPhone: true, clock: '9:40', statusTone: 'dark', statusBg: '#FFFFFF' },
  { id: 'S15', path: '/together', label: 'S15 · Do it together + Roadmap', persona: 'neha', inPhone: true, clock: '8:56', statusTone: 'light', statusBg: '#22391D' },
  { id: 'S16', path: '/day30', label: 'S16 · Day-30 snapshot', persona: 'neha', inPhone: true, clock: '8:31', statusTone: 'light', statusBg: '#22391D' },
  { id: 'COURSES', path: '/courses', label: 'Courses tab (unchanged)', inPhone: true, clock: '8:55', statusTone: 'light', statusBg: '#22391D' },
  { id: 'S17', path: '/changes', label: 'S17 · All changes index', inPhone: false, clock: '', statusTone: 'dark', statusBg: '' },
];

export const screenByPath = (path: string): ScreenDef =>
  screens.find((s) => s.path === path) ?? screens.find((s) => s.path !== '/' && path.startsWith(s.path)) ?? screens[0];
export const screenById = (id: ScreenId) => screens.find((s) => s.id === id)!;
