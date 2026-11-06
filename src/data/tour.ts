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
  { chapter: 1, path: '/', caption: 'SuperLiving already has coaches, videos, trackers and lab tests. These add-ons connect them.' },

  { chapter: 2, path: '/onboarding', persona: 'neha', noteId: 'F0-onboarding', action: 'onb-speak', caption: 'Neha, 34, from Kanpur, describes herself once. The app turns her words into facts she can check.' },
  { chapter: 2, path: '/onboarding', persona: 'neha', noteId: 'F0-consent', action: 'onb-answer', caption: 'Two taps fill the gaps (chai time, who it’s for). She chooses to get WhatsApp reminders.' },

  { chapter: 3, path: '/home', persona: 'neha', noteId: 'F3-step', needs: ['onboarded'], caption: 'Home now leads with one small step for today, built from what she said, with the reason shown.' },
  { chapter: 3, path: '/home', persona: 'neha', noteId: 'F8-stories', action: 'scroll-stories', needs: ['onboarded'], caption: 'Further down, short stories from families like hers replace a single anonymous quote.' },
  { chapter: 3, path: '/whatsapp', persona: 'neha', noteId: 'F3-whatsapp', action: 'wa-run', needs: ['onboarded'], caption: 'Next morning at chai time, a private reminder. One reply marks the step done.' },
  { chapter: 3, path: '/health', persona: 'neha', noteId: 'F3-ring', action: 'open-streak', needs: ['onboarded', 'stepDone'], caption: 'Back in the app, the ring and the streak both show 1 day. They now count the same thing.' },
  { chapter: 3, path: '/meal', persona: 'neha', noteId: 'F6-usual', action: 'meal-usual', needs: ['onboarded'], caption: 'Breakfast is the usual poha and chai, logged in one tap.' },

  { chapter: 4, path: '/experts', persona: 'neha', noteId: 'F2-tara-card', needs: ['onboarded'], caption: 'Tara leads, because she already knows Neha. Every coach is labelled as AI.' },
  { chapter: 4, path: '/chat/tara', persona: 'neha', noteId: 'F1-chip', action: 'intent-act', needs: ['onboarded'], caption: 'Neha asks Tara to help her act. Each new thing Tara learns is saved, visibly.' },
  { chapter: 4, path: '/me', persona: 'neha', noteId: 'F1-source', needs: ['onboarded'], caption: 'All of it lands in one Me card that every coach reads, with the source of each fact.' },

  { chapter: 5, path: '/report', persona: 'neha', noteId: 'F4-nextsteps', action: 'report-upload', needs: ['onboarded'], caption: 'She uploads her blood report, sees it progress, and gets a free plan: what matters and what to do.' },
  { chapter: 5, path: '/report', persona: 'neha', noteId: 'F4-review', action: 'report-review', needs: ['onboarded', 'report'], caption: 'Low values go to a registered dietitian, who signs off with a short note.' },
  { chapter: 5, path: '/chat/dev', persona: 'neha', noteId: 'F2-context', needs: ['onboarded', 'report'], caption: 'Tara brings in Dev for her hair. He opens with what he already knows, so she repeats nothing.' },

  { chapter: 6, path: '/tv', persona: 'neha', noteId: 'F5-pick', action: 'tv-watch', needs: ['onboarded'], caption: 'SuperTV suggests one unlocked video, for a reason that fits her: she fasts on Tuesdays.' },
  { chapter: 6, path: '/profile', persona: 'neha', noteId: 'F7-preview', action: 'open-checkins', needs: ['onboarded'], caption: 'She decides when and how reminders come, and what the lock screen may show.' },
  { chapter: 6, path: '/profile', persona: 'neha', noteId: 'F9d-cancel', action: 'open-price-subscriber', needs: ['onboarded'], caption: 'Every plan and price is on one card, with a renewal reminder and a one-tap cancel.' },

  { chapter: 7, path: '/invite', persona: 'neha', noteId: 'F10-prefill', action: 'invite-flow', needs: ['onboarded'], caption: 'Neha invites her husband Rohit. His setup starts with the household kitchen already filled in.' },
  { chapter: 7, path: '/rohit-chat', persona: 'rohit', noteId: 'F11-listen', action: 'rohit-voice-listen', needs: ['onboarded', 'rohitOnboarded'], caption: '9:40 pm, after a hard day. Rohit asks Tara just to listen, and she does.' },
  { chapter: 7, path: '/rohit-chat', persona: 'rohit', noteId: 'F11-safety', action: 'safety', needs: ['onboarded', 'rohitOnboarded'], caption: 'If crisis words ever appear, coaching stops and real people step in.' },

  { chapter: 8, path: '/together', persona: 'neha', noteId: 'F12-roadmap', action: 'roadmap', needs: ['onboarded'], caption: 'Today she can join a live class. Next on the roadmap: local groups like a Kanpur walking club.' },
  { chapter: 8, path: '/day30', persona: 'neha', noteId: 'HITL-plateau', needs: ['onboarded', 'stepDone', 'report'], caption: 'Day 30: 21 days done, a retest date, and a dietitian steps in at the plateau. Next: every change in one list.' },
];
