# SuperLiving add-ons prototype

A clickable, self-explaining prototype of the add-ons I would ship in my first 90 days at SuperLiving: **one memory shared by every coach, turned into one small step a day, with a human stepping in where it matters.**

Every new or changed element carries a yellow numbered pin. Tapping it opens a short card: **Before → Now → Why → How we'd know**. These cards are the PRD. Each screen also opens with a one-line summary of what changed there. All data is synthetic.

**Live:** https://superliving-prototype.vercel.app (auto-deploys from `main`)

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in dist/ (deploy to Vercel or Netlify as-is)
npm run preview    # serve the built dist/
```

Routing uses `HashRouter`, so `dist/` works on any static host with no rewrite rules.

## How to use it

- **Intro:** pick *Take the 5-minute tour*, *Explore on my own*, or start at any of the 8 chapters.
- **Guided tour:** 22 steps in 8 chapters (The idea · Neha joins · One step a day · One memory · Report to plan · Content and trust · Family and care · What comes next). Each step sets the screen and the persona, plays its scripted action, and shows a one-line caption.
- **Explore:** tap any yellow pin. The panel on the right (on mobile, the *changes* button) explains what changed on that screen.
- **Controls:** Guided tour / Explore, Notes on/off, whose phone (Neha/Rohit), app language (Hinglish/English), jump to screen, all changes, reset. Every change applies instantly, everywhere. Switching persona on a screen that belongs to the other person takes you to their version.
- **Mobile (<1024px):** the app fills the screen under a slim brand bar. The tour caption sits in that bar, and notes and settings open as bottom sheets.
- **All changes:** every change grouped by chapter, filterable by type, plus how we'd measure it, where a person steps in, and what we didn't change.

### Keyboard

| Key | Action |
|---|---|
| `N` | Toggle product notes |
| `←` / `→` | Previous / next tour step |
| `Esc` | Close the open sheet; with none open, leave the tour |

Demo state is saved in `localStorage` under `sl-demo-v1`. **Reset demo** clears it.

## Where things live

```
src/
  app/          App routes, DemoContext (state + scripted actions), Layout (phone frame, panel), screens.ts
  screens/      one file per screen (S1–S16 + Courses)
  components/   app-matching UI: StepCard, Chat, MeSheet, Report, PriceSheet, CoachCard, ui primitives
  notes/        Anchor (marker), NotesPanel, NoteCard, TourController, DemoBar, IntroScreen, ChangesIndex
  data/         personas, coaches, steps, report, videos, memory, notes (the PRD), tour, sources, strings
  styles/       tokens.ts (colours sampled from the app; explainer palette kept separate)
```

- **Editing copy:** every product string is in `src/data/strings.ts` with `hi` (Hinglish) and `en` values.
- **Editing notes:** `src/data/notes.ts`. Each placement ties a note to a screen and a `data-note-anchor`.
- **Open questions:** see `OPEN_QUESTIONS.md`. Search the code for `TODO(question)`.

## Privacy

- `reference/` holds real app screenshots used only for visual matching. It is **never imported** and is listed in `.gitignore`. Don't publish it.
- No real photos, thumbnails or logo files are used. People are illustrations from **Notionists by Zoish (CC0 1.0)**, pre-rendered to `public/avatars/` by `npm run avatars`. Thumbnails are coloured cards with emoji.
- The explainer layer uses SuperLiving's own palette (dark green, cream, mustard pins) instead of the indigo in CLAUDE.md §7.1. This was changed at the author's request so the pitch reads as part of the product.
- All personas, lab values and stories are synthetic.

Not affiliated with SuperLiving.
