// Guided tour — §10's 22 steps, grouped into 8 short chapters that tell one story.
import type { ActionName } from './notes';
import type { PersonaId } from './personas';

export type Precondition = 'onboarded' | 'stepDone' | 'report' | 'reviewed' | 'rohitOnboarded';

export interface TourStep {
  path: string;
  chapter: number;
  persona?: PersonaId;
  noteId?: string;
  action?: ActionName;
  needs?: Precondition[];
  /** one or two plain sentences: what you're looking at and why it matters */
  caption: string;
}

export const chapters = [
  'The idea',
  'Neha joins',
  'One step a day',
  'One memory',
  'Report to plan',
  'Content and trust',
  'Family and care',
  'What comes next',
];

export const tour: TourStep[] = [
  { chapter: 1, path: '/', caption: 'SuperLiving already has the parts. These add-ons connect them. Follow Neha for five minutes.' },

  { chapter: 2, path: '/onboarding', persona: 'neha', noteId: 'F0-onboarding', action: 'onb-speak', caption: 'Neha says who she is, once. No forms, no tiles.' },
  { chapter: 2, path: '/onboarding', persona: 'neha', noteId: 'F0-consent', action: 'onb-answer', caption: 'Two taps fill the gaps. Reminders only because she said yes.' },

  { chapter: 3, path: '/home', persona: 'neha', noteId: 'F3-step', needs: ['onboarded'], caption: 'What she said becomes one small step for today.' },
  { chapter: 3, path: '/home', persona: 'neha', noteId: 'F8-stories', action: 'scroll-stories', needs: ['onboarded'], caption: 'Proof from families like hers, labelled honestly.' },
  { chapter: 3, path: '/whatsapp', persona: 'neha', noteId: 'F3-whatsapp', action: 'wa-run', needs: ['onboarded'], caption: 'Next morning, at chai time: one tap in WhatsApp marks the step done.' },
  { chapter: 3, path: '/health', persona: 'neha', noteId: 'F3-ring', needs: ['onboarded', 'stepDone'], caption: 'That tap shows up here. Ring and streak now count the same day.' },
  { chapter: 3, path: '/meal', persona: 'neha', noteId: 'F6-usual', needs: ['onboarded'], caption: 'Her usual breakfast logs in one tap. Try the chip.' },

  { chapter: 4, path: '/experts', persona: 'neha', noteId: 'F2-tara-card', needs: ['onboarded'], caption: 'Tara leads, because she already knows Neha.' },
  { chapter: 4, path: '/chat/tara', persona: 'neha', noteId: 'F1-chip', action: 'intent-act', needs: ['onboarded'], caption: 'Neha asks for help. Each new fact Tara learns is saved in plain sight.' },
  { chapter: 4, path: '/me', persona: 'neha', noteId: 'F1-me', needs: ['onboarded'], caption: 'It all goes into one memory that sits under every coach.' },
  { chapter: 4, path: '/chat/coach/rashmi', persona: 'neha', noteId: 'F1-crosscoach', needs: ['onboarded'], caption: 'So Rashmi, a coach she has never met, already knows her.' },

  { chapter: 5, path: '/report', persona: 'neha', noteId: 'F4-nextsteps', action: 'report-upload', needs: ['onboarded'], caption: 'Her blood report becomes three clear next steps, free.' },
  { chapter: 5, path: '/report', persona: 'neha', noteId: 'F4-review', action: 'report-review', needs: ['onboarded', 'report'], caption: 'Anything out of range is checked by a real dietitian.' },
  { chapter: 5, path: '/chat/dev', persona: 'neha', noteId: 'F2-context', needs: ['onboarded', 'report'], caption: 'Dev joins for her hair, already knowing her report.' },

  { chapter: 6, path: '/tv', persona: 'neha', noteId: 'F5-pick', needs: ['onboarded'], caption: 'One unlocked video, picked because she fasts on Tuesdays.' },
  { chapter: 6, path: '/profile', persona: 'neha', noteId: 'F7-preview', action: 'open-checkins', needs: ['onboarded'], caption: 'She decides when reminders come and what the lock screen shows.' },
  { chapter: 6, path: '/profile', persona: 'neha', noteId: 'F9d-cancel', action: 'open-price-subscriber', needs: ['onboarded'], caption: 'Every price on one card. A renewal reminder and one-tap cancel.' },

  { chapter: 7, path: '/invite', persona: 'neha', noteId: 'F10-prefill', action: 'invite-flow', needs: ['onboarded'], caption: 'Neha invites Rohit. Their kitchen is already filled in.' },
  { chapter: 7, path: '/rohit-chat', persona: 'rohit', noteId: 'F11-listen', action: 'rohit-voice-listen', needs: ['onboarded', 'rohitOnboarded'], caption: '9:40 pm. Rohit asks Tara just to listen, and she does.' },
  { chapter: 7, path: '/rohit-chat', persona: 'rohit', noteId: 'F11-safety', action: 'safety', needs: ['onboarded', 'rohitOnboarded'], caption: 'If crisis words appear, coaching stops and people step in.' },

  { chapter: 8, path: '/together', persona: 'neha', noteId: 'F12-roadmap', action: 'roadmap', needs: ['onboarded'], caption: 'Today: a live class together. Next: local walking groups.' },
  { chapter: 8, path: '/day30', persona: 'neha', noteId: 'HITL-plateau', needs: ['onboarded', 'stepDone', 'report'], caption: 'Day 30: 21 days done, retest booked, a dietitian at the plateau.' },
];

/** Which chapter each screen belongs to (for the story map). */
export const chapterOfScreen: Record<string, number> = {
  S0: 1, S1: 2, S2: 3, S3: 3, S4: 3, S5: 3, S6: 4, S7: 4, S8: 4, S9: 5, S10: 5,
  COACH: 4, S11: 6, S12: 6, S13: 7, S14: 7, S15: 8, S16: 8, COURSES: 3, S17: 8, INDEX: 6,
};
export const firstStepOfChapter = (c: number) => Math.max(0, tour.findIndex((t) => t.chapter === c));
