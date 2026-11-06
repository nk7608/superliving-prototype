// Product notes — the PRD, written to be read in seconds.
// Each note: what it was before, what it is now, why, and how we'd know it worked.
// Plain English, no quotes of in-app copy (so it reads the same in Hinglish or English mode).
import type { ScreenId } from '../app/screens';

export type Tag = 'New' | 'Changed' | 'Merged' | 'Hidden' | 'Fixed' | 'Roadmap' | 'Unchanged';

/** Scripted actions a screen knows how to perform (tour + "show me" from the panel). */
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
  feature: string; // F0…F12, HITL, C
  screen: ScreenId | 'INDEX';
  anchor?: string;
  tag: Tag;
  title: string;
  before: string;
  now: string;
  why: string;
  measure: string;
  safety?: string;
  hypothesis?: boolean;
  /** run this when the note is opened but its element isn't on screen yet */
  reveal?: ActionName;
  /** demo-only buttons inside the note */
  demo?: { label: string; action: ActionName }[];
}

const n = (o: ProductNote) => o;

export const notes: ProductNote[] = [
  // ── S1 Onboarding ─────────────────────────────────────────────
  n({ id: 'F0-onboarding', feature: 'F0', screen: 'S1', anchor: 'onb-speak', tag: 'Changed', hypothesis: true,
    title: 'Say it once, we fill in the rest',
    before: 'Pick from 12 goal tiles (skippable). Nothing about age, food, family or routine.',
    now: 'One spoken or typed answer becomes a set of facts, plus at most two quick taps for anything missing.',
    why: 'Coaches stop re-asking basics later, and the first plan starts from the user’s real life.',
    measure: 'Onboarding completion · time to first plan (aim: under 90 seconds)' }),
  n({ id: 'F0-understood', feature: 'F0', screen: 'S1', anchor: 'onb-understood', tag: 'Changed', reveal: 'onb-speak',
    title: 'Every fact can be checked and fixed',
    before: 'The app never showed what it understood about you.',
    now: 'Each fact is a chip you can tap to edit. Guesses are dotted and marked as a guess until confirmed.',
    why: 'A wrong guess quietly shapes every plan after it. Visible means fixable.',
    measure: 'Profiles fully confirmed · how often guessed chips get edited',
    safety: 'An age under 18 asks for a parent or guardian.' }),
  n({ id: 'F0-consent', feature: 'F0', screen: 'S1', anchor: 'onb-consent', tag: 'New', reveal: 'onb-speak',
    title: 'Reminders only with permission',
    before: 'No consent step, and no word on what gets stored.',
    now: 'A one-line privacy promise, a “what we save” sheet, and an unticked box for WhatsApp reminders.',
    why: 'Phones are often shared at home. Trust has to come before reminders.',
    measure: 'WhatsApp opt-in rate · opt-outs in the first 30 days',
    safety: 'The reminder box always starts unticked.' }),

  // ── S2 Home ───────────────────────────────────────────────────
  n({ id: 'F3-step', feature: 'F3', screen: 'S2', anchor: 'home-step', tag: 'New', hypothesis: true,
    title: 'One small step a day',
    before: 'Home opened on products and videos, with nothing to actually do today.',
    now: 'One personal step on top, with the reason it was picked, and Done / Not today / Change.',
    why: 'Habits come from one small action repeated at the same time, not from many counters.',
    measure: 'Days per week with the step done · day-30 retention',
    safety: 'No guilt copy. One skipped day a week doesn’t break the streak.' }),
  n({ id: 'F3-streak', feature: 'F3', screen: 'S2', anchor: 'home-streak', tag: 'Merged', reveal: 'open-streak',
    title: 'The streak means one thing',
    before: 'Streak, good-days %, points, league and contest each counted something different.',
    now: 'Tap the streak: it counts days you did your step — the same days the Health ring counts.',
    why: 'One clear scoreboard is easier to understand and to care about.',
    measure: 'Active days per week' }),
  n({ id: 'F8-stories', feature: 'F8', screen: 'S2', anchor: 'home-stories', tag: 'Changed', hypothesis: true, reveal: 'scroll-stories',
    title: 'Stories from families like yours',
    before: 'One text quote with five stars.',
    now: 'Short member stories matched by goal and language, labelled as real members with no reward, and that results vary.',
    why: 'Proof from similar people feels real; honest labels keep it believable.',
    measure: 'Story views that lead to paid · refund rate',
    safety: 'Written consent, no “X kg in Y days” claims, no minors.' }),
  n({ id: 'F9d-home', feature: 'F9', screen: 'S2', anchor: 'home-upgrade', tag: 'Fixed', reveal: 'open-price',
    title: 'Upgrade opens one honest price card',
    before: 'Each upsell showed only its own price; courses cost extra on top.',
    now: 'Upgrade opens one card comparing Free, Pro, Super Pro and courses, with renewal and cancel info.',
    why: 'No surprises at payment means fewer billing complaints and refunds.',
    measure: 'Billing complaints · refund rate' }),

  // ── S3 WhatsApp ───────────────────────────────────────────────
  n({ id: 'F7-lock', feature: 'F7', screen: 'S3', anchor: 'wa-lock', tag: 'New',
    title: 'A private reminder at chai time',
    before: 'Reminders came at odd times and could name health topics.',
    now: 'At the time she chose (6:30, with chai), the preview only says today’s step is ready.',
    why: 'A fixed time builds the habit; a neutral preview protects privacy on a shared phone.',
    measure: 'Reminder open rate · opt-outs' }),
  n({ id: 'F3-whatsapp', feature: 'F3', screen: 'S3', anchor: 'wa-replies', tag: 'New', reveal: 'wa-run',
    title: 'Reply once, the app updates',
    before: 'Marking anything done meant opening the app.',
    now: 'One tap on Done in WhatsApp, and the streak and ring update in the app.',
    why: 'The fewer steps between reminder and done, the more often it gets done.',
    measure: 'Reply rate · reminder-to-done rate' }),

  // ── S4 Health ─────────────────────────────────────────────────
  n({ id: 'F3-ring', feature: 'F3', screen: 'S4', anchor: 'health-ring', tag: 'Merged', reveal: 'open-streak',
    title: 'Same ring, clear meaning',
    before: 'A percentage of “good days” with no rule shown, next to a separate streak.',
    now: 'Days this week with your step done — exactly what the streak counts. The day’s step sits right below.',
    why: 'Two scoreboards that disagree make both feel fake.',
    measure: 'Step completion' }),
  n({ id: 'F6-autofill', feature: 'F6', screen: 'S4', anchor: 'health-autofill', tag: 'Changed', reveal: 'show-autofill', hypothesis: true,
    title: 'Counters fill in from chat',
    before: 'Water and meals typed in by hand, even after telling the coach.',
    now: 'A prompt offers to add what you told Tara (2 glasses of water). One tap: yes or no.',
    why: 'Less typing; nothing gets added without the user’s okay.',
    measure: 'Logs per day · how often auto-fill is undone' }),
  n({ id: 'F4-entry', feature: 'F4', screen: 'S4', anchor: 'health-report', tag: 'New',
    title: 'Report upload now leads to a plan',
    before: 'A silent upload, then a Pro upsell.',
    now: 'Same button. It shows progress and gives a free first read with next steps.',
    why: 'The value is knowing what to do next, not just reading numbers.',
    measure: 'Upload success · upload-to-plan start' }),
  n({ id: 'F9e-future', feature: 'F9', screen: 'S4', anchor: 'health-day90', tag: 'Fixed', reveal: 'open-future',
    title: 'AI body image is opt-in and 18+',
    before: 'Future Look made an AI body image with no age check or opt-in.',
    now: 'Off until the user confirms 18+ and turns it on. Labelled as an AI image, not a promise. No weight numbers.',
    why: 'An AI picture can read like a promised result.',
    measure: 'Opt-in rate · complaints',
    safety: 'Never shown to under-18 profiles.' }),
  n({ id: 'F9f-scan', feature: 'F9', screen: 'S4', anchor: 'health-stress', tag: 'Fixed', reveal: 'open-scan',
    title: 'The scan says how to fix a failed check',
    before: 'The stress scan got stuck on “Straight” with no explanation.',
    now: 'Each failing check says what to do. After 8 seconds you can take the photo anyway.',
    why: 'A flow that blocks without a reason feels broken.',
    measure: 'Scan completion rate' }),
  n({ id: 'F6-address', feature: 'F6', screen: 'S4', anchor: 'health-bloodtest', tag: 'Fixed', reveal: 'open-address',
    title: 'Address examples from your city',
    before: 'The street example was a Bengaluru address for every user.',
    now: 'Examples use the user’s own city (Swaroop Nagar, Kanpur).',
    why: 'Small local details tell people the app was made for them.',
    measure: 'Address form completion' }),

  // ── S5 Meal scanner ───────────────────────────────────────────
  n({ id: 'F6-usual', feature: 'F6', screen: 'S5', anchor: 'meal-usual', tag: 'Changed', reveal: 'meal-usual',
    title: 'Log your usual meal in one tap',
    before: 'Every meal needed a photo, voice note or typing.',
    now: 'Your usual meals (poha with chai, roti-dal-sabzi) appear as one-tap chips.',
    why: 'Most days people eat the same few meals.',
    measure: 'Time to log · meals logged per day' }),
  n({ id: 'F6-portions', feature: 'F6', screen: 'S5', anchor: 'meal-text', tag: 'Changed',
    title: 'Indian portions and tips',
    before: 'Grams only, and a tip written for eggs, beans and bagels.',
    now: 'Examples and results use rotis and bowls (katori), and tips fit an Indian plate.',
    why: 'People think in rotis, not grams.',
    measure: 'Portion edits after logging' }),

  // ── S6 Expert Chat ────────────────────────────────────────────
  n({ id: 'F2-tara-card', feature: 'F2', screen: 'S6', anchor: 'exp-tara', tag: 'New',
    title: 'Continue with Tara',
    before: 'A grid of coaches; picking one meant starting over.',
    now: 'A card on top to continue with Tara, who already knows your goals. The grid stays as it was.',
    why: 'One guide who remembers you beats fifteen strangers.',
    measure: 'Conversations that end in a saved step' }),
  n({ id: 'F9a-label', feature: 'F9', screen: 'S6', anchor: 'exp-label', tag: 'Fixed',
    title: 'Labelled as AI, not “Online”',
    before: 'Green “Online” badges made it look like a person was waiting.',
    now: 'Each card says AI coach with instant replies, and links to the experts who built it.',
    why: 'Saying what it is up front answers the “is this fake?” doubt.',
    measure: 'Reviews mentioning “fake” or “AI”' }),
  n({ id: 'F9b-counts', feature: 'F9', screen: 'S6', anchor: 'exp-count', tag: 'Fixed',
    title: 'Numbers with a meaning',
    before: 'Big “people helped” counts with no definition.',
    now: 'Counts are total chats with that coach, with a tap-to-see definition.',
    why: 'A number that can’t be explained hurts trust.',
    measure: 'Trust survey score' }),

  // ── S7 Chat with Tara ─────────────────────────────────────────
  n({ id: 'F2-intent', feature: 'F2', screen: 'S7', anchor: 'chat-intents', tag: 'New', reveal: 'intent-act',
    title: 'You choose how Tara helps',
    before: 'Every message got a plan or an upsell.',
    now: 'Three ways to start: just listen, help me act, or show me something.',
    why: 'Sometimes people want to talk, not get a plan.',
    measure: 'Chats that end in a saved step' }),
  n({ id: 'F1-chip', feature: 'F1', screen: 'S7', anchor: 'chat-memchip', tag: 'New', reveal: 'intent-act',
    title: 'Tara shows what she saved',
    before: 'No way to tell what the coach remembered.',
    now: 'A small chip under her reply shows what was saved to your card, with Edit.',
    why: 'Memory you can see is memory you can correct.',
    measure: 'Repeat questions in chat audits (aim: near zero)' }),
  n({ id: 'F1-me-button', feature: 'F1', screen: 'S7', anchor: 'chat-me', tag: 'New',
    title: 'Me opens what every coach knows',
    before: 'The Me button showed nothing useful.',
    now: 'It opens one shared card that Tara, Dev and every other coach reads.',
    why: 'One memory, so no coach starts from zero.',
    measure: 'Me card opens per user' }),
  n({ id: 'F4-filecard', feature: 'F4', screen: 'S7', anchor: 'chat-plus', tag: 'Fixed',
    title: 'Uploads you can see',
    before: 'Raw “image shared for analysis” text and minutes of “Processing…”.',
    now: 'A progress bar, then a proper file card in the chat.',
    why: 'Waiting is fine when you can see progress.',
    measure: 'Upload success rate' }),
  n({ id: 'F2-handoff', feature: 'F2', screen: 'S7', anchor: 'chat-handoff', tag: 'New', reveal: 'show-handoff',
    title: 'Tara asks before handing over',
    before: 'Specialists started cold.',
    now: 'Tara offers to bring in Dev for hair, and says he’ll already know your report.',
    why: 'The user stays in control of who they talk to.',
    measure: 'Handoffs accepted and completed' }),

  // ── S8 Me card ────────────────────────────────────────────────
  n({ id: 'F1-me', feature: 'F1', screen: 'S8', anchor: 'me-header', tag: 'New',
    title: 'One memory for every coach',
    before: 'Each coach started from zero; a hair coach once nudged about a skin plan.',
    now: 'One card, filled from onboarding, chats, meal logs and reports. Every coach reads it.',
    why: 'This is what turns “made by AI” into “made for me”.',
    measure: 'Wrong-context messages in chat audits' }),
  n({ id: 'F1-source', feature: 'F1', screen: 'S8', anchor: 'me-source', tag: 'New',
    title: 'See where each fact came from',
    before: 'No way to see or fix what the app assumed.',
    now: 'Each row shows its source, with Edit and Forget. Forget something and coaches stop using it.',
    why: 'People trust memory they control.',
    measure: 'Edits and forgets per user (healthy if small)' }),
  n({ id: 'F1-private', feature: 'F1', screen: 'S8', anchor: 'me-private', tag: 'New',
    title: 'Private by default',
    before: 'Sensitive details came up in open chat.',
    now: 'Conditions and medicines stay locked here and are shared with a coach only if you switch it on.',
    why: 'Ask sensitive things only when needed, and keep them private.',
    measure: 'Privacy-related complaints' }),
  n({ id: 'F10-entry', feature: 'F10', screen: 'S8', anchor: 'me-family', tag: 'New',
    title: 'Add your household',
    before: 'Every family member started alone.',
    now: 'Add Rohit from here. The kitchen is shared; health stays private.',
    why: 'One kitchen feeds the whole family.',
    measure: 'Invites sent' }),

  // ── S9 Report ─────────────────────────────────────────────────
  n({ id: 'F4-progress', feature: 'F4', screen: 'S9', anchor: 'rep-progress', tag: 'Fixed', reveal: 'report-upload',
    title: 'Upload progress you can see',
    before: 'Only “Processing…” for minutes, and no way out.',
    now: 'File name and size, a percentage bar, clear stages, and Cancel.',
    why: 'Visible waiting feels shorter and safer.',
    measure: 'Upload success · drop-off during upload' }),
  n({ id: 'F4-nextsteps', feature: 'F4', screen: 'S9', anchor: 'rep-card', tag: 'New', reveal: 'report-upload',
    title: 'A free first read with next steps',
    before: 'A disclaimer, then an upsell to Pro.',
    now: 'The 3 things that matter, questions for the doctor, one food change for the daily step, and a retest date.',
    why: 'The value is the loop: test, plan, retest.',
    measure: 'Reports that turn into a step · day-90 retests',
    safety: 'No medicine doses, ever. Doctor-first wording.' }),
  n({ id: 'F4-review', feature: 'F4', screen: 'S9', anchor: 'rep-review', tag: 'New', reveal: 'report-upload', hypothesis: true,
    title: 'A dietitian checks out-of-range values',
    before: 'No person ever looked at the report.',
    now: 'It shows as in expert review, then reviewed by a named dietitian with a one-line note.',
    why: 'AI gives the instant read; a person checks what matters.',
    measure: 'Review turnaround · share of reports reviewed',
    safety: 'The 24-hour turnaround is an assumption to check with the team.' }),

  // ── S10 Dev ───────────────────────────────────────────────────
  n({ id: 'F2-context', feature: 'F2', screen: 'S10', anchor: 'dev-context', tag: 'New',
    title: 'Dev shows what he already knows',
    before: 'A new coach meant the same questions again.',
    now: 'A summary first (low B12, low Vitamin D, veg, hair fall) that you can edit before he speaks.',
    why: 'No repeating yourself, and no surprises about what was shared.',
    measure: 'Handoff completion · repeat questions' }),
  n({ id: 'F2-correct', feature: 'F2', screen: 'S10', anchor: 'dev-first', tag: 'Fixed',
    title: 'Only your goals, never someone else’s',
    before: 'Dev, a hair coach, nudged about a skin plan the user never asked for.',
    now: 'His first message is built from your card.',
    why: 'One wrong message undoes a lot of trust.',
    measure: 'Wrong-context messages (aim: zero)' }),

  // ── S11 SuperTV ───────────────────────────────────────────────
  n({ id: 'F5-pick', feature: 'F5', screen: 'S11', anchor: 'tv-banner', tag: 'Changed',
    title: 'One video, with a reason',
    before: 'Ten picks at once, with no reason given.',
    now: 'One video for today, and why it was chosen (for Neha: because she fasts on Tuesdays).',
    why: 'One clear next thing beats a library.',
    measure: 'Pick completion · next-day return' }),
  n({ id: 'F5-unlocked', feature: 'F5', screen: 'S11', anchor: 'tv-card', tag: 'Fixed',
    title: 'The coach’s pick is never locked',
    before: 'The first recommended videos were locked.',
    now: 'The pick always plays, and shows its length and episode.',
    why: 'Recommend-then-lock feels like a trick.',
    measure: 'Pick plays' }),
  n({ id: 'F5-feedback', feature: 'F5', screen: 'S11', anchor: 'tv-feedback', tag: 'New', reveal: 'tv-watch',
    title: 'Was it useful?',
    before: 'No way to tell the app what helped.',
    now: 'After the video: useful, or show me something else.',
    why: 'The next pick gets better.',
    measure: '“Show something else” rate' }),
  n({ id: 'F5-price', feature: 'F5', screen: 'S11', anchor: 'tv-all', tag: 'Fixed', reveal: 'tv-all',
    title: 'Prices before the tap',
    before: 'Locked videos revealed their price only after tapping.',
    now: 'See all opens the full list, with the plan price on every locked video.',
    why: 'No surprises.',
    measure: 'Unlock complaints' }),

  // ── S12 Profile ───────────────────────────────────────────────
  n({ id: 'F7-row', feature: 'F7', screen: 'S12', anchor: 'prof-checkins', tag: 'New',
    title: 'Check-ins and privacy settings',
    before: 'No control over when or how reminders arrive.',
    now: 'Choose WhatsApp or app, how often, the time, quiet hours and language style.',
    why: 'Reminders at a time you chose help; random ones annoy.',
    measure: 'Opt-out rate · reply rate' }),
  n({ id: 'F7-preview', feature: 'F7', screen: 'S12', anchor: 'chk-preview', tag: 'New', reveal: 'open-checkins',
    title: 'See the notification before it arrives',
    before: 'Previews could show health details.',
    now: 'Health details are hidden from previews by default, with a live preview of what will show.',
    why: 'Phones are shared at home.',
    measure: 'Privacy complaints' }),
  n({ id: 'F9d-price', feature: 'F9', screen: 'S12', anchor: 'prof-pro', tag: 'Fixed', reveal: 'open-price',
    title: 'One “what you get” card',
    before: 'Prices spread across course cards, the Pro card and the Super Pro paywall.',
    now: 'One card from every upsell and from Pro membership, comparing all plans and courses.',
    why: 'Clear prices up front reduce regret later.',
    measure: 'Billing complaints' }),
  n({ id: 'F9d-cancel', feature: 'F9', screen: 'S12', anchor: 'price-cancel', tag: 'Fixed', reveal: 'open-price-subscriber',
    demo: [{ label: 'Show subscriber view', action: 'open-price-subscriber' }],
    title: 'Renewal reminder and one-tap cancel',
    before: 'Billing, autopay and refunds were a common complaint.',
    now: 'Subscribers see the next renewal date, a reminder 3 days before, and a one-tap cancel with neutral wording.',
    why: 'Easy cancel makes staying a real choice — and cuts refund fights.',
    measure: 'Refund rate · cancellations' }),

  // ── S13 Invite ────────────────────────────────────────────────
  n({ id: 'F10-invite', feature: 'F10', screen: 'S13', anchor: 'inv-share', tag: 'New', reveal: 'invite-flow',
    title: 'Invite over WhatsApp',
    before: 'No way to bring a family member in.',
    now: 'A WhatsApp message that says up front what is shared (the kitchen) and what isn’t (health).',
    why: 'Families already share one phone, one kitchen and often one plan.',
    measure: 'Invites accepted' }),
  n({ id: 'F10-prefill', feature: 'F10', screen: 'S13', anchor: 'inv-prefill', tag: 'New', reveal: 'invite-flow',
    title: 'Rohit starts with home already known',
    before: 'Every new member described the same kitchen again.',
    now: 'Rohit’s onboarding is pre-filled from the household. He only adds his own goals.',
    why: 'One kitchen, described once.',
    measure: 'Time to Rohit’s first step' }),
  n({ id: 'F10-privacy', feature: 'F10', screen: 'S13', anchor: 'inv-privacy', tag: 'New', reveal: 'invite-flow',
    title: 'Progress shared only if he chooses',
    before: 'No household privacy rules.',
    now: 'Neha sees that Rohit did his step only if he turns it on. It starts off.',
    why: 'Family support without surveillance.',
    measure: 'Share-progress opt-in rate' }),

  // ── S14 Rohit's evening chat ──────────────────────────────────
  n({ id: 'F11-listen', feature: 'F11', screen: 'S14', anchor: 'r-listen', tag: 'New', reveal: 'rohit-voice-listen',
    title: 'A coach that can just listen',
    before: 'Every message got a plan.',
    now: 'Tara reflects back what she heard, asks one gentle question, then offers a 2-minute breathing break. No plan.',
    why: 'Feeling heard comes before any advice.',
    measure: 'A “felt heard” rating — not time spent in chat' }),
  n({ id: 'F11-disclosure', feature: 'F11', screen: 'S14', anchor: 'r-ai-line', tag: 'New', reveal: 'rohit-voice-listen',
    title: 'Clear that it’s AI',
    before: 'Coaches could feel like therapists.',
    now: 'A small line, once per conversation: an AI coach, not a doctor or therapist.',
    why: 'Warmth without pretending.',
    measure: 'Escalations to people when needed' }),
  n({ id: 'F11-safety', feature: 'F11', screen: 'S14', anchor: 'r-safety', tag: 'New', reveal: 'safety',
    demo: [{ label: 'Show safety path', action: 'safety' }],
    title: 'Crisis words bring in people',
    before: 'No safety path.',
    now: 'Coaching stops. A card offers Tele-MANAS 14416 (free, 24x7), messaging someone close, or a call back from the team.',
    why: 'When risk appears, a human must step in.',
    measure: 'Crisis cases handled within the target time',
    safety: 'No offers, streaks or reminders for 24 hours afterwards.' }),

  // ── S15 Together + Roadmap ────────────────────────────────────
  n({ id: 'F12-now', feature: 'F12', screen: 'S15', anchor: 'tog-sheet', tag: 'New', reveal: 'open-together',
    title: 'Do it together, with what exists',
    before: 'Live classes and the WhatsApp community were never offered at the right moment.',
    now: 'From the daily step: join tomorrow’s 6 AM live yoga, or the WhatsApp community.',
    why: 'Company makes habits stick.',
    measure: 'Step completion on class days' }),
  n({ id: 'F12-roadmap', feature: 'F12', screen: 'S15', anchor: 'road-clubs', tag: 'Roadmap', reveal: 'roadmap',
    title: 'Find people near you (next)',
    before: 'Nothing connects a goal to a group.',
    now: 'Clubs by activity and city, like a Kanpur morning walk club, with verified organisers.',
    why: 'Extends the daily step socially, without building a social network.',
    measure: 'Joiners who attend twice or more' }),
  n({ id: 'F12-privacy', feature: 'F12', screen: 'S15', anchor: 'road-join', tag: 'Roadmap', reveal: 'open-join',
    title: 'Privacy rules before joining',
    before: '—',
    now: 'Only your name and city show, never health details, and no direct messages at first.',
    why: 'Meeting strangers needs clear limits.',
    measure: 'Reports and blocks per club' }),
  n({ id: 'F12-phases', feature: 'F12', screen: 'S15', anchor: 'road-phases', tag: 'Roadmap', reveal: 'roadmap',
    title: 'Three phases, smallest first',
    before: '—',
    now: 'Online groups first, then verified clubs in 3 pilot cities, then opt-in buddy matching.',
    why: 'Learn cheaply before building anything big.',
    measure: '30-day retention of joiners vs non-joiners' }),

  // ── S16 Day 30 ────────────────────────────────────────────────
  n({ id: 'F3-progress', feature: 'F3', screen: 'S16', anchor: 'd30-progress', tag: 'New',
    title: 'Progress in days, not kilos',
    before: 'Progress meant weight lost, ranked weekly.',
    now: 'Days with the step done (21 of 30), week by week.',
    why: 'Consistency is what users control, and it predicts results.',
    measure: 'Day-30 retention' }),
  n({ id: 'HITL-plateau', feature: 'HITL', screen: 'S16', anchor: 'd30-voice', tag: 'New', hypothesis: true,
    title: 'A real dietitian at the plateau',
    before: 'Only automatic nudges, which are easy to ignore.',
    now: 'After two flat weeks or three skipped steps, a named dietitian sends a short voice note with one change.',
    why: 'AI runs the daily loop; people step in at the moments that decide whether someone stays.',
    measure: 'Return within 3 days of the voice note',
    safety: 'Clearly labelled as a person, with name and credential.' }),
  n({ id: 'F4-countdown', feature: 'F4', screen: 'S16', anchor: 'd30-retest', tag: 'New',
    title: 'Retest date stays in view',
    before: 'Reports were one-off.',
    now: 'The day-90 retest date and days left stay visible.',
    why: 'The retest is where progress shows.',
    measure: 'Day-90 retest rate' }),

  // ── Courses (unchanged) ───────────────────────────────────────
  n({ id: 'C-unchanged', feature: 'C', screen: 'COURSES', anchor: 'courses-list', tag: 'Unchanged',
    title: 'Unchanged',
    before: 'Course cards and prices.',
    now: 'The same. Only how prices are explained changed (see the price card).',
    why: 'Outside the 90-day scope.',
    measure: '—' }),

  // ── Index only ────────────────────────────────────────────────
  n({ id: 'F9c-league', feature: 'F9', screen: 'INDEX', tag: 'Fixed',
    title: 'League card: one honest count',
    before: 'A big total of users beside “2 playing”, and a typo in the league name.',
    now: 'One live count, defined the same way everywhere, and the typo fixed.',
    why: 'Numbers that disagree look fake.',
    measure: 'League joins' }),
  n({ id: 'F9g-contest', feature: 'F9', screen: 'INDEX', tag: 'Fixed',
    title: 'Contests reward consistency, not weight loss',
    before: 'A weekly prize contest ranked % weight lost.',
    now: 'Rank by days with the step done. Prizes stay.',
    why: 'Weight races reward crash dieting and leave out people without a scale.',
    measure: 'Contest participation',
    safety: 'No weight-loss rankings, and never for under-18s.' }),
];

/** One sentence per screen: what's different here (shown at the top of the panel). */
export const screenIntro: Partial<Record<ScreenId, string>> = {
  S1: 'Instead of picking tiles, Neha says who she is once. The app shows what it understood and asks only what’s missing.',
  S2: 'Home now opens on one small daily step. The streak counts only that step.',
  S3: 'The next morning a private reminder arrives at her chai time, and one reply marks the step done.',
  S4: 'The Health tab keeps every tool, but leads with the step and a ring that means the same as the streak.',
  S5: 'Her usual meals log in one tap, in rotis and bowls.',
  S6: 'Tara is the guide who already knows you. Coaches are clearly labelled as AI.',
  S7: 'Neha chooses how Tara helps, and sees exactly what Tara saves about her.',
  S8: 'The Me card is one shared memory that every coach reads, with the source of each fact.',
  S9: 'A report upload shows progress, gives a free plan, and gets checked by a dietitian.',
  S10: 'Dev joins with a visible summary of what he already knows.',
  S11: 'SuperTV recommends one unlocked video, with the reason.',
  S12: 'Neha controls her reminders, and every price is on one honest card.',
  S13: 'Neha invites her husband. His setup starts with the household already filled in.',
  S14: 'At night Rohit asks Tara just to listen. If crisis words appear, people step in.',
  S15: 'Do the step with others today; find local groups next (roadmap).',
  S16: 'Day 30: progress counted in days, a retest date, and a dietitian at the plateau.',
  COURSES: 'Nothing changed on this tab.',
};

/** Items with no element on screen. */
export const hiddenItems: Partial<Record<ScreenId, { tag: Tag; text: string; noteId?: string }[]>> = {
  S1: [
    { tag: 'Merged', text: 'The 12 goal tiles now live inside the tap-to-choose option', noteId: 'F0-onboarding' },
    { tag: 'Hidden', text: 'Skip link replaced by tap-to-choose', noteId: 'F0-onboarding' },
  ],
  S2: [{ tag: 'Merged', text: 'Single text testimonial → member stories', noteId: 'F8-stories' }],
  S4: [{ tag: 'Merged', text: 'Points, league and contest now count step days (see All changes)', noteId: 'F3-ring' }],
  S6: [{ tag: 'Hidden', text: 'Online badges and the online-count pill', noteId: 'F9a-label' }],
  S7: [
    { tag: 'Hidden', text: 'Online label in the chat header → AI coach', noteId: 'F9a-label' },
    { tag: 'Hidden', text: 'Raw upload text in chat → file card', noteId: 'F4-filecard' },
  ],
  S11: [{ tag: 'Merged', text: 'Ten-video list → one pick + two similar + See all', noteId: 'F5-pick' }],
  S12: [{ tag: 'New', text: 'A second way into the Me card: My health card', noteId: 'F1-me' }],
};

export const noteById = (id: string) => notes.find((x) => x.id === id);
/** Pin numbers follow the screen top-to-bottom, so 1, 2, 3 read in order. */
const visualOrder: Partial<Record<ScreenId, string[]>> = {
  S2: ['F3-streak', 'F3-step', 'F9d-home', 'F8-stories'],
  S4: ['F3-ring', 'F6-autofill', 'F6-address', 'F9f-scan', 'F9e-future', 'F4-entry'],
  S7: ['F1-me-button', 'F1-chip', 'F2-handoff', 'F2-intent', 'F4-filecard'],
  S12: ['F9d-price', 'F7-row', 'F7-preview', 'F9d-cancel'],
};
export const notesForScreen = (s: ScreenId) => {
  const list = notes.filter((x) => x.screen === s);
  const order = visualOrder[s];
  return order ? [...list].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id)) : list;
};

/** Tag styling in the SuperLiving palette. */
export const tagStyle: Record<Tag, { bg: string; fg: string; border?: string; label?: string }> = {
  New: { bg: '#E3EBD9', fg: '#2D4A27' },
  Changed: { bg: '#FCF1CF', fg: '#7A5B05' },
  Merged: { bg: '#E0ECEA', fg: '#2F6460' },
  Hidden: { bg: '#EEECE5', fg: '#5E5D58' },
  Fixed: { bg: '#F8E3D8', fg: '#8E4220' },
  Roadmap: { bg: '#FFFDF8', fg: '#38592D', border: '1.5px dashed #38592D', label: 'Roadmap · not live' },
  Unchanged: { bg: '#EEECE5', fg: '#73726F' },
};

/** What we did not change (§9). */
export const unchanged = [
  'Bottom nav (5 tabs)', 'Coach personas', 'Courses', 'Lab-test booking',
  'SuperTV sections', 'Pricing tiers', 'Festive content', 'Rewards & Cashbacks',
];

/** Where a person steps in (§11). */
export const hitl = [
  { trigger: 'A report value is out of range', who: 'Dietitian (doctor if critical)', screen: 'S9' },
  { trigger: 'Plan for diabetes, BP, PCOS, pregnancy, under-18 or addiction', who: 'Certified nutritionist, before the plan goes live', screen: '—' },
  { trigger: 'Crisis or self-harm language', who: 'Coaching stops; Tele-MANAS and a call back', screen: 'S14' },
  { trigger: 'Two flat weeks or three skipped steps', who: 'Dietitian voice note', screen: 'S16' },
  { trigger: 'Billing problem', who: 'Support, one tap from the price card', screen: 'S12' },
  { trigger: 'Weekly sample of AI chats', who: 'Clinical QA (not visible to users)', screen: '—' },
];

/** How we'd know it's working (§3). */
export const metrics = {
  leading: ['Onboarding completion', 'Time to first plan (under 90 seconds)', 'Daily step completion', 'Repeat questions in chat (near zero)', 'Upload success'],
  lagging: ['Day-30 retention', 'Paid renewal', 'Refunds and complaints', 'Reviews calling the app fake or AI'],
};
