// Tour script — CLAUDE.md §10 (22 steps, ~5 minutes)
import type { ActionName } from './notes';
import type { PersonaId } from './personas';

export type Precondition = 'onboarded' | 'stepDone' | 'report' | 'reviewed' | 'rohitOnboarded';

export interface TourStep {
  path: string;
  persona?: PersonaId;
  noteId?: string;
  action?: ActionName;
  needs?: Precondition[];
  caption: string; // one-line, plain English, shown in the tour bar
}

export const tour: TourStep[] = [
  { path: '/', caption: 'What this is and how to use it.' },
  { path: '/onboarding', persona: 'neha', noteId: 'F0-onboarding', action: 'onb-speak', caption: 'Neha speaks once. The transcript becomes editable chips.' },
  { path: '/onboarding', persona: 'neha', noteId: 'F0-consent', action: 'onb-answer', caption: 'Two taps for what speech missed, then an explicit WhatsApp opt-in.' },
  { path: '/home', persona: 'neha', noteId: 'F3-step', needs: ['onboarded'], caption: 'Home opens on one small step, with its reason.' },
  { path: '/home', persona: 'neha', noteId: 'F8-stories', action: 'scroll-stories', needs: ['onboarded'], caption: 'Member stories matched to Neha, labelled honestly.' },
  { path: '/whatsapp', persona: 'neha', noteId: 'F3-whatsapp', action: 'wa-run', needs: ['onboarded'], caption: 'Next morning, 6:30: a neutral check-in. One reply marks the step done.' },
  { path: '/health', persona: 'neha', noteId: 'F3-ring', action: 'open-streak', needs: ['onboarded', 'stepDone'], caption: 'The ring and the streak now count the same thing.' },
  { path: '/meal', persona: 'neha', noteId: 'F6-usual', action: 'meal-usual', needs: ['onboarded'], caption: 'One tap logs her usual breakfast, in Indian portions.' },
  { path: '/experts', persona: 'neha', noteId: 'F2-tara-card', needs: ['onboarded'], caption: 'Tara leads. Coaches are labelled as AI.' },
  { path: '/chat/tara', persona: 'neha', noteId: 'F1-chip', action: 'intent-act', needs: ['onboarded'], caption: 'Neha picks "Kuch karna hai". Tara saves what she learns, visibly.' },
  { path: '/me', persona: 'neha', noteId: 'F1-source', needs: ['onboarded'], caption: 'The Me card: every fact, its source, Edit and Forget.' },
  { path: '/report', persona: 'neha', noteId: 'F4-nextsteps', action: 'report-upload', needs: ['onboarded'], caption: 'Visible upload, then a free first read with next steps.' },
  { path: '/report', persona: 'neha', noteId: 'F4-review', action: 'report-review', needs: ['onboarded', 'report'], caption: 'Out-of-range values go to a registered dietitian.' },
  { path: '/chat/dev', persona: 'neha', noteId: 'F2-context', needs: ['onboarded', 'report'], caption: 'Tara hands over to Dev, who opens with what he knows.' },
  { path: '/tv', persona: 'neha', noteId: 'F5-pick', action: 'tv-watch', needs: ['onboarded'], caption: 'SuperTV: one unlocked pick, with a reason from the Me card.' },
  { path: '/profile', persona: 'neha', noteId: 'F7-preview', action: 'open-checkins', needs: ['onboarded'], caption: 'Neha controls when, where and how check-ins arrive.' },
  { path: '/profile', persona: 'neha', noteId: 'F9d-cancel', action: 'open-price-subscriber', needs: ['onboarded'], caption: 'One price card, a renewal reminder and one-tap cancel.' },
  { path: '/invite', persona: 'neha', noteId: 'F10-prefill', action: 'invite-flow', needs: ['onboarded'], caption: 'Neha invites Rohit. His onboarding starts with the household filled in.' },
  { path: '/rohit-chat', persona: 'rohit', noteId: 'F11-listen', action: 'rohit-voice-listen', needs: ['onboarded', 'rohitOnboarded'], caption: '9:40 pm. Rohit sends a voice note and asks Tara just to listen.' },
  { path: '/rohit-chat', persona: 'rohit', noteId: 'F11-safety', action: 'safety', needs: ['onboarded', 'rohitOnboarded'], caption: 'If crisis language appears, coaching stops and people step in.' },
  { path: '/together', persona: 'neha', noteId: 'F12-roadmap', action: 'roadmap', needs: ['onboarded'], caption: 'Do it together now; find your people next (roadmap).' },
  { path: '/day30', persona: 'neha', noteId: 'HITL-plateau', needs: ['onboarded', 'stepDone', 'report'], caption: 'Day 30: 21/30 days, a retest date, and a dietitian at the plateau. Next: all changes.' },
];
