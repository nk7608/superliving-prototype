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
  { id: 'S0', path: '/', label: "Intro", inPhone: false, clock: '', statusTone: 'dark', statusBg: '' },
  { id: 'S1', path: '/onboarding', label: "Onboarding", persona: 'neha', inPhone: true, clock: '6:40', statusTone: 'light', statusBg: '#1C3E1A' },
  { id: 'S2', path: '/home', label: "Home", persona: 'neha', inPhone: true, clock: '8:54', statusTone: 'light', statusBg: '#22391D' },
  { id: 'S3', path: '/whatsapp', label: "WhatsApp check-in", persona: 'neha', inPhone: true, clock: '6:30', statusTone: 'light', statusBg: 'transparent' },
  { id: 'S4', path: '/health', label: "Health", persona: 'neha', inPhone: true, clock: '8:58', statusTone: 'light', statusBg: '#22391D' },
  { id: 'S5', path: '/meal', label: "Meal scanner", persona: 'neha', inPhone: true, clock: '8:53', statusTone: 'light', statusBg: '#0F1A0D' },
  { id: 'S6', path: '/experts', label: "Expert Chat", persona: 'neha', inPhone: true, clock: '8:54', statusTone: 'light', statusBg: '#22391D' },
  { id: 'S7', path: '/chat/tara', label: "Chat with Tara", persona: 'neha', inPhone: true, clock: '8:54', statusTone: 'dark', statusBg: '#FFFFFF' },
  { id: 'S8', path: '/me', label: "Me card", persona: 'neha', inPhone: true, clock: '8:55', statusTone: 'dark', statusBg: '#FFFFFF' },
  { id: 'S9', path: '/report', label: "Blood report", persona: 'neha', inPhone: true, clock: '6:53', statusTone: 'dark', statusBg: '#FFFFFF' },
  { id: 'S10', path: '/chat/dev', label: "Dev, hair coach", persona: 'neha', inPhone: true, clock: '7:02', statusTone: 'dark', statusBg: '#FFFFFF' },
  { id: 'S11', path: '/tv', label: "SuperTV", inPhone: true, clock: '8:57', statusTone: 'light', statusBg: '#22391D' },
  { id: 'S12', path: '/profile', label: "Profile & prices", persona: 'neha', inPhone: true, clock: '8:58', statusTone: 'light', statusBg: '#2A5B2B' },
  { id: 'S13', path: '/invite', label: "Invite Rohit", inPhone: true, clock: '9:10', statusTone: 'light', statusBg: 'transparent' },
  { id: 'S14', path: '/rohit-chat', label: "Rohit's evening chat", persona: 'rohit', inPhone: true, clock: '9:40', statusTone: 'dark', statusBg: '#FFFFFF' },
  { id: 'S15', path: '/together', label: "Do it together", persona: 'neha', inPhone: true, clock: '8:56', statusTone: 'light', statusBg: '#22391D' },
  { id: 'S16', path: '/day30', label: "Day 30", persona: 'neha', inPhone: true, clock: '8:31', statusTone: 'light', statusBg: '#22391D' },
  { id: 'COURSES', path: '/courses', label: "Courses", inPhone: true, clock: '8:55', statusTone: 'light', statusBg: '#22391D' },
  { id: 'S17', path: '/changes', label: "All changes", inPhone: false, clock: '', statusTone: 'dark', statusBg: '' },
];

export const screenByPath = (path: string): ScreenDef =>
  screens.find((s) => s.path === path) ?? screens.find((s) => s.path !== '/' && path.startsWith(s.path)) ?? screens[0];
export const screenById = (id: ScreenId) => screens.find((s) => s.id === id)!;
