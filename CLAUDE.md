# SuperLiving Add-ons Prototype — Build Brief for Claude Code

A clickable, self-explaining mobile prototype for an unsolicited product pitch to SuperLiving's founders. It shows what a PM would ship in the first 90 days: small add-ons inside the existing app, each one explaining in the UI what problem it solves, what changed, why, and how it would be measured.

---

## 0. How to work on this repo

1. Read this whole file before writing code. Before building any screen, open every `reference/` image that screen lists (§9).
2. Build in the milestone order in §14. After each milestone, run the app, check each changed screen at 393×852, compare it with the reference screenshots, fix, then tick the checklist.
3. Do not add features that aren't in this spec. If something is unclear, write a `TODO(question)` in code and add it to `OPEN_QUESTIONS.md`. Don't guess silently.
4. **Privacy.** `reference/` holds real app screenshots from the author's phone (personal details blurred).
   - Never import or display them in the app.
   - Never copy names, phone numbers, pincodes or lab values from them.
   - Don't commit `reference/` to a public repo.
   - All in-app data is synthetic (§12).
5. Don't reuse SuperLiving's real expert photos, video thumbnails, illustrations or logo files. Rebuild the wordmark as live text, and use placeholder avatars and thumbnails (§6.5).

---

## 1. Context in 60 seconds

- **SuperLiving** is a Bengaluru startup founded in 2025.
  - It offers persona-based AI health coaches (Tara, Dev, Rashmi, Arjun and others) for Tier 2/3 India.
  - It raised a $7M Series A led by Lightspeed in June 2026, and 73% of paying users are from Tier 2/3 cities.
  - Prices seen: Pro ₹199/month (website), Super Pro ₹349/month (app), courses ₹159–189/month on top, and lab tests from ₹799.
- **The pitch** is "what I'd ship in my first 90 days" — add-ons that help existing flows, not a redesign or a new app.
- **Thesis:** SuperLiving already has the parts — coaches, SuperTV, trackers, lab tests, WhatsApp and voice. What's missing is the connecting layer: **one memory shared by every coach, turned into one small step a day, with a human stepping in where it matters.**
- **The prototype must explain itself.** Every new or changed element has a *Product note* (§7). No separate PRD exists, so the notes are the PRD.

---

## 2. Problems this prototype addresses (with evidence)

| # | Problem | Evidence (reference file or source) |
|---|---|---|
| P1 | Coaches don't share memory, so replies are generic or wrong | Dev (hair) later nudges about a "health + **skin** plan" (ref 12). Tara picks 10 videos without knowing the chats (ref 18). Reviews say the coach asks the same question again. |
| P2 | Plans feel generic and AI-made | Of the latest 50 one- and two-star Play reviews (coded Nov 2026), 6 said the plan ignored their diet or needed fancy meals and daily shopping, and 9 called it "just AI" or "fake". |
| P3 | Habit features exist but aren't connected | Six scoreboards: streak pill, the "3% · 0 of 4 good days" ring, "+20 PTS", the 30-day league, the weight contest, and Rewards & Cashbacks (refs 08, 15, 16, 20, 03, 22). None is tied to one daily action. |
| P4 | Too many manual inputs and choices | The Health tab has 11 entry points (ref 20). SuperTV shows 10 picks plus a Top 10 plus category chips (ref 18). Games aren't tied to goals (ref 15). |
| P5 | Onboarding collects almost nothing useful | 12 goal tiles that can be skipped (refs 01–02). No age, language, food, household or routine, even though the app promises "Hum aapke liye sab kuch personalise karenge". |
| P6 | Recommend, then lock, plus price stacking | Tara's first three picks are locked (ref 18). Dev offers a plan behind Pro, and the button label doesn't match (ref 04). Courses are priced on top of Pro and Super Pro (refs 09, 17). Reviews: 5 of 50 about paywall stacking, 8 of 50 about billing, autopay or refunds. |
| P7 | Slow, silent uploads | A report upload shows only "Processing…" for about 4 minutes (refs 05–06). Raw text "[image shared for analysis]" shows in the chat (ref 04). |
| P8 | Trust-damaging details | "Online" badges on AI coaches. Tara shows "4.6M helped", more than the 2.5M installs on the careers page. The league shows "14L+ users" but "2 playing", and "Premiere" is a typo (refs 11, 15). The company runs an "Is SuperLiving real or fake?" page. |
| P9 | Small localisation misses | A Jharkhand address form shows "MG Road, Koramangala" as the example (ref 07). The meal tip assumes a Western breakfast (ref 14). Vrat and festival content isn't linked to food plans (ref 19). |
| P10 | Safety gaps | The AI "Future Look" body image has no age or opt-in gate (ref 21). The stress scan gets stuck on an unexplained "Straight" check (no reference image; the author's selfie was left out). A weekly prize contest ranks % weight lost (ref 03). |

---

## 3. Goals and non-goals

**Prototype goals**
- A founder understands every change in a guided tour of 5 minutes or less, and can then explore freely.
- Untouched UI looks like the real app. Additions sit inside existing screens.
- Each change shows, in the UI: what we saw, what changed, why, what stayed, how we'd measure it, and the safety rule.

**Product hypotheses the prototype argues for**

These are hypotheses, not promises. Targets get set against SuperLiving's own baselines.
- **Leading indicators:**
  - onboarding completion
  - time to first plan (aim under 90 seconds)
  - daily step completion
  - repeat-question rate (aim close to zero in QA audits)
  - upload success
- **Lagging indicators:**
  - day-30 retention
  - paid renewal
  - refund and complaint rate
  - share of reviews mentioning "fake" or "AI"

**Non-goals**
- No new bottom-nav tabs, coach personas or categories.
- No wearables.
- No social feed or direct messages.
- No real backend, AI, payments or WhatsApp.
- No mental-health treatment.

---

## 4. Hero journey: the Sharma household (synthetic)

- **Neha Sharma**, 34, Kanpur (Tier 2).
  - Runs home tuition from 4 to 7 pm and cooks for six people in a joint family.
  - Vegetarian, keeps a Tuesday fast (Mangalvar vrat), speaks Hinglish.
  - Goals: hair fall, low energy, and losing a little weight.
  - Wakes at 6:00 and has chai at 6:30. Has a recent lab report (synthetic, §12).
- **Rohit Sharma**, 38, her husband.
  - Works at a bank branch from 9 to 7.
  - Stressed after work, sleeps badly, and has belly fat.
  - Eats what Neha cooks, plus non-veg on Sundays, and sends voice notes.
  - Joins through Neha's family invite.

**Story arc:**
1. Neha onboards in one shot and gets one daily step.
2. A WhatsApp check-in arrives at chai time.
3. She uploads her report, sees next steps, and an expert reviews it.
4. Tara hands her to Dev with context.
5. Neha invites Rohit.
6. Rohit has a "just listen" evening.
7. Neha sees her day-30 progress.
8. Roadmap: finding people to do it with.

---

## 5. Tech setup

- **Stack:** Vite, React 18, TypeScript and Tailwind CSS 3, with tokens in `tailwind.config.ts` and `src/styles/tokens.ts`.
  - `react-router` with `HashRouter` for static hosting.
  - `lucide-react` icons.
  - `framer-motion` only for sheets, markers and the step-done moment.
- **No backend.** Data lives in `src/data/*.ts`. Demo state lives in a React context and is saved to `localStorage` under the key `sl-demo-v1`, with a "Reset demo" button.
- **Desktop (1024px and wider):**
  - The phone frame sits in the centre at 393×852 CSS px, with an iOS-style status bar and home indicator.
  - The Product notes panel sits on the right, 380px wide.
  - A slim demo bar runs across the top.
- **Below 1024px:**
  - No phone frame; the app fills the screen.
  - Notes open as a bottom sheet.
  - The demo bar collapses into a floating "Notes" pill.
- **Demo bar controls:**
  - Tour / Explore
  - Notes on/off (key `N`)
  - Persona (Neha / Rohit)
  - App language (Hinglish / English)
  - Jump to screen
  - Reset demo
- **Folders**
```
src/
  app/          routes, providers, DemoContext
  screens/      one file per screen (§9)
  components/   product UI that matches the app
  notes/        Marker, NotesPanel, NoteCard, TourController, IntroScreen, ChangesIndex
  data/         personas.ts coaches.ts steps.ts report.ts videos.ts notes.ts tour.ts sources.ts strings.ts
  styles/       tokens.ts
reference/      screenshots (never imported)
```
- **Deploy:** `npm run build` produces a static `dist/` (Vercel or Netlify). Add a README covering how to run it, the tour, and the keyboard shortcuts.

---

## 6. Design system: match the existing app

**6.1 Rule.** Unchanged areas must look like the reference screenshots. New product elements reuse the app's own components and tokens. The only new visual language is the explainer layer (§7), and it must look clearly separate from the app.

**6.2 Colours** (sampled from the 3x reference screenshots; re-sample if a screen looks off)

| Token | Hex | Seen on |
|---|---|---|
| `green-900` | `#22391D` | Home header (ref 08) |
| `green-900b` | `#1A3A1A` | "Get more features with PRO" card (ref 10) |
| `green-onboard` | `#1C3E1A` | Onboarding background (ref 01) |
| `green-tile` | `#2F502D` | Onboarding goal tiles (ref 01) |
| `green-800` | `#26391C` | "Chat now" and Health tool buttons (refs 11, 20) |
| `green-700` | `#38592D` | Primary buttons ("Book"), user chat bubble, Speak button (refs 08, 12). **Use this for all new primary buttons.** |
| `green-600` | `#3D6B35` | Chip text, online dot (ref 11) |
| `green-profile` | `#2A5B2B` | Profile header (ref 22) |
| `green-300` | `#8BC485` | "SuperLiving" wordmark (ref 08) |
| `green-cta-light` | `#7BC67E` | "Start my journey" button (ref 01) |
| `green-100` | `#E3EBD9` | Tag chips (ref 11) |
| `green-50` | `#E8F5E9` | Success panels, referral card (refs 14, 22) |
| `cream-bg` | `#F1EFE7` | Page background (refs 08, 20) |
| `card` | `#FFFDF8` | Cards (ref 08) |
| `chat-bg` | `#E5E3DC` | Chat background with faint doodles (ref 12) |
| `mustard` | `#E2C04C` | "Popular" tag, journey buttons (refs 11, 20) |
| `mustard-light` | `#EDC75B` | "Most Selling" tag (ref 08) |
| `gold-cta` | `#D3AF37` | "Upgrade to PRO" (ref 10) |
| `gold-border` | `#D4A017` | Super Pro card border (ref 17) |
| `gold-bg` | `#FCF6E3` | Super Pro card (ref 17) |
| `paywall-green` | `#179739` | Super Pro buy button (ref 17), only there |
| `streak-bg` / `streak-fg` | `#382E08` / `#F2B84B` | Streak pill (ref 08) |
| `text-primary` | `#233A1D` | Headings |
| `text-secondary` | `#73726F` | Body grey |
| `nav-active` | `#E7E3C6` | Active bottom-nav pill (ref 08) |

The app uses at least five different greens. Don't "fix" this in unchanged screens. New elements should use `green-700`, `green-800` and `green-900` only.

**6.3 Type.** The font appears to be **Poppins**. Confirm against the "a", "g" and "y" glyphs in the reference shots, with `system-ui` as the fallback. Use weights 400, 500, 600 and 700. Sizes below are in CSS px (screenshot px ÷ 3), estimated; measure against the references and adjust.

| Role | Size / weight | Example |
|---|---|---|
| Screen title | 22–24 / 600 | "Contest Rules", "My Profile" |
| Section heading | 20–22 / 700 | "Get your blood test done at home" |
| Card title | 18–20 / 600–700 | "Coach Rashmi", "Full Body Test" |
| Body | 16–17 / 400 | Chat bubbles, descriptions |
| Chip / label | 14–15 / 500 | "Skin", "Hindi · English" |
| Caption | 12–13 / 400–500 | Timestamps, "1.3M helped" |
| Bottom-nav label | 13–14 / 500 | "Expert Chat" |
| Button | 16–17 / 600 | "Chat now", "Book" |

**6.4 Shape and spacing**
- Screen side padding 16. Cards have a radius of about 20 and a 1px border slightly darker than the card, with almost no shadow.
- Buttons are fully rounded: 40px tall inside cards, 48px for full-width CTAs.
- Chips are about 28px tall and fully rounded.
- The bottom nav is a floating frosted pill, about 60px tall, inset 12px, with 5 tabs: Home, Expert Chat, SuperTV, Courses, Health.
- Bottom sheets have a 28px top radius and a grabber.

**6.5 Imagery and emoji**
- Coaches: keep the persona names and roles. Use placeholder avatars (initials on a soft green circle, or simple illustrated faces). No real photos.
- Video thumbnails: bold coloured cards with title text and an emoji, echoing the app's thumbnail style without copying any artwork.
- The app uses Apple emoji heavily (goal tiles, tools, meal macros). Keep a similar density in product UI. The explainer layer uses no emoji.

**6.6 Copy voice**
- Product UI is Hinglish in Latin script: warm, short, sentence case, like "Namaste! Aapke goals kya hai?".
- Every string lives in `strings.ts` with `hi` (Hinglish) and `en` keys.
- The explainer layer is always plain English, for founders and reviewers.

---

## 7. The explainer layer ("Product notes")

**Purpose:** anyone opening the prototype can see what changed, why, and how we'd know it worked, without reading a PRD. This is not a before-and-after comparison. It is a product person's annotations on the live UI.

**7.1 Visuals (deliberately not part of the app's palette)**
- Annotation colour: indigo `#3B4CCA` with white text.
- Markers are 22px circles with a number, pinned to the top-right corner of the element they describe.
- Tag pills:
  - **New** `#3B4CCA`
  - **Changed** `#7A3FC7`
  - **Merged** `#0E7C86`
  - **Hidden** `#6B6B6B`
  - **Fixed** `#B5541C`
  - **Roadmap**: dashed outline in `#3B4CCA`, labelled "Roadmap · not live"
- The notes panel uses white cards on `#F6F7FB` and system-ui at 14–15px, so it never blends into the app.

**7.2 Behaviour**
- Notes are ON by default. Turning them off hides markers and the panel, showing the app as users would see it.
- Tapping a marker opens its note and outlines the element with a 2px indigo outline. The outline pulses once (600ms), then stays.
- The panel header reads "On this screen" with counts by tag (e.g. "3 New · 1 Changed · 1 Hidden") and lists every note for the screen. The selected note is expanded.
- Hidden or merged items have no element on screen. List them in the panel under "Hidden or merged here", e.g. "10-video list → 1 pick + 'Sab dekhein'".
- Each note has:
  - "Show evidence", which expands the figures and quotes with source labels.
  - "Related", which links to other notes.
- Keyboard: `N` toggles notes, `←`/`→` steps through the tour, `Esc` exits the tour.

**7.3 Note model**
```ts
type Tag = 'New' | 'Changed' | 'Merged' | 'Hidden' | 'Fixed' | 'Roadmap';
interface ProductNote {
  id: string;            // e.g. 'F0-onboarding'
  screen: ScreenId;
  anchor?: string;       // data-note-anchor on the element
  tag: Tag;
  title: string;         // plain-English headline, <= 8 words
  saw: string;           // the pain point, <= 60 words
  evidence: string[];    // facts with numbers; each ends with [source id]
  changed: string;       // what we did, <= 60 words
  why: string;           // principle or research, <= 60 words
  stays: string;         // what we deliberately did not touch
  measure: { primary: string; guardrail?: string };
  safety?: string;       // guardrail or human-in-the-loop rule
  hypothesis?: boolean;  // true when the benefit is unproven
  sources: SourceId[];   // see §13
}
```
**Writing rules:** plain English, short sentences, numbers only with a source, no hype words, and a clear label on anything that is a hypothesis.

**7.4 Tour mode.** The tour runs the steps in §10. Each step sets the screen and persona, opens one note, and may run a scripted action (e.g. simulate the voice note). It shows "Step 4 of 22" with Next and Back. "Explore freely" leaves the markers on.

**7.5 Intro screen (S0) and "All changes" index (S17).** These sit outside the phone on desktop and are full-screen on mobile (§9).

---

## 8. Feature specs

Each feature lists where it lives, what the user sees, acceptance criteria, and the note text to paste into `notes.ts`. Reference numbers point to `reference/`.

### F0 — One-shot onboarding (Changed)
**Where:** first launch. This replaces the 12-tile goal grid (refs 01–02) but keeps that screen's look: dark green background, logo badge, white heading. Rohit's version is prefilled (F10).

**UI:**
1. Heading: "Namaste! 🙏". Subtitle: "Ek baar apne baare mein bata dijiye — bolkar ya likhkar. Baaki hum samajh lenge."
2. A large **Speak** button (mic icon, `green-cta-light` like the old CTA), with a text field below it: "Ya yahan likhiye…".
3. A small example in muted text: "Jaise: Main Neha, 34, Kanpur se. Ghar mein 6 log hain, khana main banati hoon. Baal bahut jhad rahe hain, thakaan rehti hai. Veg hoon, Mangalvar vrat rakhti hoon."
4. Tapping Speak shows a 6-second animated waveform. The transcript then types out (scripted from §12).
5. A **"Humne yeh samjha"** card. Chips appear one by one as they are "extracted":
   - 👤 Neha · 34
   - 📍 Kanpur
   - 🗣️ Hinglish
   - 🥗 Veg · Mangalvar vrat
   - 🏠 6 log ka khana aap banati hain
   - 🎯 Hair fall · Energy · Thoda weight
   - ♀️ Mahila, inferred from "banati hoon"

   Every chip can be tapped to edit in a small sheet. Inferred chips have a dotted outline and "andaza" until confirmed.
6. **"Bas 2 cheezein aur"** — at most 2 one-tap questions, only for missing essentials:
   - "Subah chai kab peeti hain?" [6 se pehle] [6–7] [7–8] [8 ke baad]
   - "Kiske liye?" [Mere liye] [Mere aur parivaar ke liye]
7. **Consent:**
   - The line "Aapki health details sirf aapke liye. Kabhi bhi 'Me' mein badal ya mita sakti hain.", plus a link "Kya-kya save hota hai?" that opens a sheet explaining what is stored and why.
   - An **unticked** checkbox: "WhatsApp par roz ek chhota reminder bhejein".
8. CTA: "Sahi hai, shuru karein".
9. **Fallback:** "Bolna/likhna nahi? Tap karke chuniye" swaps the card for four tap groups: goal (top 6 + More), age band, food, language.

**Minimum context collected:** name, age band, city, language, diet and fasting days, household size and cooking role, up to 3 goals, a routine anchor (chai time), and who it's for.

**Deferred until the moment it's needed:**
- Lab report: first plan or the Health tab.
- Reminder channel and time: confirmed at the end of the first chat.
- Waist measurement: a week-1 step.
- Conditions and medicines: asked by a coach only when relevant, and private by default.
- Weight: optional.

**Under-18 rule:** if the age is under 18, show a "Parent/guardian ki permission chahiye" sheet and disable weight challenges and Future Look. Only the sheet is needed in the prototype.

**Acceptance criteria:**
- [ ] Reaching Home takes one voice note plus 3 taps or fewer, or 8 taps or fewer on the tap fallback.
- [ ] Nothing already extracted is asked again, and there are no more than 2 follow-up questions.
- [ ] Every chip is editable, and inferred chips stay marked until confirmed.
- [ ] The WhatsApp opt-in starts unticked.

**Note F0 — Changed — "Say it once, we fill in the rest"**
- **saw:** Onboarding asks only for goals: 12 tiles, and they can be skipped. It collects nothing on age, language, food, family or routine, yet promises full personalisation. Coaches then ask these questions one by one in chat. Reviewers complain about repeated questions and plans that ignore their diet.
- **evidence:**
  - 6 of 50 recent low reviews are about plan fit [reviews].
  - The memo says coaches should learn "what their family cooks" [memo].
  - In one study 69.9% preferred a chatbot to a form but took longer [chatform].
  - Web forms often give cleaner data [chatform2].
- **changed:** One voice or text answer becomes editable chips. Anything missing takes at most 2 taps. Everything else is asked later, when it matters.
- **why:** Users already speak to the app (the Speak button). Free speech captures context, and taps confirm facts, combining the strengths of chat and forms.
- **stays:** The first-screen look and all goal categories (now chips instead of tiles).
- **measure:** completion rate; time to first plan; share of profiles with all core fields. Guardrail: edit rate on inferred chips.
- **safety:** Under-18s need guardian consent. Sensitive items are private by default. WhatsApp opt-in is explicit.
- **hypothesis:** true. **sources:** reviews, memo, chatform, chatform2, dpdp

### F1 — Shared memory: the "Me" card (New)
**Where:** the existing **Me** button in the chat header (ref 12) opens a bottom sheet. Also Profile → "Mera health card".

**Sections:**
- **Basics.**
- **Ghar & khana:** household kitchen (6 people, veg), staples learned from logs (roti, dal, sabzi, dahi, poha), vrat on Tuesday.
- **Routine:** chai 6:30, tuition 4–7 pm.
- **Goals.**
- **Reports:** a summary card with its date.
- **Private 🔒:** conditions and medicines. Empty for Neha, with the line "Coach poochhega jab zaroorat ho".
- **Check-ins:** a summary of F7.
- **Ghar ke log:** the entry point for F10.

Each row shows its source ("Onboarding", "Tara se chat, 6 Nov", "Report, 2 Nov") with **Edit** and **Bhool jao** (forget). The sheet header says: "Tara, Dev aur baaki coaches yahi dekhte hain."

**In chat:** when a coach learns something, a slim chip appears under its message: "Me mein save hua: Mangalvar vrat ✓ · Edit".

**Acceptance criteria:**
- [ ] Every item shows where it came from.
- [ ] "Bhool jao" removes the item, and the coach's next reply doesn't use it.
- [ ] Private items show a lock. They never appear in notification previews or in another coach's opener unless the user turns on a per-item "Dev ko dikhayein?" toggle.

**Note F1 — New — "One memory for every coach"**
- **saw:** Each coach starts from zero. Dev (hair) later nudged about a "skin plan". Tara picked 10 videos without knowing the chats. Reviews say coaches repeat questions.
- **evidence:**
  - Ref 12 wrong-context nudge.
  - Ref 18 picks.
  - 9 of 50 reviews say "just AI/fake" [reviews].
- **changed:** One card filled automatically from onboarding, chats, logs and reports. Every coach reads it, and the user can see where each fact came from, edit it or forget it.
- **why:** The founders say coaches learn each family's constraints [memo]. This makes that visible, shared and correctable, which is what turns "AI-made" into "made for me".
- **stays:** coach personas and the chat UI.
- **measure:** repeat-question rate in QA audits; wrong-context messages. Guardrail: forget actions per user.
- **safety:** health conditions are private by default; forgetting deletes the item.
- **sources:** reviews, memo

### F2 — Tara leads, specialists join with context (New)
**Where:**
- Expert Chat tab (ref 11): keep the grid, and add a slim card above "PICKED FOR YOU". It shows Tara's avatar, "Tara ke saath jaari rakhein — aapke goals jaanti hain", and a [Chat] button.
- Chat opening: three chips above the input:
  - [Bas sun lo 👂]
  - [Kuch karna hai ✅]
  - [Kuch dikhao 📺]

  They show at the start of a conversation, or after a gap of 8 hours or more.

**Handoff:**
1. Tara: "Baalon ke liye Dev se baat karwa doon? Unhe aapki report ke 3 points pehle se pata honge." [Haan] [Abhi nahi]
2. Dev's chat opens with a context bubble, "Dev ko yeh pata hai: B12 kam, Vitamin D kam, veg, hair fall" [Edit], followed by Dev's message: "Namaste Neha! Tara ne bataya — shuru karte hain roz ki dahi aur subah ki dhoop se?"

**Acceptance criteria:**
- [ ] The handoff shows its context summary before the specialist speaks.
- [ ] The specialist never mentions a goal the user doesn't have (this was the bug in ref 12).

**Note F2 — New — "Tara leads, specialists join with context"**
- **saw:** 15+ coaches each start fresh and users re-explain themselves. Tara is already most users' first contact [memo].
- **changed:**
  - Tara is the default guide.
  - Intent chips let the user choose whether the coach listens, helps them act, or shows them something.
  - Handoffs carry a visible, editable summary.
- **why:** The user decides how the AI helps, instead of getting an automatic plan for every message.
- **stays:** all coaches, the grid and "PICKED FOR YOU".
- **measure:** share of conversations that end in a saved step or action; handoff completion.
- **safety:** "Bas sun lo" goes through the F11 safety checks.
- **sources:** memo

### F3 — One step a day, one scoreboard, WhatsApp check-in (New + Merged)
**Where:**
- Home, directly under the header and above "Get your blood test done at home" (ref 08).
- The top of the Health tab, above the counters (ref 20).
- The WhatsApp mock (S3).

**Step card "Aaj ka ek step":**
- Step: "Chai ke baad 10 min dhoop mein baith kar sabzi kaatiye ☀️"
- Reason line: "Kyunki: Vitamin D kam hai · aap subah sabzi kaatti hain"
- Buttons: [Ho gaya ✅] [Aaj nahi] [Badlo 🔄]
- After "Ho gaya": a small confetti moment (the only celebratory motion in the app), then "Shabaash! Kal: dopahar ki roti ke saath 1 katori dahi". A quiet link follows: "Bonus: 2-min Memory Flash khelein?". Games become an optional reward.
- Footer: "Hafta 2 / 10 · Day-90 self ki taraf", linking to the existing "Your Day-90 self" card.

**One scoreboard:**
- Tapping the streak pill opens a sheet: "Streak = jitne din aapne apna step kiya."
- The Health ring text changes from "3% · 0 of 4 good days" to "Is hafte 3/7 din step pura". Same ring, same position.
- One "Aaj nahi" per week doesn't break the streak. Copy: "Koi baat nahi — ek din chhootne se aadat nahi tootti." No guilt copy anywhere.

**WhatsApp mock (S3):**
1. A lock-screen notification at 6:30: "Tara (SuperLiving): Aaj ka step ready hai ☀️". No health words.
2. Opens a WhatsApp-style chat labelled "Mock", with the step and quick replies [Ho gaya] [Aaj nahi].
3. Replying updates the app's streak and ring.

**Acceptance criteria:**
- [ ] The step shows a reason drawn from the Me card.
- [ ] The streak and ring use the same definition.
- [ ] No notification preview contains health terms.
- [ ] One missed day doesn't reset the streak.

**Note F3 — New/Merged — "One small step a day, one scoreboard"**
- **saw:** Six separate scoreboards (streak, good-days %, points, league, contest, cashbacks), none tied to a daily action. The Health tab has 11 entry points.
- **evidence:**
  - Refs 08, 15, 16, 20, 03, 22.
  - Habits reached automaticity in a median of about 66 days (range 18–254), and one missed day didn't change the curve [lally].
  - "When-then" plans: d = 0.65 across 94 tests [ii].
  - Habuild combines fixed timings, WhatsApp reminders and streaks [habuild].
  - Duolingo found bingers churn more than steady learners [duo].
- **changed:** One personalised step a day, at a time the user chose. The streak and ring now count the same thing. Games become an optional reward after the step.
- **why:** A habit is a small action repeated in the same context. The app had many counters but no single repeated action.
- **stays:** the streak pill, ring, counters, games and points.
- **measure:** active days per week; step completion; day-30 retention. Guardrail: notification opt-out rate.
- **sources:** lally, ii, habuild, duo

### F4 — Report → next steps, with visible upload and human review (New + Fixed)
**Where:** the Health tab's "Analyse your blood report — Upload" card (ref 20) and the chat "+" upload.

**Upload sheet** (same modal style as refs 05–06):
- A file chip with name, size and pages ("Report_Nov.pdf · 1.8 MB · 11 pages").
- A progress bar with a percentage and stage labels: "Upload ho raha hai 62%" → "Padh rahe hain (~30 sec)" → "Ho gaya ✓".
- The line "Aap chat jaari rakh sakti hain — ready hote hi batayenge."
- A Cancel button.
- In chat, the upload shows as a file card (thumbnail, name, pages), never as raw text.

**Next-steps card** — the first read is always free.
- Title: "Aapki report: 3 baatein jo zaroori hain". Each row has a status chip (Kam / Theek / Dhyan dein):
  - **Vitamin B12** 158 pg/mL (range 187–883) · Kam → "Doctor se poochhein: kya ilaaj chahiye?" · Food: "Roz dahi, doodh ya paneer"
  - **Vitamin D** 17.5 ng/mL (below 20 = deficient) · Kam → "Doctor se dose ke baare mein poochhein" · "Roz thodi subah ki dhoop"
  - **HbA1c** 5.9% (normal below 5.7) · Dhyan dein → "Pre-diabetes range ho sakti hai — doctor se confirm karein"
- "Aur dekhein": the remaining values, including Haemoglobin 11.4 g/dL (range 12–15) · Kam.
- Blocks:
  - "Doctor ke liye sawaal" — a copy or share list.
  - "Is hafte" — one food swap, which feeds F3.
  - "Dobara test: Day 90 (4 Feb)", with a reminder toggle.
- **Human review:**
  - Badge: "Expert review mein ⏳ · aam taur par 24 ghante mein". The 24 hours is an assumption, so label it as one in the note.
  - In the demo, tapping the badge shows "Reviewed ✓ — A. Verma, RD" and a one-line comment.
- Footer: "Yeh salah hai, ilaaj nahi. Dawai ya dose ke liye apne doctor se milein."

**Acceptance criteria:**
- [ ] Progress appears within 300ms of choosing a file.
- [ ] The free read contains no locked or upsell content.
- [ ] Out-of-range values trigger the review state.
- [ ] No dose numbers appear anywhere.

**Note F4 — New/Fixed — "Your report becomes a plan, and a person checks it"**
- **saw:** Uploads showed only "Processing…" for about 4 minutes with no confirmation. The reply was a disclaimer plus a Pro upsell, and the button label didn't match its message. Free report reading already exists elsewhere (Ultrahuman Vision Cloud, Eka Care).
- **evidence:**
  - Refs 04–06.
  - 5 of 50 reviews about paywall stacking [reviews].
  - A structured AI programme matched human coaching in a 368-person trial (31.7% vs 31.9%) [jama].
  - Human plus AI coaching gave 74% more weight loss than AI alone on about 65,000 HealthifyMe users [hybrid].
- **changed:**
  - Visible upload progress.
  - A free first read: 3 priorities, questions for the doctor, one food swap and a retest date.
  - Out-of-range values go to a human reviewer.
- **why:** The value is the next step and the retest (test → plan → retest), not the reading. AI works best structured, with people at key moments.
- **stays:** both upload entry points and Pro plans.
- **measure:** upload success; upload-to-plan start; Day-90 retest rate.
- **safety:** no dosing; doctor-first wording; human review for out-of-range values.
- **sources:** reviews, ultrahuman, eka, jama, hybrid

### F5 — SuperTV: one pick, one reason (Changed)
**Where:** Tara's "Picked For You" banner in SuperTV (ref 18).

**UI:**
- The banner reads: "Neha, aaj ke liye ek video — kyunki aap Mangalvar ko vrat rakhti hain".
- One large **unlocked** card: "Vrat mein energy kaise bani rahe · 4 min · Ep 1/5".
- A small "2 aur isi tarah" row, and a "Sab dekhein" link to the original list.
- After watching: "Kaam ka laga?" [Haan 👍] [Kuch aur dikhao].
- Rohit's version: "2-minute deep breathing — kyunki aapne kaha office ke baad tension rehti hai".

**Rule:** a coach's first recommendation is never locked. Locked items show their price before the tap.

**Note F5 — Changed — "One recommendation, one reason"**
- **saw:** Tara picks 10 videos, and the first three visible are locked. Top 10 and category chips compete for attention: too many choices, and items get recommended and then locked.
- **evidence:**
  - Ref 18.
  - Seekho built a Tier 2+ habit with 2–5 minute episodic series [seekho].
  - Pocket FM reviews complain when unlock costs change mid-series [pocketfm].
  - India's dark-pattern rules cover drip pricing, including features that require extra purchases after the user has started [ccpa].
- **changed:** One unlocked pick, chosen using the Me card (including fasting days), with its reason. Two more like it, and feedback after watching. The full list is one tap away.
- **why:** One clear next thing beats a library, and feedback teaches the recommender what actually helped.
- **stays:** Top 10, categories, Originals, the Festive tab.
- **measure:** completion of the pick; next-day return; "Kuch aur dikhao" rate.
- **sources:** seekho, pocketfm, ccpa

### F6 — Less typing (Changed)
**Where:** meal scanner (refs 13–14), Health counters (ref 20), lab address form (ref 07).

**UI:**
- The meal scanner adds "Aapka usual" chips — "Poha + chai (nashta)" and "2 roti, dal, sabzi (lunch)" — so one tap logs a meal.
- The voice example uses Indian portions: "do roti, ek katori dal". The result card (ref 14 style) shows katori and roti units, and the tip suits an Indian meal.
- Counters are auto-filled from chat with a confirmation toast: "Tara ke chat se: 2 glass paani add karein?" [Haan] [Nahi].
- The address placeholder uses the user's city: "e.g. Swaroop Nagar, Kanpur".

**Note F6 — Changed — "Log in one tap, in Indian portions"**
- **saw:** The Health tab has 11 entry points. A meal tip assumed a Western breakfast. The address example shows Bengaluru's Koramangala for a Jharkhand pincode.
- **evidence:** refs 07, 13, 14, 20.
- **changed:** Usual-meal chips, Indian portion words, chat-to-counter auto-fill with confirmation, and local placeholders.
- **why:** Every extra tap competes with a 5-minute habit, and small local details tell users the app was built for them.
- **stays:** all four input modes, counters and targets.
- **measure:** time to log; logs per day. Guardrail: edits after auto-fill.
- **hypothesis:** true. **sources:** none

### F7 — Check-ins and privacy (New)
**Where:** a new Profile row (ref 22) below "Bhasha / Language": **"Check-ins aur privacy"**. The same choice is offered once at the end of the first chat.

**UI:**
- Channel: [WhatsApp] [App]
- How often: [Roz] [Hafte mein 3 baar] [Sirf zaroori]
- Time: "6:30 · chai ke time" (editable)
- Quiet hours: 10 pm–7 am
- Style: [Hinglish] [Simple Hindi] [English]
- Toggle, on by default: "Notification mein health ki baatein na dikhayein", with a live preview of how a notification will look.

**Note F7 — New — "You decide when and how Tara checks in"**
- **saw:** A re-engagement nudge came 2 hours later and named the wrong plan. Users have no visible reminder controls, and phones are often shared.
- **evidence:**
  - Ref 12.
  - NFHS-6: 63.6% of women own a phone they use, 57.4% in rural areas [nfhs].
  - WhatsApp business messaging requires opt-in [meta].
- **changed:** Channel, frequency, time, language style, quiet hours, and neutral notification previews.
- **why:** Reminders at a fixed, chosen time support habits [habuild]. Exposing health details on a shared phone breaks trust.
- **stays:** WhatsApp Join and chat.
- **measure:** opt-out rate; reply rate; check-in-to-step-done rate.
- **sources:** nfhs, meta, habuild

### F8 — "Families like mine" stories (Changed)
**Where:** the testimonial slot on Home (ref 10, the "Shivam, 37, Roorkee" card).

**UI:**
- A row of 3 vertical video cards with placeholder thumbnails, under the heading "Aap jaisi families".
- Example card: "Sunita, 41, Sagar — 'Ghar ka hi khana, bas thoda badla'", tagged "Hindi · 4 mahine · weight".
- Each card carries "Asli member · koi inaam nahi mila" and "Har kisi ke result alag hote hain".

**Note F8 — Changed — "Real members, matched to you, labelled honestly"**
- **saw:** There is one static text quote. 9 of 50 low reviews call the app "fake" or "AI", and the company runs an "Is it real or fake?" page.
- **changed:**
  - Short video stories from verified members.
  - Matched by goal, language and life stage.
  - Labelled with a typical-results note and an incentive disclosure.
- **why:** Proof from people like me is more convincing. India's endorsement guidelines require genuine, typical testimonials and disclosure of any material connection [endorse].
- **stays:** the placement on Home.
- **measure:** onboarding-to-paid; refund rate; "fake" mentions in reviews.
- **safety:** written consent; no "X kg in Y days" claims; no minors.
- **hypothesis:** true. I found no published data on video vs text lift. **sources:** reviews, endorse

### F9 — Trust fixes (Fixed; one marker each)
- **a) Coach cards (ref 11):**
  - Replace "Online" with "AI coach · turant jawab".
  - Each card links to the existing "Created by Experts, powered by AI" section (ref 10) via "Kaun banata hai?".
- **b) Counts:** replace "4.6M helped" with a defined metric such as "46 lakh baatein", or hide the number until it's defined.
- **c) League card (ref 15):** show a consistent live count and correct "Premiere" to "Premier".
- **d) One price card "Kya milta hai":**
  - Opened from every Pro upsell. It compares Free, Pro, Super Pro and courses, with prices, the renewal date, and "Kabhi bhi cancel — Profile > Pro membership".
  - It shows a renewal reminder ("3 din pehle yaad dilayenge") and a one-tap Cancel with neutral copy.
- **e) Future Look (ref 21):** opt-in only, with an 18+ confirmation. The label reads "AI se bani tasveer — koi wada nahi". No weight numbers.
- **f) Stress scan:**
  - When a check fails, say exactly how to fix it, e.g. "Phone aankhon ki seedh mein rakhein" for "Straight".
  - After 8 seconds, offer "Phir bhi photo lein". Build this as a small mock of the checklist chips: Light ✓, Distance ✓, Straight ○, Clear ✓.
- **g) Contest (ref 03):** rank by days of steps done, not % weight lost. This appears in the S17 index only.

**Note F9 — Fixed — "Small details that decide trust"**
- **saw:**
  - "Online" on AI coaches.
  - Counts that don't add up ("4.6M helped" vs 2.5M installs; "14L+ users" vs "2 playing").
  - Locked recommendations and prices stacked across Pro, Super Pro and courses.
  - An ungated AI body image.
  - A face scan that blocks without explaining why.
  - A contest that ranks weekly % weight lost, although about half of users have no scale [memo].
- **evidence:**
  - Billing, autopay and refund issues: 8 of 50 reviews [reviews].
  - India's 2023 dark-pattern guidelines list 13 practices, including false urgency (which covers false popularity), confirm shaming, subscription trap, drip pricing and nagging [ccpa].
- **changed:** Honest labels, defined numbers, one price card, a renewal reminder, one-tap cancel, gated AI imagery, fixable scan errors, and consistency-based contests.
- **why:** Each of these feeds the "is it fake?" doubt that paying users already voice.
- **stays:** plans, prices and features.
- **measure:** refund rate; billing complaints; "fake" mentions.
- **safety:** not legal advice — needs legal review.
- **sources:** reviews, memo, ccpa

### F10 — Family invite (New, small)
**Where:** Me card → "Ghar ke log" → "Rohit ko jodein", which opens a WhatsApp share mock.

**Flow:**
1. Rohit opens the link and sees F0 prefilled from the household: "Ghar ka khana: Neha ke card se ✓".
2. He adds his own goals by voice.

**Privacy:**
- Each person's health stays private.
- Only the kitchen and meal plan are shared.
- Neha sees "Rohit ne aaj step kiya ✓" only if Rohit turns it on.

**Note F10 — New — "Family-ready, without building the family app"**
- **saw:** The founders' next step is a family-first app. Families already share subscriptions (the Agra example), and one kitchen feeds everyone.
- **evidence:**
  - Memo [memo].
  - An Indian family-based trial cut weight by 2.61 kg and waist by 4.17 cm at 2 years [prolific].
  - In a separate trial, spouses or women as family members strongly predicted better glucose control [familydm].
- **changed:** Invite a household member. The kitchen is shared, health stays private, and progress is shared only by choice.
- **why:** This lays the groundwork for the family app with no migration later, because data is stored per person and per household from day one.
- **stays:** subscriptions and accounts.
- **measure:** invites sent and accepted; household vs solo retention.
- **safety:** consent per person; under-18s need guardian consent.
- **sources:** memo, prolific, familydm

### F11 — "Bas sun lo" and the safety path (New)
**Where:** Rohit's chat with Tara at 9:40 pm. He sends a voice note: "Aaj office mein bahut pressure tha, ghar aake kuch karne ka mann nahi."

**Flow:**
1. Tara (listening mode) reflects back what she heard, asks one gentle question, and offers no plan.
2. She then offers [2-min saans wala break] (a SuperTV video) or [Kal ke liye ek chhota step?].
3. Once per conversation, a small line: "Main AI coach hoon — doctor ya therapist nahi."

**Safety branch** (a "Show safety path" button inside the note panel):
- If crisis or self-harm language appears, coaching stops and a card shows:
  - "Aap akele nahi hain. Abhi baat karein:"
  - **Tele-MANAS 14416** (free, 24x7, many languages)
  - Buttons: [Call 14416] [Kisi apne ko message] [SuperLiving se call back maangein]
- No upsell, streak or reminder appears for 24 hours unless the user asks.

**Note F11 — New — "Listening, without pretending to be a therapist"**
- **saw:** Users bring stress to coaches. A "just listen" mode is valuable, but it needs a safety net.
- **evidence:**
  - APA's November 2025 advisory says chatbots and wellness apps shouldn't replace qualified professionals, flags over-reliance, and calls for barring chatbots from posing as licensed professionals [apa].
  - Tele-MANAS (14416) is free, 24x7, in about 20 languages [telemanas].
- **changed:**
  - The user can ask the coach just to listen.
  - Short grounding content.
  - Clear AI disclosure.
  - A crisis path to Tele-MANAS, plus a human callback.
- **why:** Warmth without dependency, and a human whenever risk appears.
- **stays:** coach persona and chat.
- **measure:** not time in chat. Measure a "felt heard" rating and crisis escalations handled within the target time. Guardrail: late-night repeat-use patterns, reviewed by humans.
- **safety:** crisis language goes to a human review queue.
- **sources:** apa, telemanas

### F12 — Do it together (now) and Find your people (Roadmap)
**Now (live in the prototype):**
- The intent chip, or the step's "Kisi ke saath karna hai?" link, opens a sheet with:
  - "Kal subah 6 AM Live Yoga" (the existing Super Pro live classes)
  - "WhatsApp community join karein" (the existing Join button)

**Roadmap screen** (badged "Roadmap · not live"):
- Heading: "Apne jaise log dhoondhein". Clubs by activity and city:
  - "Kanpur Morning Walk Club — Moti Jheel, 6:30 AM · organiser verified · 34 members"
  - "Ghar ka healthy khana circle — online, Ravivar"
  - "Office ke baad 15-min stretch — online, roz 7:15 PM"
  - "Mahila walking group — sirf mahilayein"
- The join preview states the privacy rules: "Sirf naam aur shehar dikhega · health details kabhi nahi · DMs band (v1)".
- The club goal counts days, not kilos: "Is hafte club ne 212 din step pure kiye".
- A 3-step phase timeline:
  1. Next: online groups built on existing live classes and the WhatsApp community.
  2. Later: verified-organiser clubs in 3 pilot cities.
  3. Later still: opt-in buddy matching by goal, routine and city.

**Note F12 — Roadmap — "From my habit to our habit"**
- **saw:** People stick with walks and yoga when they have company. The app has live classes and a WhatsApp community, but nothing connects a goal to a group.
- **evidence:**
  - Habuild uses fixed batches, WhatsApp nudges and city meetups [habuild].
  - Strava's pattern is clubs by activity and location [strava].
  - A caution: Kerala's peer-support diabetes programme showed no significant drop in diabetes at 24 months [kerala]. Community supports habits; it isn't a treatment.
- **changed (roadmap):** Clubs by activity and city with verified organisers, privacy-first profiles, and group goals based on consistency.
- **why:** It extends the daily-step loop socially without opening a social network.
- **risks:** too few local groups, moderation, physical safety, privacy.
- **measure:** joiners who attend twice or more; 30-day retention of joiners vs non-joiners.
- **sources:** habuild, strava, kerala

---

## 9. Screens

| ID | Screen | Reference | Persona | Adds |
|---|---|---|---|---|
| S0 | **Intro** (outside the phone): "SuperLiving: one memory, one small step a day". Three lines: who made it ("[Your name], Product Manager" placeholder), what this is, how to use it. Buttons [Take the 5-min tour] [Explore freely]. | — | — | Explainer |
| S1 | Onboarding, one shot | 01, 02 | Neha | F0 |
| S2 | Home | 08, 09, 10 | Neha | F3 card, F8 stories, F9d price card (from "Upgrade to PRO") |
| S3 | WhatsApp mock (lock screen and chat) | — | Neha | F3, F7 |
| S4 | Health tab | 20, 21 | Neha | F3 one scoreboard, F4 entry, F6 auto-fill, F9e Future Look gate, F9f scan hint |
| S5 | Meal scanner and result | 13, 14 | Neha | F6 |
| S6 | Expert Chat tab | 11 | Neha | F2 Tara card, F9a labels, F9b counts |
| S7 | Chat with Tara | 12, 04 | Neha | F1 memory chips, F2 intent chips and handoff, F4 in-chat upload |
| S8 | Me card (sheet) | 12 header | Neha | F1, F10 entry |
| S9 | Report upload and Next steps | 05, 06, 04 | Neha | F4 |
| S10 | Chat with Dev (handoff) | 12 | Neha | F2 context bubble |
| S11 | SuperTV | 18, 19 | Neha / Rohit | F5 |
| S12 | Profile, check-ins and price card | 22, 17 | Neha | F7, F9d |
| S13 | Rohit: invite and prefilled onboarding | 01 | Rohit | F10, F0 |
| S14 | Rohit: evening chat and safety path | 12 | Rohit | F11 |
| S15 | Do it together, then Roadmap: find your people | 10 | Neha | F12 |
| S16 | Day-30 snapshot | 20 | Neha | F3 progress (e.g. "21/30 din step"), F4 retest countdown, and a human coach voice note: "Ritu, RD: Plateau aaya hai? Lunch mein ek badlaav karte hain." |
| S17 | **All changes index** (outside the phone): every note in a table filterable by tag; a metrics table; "What we did not change"; sources. | — | — | Explainer |

- The bottom nav stays the same on every in-app screen. The Courses tab is a static copy of the existing style, with one note: "Unchanged".
- **What we did not change:** bottom nav, coach personas, Courses, lab-test booking, SuperTV sections, pricing tiers (only how they're presented), the festive content library, and Rewards & Cashbacks.

---

## 10. Tour script (5 minutes)

| # | Screen | Scripted action | Note |
|---|---|---|---|
| 1 | S0 | — | Intro |
| 2 | S1 | Tap Speak → transcript types → chips appear | F0 |
| 3 | S1 | Answer "chai 6–7", untick → tick WhatsApp | F0 consent |
| 4 | S2 | Land on Home | F3 |
| 5 | S2 | Scroll to stories | F8 |
| 6 | S3 | Next morning 6:30 lock screen → open → [Ho gaya] | F3, F7 |
| 7 | S4 | Ring now "1/7 din" · streak sheet | F3 merged |
| 8 | S5 | Tap "Poha + chai" usual chip | F6 |
| 9 | S6 | Tara card, AI coach labels | F2, F9a |
| 10 | S7 | Choose [Kuch karna hai] → "Saved to Me" chip | F1, F2 |
| 11 | S8 | Open Me card, show sources and Forget | F1 |
| 12 | S9 | Upload → progress → Next steps → "Expert review mein" | F4 |
| 13 | S9 | Tap badge → Reviewed ✓ | F4 human review |
| 14 | S10 | Handoff to Dev with context | F2 |
| 15 | S11 | One pick (vrat-aware) → "Kaam ka laga?" | F5 |
| 16 | S12 | Check-ins & privacy → neutral preview | F7 |
| 17 | S12 | "Kya milta hai" price card, one-tap cancel | F9d |
| 18 | S13 | Invite Rohit → prefilled onboarding | F10 |
| 19 | S14 | Rohit voice note → [Bas sun lo] → breathing video | F11 |
| 20 | S14 | "Show safety path" | F11 safety |
| 21 | S15 | Do it together → Roadmap clubs | F12 |
| 22 | S16 → S17 | Day-30 snapshot → all-changes index | Summary |

---

## 11. Human in the loop and guardrails (build as visible states)

| Trigger | Who steps in | What the user sees |
|---|---|---|
| Report value out of range | Nutritionist (doctor if critical) | "Expert review mein" → "Reviewed ✓ by [name, RD]" |
| Plan for diabetes, BP, PCOS, pregnancy, under-18 or addiction | Certified nutritionist, before the plan goes live | "Reviewed by [name]" tag on the plan |
| Crisis or self-harm language | Coaching stops, the Tele-MANAS card appears, a human callback is offered | The F11 safety card |
| 2-week plateau or 3 skipped steps | Human coach voice note | S16 voice note |
| Billing complaint | Support team | One-tap "Help" from the price card |
| Weekly sample of AI chats | Clinical QA (not visible) | Listed in S17 |

**Always:**
- AI is labelled as AI.
- No diagnosis or dosing.
- No guilt copy, false popularity, false urgency, or locked recommendations.
- Sensitive items are private by default, and any memory can be forgotten.
- Notification previews are neutral.
- Under-18 users need guardian consent.
- Body-image AI is opt-in and 18+.

---

## 12. Mock data (synthetic — keep exactly as written)

```ts
// personas.ts
export const neha = {
  id: 'neha', name: 'Neha Sharma', age: 34, city: 'Kanpur', language: 'Hinglish', sex: 'female (inferred)',
  diet: 'veg', fasting: ['Tuesday'], household: { size: 6, cooks: true }, goals: ['Hair fall', 'Energy', 'Thoda weight'],
  routine: { wake: '06:00', chai: '06:30', work: 'Home tuition 16:00–19:00' }, whoFor: 'Me and family',
  transcript: 'Main Neha, 34, Kanpur se. Ghar mein 6 log hain, khana main banati hoon. Baal bahut jhad rahe hain, thakaan rehti hai, thoda weight bhi kam karna hai. Veg hoon, Mangalvar vrat rakhti hoon.'
};
export const rohit = {
  id: 'rohit', name: 'Rohit Sharma', age: 38, city: 'Kanpur', language: 'Hinglish', sex: 'male',
  diet: 'veg weekdays, non-veg Sundays', household: 'shared with neha', goals: ['Stress', 'Neend', 'Pet ki charbi'],
  routine: { work: 'Bank branch 09:00–19:00', sleep: '23:30' },
  transcript: 'Main Rohit, Neha ka husband. Bank mein kaam karta hoon. Office ke baad bahut thakaan aur tension rehti hai, neend theek nahi aati, pet badh raha hai.',
  eveningVoiceNote: 'Aaj office mein bahut pressure tha, ghar aake kuch karne ka mann nahi.'
};
// report.ts — synthetic, not anyone's real values
export const report = { date: '2 Nov 2026', lab: 'Sample Diagnostics', pages: 11, sizeMB: 1.8, values: [
  { name: 'Vitamin B12', value: 158, unit: 'pg/mL', range: '187–883', status: 'low' },
  { name: 'Vitamin D (25-OH)', value: 17.5, unit: 'ng/mL', range: '<20 deficient · 20–30 insufficient · 30–100 sufficient', status: 'low' },
  { name: 'HbA1c', value: 5.9, unit: '%', range: '<5.7 normal', status: 'watch' },
  { name: 'Haemoglobin', value: 11.4, unit: 'g/dL', range: '12–15', status: 'low' },
  { name: 'TSH', value: 2.1, unit: 'µIU/mL', range: '0.4–4.5', status: 'ok' },
], retestDay90: '4 Feb 2027', reviewer: 'A. Verma, RD' };
// steps.ts
export const steps = {
  neha: ['Chai ke baad 10 min dhoop mein baith kar sabzi kaatiye ☀️', 'Dopahar ki roti ke saath 1 katori dahi', 'Mangalvar vrat: sabudana kam, makhana + dahi zyada'],
  rohit: ['Office se aakar 10 min chhat par walk 🚶', 'Raat 10:30 ke baad phone charger par, bed se door'] };
// coaches.ts — placeholder avatars only
export const coaches = [
  { id: 'tara', name: 'Coach Tara', role: 'Nutritionist', langs: 'Hindi · English' },
  { id: 'dev', name: 'Dev', role: 'Hair Care Expert', langs: 'Hinglish' },
  { id: 'rashmi', name: 'Coach Rashmi', role: 'Skin Specialist', langs: 'Hindi · English' },
  { id: 'arjun', name: 'Coach Arjun', role: 'Fitness Coach', langs: 'Hinglish' },
  { id: 'sandy', name: 'Chef Sandy', role: 'Masterchef', langs: 'Hinglish' } ];
// videos.ts — titles are illustrative
export const picks = { neha: { title: 'Vrat mein energy kaise bani rahe', mins: 4, ep: '1/5', reason: 'kyunki aap Mangalvar ko vrat rakhti hain' },
  rohit: { title: '2-minute deep breathing', mins: 2, reason: 'kyunki aapne kaha office ke baad tension rehti hai' } };
// stories (F8): Sunita, 41, Sagar · Imran, 45, Bareilly · Kavya, 29, Nashik — placeholder thumbnails, "Asli member · koi inaam nahi mila"
```

---

## 13. Sources (ids used in notes; show the label and link in "Show evidence")

| id | Label | Link |
|---|---|---|
| memo | Lightspeed India, *The Investment Memo: SuperLiving* (Oct 2026) | https://lsip.substack.com/p/the-investment-memo-superliving |
| reviews | Author's coding of the 50 latest 1–2★ Google Play reviews (Nov 2026): crashes 9, "just AI/fake" 9, billing/refunds 8, plan fit 6, paywall stacking 5 | internal |
| jama | JAMA RCT: AI-led vs human-led Diabetes Prevention Program, 368 adults, 31.7% vs 31.9% | https://jamanetwork.com/journals/jama/fullarticle/2840703 |
| hybrid | Univ. of Michigan / HealthifyMe: human + AI coaching, 74% more weight loss than AI alone | https://news.umich.edu/human-ai-coaching-models-boost-weight-loss/ |
| lally | Lally et al. 2010, *How are habits formed* — median 66 days, range 18–254 | https://www.researchgate.net/publication/32898894_How_are_habits_formed_Modeling_habit_formation_in_the_real_world |
| ii | Gollwitzer & Sheeran (2006), *Advances in Experimental Social Psychology* 38 — implementation intentions meta-analysis, 94 tests, d = 0.65 | primary paper; verify before demo (secondary summary seen) |
| habuild | Habuild: WhatsApp reminders, streaks, fixed batch timings | https://habuild.in/online-yoga-classes-in-pune |
| duo | Duolingo Blog: streak experiments; bingers more likely to abandon | https://making.duolingo.com/how-streaks-keep-duolingo-learners-committed-to-their-language-goals |
| seekho | Elevation Capital on Seekho: 2–5 min episodic videos for Tier 2+ | https://elevationcapital.com/investing-in-seekho |
| pocketfm | Pocket FM App Store reviews on rising unlock costs | https://apps.apple.com/app/1538433480 |
| ccpa | CCPA Guidelines for Prevention and Regulation of Dark Patterns, 2023 (13 patterns) — Deloitte summary | https://www2.deloitte.com/content/dam/Deloitte/in/Documents/tax/in-tax-gbt-the-guidelines-for-prevention-and-regulation-of-dark-patterns-noexp.pdf |
| endorse | CCPA Guidelines on Misleading Ads and Endorsements, 2022 | https://www.mondaq.com/india/advertising-marketing-branding/1201534/ccpa-releases-guidelines-for-prevention-of-misleading-advertisements-and-endorsements-for-misleading-advertisements-2022 |
| apa | APA Health Advisory on GenAI chatbots and wellness apps (Nov 2025) | https://www.apa.org/news/press/releases/2025/11/ai-wellness-apps-mental-health |
| telemanas | Tele-MANAS 14416, 24x7, ~20 languages | https://www.manoramayearbook.in/current-affairs/india/2025/04/05/tele-manas-programme-explained.html |
| prolific | PROLIFIC family-based weight trial, India | https://pubmed.ncbi.nlm.nih.gov/40127979/ |
| familydm | Family-involvement trial in type 2 diabetes | https://www.sciencedirect.com/science/article/abs/pii/S0738399118305354 |
| kerala | Kerala Diabetes Prevention Program (peer support) | https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5991386/ |
| nfhs | NFHS-6 women's phone ownership 63.6% (rural 57.4%) | https://www.thenewsminute.com/news/womens-internet-use-nearly-doubles-but-access-gaps-remain |
| chatform | Chatbot vs online form for health data (69.9% preferred chatbot; slower) | https://www.frontiersin.org/journals/digital-health/articles/10.3389/fdgth.2022.954069/text |
| chatform2 | KU Leuven: web surveys often give better data quality | https://lirias.kuleuven.be/retrieve/697279 |
| ultrahuman | Ultrahuman Vision Cloud: free blood-report interpretation | https://www.indiatvnews.com/amp/technology/news/ultrahuman-launches-vision-cloud-app-free-health-interpreter-in-india-details-2025-11-08-1016472 |
| eka | Eka Care: free health records app (ABHA) | label only; add link if verified |
| meta | WhatsApp Business messaging rules (opt-in; purpose-specific bots) | label only; add link if verified |
| strava | Strava clubs by activity and location (pattern reference) | label only |
| dpdp | DPDP Rules: main duties from 14 May 2027; verifiable parental consent for under-18 | label only; add link if verified |

---

## 14. Milestones and acceptance

1. **M1 — Shell:** tokens, phone frame, bottom nav, demo bar, the notes layer (Marker, NotesPanel, NoteCard, TourController), and S0/S17 skeletons.
2. **M2 — Neha core:** S1, S2, S4, S6, S7, S8.
3. **M3 — Report and content:** S9, S10, S11, S5.
4. **M4 — Settings and trust:** S12, S3, and all F9 markers.
5. **M5 — Family and safety:** S13, S14.
6. **M6 — Roadmap and wrap-up:** S15, S16, S17 complete, the full tour script, README, and deploy.

**Final checklist**
- [ ] The tour runs start to finish in about 5 minutes with no dead ends. "Explore freely" reaches every screen.
- [ ] Every new, changed, merged, hidden, fixed and roadmap item has a note with all fields and at least one source or "hypothesis: true".
- [ ] Unchanged areas match the reference screenshots in layout, colours, type sizes and spacing at 393×852.
- [ ] Turning notes off shows a clean app, as users would see it.
- [ ] Hinglish/English toggle works for all product strings.
- [ ] No reference image, real photo or real personal data appears anywhere in the build.
- [ ] No dosing, guilt copy, fake urgency or locked first recommendation.
- [ ] Works on mobile (notes as a bottom sheet) and desktop (side panel). Tap targets are 44px or larger. Keyboard focus is visible. Reduced motion is respected.

---

## 15. Don'ts
- Don't redesign unchanged screens or add new tabs.
- Don't use real expert photos, real thumbnails or the logo file.
- Don't show medicine doses or claim results.
- Don't use streak shaming, fake counters, countdown timers or "only X left".
- Don't let the explainer layer look like app UI.

---

## Appendix — Reference index (`reference/`)

| File | Shows | Used for |
|---|---|---|
| 01-onboarding-goals-top.png | Goal picker, top | S1 base look |
| 02-onboarding-goals-scrolled.png | Goal picker, scrolled, CTA | S1 base look |
| 03-contest-rules.png | Festive Fit Challenge (% weight-loss ranking) | F9g note |
| 04-chat-dev-report-reply.png | Report reply + Pro upsell (values blurred) | S7, S9 problems |
| 05-upload-modal-image.png | Upload modal, image (report blurred) | S9 base modal |
| 06-upload-modal-pdf.png | Upload modal, PDF (name blurred) | S9 base modal |
| 07-lab-test-address.png | Lab test address form (pincode/city blurred) | F6 placeholder |
| 08-home-top.png | Home: header, streak, blood tests, videos | S2, tokens |
| 09-home-plans.png | Home: Super Plans (course prices) | S2, F9d |
| 10-home-bottom.png | Home: Pro card, experts, testimonial, support | S2, F8 slot |
| 11-expert-chat-tab.png | Expert Chat grid, "Online", counts | S6 |
| 12-chat-dev-followup.png | Dev chat, wrong-context nudge, chips, input bar | S7, S10 |
| 13-meal-scanner.png | Meal scanner input modes | S5 |
| 14-meal-logged.png | Meal result card | S5 |
| 15-games.png | Games hub, league card | F3 reward, F9c |
| 16-game-memory-flash.png | Game levels, points | F3 reward |
| 17-paywall-super-pro.png | Super Pro paywall ₹349 | F9d |
| 18-supertv-home.png | SuperTV, Tara's 10 picks (locked) | S11 |
| 19-supertv-festive.png | Festive & Spiritual (vrat content) | F5 vrat-aware |
| 20-health-tab.png | Health ring, counters, tools, journey | S4 |
| 21-transformation.png | Future Look AI image | F9e |
| 22-profile.png | Profile menu (phone blurred) | S12 |

The stress-scan screenshot is not included because it shows a real face. Build F9f from the description in §8.
