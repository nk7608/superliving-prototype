// Product notes — the PRD lives here (CLAUDE.md §7, §8).
// Writing rules: plain English, short sentences, numbers only with a source,
// no hype words, hypotheses labelled.
import type { ScreenId } from '../app/screens';
import type { SourceId } from './sources';

export type Tag = 'New' | 'Changed' | 'Merged' | 'Hidden' | 'Fixed' | 'Roadmap' | 'Unchanged';

/** Scripted actions a screen knows how to perform (tour + "reveal" from the panel). */
export type ActionName =
  | 'onb-speak' | 'onb-answer' | 'onb-fallback'
  | 'scroll-stories' | 'open-price' | 'open-streak'
  | 'wa-run' | 'open-future' | 'open-scan' | 'open-address' | 'show-autofill'
  | 'meal-usual' | 'meal-voice'
  | 'intent-act' | 'show-handoff'
  | 'report-upload' | 'report-review'
  | 'tv-watch' | 'tv-all'
  | 'open-checkins' | 'open-price-subscriber'
  | 'invite-flow' | 'rohit-voice-listen' | 'safety' | 'roadmap' | 'open-together' | 'open-join';

export interface ProductNote {
  id: string;
  feature: string; // 'F0'...'F12', 'HITL', 'C'
  screen: ScreenId | 'INDEX';
  anchor?: string;
  tag: Tag;
  title: string;
  saw: string;
  evidence: string[];
  changed: string;
  why: string;
  stays: string;
  measure: { primary: string; guardrail?: string };
  safety?: string;
  hypothesis?: boolean;
  sources: SourceId[];
  related?: string[];
  /** action to run when the note is selected in the panel but its anchor is not on screen */
  reveal?: ActionName;
  /** demo-only buttons shown inside the note (e.g. "Show safety path") */
  demo?: { label: string; action: ActionName }[];
}

type Base = Omit<ProductNote, 'id' | 'screen' | 'anchor'>;
const at = (base: Base, id: string, screen: ProductNote['screen'], anchor?: string, o: Partial<ProductNote> = {}): ProductNote =>
  ({ ...base, id, screen, anchor, ...o });

// ───────────────────────────── Base feature notes (text from §8) ─────────────────────────────

const F0: Base = {
  feature: 'F0', tag: 'Changed', title: 'Say it once, we fill in the rest',
  saw: 'Onboarding asks only for goals: 12 tiles, and they can be skipped. It collects nothing on age, language, food, family or routine, yet promises full personalisation. Coaches then ask these questions one by one in chat. Reviewers complain about repeated questions and plans that ignore their diet.',
  evidence: [
    '6 of 50 recent low reviews are about plan fit [reviews]',
    'The memo says coaches should learn "what their family cooks" [memo]',
    'In one study 69.9% preferred a chatbot to a form but took longer [chatform]',
    'Web forms often give cleaner data [chatform2]',
    'Current onboarding: 12 skippable goal tiles under "Hum aapke liye sab kuch personalise karenge" (refs 01–02) [refs]',
  ],
  changed: 'One voice or text answer becomes editable chips. Anything missing takes at most 2 taps. Everything else is asked later, when it matters.',
  why: 'Users already speak to the app (the Speak button). Free speech captures context, and taps confirm facts, combining the strengths of chat and forms.',
  stays: 'The first-screen look and all goal categories (now chips instead of tiles).',
  measure: { primary: 'Completion rate; time to first plan (aim under 90 seconds); share of profiles with all core fields', guardrail: 'Edit rate on inferred chips' },
  safety: 'Under-18s need guardian consent. Sensitive items are private by default. WhatsApp opt-in is explicit.',
  hypothesis: true,
  sources: ['reviews', 'memo', 'chatform', 'chatform2', 'dpdp', 'refs'],
  related: ['F0-understood', 'F0-consent', 'F1-me', 'F10-prefill'],
};

const F1: Base = {
  feature: 'F1', tag: 'New', title: 'One memory for every coach',
  saw: 'Each coach starts from zero. Dev (hair) later nudged about a "skin plan". Tara picked 10 videos without knowing the chats. Reviews say coaches repeat questions.',
  evidence: [
    'Dev, a hair coach, sends a nudge about a "health + skin plan" (ref 12) [refs]',
    'Tara picks 10 videos with no link to what was discussed (ref 18) [refs]',
    '9 of 50 reviews say "just AI/fake" [reviews]',
  ],
  changed: 'One card filled automatically from onboarding, chats, logs and reports. Every coach reads it, and the user can see where each fact came from, edit it or forget it.',
  why: 'The founders say coaches learn each family\'s constraints [memo]. This makes that visible, shared and correctable, which is what turns "AI-made" into "made for me".',
  stays: 'Coach personas and the chat UI. The existing "Me" button is reused as the entry point.',
  measure: { primary: 'Repeat-question rate in QA audits (aim close to zero); wrong-context messages', guardrail: 'Forget actions per user' },
  safety: 'Health conditions are private by default; forgetting deletes the item.',
  sources: ['reviews', 'memo', 'refs'],
  related: ['F1-chip', 'F1-source', 'F2-context'],
};

const F2: Base = {
  feature: 'F2', tag: 'New', title: 'Tara leads, specialists join with context',
  saw: '15+ coaches each start fresh and users re-explain themselves. Tara is already most users\' first contact [memo].',
  evidence: [
    'Tara is the default first coach for most users [memo]',
    'The Expert Chat tab opens on a grid of coaches with no "continue" path (ref 11) [refs]',
  ],
  changed: 'Tara is the default guide. Intent chips let the user choose whether the coach listens, helps them act, or shows them something. Handoffs carry a visible, editable summary.',
  why: 'The user decides how the AI helps, instead of getting an automatic plan for every message.',
  stays: 'All coaches, the grid and "PICKED FOR YOU".',
  measure: { primary: 'Share of conversations that end in a saved step or action; handoff completion' },
  safety: '"Bas sun lo" goes through the F11 safety checks.',
  sources: ['memo', 'refs'],
  related: ['F2-intent', 'F2-context', 'F11-listen'],
};

const F3: Base = {
  feature: 'F3', tag: 'New', title: 'One small step a day, one scoreboard',
  saw: 'Six separate scoreboards (streak, good-days %, points, league, contest, cashbacks), none tied to a daily action. The Health tab has 11 entry points.',
  evidence: [
    'Streak pill, "3% · 0 of 4 good days" ring, "+20 PTS", 30-day league, weight contest, Rewards & Cashbacks (refs 08, 15, 16, 20, 03, 22) [refs]',
    'Habits reached automaticity in a median of about 66 days (range 18–254), and one missed day didn\'t change the curve [lally]',
    '"When-then" plans: d = 0.65 across 94 tests [ii]',
    'Habuild combines fixed timings, WhatsApp reminders and streaks [habuild]',
    'Duolingo found bingers churn more than steady learners [duo]',
  ],
  changed: 'One personalised step a day, at a time the user chose. The streak and ring now count the same thing. Games become an optional reward after the step.',
  why: 'A habit is a small action repeated in the same context. The app had many counters but no single repeated action.',
  stays: 'The streak pill, ring, counters, games and points.',
  measure: { primary: 'Active days per week; step completion; day-30 retention', guardrail: 'Notification opt-out rate' },
  safety: 'No guilt copy. One "Aaj nahi" per week does not break the streak.',
  sources: ['lally', 'ii', 'habuild', 'duo', 'refs'],
  related: ['F3-streak', 'F3-ring', 'F3-whatsapp'],
};

const F4: Base = {
  feature: 'F4', tag: 'New', title: 'Your report becomes a plan, and a person checks it',
  saw: 'Uploads showed only "Processing…" for about 4 minutes with no confirmation. The reply was a disclaimer plus a Pro upsell, and the button label didn\'t match its message. Free report reading already exists elsewhere (Ultrahuman Vision Cloud, Eka Care).',
  evidence: [
    'Upload modal shows only "Processing…"; reply is a disclaimer plus a Pro upsell with a "Continue chatting" button (refs 04–06) [refs]',
    '5 of 50 reviews about paywall stacking [reviews]',
    'Free blood-report interpretation is offered by Ultrahuman Vision Cloud [ultrahuman] and Eka Care [eka]',
    'A structured AI programme matched human coaching in a 368-person trial (31.7% vs 31.9%) [jama]',
    'Human plus AI coaching gave 74% more weight loss than AI alone on about 65,000 HealthifyMe users [hybrid]',
  ],
  changed: 'Visible upload progress. A free first read: 3 priorities, questions for the doctor, one food swap and a retest date. Out-of-range values go to a human reviewer.',
  why: 'The value is the next step and the retest (test → plan → retest), not the reading. AI works best structured, with people at key moments.',
  stays: 'Both upload entry points and Pro plans.',
  measure: { primary: 'Upload success; upload-to-plan start; Day-90 retest rate' },
  safety: 'No dosing; doctor-first wording; human review for out-of-range values.',
  sources: ['reviews', 'ultrahuman', 'eka', 'jama', 'hybrid', 'refs'],
  related: ['F4-progress', 'F4-review', 'F3-step'],
};

const F5: Base = {
  feature: 'F5', tag: 'Changed', title: 'One recommendation, one reason',
  saw: 'Tara picks 10 videos, and the first three visible are locked. Top 10 and category chips compete for attention: too many choices, and items get recommended and then locked.',
  evidence: [
    'Tara: "I picked these 10 videos for you. Do watch the first one!" — the first three shown carry a lock (ref 18) [refs]',
    'Seekho built a Tier 2+ habit with 2–5 minute episodic series [seekho]',
    'Pocket FM reviews complain when unlock costs change mid-series [pocketfm]',
    'India\'s dark-pattern rules cover drip pricing, including features that require extra purchases after the user has started [ccpa]',
  ],
  changed: 'One unlocked pick, chosen using the Me card (including fasting days), with its reason. Two more like it, and feedback after watching. The full list is one tap away.',
  why: 'One clear next thing beats a library, and feedback teaches the recommender what actually helped.',
  stays: 'Top 10, categories, Originals, the Festive tab.',
  measure: { primary: 'Completion of the pick; next-day return; "Kuch aur dikhao" rate' },
  safety: 'A coach\'s first recommendation is never locked. Locked items show their price before the tap.',
  sources: ['seekho', 'pocketfm', 'ccpa', 'refs'],
  related: ['F5-unlocked', 'F5-feedback', 'F1-me'],
};

const F6: Base = {
  feature: 'F6', tag: 'Changed', title: 'Log in one tap, in Indian portions',
  saw: 'The Health tab has 11 entry points. A meal tip assumed a Western breakfast. The address example shows Bengaluru\'s Koramangala for a Jharkhand pincode.',
  evidence: [
    'Address form placeholder "e.g. MG Road, Koramangala" (ref 07) [refs]',
    'Meal scanner and result card: tip written for fried egg, beans and bagel (refs 13–14) [refs]',
    'Health tab: ring, 3 counters, 6 tools, 2 journey cards (ref 20) [refs]',
  ],
  changed: 'Usual-meal chips, Indian portion words, chat-to-counter auto-fill with confirmation, and local placeholders.',
  why: 'Every extra tap competes with a 5-minute habit, and small local details tell users the app was built for them.',
  stays: 'All four input modes, counters and targets.',
  measure: { primary: 'Time to log; logs per day', guardrail: 'Edits after auto-fill' },
  hypothesis: true,
  sources: ['refs'],
  related: ['F6-usual', 'F6-autofill', 'F6-address'],
};

const F7: Base = {
  feature: 'F7', tag: 'New', title: 'You decide when and how Tara checks in',
  saw: 'A re-engagement nudge came 2 hours later and named the wrong plan. Users have no visible reminder controls, and phones are often shared.',
  evidence: [
    'Nudge at 08:54 PM, two hours after the 06:54 PM chat, naming a "health + skin plan" (ref 12) [refs]',
    'NFHS-6: 63.6% of women own a phone they use, 57.4% in rural areas [nfhs]',
    'WhatsApp business messaging requires opt-in [meta]',
  ],
  changed: 'Channel, frequency, time, language style, quiet hours, and neutral notification previews.',
  why: 'Reminders at a fixed, chosen time support habits [habuild]. Exposing health details on a shared phone breaks trust.',
  stays: 'WhatsApp Join and chat.',
  measure: { primary: 'Opt-out rate; reply rate; check-in-to-step-done rate' },
  safety: 'Neutral previews are on by default. Quiet hours 10 pm–7 am.',
  sources: ['nfhs', 'meta', 'habuild', 'refs'],
  related: ['F7-preview', 'F3-whatsapp'],
};

const F8: Base = {
  feature: 'F8', tag: 'Changed', title: 'Real members, matched to you, labelled honestly',
  saw: 'There is one static text quote. 9 of 50 low reviews call the app "fake" or "AI", and the company runs an "Is it real or fake?" page.',
  evidence: [
    'Home shows one text testimonial with five stars (ref 10) [refs]',
    '9 of 50 low reviews call the app "fake" or "AI" [reviews]',
    'India\'s endorsement guidelines require genuine, typical testimonials and disclosure of material connections [endorse]',
  ],
  changed: 'Short video stories from verified members. Matched by goal, language and life stage. Labelled with a typical-results note and an incentive disclosure.',
  why: 'Proof from people like me is more convincing. India\'s endorsement guidelines require genuine, typical testimonials and disclosure of any material connection [endorse].',
  stays: 'The placement on Home.',
  measure: { primary: 'Onboarding-to-paid; refund rate; "fake" mentions in reviews' },
  safety: 'Written consent; no "X kg in Y days" claims; no minors.',
  hypothesis: true,
  sources: ['reviews', 'endorse', 'refs'],
};

const F9: Base = {
  feature: 'F9', tag: 'Fixed', title: 'Small details that decide trust',
  saw: '"Online" on AI coaches. Counts that don\'t add up. Locked recommendations and stacked prices. An ungated AI body image. A face scan that blocks without explaining why. A contest that ranks weekly % weight lost, although about half of users have no scale [memo].',
  evidence: [
    'Billing, autopay and refund issues: 8 of 50 reviews [reviews]',
    'India\'s 2023 dark-pattern guidelines list 13 practices, including false urgency (which covers false popularity), confirm shaming, subscription trap, drip pricing and nagging [ccpa]',
  ],
  changed: 'Honest labels, defined numbers, one price card, a renewal reminder, one-tap cancel, gated AI imagery, fixable scan errors, and consistency-based contests.',
  why: 'Each of these feeds the "is it fake?" doubt that paying users already voice.',
  stays: 'Plans, prices and features.',
  measure: { primary: 'Refund rate; billing complaints; "fake" mentions', guardrail: 'Paid conversion (should not drop materially)' },
  safety: 'Not legal advice — needs legal review.',
  sources: ['reviews', 'memo', 'ccpa', 'refs'],
};

const F10: Base = {
  feature: 'F10', tag: 'New', title: 'Family-ready, without building the family app',
  saw: 'The founders\' next step is a family-first app. Families already share subscriptions (the Agra example), and one kitchen feeds everyone.',
  evidence: [
    'Family-first app is the stated next step; families already share subscriptions [memo]',
    'An Indian family-based trial cut weight by 2.61 kg and waist by 4.17 cm at 2 years [prolific]',
    'In a separate trial, spouses or women as family members strongly predicted better glucose control [familydm]',
  ],
  changed: 'Invite a household member. The kitchen is shared, health stays private, and progress is shared only by choice.',
  why: 'This lays the groundwork for the family app with no migration later, because data is stored per person and per household from day one.',
  stays: 'Subscriptions and accounts.',
  measure: { primary: 'Invites sent and accepted; household vs solo retention' },
  safety: 'Consent per person; under-18s need guardian consent.',
  sources: ['memo', 'prolific', 'familydm'],
  related: ['F10-prefill', 'F10-privacy', 'F1-me'],
};

const F11: Base = {
  feature: 'F11', tag: 'New', title: 'Listening, without pretending to be a therapist',
  saw: 'Users bring stress to coaches. A "just listen" mode is valuable, but it needs a safety net.',
  evidence: [
    'APA\'s November 2025 advisory says chatbots and wellness apps shouldn\'t replace qualified professionals, flags over-reliance, and calls for barring chatbots from posing as licensed professionals [apa]',
    'Tele-MANAS (14416) is free, 24x7, in about 20 languages [telemanas]',
  ],
  changed: 'The user can ask the coach just to listen. Short grounding content. Clear AI disclosure. A crisis path to Tele-MANAS, plus a human callback.',
  why: 'Warmth without dependency, and a human whenever risk appears.',
  stays: 'Coach persona and chat.',
  measure: { primary: 'Not time in chat. A "felt heard" rating and crisis escalations handled within the target time', guardrail: 'Late-night repeat-use patterns, reviewed by humans' },
  safety: 'Crisis language goes to a human review queue. No upsell, streak or reminder for 24 hours after a crisis card unless the user asks.',
  sources: ['apa', 'telemanas'],
  related: ['F11-safety', 'F2-intent'],
};

const F12: Base = {
  feature: 'F12', tag: 'Roadmap', title: 'From my habit to our habit',
  saw: 'People stick with walks and yoga when they have company. The app has live classes and a WhatsApp community, but nothing connects a goal to a group.',
  evidence: [
    'Habuild uses fixed batches, WhatsApp nudges and city meetups [habuild]',
    'Strava\'s pattern is clubs by activity and location [strava]',
    'A caution: Kerala\'s peer-support diabetes programme showed no significant drop in diabetes at 24 months [kerala]. Community supports habits; it isn\'t a treatment',
  ],
  changed: 'Clubs by activity and city with verified organisers, privacy-first profiles, and group goals based on consistency. Risks: too few local groups, moderation, physical safety, privacy.',
  why: 'It extends the daily-step loop socially without opening a social network.',
  stays: 'Live classes and the WhatsApp community, which phase 1 builds on.',
  measure: { primary: 'Joiners who attend twice or more; 30-day retention of joiners vs non-joiners' },
  safety: 'Only name and city visible; health details never; DMs off in v1; women-only groups available.',
  sources: ['habuild', 'strava', 'kerala'],
};

// ───────────────────────────── Placements by screen ─────────────────────────────

export const notes: ProductNote[] = [
  // S1 — Onboarding
  at(F0, 'F0-onboarding', 'S1', 'onb-speak'),
  at(F0, 'F0-understood', 'S1', 'onb-understood', {
    title: 'Every fact editable, every guess marked',
    saw: 'Turning speech into a profile can get things wrong. A wrong guess about age or gender would shape every later plan, and the user would never see it.',
    changed: 'Each extracted fact is a chip the user can tap to edit. Inferred chips (e.g. "Mahila", from "banati hoon") have a dotted outline and an "andaza" label until confirmed. An age under 18 opens a guardian-consent sheet.',
    why: 'Speech captures context; a quick confirm step gives the data quality that forms are good at [chatform2].',
    measure: { primary: 'Share of profiles with all core fields confirmed', guardrail: 'Edit rate on inferred chips' },
    reveal: 'onb-speak',
    related: ['F0-onboarding', 'F1-source'],
  }),
  at(F0, 'F0-consent', 'S1', 'onb-consent', {
    tag: 'New', title: 'WhatsApp reminders are opt-in',
    saw: 'Today\'s onboarding asks for no consent and says nothing about what is stored. Health data sits on phones that families share.',
    evidence: [
      'WhatsApp business messaging requires opt-in [meta]',
      'Verifiable parental consent is required for under-18 users under the DPDP Rules [dpdp]',
      'NFHS-6: 63.6% of women own a phone they use, 57.4% in rural areas [nfhs]',
    ],
    changed: 'A one-line privacy promise, a "Kya-kya save hota hai?" sheet, and an unticked WhatsApp checkbox. Two one-tap questions fill what speech missed: chai time (the habit anchor) and who it is for.',
    why: 'Consent asked plainly at the start is what later reminders depend on. Asking only what is missing keeps it under 3 taps.',
    stays: 'The single full-width CTA at the bottom.',
    measure: { primary: 'WhatsApp opt-in rate; taps from voice note to Home (target 3 or fewer)', guardrail: 'Reminder opt-out within 30 days' },
    sources: ['meta', 'dpdp', 'nfhs'],
    hypothesis: false,
    reveal: 'onb-speak',
  }),

  // S2 — Home
  at(F3, 'F3-step', 'S2', 'home-step'),
  at(F3, 'F3-streak', 'S2', 'home-streak', {
    tag: 'Merged', title: 'The streak counts one thing',
    saw: 'The streak pill, the good-days ring, points, the league, the contest and cashbacks each count something different, and none says what it counts.',
    changed: 'Tapping the streak opens a one-line definition: "Streak = jitne din aapne apna step kiya." One "Aaj nahi" a week does not break it. The ring on Health counts the same days.',
    why: 'One missed day did not change the habit curve [lally]. Forgiving one miss avoids guilt without hiding the count.',
    stays: 'The pill\'s look and position.',
    measure: { primary: 'Active days per week', guardrail: 'Users who stop for 3+ days after a missed day' },
    reveal: 'open-streak',
  }),
  at(F8, 'F8-stories', 'S2', 'home-stories'),
  at(F9, 'F9d-home', 'S2', 'home-upgrade', {
    title: 'Every upsell opens one honest price card',
    saw: 'Courses are priced on top of Pro and Super Pro, and each upsell shows only its own price.',
    evidence: [
      'Course cards at ₹159–189/month on Home; Super Pro ₹349/month; Pro ₹199/month on the website (refs 09, 17) [refs]',
      '5 of 50 low reviews about paywall stacking; 8 of 50 about billing, autopay or refunds [reviews]',
      'Drip pricing and subscription traps are listed dark patterns [ccpa]',
    ],
    changed: '"Upgrade to PRO" now opens "Kya milta hai": Free, Pro, Super Pro and courses side by side, with prices, how renewal works, and where to cancel.',
    why: 'Seeing the full price before paying reduces billing surprises, which are the second-largest complaint group.',
    stays: 'The PRO card, its copy, and all prices.',
    reveal: 'open-price',
    related: ['F9d-cancel'],
  }),

  // S3 — WhatsApp mock
  at(F7, 'F7-lock', 'S3', 'wa-lock', {
    title: 'Neutral lock-screen previews',
    saw: 'Phones are often shared in a household. A preview that names a condition exposes it to whoever picks up the phone.',
    changed: 'The lock-screen line names only the coach and "Aaj ka step ready hai ☀️". Health words appear only after the chat is opened. No-opt-in users get the same line as an app notification instead.',
    why: 'The reminder still works as a cue; the content stays private.',
    measure: { primary: 'Reminder open rate', guardrail: 'Opt-out rate' },
  }),
  at(F3, 'F3-whatsapp', 'S3', 'wa-replies', {
    title: 'A check-in at chai time',
    saw: 'Reminders today are generic and late; one nudge arrived 2 hours after the chat and named the wrong plan.',
    evidence: [
      'Nudge naming a "health + skin plan" to a hair-fall user, 2 hours later (ref 12) [refs]',
      '"When-then" plans: d = 0.65 across 94 tests [ii]',
      'Habuild combines fixed timings, WhatsApp reminders and streaks [habuild]',
    ],
    changed: 'At the time the user chose in onboarding (chai, 6:30), WhatsApp carries the day\'s step with two quick replies. Replying updates the in-app streak and ring.',
    why: 'A fixed cue at the same time each day is how "when-then" plans work [ii]. Replying in WhatsApp removes the app-open step.',
    measure: { primary: 'Reply rate; check-in-to-step-done rate', guardrail: 'WhatsApp opt-out and block rate' },
    reveal: 'wa-run',
  }),

  // S4 — Health tab
  at(F3, 'F3-ring', 'S4', 'health-ring', {
    tag: 'Merged', title: 'Same ring, one definition',
    saw: 'The ring said "3% · 0 of 4 good days" with no stated rule, beside a streak that counted something else.',
    evidence: ['Ring text "3% · 0 of 4 good days" (ref 20) and "2 days streak" (ref 08) on the same day [refs]', 'One missed day didn\'t change the habit curve [lally]'],
    changed: 'Same ring, same position. It now reads "Is hafte X/7 din step pura" and counts exactly what the streak counts.',
    stays: 'Ring style, counters, targets and tools.',
    measure: { primary: 'Step completion', guardrail: 'Support questions about scores' },
  }),
  at(F3, 'F3-step-health', 'S4', 'health-step', {
    title: 'The step sits above the trackers',
    saw: 'The Health tab opens on 11 entry points with no suggested first action.',
    changed: 'The same daily step card appears at the top of the Health tab. Nothing below it was removed.',
    why: 'One obvious next action first; the full toolset stays one scroll away.',
    stays: 'All counters, tools and journey cards.',
  }),
  at(F6, 'F6-autofill', 'S4', 'health-autofill', {
    title: 'Counters fill from chat, with a check',
    saw: 'Water, meals and exercise are logged by hand, even when the user already told the coach.',
    changed: 'When a chat mentions an amount ("2 glass paani piya"), a toast asks "Tara ke chat se: 2 glass paani add karein?" with Haan / Nahi. Nothing is added without a tap.',
    why: 'Remove re-typing, keep the user in control of their own log.',
    measure: { primary: 'Logs per day', guardrail: 'Edits or undo after auto-fill' },
    reveal: 'show-autofill',
  }),
  at(F4, 'F4-entry', 'S4', 'health-report', {
    title: 'Report upload leads to a plan',
    saw: 'The "Analyse your blood report" card led to a silent upload and a Pro upsell.',
    changed: 'Same card, same place. It now opens the visible-progress upload and a free first read with next steps.',
    stays: 'The card and its Upload button.',
  }),
  at(F9, 'F9e-future', 'S4', 'health-day90', {
    title: 'AI body images are opt-in and 18+',
    saw: '"Future Look" generates an AI body image with no age check or opt-in.',
    evidence: ['Transformation screen: "Upload to see The Magic", Current Look and Future Look (ref 21) [refs]', 'Body-image AI is a sensitive area; DPDP needs guardian consent for under-18s [dpdp]'],
    changed: 'Future Look is off until the user opts in and confirms 18+. The image is labelled "AI se bani tasveer — koi wada nahi". No weight numbers are shown.',
    why: 'An AI image can read as a promise. Opt-in and a plain label keep it a motivation tool, not a claim.',
    stays: 'The Day-90 card, Current Look and photo upload.',
    safety: 'Disabled for under-18 profiles. Not legal advice — needs legal review.',
    reveal: 'open-future',
    sources: ['refs', 'dpdp', 'ccpa'],
  }),
  at(F9, 'F9f-scan', 'S4', 'health-stress', {
    title: 'Scan errors say how to fix them',
    saw: 'The stress scan gets stuck on an unexplained "Straight" check with no way forward.',
    evidence: ['Author\'s test of the stress scan (screenshot withheld because it shows a face) [refs]'],
    changed: 'Each failing check says exactly what to do ("Phone aankhon ki seedh mein rakhein"). After 8 seconds, "Phir bhi photo lein" lets the user continue.',
    why: 'A blocked flow with no reason reads as broken, which feeds the "fake" doubt.',
    measure: { primary: 'Scan completion rate', guardrail: 'Low-quality scans submitted via "Phir bhi"' },
    reveal: 'open-scan',
  }),
  at(F6, 'F6-address', 'S4', 'health-bloodtest', {
    tag: 'Fixed', title: 'Local examples in the address form',
    saw: 'A Jharkhand pincode got "e.g. MG Road, Koramangala" as the street example.',
    changed: 'Placeholders use the user\'s city from the Me card: "e.g. Swaroop Nagar, Kanpur".',
    why: 'A small local detail signals the app was built for the user.',
    stays: 'Every field and the booking flow.',
    measure: { primary: 'Address form completion' },
    reveal: 'open-address',
  }),

  // S5 — Meal scanner
  at(F6, 'F6-usual', 'S5', 'meal-usual'),
  at(F6, 'F6-portions', 'S5', 'meal-text', {
    title: 'Indian portion words',
    saw: 'The example text and portions were generic; the result card spoke in grams only.',
    changed: 'The voice/text example uses "do roti, ek katori dal". The result card shows katori and roti units beside calories.',
    measure: { primary: 'Voice/text logs per day', guardrail: 'Portion edits after logging' },
  }),
  at(F6, 'F6-tip', 'S5', 'meal-tip', {
    tag: 'Fixed', title: 'Tips that fit an Indian plate',
    saw: 'The tip after a meal assumed a Western breakfast (eggs, beans, bagel).',
    changed: 'Tips reference the logged Indian meal and the Me card ("Poha ke saath ek katori dahi"), and link to the day\'s step where relevant.',
    reveal: 'meal-usual',
  }),

  // S6 — Expert Chat tab
  at(F2, 'F2-tara-card', 'S6', 'exp-tara', {
    title: 'Continue with Tara, who knows your goals',
    changed: 'A slim card above "PICKED FOR YOU": Tara\'s avatar, "Tara ke saath jaari rakhein — aapke goals jaanti hain", and a Chat button. The grid below is unchanged.',
  }),
  at(F9, 'F9a-label', 'S6', 'exp-label', {
    title: '"AI coach" instead of "Online"',
    saw: 'AI coaches carry a green "Online" badge, as if a person were waiting. The header says "18 online".',
    evidence: ['"Online" badges on every coach card and "18 online" (ref 11) [refs]', 'False popularity and false urgency are listed dark patterns [ccpa]'],
    changed: 'Badges read "AI coach · turant jawab". Each card has "Kaun banata hai?", which opens the existing "Created by Experts, powered by AI" section.',
    why: 'Say what it is. The app already credits the human experts behind each coach, so link to it.',
    stays: 'Card layout, photos slot, "Popular" tab, Chat now.',
    measure: { primary: '"Fake"/"AI" mentions in reviews', guardrail: 'Chat starts per visit' },
  }),
  at(F9, 'F9b-counts', 'S6', 'exp-count', {
    title: 'Counts with a definition',
    saw: 'Tara shows "4.6M helped", more than the 2.5M installs on the careers page.',
    evidence: ['"4.6M helped" on Tara\'s card (ref 11) vs 2.5M installs on the careers page [refs]'],
    changed: 'Counts become a defined metric: "46 lakh baatein", with an info tip: "baatein = coach ke saath kul chats". If the metric can\'t be defined, hide it.',
    why: 'A number that can be checked and doesn\'t add up confirms the "fake" doubt.',
    stays: 'Rating and card layout.',
  }),

  // S7 — Chat with Tara
  at(F2, 'F2-intent', 'S7', 'chat-intents', {
    title: 'The user picks how the coach helps',
    saw: 'Every message gets a plan or an upsell, even when the user only wanted to talk.',
    changed: 'Three chips above the input at the start of a conversation or after 8+ hours: [Bas sun lo 👂] [Kuch karna hai ✅] [Kuch dikhao 📺].',
    measure: { primary: 'Share of conversations that end in a saved step or action', guardrail: 'Chip tap rate falling over time (noise)' },
    reveal: 'intent-act',
  }),
  at(F1, 'F1-chip', 'S7', 'chat-memchip', {
    title: 'Coaches say what they saved',
    saw: 'Users can\'t tell what a coach remembers, so they repeat themselves or doubt it remembers anything.',
    changed: 'When a coach learns something, a slim chip appears under its message: "Me mein save hua: … ✓ · Edit".',
    why: 'Visible memory is correctable memory.',
    measure: { primary: 'Repeat-question rate in QA audits', guardrail: 'Edit taps on save chips' },
    reveal: 'intent-act',
  }),
  at(F1, 'F1-me-button', 'S7', 'chat-me', {
    title: 'The "Me" button opens the shared memory',
    saw: 'The chat header already has a "Me" button (ref 12), but nothing behind it shows what coaches know.',
    changed: '"Me" opens the Me card: every fact every coach uses, with its source.',
    stays: 'The button\'s look and position.',
  }),
  at(F4, 'F4-filecard', 'S7', 'chat-plus', {
    tag: 'Fixed', title: 'Uploads show progress, then a file card',
    saw: 'Chat shows raw "[image shared for analysis]" text and a 4-minute "Processing…" with no progress.',
    changed: 'The "+" upload shows a progress bar and stages. In chat, the upload appears as a file card (thumbnail, name, pages), never as raw text.',
    stays: 'The "+" entry point and the modal style.',
    measure: { primary: 'Upload success', guardrail: 'Uploads cancelled during "Padh rahe hain"' },
  }),
  at(F9, 'F9a-chat', 'S7', 'chat-ailabel', {
    title: '"AI coach" in the chat header',
    saw: 'The chat header shows a green "• Online" next to an AI coach (ref 12).',
    evidence: ['"Dev • Online" in the chat header (ref 12) [refs]', 'False popularity and false urgency are listed dark patterns [ccpa]'],
    changed: 'The header reads "AI coach" in the same spot.',
    stays: 'Header layout, Join and Me buttons.',
  }),
  at(F2, 'F2-handoff', 'S7', 'chat-handoff', {
    title: 'Tara asks before handing over',
    changed: 'Tara: "Baalon ke liye Dev se baat karwa doon? Unhe aapki report ke 3 points pehle se pata honge." [Haan] [Abhi nahi]. The specialist opens with what it knows.',
    measure: { primary: 'Handoff acceptance and completion' },
    reveal: 'show-handoff',
  }),

  // S8 — Me card
  at(F1, 'F1-me', 'S8', 'me-header'),
  at(F1, 'F1-source', 'S8', 'me-source', {
    title: 'Every fact shows where it came from',
    saw: 'Users can\'t see or correct what the app has inferred about them.',
    changed: 'Each row shows its source ("Onboarding", "Tara se chat, 6 Nov", "Report, 2 Nov") with Edit and Bhool jao. Forgetting removes the item, and the next coach reply and the SuperTV pick stop using it.',
    measure: { primary: 'Rows edited or forgotten per user (a healthy small number)', guardrail: 'Forget actions per user' },
  }),
  at(F1, 'F1-private', 'S8', 'me-private', {
    title: 'Private by default',
    changed: 'Conditions and medicines sit in a locked section. They never appear in notification previews or in another coach\'s opener unless the user turns on a per-item "Dev ko dikhayein?" toggle. For Neha it is empty: "Coach poochhega jab zaroorat ho".',
    why: 'Ask sensitive questions only when they matter, and keep them private when they don\'t.',
  }),
  at(F10, 'F10-entry', 'S8', 'me-family', {
    title: 'Household starts from the Me card',
    changed: '"Ghar ke log" lists household members and "Rohit ko jodein". Only the kitchen is shared.',
  }),

  // S9 — Report
  at(F4, 'F4-progress', 'S9', 'rep-progress', {
    tag: 'Fixed', title: 'Upload progress you can see',
    saw: 'Only "Processing…" for about 4 minutes, no file confirmation, no way to leave.',
    changed: 'A file chip (name, size, pages), a progress bar with a percentage and stages ("Upload ho raha hai 62%" → "Padh rahe hain (~30 sec)" → "Ho gaya ✓"), a Cancel button, and "Aap chat jaari rakh sakti hain".',
    why: 'Progress appears within 300ms of choosing a file; waiting is tolerable when it is visible.',
    measure: { primary: 'Upload success; abandonment during upload' },
    reveal: 'report-upload',
  }),
  at(F4, 'F4-nextsteps', 'S9', 'rep-card', { reveal: 'report-upload' }),
  at(F4, 'F4-review', 'S9', 'rep-review', {
    title: 'A person reviews out-of-range values',
    saw: 'The AI reading ended in a disclaimer. No one with a credential looked at it.',
    evidence: ['Human plus AI coaching gave 74% more weight loss than AI alone [hybrid]', 'A structured AI programme matched human coaching (31.7% vs 31.9%) [jama]'],
    changed: 'Any out-of-range value puts the report in "Expert review mein ⏳ · aam taur par 24 ghante mein". The demo resolves to "Reviewed ✓ — A. Verma, RD" with a one-line comment.',
    why: 'AI gives the instant read; a registered dietitian checks the cases that matter.',
    measure: { primary: 'Review turnaround; share of reports reviewed', guardrail: 'Reviewer load per day' },
    safety: 'The 24-hour turnaround is an assumption to validate with ops. Critical values route to a doctor.',
    hypothesis: true,
    reveal: 'report-upload',
  }),
  at(F4, 'F4-retest', 'S9', 'rep-retest', {
    title: 'The retest is booked into the plan',
    changed: '"Dobara test: Day 90 (4 Feb)" with a reminder toggle, and "Is hafte" feeds one food swap into the daily step.',
    why: 'Test → plan → retest is the loop; the retest is where progress becomes visible.',
    measure: { primary: 'Day-90 retest rate' },
    reveal: 'report-upload',
  }),

  // S10 — Dev
  at(F2, 'F2-context', 'S10', 'dev-context', {
    title: 'The handoff shows what Dev knows',
    changed: 'Before Dev speaks, a context bubble: "Dev ko yeh pata hai: B12 kam, Vitamin D kam, veg, hair fall" [Edit]. Private items are left out unless the user shares them.',
    measure: { primary: 'Handoff completion; repeat-question rate in specialist chats' },
  }),
  at(F2, 'F2-correct', 'S10', 'dev-first', {
    tag: 'Fixed', title: 'Specialists only mention your goals',
    saw: 'Dev, a hair coach, nudged about a "health + skin plan" the user never asked for.',
    evidence: ['"Your health + skin plan is still ready" from Dev (ref 12) [refs]'],
    changed: 'Dev\'s opener is built from the Me card: "Namaste Neha! Tara ne bataya — shuru karte hain roz ki dahi aur subah ki dhoop se?"',
    measure: { primary: 'Wrong-context messages in QA audits (target zero)' },
  }),

  // S11 — SuperTV
  at(F5, 'F5-pick', 'S11', 'tv-banner'),
  at(F5, 'F5-unlocked', 'S11', 'tv-card', {
    tag: 'Fixed', title: 'The first pick is never locked',
    saw: 'Tara said "Do watch the first one!" and the first one was locked.',
    changed: 'The coach\'s pick is always playable. It shows length and episode: "4 min · Ep 1/5".',
    why: 'Recommend-then-lock is drip pricing in the user\'s eyes [ccpa].',
  }),
  at(F5, 'F5-feedback', 'S11', 'tv-feedback', {
    tag: 'New', title: '"Kaam ka laga?" teaches the picker',
    changed: 'After watching: "Kaam ka laga?" [Haan 👍] [Kuch aur dikhao]. The answer goes to the Me card as a preference.',
    measure: { primary: '"Kuch aur dikhao" rate; next-day return' },
    reveal: 'tv-watch',
  }),
  at(F5, 'F5-price', 'S11', 'tv-all', {
    tag: 'Fixed', title: 'Locked items show the price first',
    changed: '"Sab dekhein" opens the original list. Locked videos show "Pro ₹199" on the thumbnail before the tap.',
    reveal: 'tv-all',
  }),

  // S12 — Profile
  at(F7, 'F7-row', 'S12', 'prof-checkins'),
  at(F7, 'F7-preview', 'S12', 'chk-preview', {
    title: 'A live preview of the notification',
    changed: 'The toggle "Notification mein health ki baatein na dikhayein" is on by default, and a live preview shows exactly what the lock screen will say.',
    reveal: 'open-checkins',
  }),
  at(F1, 'F1-profile', 'S12', 'prof-me', {
    title: '"Mera health card" in Profile',
    changed: 'A second entry to the same Me card, for users who never open chat.',
  }),
  at(F9, 'F9d-price', 'S12', 'prof-pro', {
    title: 'One "Kya milta hai" card',
    saw: 'Prices are spread across Home course cards, the PRO card and the Super Pro paywall.',
    evidence: [
      'Pro ₹199 (website), Super Pro ₹349 (app), courses ₹159–189/month on top (refs 09, 17) [refs]',
      '5 of 50 low reviews about paywall stacking [reviews]',
    ],
    changed: 'Every Pro upsell and "Pro membership" open one card comparing Free, Pro, Super Pro and courses, with prices, renewal and "Kabhi bhi cancel — Profile > Pro membership".',
    reveal: 'open-price',
    related: ['F9d-cancel', 'F9d-home'],
  }),
  at(F9, 'F9d-cancel', 'S12', 'price-cancel', {
    title: 'Renewal reminder and one-tap cancel',
    saw: 'Billing, autopay and refund complaints are a top review theme.',
    evidence: ['Billing, autopay and refund issues: 8 of 50 reviews [reviews]', 'Subscription trap and confirm shaming are listed dark patterns [ccpa]'],
    changed: 'Subscribers see the renewal date, "3 din pehle yaad dilayenge", a one-tap Cancel with neutral copy, and Help for billing issues.',
    why: 'Making cancel easy lowers refunds and complaints; it also makes the decision to stay a real one.',
    measure: { primary: 'Refund rate; billing complaints', guardrail: 'Cancellation rate' },
    reveal: 'open-price-subscriber',
    demo: [{ label: 'Show subscriber view', action: 'open-price-subscriber' }],
  }),

  // S13 — Invite Rohit
  at(F10, 'F10-invite', 'S13', 'inv-share', {
    title: 'Invite through WhatsApp',
    changed: 'Me card → "Ghar ke log" → "Rohit ko jodein" opens a WhatsApp share. The message says what is shared (the kitchen) and what isn\'t (health).',
    reveal: 'invite-flow',
  }),
  at(F10, 'F10-prefill', 'S13', 'inv-prefill', {
    title: 'Rohit starts with the household filled in',
    changed: 'Rohit\'s onboarding is prefilled from the household: "Ghar ka khana: Neha ke card se ✓". He adds only his own goals, by voice.',
    why: 'One kitchen feeds everyone; no one should describe it twice.',
    measure: { primary: 'Invite acceptance; time to Rohit\'s first step' },
    reveal: 'invite-flow',
  }),
  at(F10, 'F10-privacy', 'S13', 'inv-privacy', {
    title: 'Progress is shared only by choice',
    changed: 'Each person\'s health stays private. Neha sees "Rohit ne aaj step kiya ✓" only if Rohit turns it on. It starts off.',
    reveal: 'invite-flow',
  }),

  // S14 — Rohit evening chat
  at(F11, 'F11-listen', 'S14', 'r-listen', { reveal: 'rohit-voice-listen' }),
  at(F11, 'F11-disclosure', 'S14', 'r-ai-line', {
    title: 'Once per conversation: "Main AI coach hoon"',
    changed: 'In listening mode, a small line appears once: "Main AI coach hoon — doctor ya therapist nahi."',
    why: 'APA calls for chatbots not to pose as licensed professionals [apa].',
    reveal: 'rohit-voice-listen',
  }),
  at(F11, 'F11-safety', 'S14', 'r-safety', {
    title: 'Crisis language stops coaching',
    changed: 'If crisis or self-harm language appears, coaching stops and a card shows: "Aap akele nahi hain. Abhi baat karein:" Tele-MANAS 14416 (free, 24x7), [Call 14416] [Kisi apne ko message] [SuperLiving se call back maangein]. No upsell, streak or reminder for 24 hours.',
    measure: { primary: 'Crisis escalations handled within the target time', guardrail: 'False positives reviewed weekly' },
    reveal: 'safety',
    demo: [{ label: 'Show safety path', action: 'safety' }],
  }),

  // S15 — Together + Roadmap
  at(F12, 'F12-now', 'S15', 'tog-sheet', {
    tag: 'New', title: 'Do it together, with what exists today',
    saw: 'Live classes and the WhatsApp community exist but aren\'t offered at the moment a user wants company.',
    changed: 'The intent chip or the step\'s "Kisi ke saath karna hai?" link opens a sheet with "Kal subah 6 AM Live Yoga" (existing Super Pro live classes) and "WhatsApp community join karein" (existing Join button).',
    stays: 'Live classes and the WhatsApp community, unchanged.',
    measure: { primary: 'Step completion on days a class is joined' },
    reveal: 'open-together',
  }),
  at(F12, 'F12-roadmap', 'S15', 'road-clubs', { reveal: 'roadmap' }),
  at(F12, 'F12-privacy', 'S15', 'road-join', {
    title: 'Privacy rules shown before joining',
    changed: 'The join preview states: "Sirf naam aur shehar dikhega · health details kabhi nahi · DMs band (v1)". Club goals count days, not kilos.',
    reveal: 'open-join',
  }),
  at(F12, 'F12-phases', 'S15', 'road-phases', {
    title: 'Three phases, smallest first',
    changed: 'Next: online groups on live classes and the WhatsApp community. Later: verified-organiser clubs in 3 pilot cities. Later still: opt-in buddy matching by goal, routine and city.',
    reveal: 'roadmap',
  }),

  // S16 — Day 30
  at(F3, 'F3-progress', 'S16', 'd30-progress', {
    title: 'Day 30: progress in days, not kilos',
    saw: 'Progress today is spread across six scoreboards and weekly % weight lost.',
    changed: 'The Day-30 view shows days with the step done (21/30), the next step, and the retest countdown. No weight ranking.',
    measure: { primary: 'Day-30 retention', guardrail: 'Users who stop after a missed week' },
  }),
  at(F4, 'F4-countdown', 'S16', 'd30-retest', {
    title: 'Retest countdown',
    changed: 'The Day-90 retest date from the report stays visible, with the days left and a reminder.',
    measure: { primary: 'Day-90 retest rate' },
  }),
  {
    id: 'HITL-plateau', feature: 'HITL', screen: 'S16', anchor: 'd30-voice', tag: 'New',
    title: 'A person steps in at a plateau',
    saw: 'Motivation drops at plateaus, and an AI-only nudge is easy to ignore.',
    evidence: ['Human plus AI coaching gave 74% more weight loss than AI alone [hybrid]', 'A structured AI programme matched human coaching in a 368-person trial [jama]'],
    changed: 'After a 2-week plateau or 3 skipped steps, a registered dietitian sends a short voice note with one change: "Ritu, RD: Plateau aaya hai? Lunch mein ek badlaav karte hain."',
    why: 'AI runs the daily loop; people step in at the moments that decide whether the user stays.',
    stays: 'Coach chat and the daily step.',
    measure: { primary: 'Return within 3 days of the voice note', guardrail: 'RD minutes per user per month' },
    safety: 'The note is labelled as a person, by name and credential.',
    hypothesis: true,
    sources: ['hybrid', 'jama'],
  },

  // Courses (unchanged)
  {
    id: 'C-unchanged', feature: 'C', screen: 'COURSES', anchor: 'courses-list', tag: 'Unchanged',
    title: 'Unchanged',
    saw: 'Courses work as they are. Their pricing is explained in the "Kya milta hai" card (F9d).',
    evidence: ['Course cards ₹159–189/month (ref 09) [refs]'],
    changed: 'Nothing on this tab.',
    why: 'Not part of the 90-day scope.',
    stays: 'Everything on this tab.',
    measure: { primary: '—' },
    sources: ['refs'],
    related: ['F9d-price'],
  },

  // Index only
  at(F9, 'F9c-league', 'INDEX', undefined, {
    title: 'League: consistent counts, correct spelling',
    saw: 'The league card says "Play with 14L+ users" next to "2 playing", and "Premiere" is a typo for "Premier".',
    evidence: ['"Superliving Premiere League … 14L+ users" and "2 playing" on one card (ref 15) [refs]', 'False popularity is a listed dark pattern [ccpa]'],
    changed: 'Show one live count, defined the same way everywhere, and correct "Premiere" to "Premier".',
    stays: 'The games hub and league.',
  }),
  at(F9, 'F9g-contest', 'INDEX', undefined, {
    title: 'Contests rank consistency, not % weight lost',
    saw: 'The Festive Fit Challenge ranks weekly % weight lost for prizes, although about half of users have no scale [memo].',
    evidence: ['"Hafte mein kitna % weight kam hua, usi se rank banti hai" (ref 03) [refs]', 'About half of users have no scale [memo]'],
    changed: 'Rank by days of steps done. Prizes stay; the metric changes.',
    why: 'Weekly weight-loss races reward crash dieting and exclude users without a scale.',
    safety: 'No weight-loss ranking for any user; never for under-18s.',
  }),
];

/** Items with no element on screen (§7.2). */
export const hiddenItems: Partial<Record<ScreenId, { tag: Tag; text: string; noteId?: string }[]>> = {
  S1: [
    { tag: 'Merged', text: '12 goal tiles → goal chips from one answer (all 12 categories stay in the tap fallback)', noteId: 'F0-onboarding' },
    { tag: 'Hidden', text: '"Skip" link → "Tap karke chuniye" fallback', noteId: 'F0-onboarding' },
  ],
  S2: [
    { tag: 'Merged', text: '"Shivam, 37, Roorkee" text quote → 3 matched member stories', noteId: 'F8-stories' },
  ],
  S4: [
    { tag: 'Merged', text: '"3% · 0 of 4 good days" → "Is hafte X/7 din step pura"', noteId: 'F3-ring' },
    { tag: 'Merged', text: 'Points, league and contest → count step days (see index: F9c, F9g)', noteId: 'F3-step' },
  ],
  S6: [
    { tag: 'Hidden', text: '"Online" badges and "18 online" → "AI coach · turant jawab"', noteId: 'F9a-label' },
  ],
  S7: [
    { tag: 'Hidden', text: '"[image shared for analysis]" raw text → file card', noteId: 'F4-filecard' },
  ],
  S11: [
    { tag: 'Merged', text: '10-video list → 1 pick + "2 aur isi tarah" + "Sab dekhein"', noteId: 'F5-pick' },
  ],
  S10: [
    { tag: 'Hidden', text: 'Pro upsell inside the report reply → free first read', noteId: 'F4-nextsteps' },
  ],
};

export const noteById = (id: string) => notes.find((n) => n.id === id);
export const notesForScreen = (s: ScreenId) => notes.filter((n) => n.screen === s);

export const tagColor: Record<Tag, string> = {
  New: '#3B4CCA', Changed: '#7A3FC7', Merged: '#0E7C86', Hidden: '#6B6B6B', Fixed: '#B5541C', Roadmap: '#3B4CCA', Unchanged: '#8A8A8A',
};

/** What we did not change (§9). */
export const unchanged = [
  'Bottom nav (5 tabs)',
  'Coach personas',
  'Courses',
  'Lab-test booking',
  'SuperTV sections',
  'Pricing tiers (only how they are presented)',
  'Festive content library',
  'Rewards & Cashbacks',
];

/** Human in the loop (§11). */
export const hitl = [
  { trigger: 'Report value out of range', who: 'Nutritionist (doctor if critical)', sees: '"Expert review mein" → "Reviewed ✓ by [name, RD]"', screen: 'S9' },
  { trigger: 'Plan for diabetes, BP, PCOS, pregnancy, under-18 or addiction', who: 'Certified nutritionist, before the plan goes live', sees: '"Reviewed by [name]" tag on the plan', screen: '—' },
  { trigger: 'Crisis or self-harm language', who: 'Coaching stops; Tele-MANAS card; human callback offered', sees: 'The F11 safety card', screen: 'S14' },
  { trigger: '2-week plateau or 3 skipped steps', who: 'Human coach voice note', sees: 'S16 voice note', screen: 'S16' },
  { trigger: 'Billing complaint', who: 'Support team', sees: 'One-tap "Help" from the price card', screen: 'S12' },
  { trigger: 'Weekly sample of AI chats', who: 'Clinical QA (not visible to users)', sees: '—', screen: '—' },
];

/** Metrics (§3). */
export const metrics = {
  leading: [
    { name: 'Onboarding completion', where: 'F0' },
    { name: 'Time to first plan (aim under 90 seconds)', where: 'F0' },
    { name: 'Daily step completion', where: 'F3' },
    { name: 'Repeat-question rate (aim close to zero in QA audits)', where: 'F1, F2' },
    { name: 'Upload success', where: 'F4' },
  ],
  lagging: [
    { name: 'Day-30 retention', where: 'F3, F10' },
    { name: 'Paid renewal', where: 'F9d' },
    { name: 'Refund and complaint rate', where: 'F9' },
    { name: 'Share of reviews mentioning "fake" or "AI"', where: 'F8, F9' },
  ],
};
