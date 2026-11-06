# SuperLiving add-ons prototype

A clickable, self-explaining prototype of the add-ons I would ship in my first 90 days at SuperLiving: **one memory shared by every coach, turned into one small step a day, with a human stepping in where it matters.**

Every new or changed element carries an indigo numbered marker. Its **Product note** covers what we saw, what changed, why, what stays, how we'd measure it and the safety rule. The notes are the PRD. All data is synthetic.

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

- **Intro (S0):** choose *Take the 5-min tour* or *Explore freely*.
- **Tour:** 22 steps (CLAUDE.md §10). Each step sets the screen and persona, opens one note, and may play a scripted action, such as the voice note, the upload or the WhatsApp reply. Use Next/Back in the tour bar.
- **Explore:** tap any indigo marker to open its note and outline the element. The panel lists every note on the screen, plus items that were hidden or merged.
- **Demo bar (desktop):** Tour/Explore, Notes on/off, Persona (Neha/Rohit), App language (Hinglish/English), Jump to screen, Reset demo.
- **Mobile (<1024px):** the app fills the screen. A floating **Notes** pill opens the notes and demo controls as a bottom sheet.
- **All changes (S17):** every note in a table you can filter by tag, plus metrics, "what we did not change", human in the loop, and sources.

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
- No real photos, thumbnails or logo files are used. Faces are SVG placeholders, and thumbnails are coloured cards with emoji.
- All personas, lab values and stories are synthetic.

Not affiliated with SuperLiving.
