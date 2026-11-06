# SuperLiving · 90-day add-ons

**Live:** https://superliving-prototype.vercel.app

Hi! This is a clickable pitch for SuperLiving. It shows the small things I'd add in my first 90 days.

SuperLiving already has great parts: coaches, SuperTV, trackers, lab tests, WhatsApp and voice. What's missing is the thread between them. This prototype adds that thread:

- **Say it once.** One voice note sets up your profile.
- **One memory.** Every coach reads the same card, and you can see and edit it.
- **One small step a day,** at your chai time, with one scoreboard.
- **A person when it matters.** Dietitians check reports and step in at plateaus, and real people handle anything serious.

## Take a look

Open the link and tap **Take the 5-minute tour**. You'll follow Neha, 34, from Kanpur, and later her husband Rohit, through 8 short chapters. Each step lights up one thing on screen and explains it in a sentence.

Prefer to wander? Choose **Explore on my own**, then tap any yellow pin to see what it was before, what it is now, and why.

A few handy switches in the top bar (on phones, under the ⚙︎ icon):

- **Neha / Rohit** shows the same app on the other person's phone.
- **Hinglish / English** changes the app language instantly.
- **Notes off** (or the `N` key) shows the app exactly as users would see it.

Everything you see is made up for the demo: people, reports and numbers. The faces are illustrations.

## Run it yourself

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # static site in dist/
```

## Where things live

- `src/screens/` holds one file per app screen.
- `src/data/notes.ts` holds every change, written as Before → Now → Why → How we'd know.
- `src/data/tour.ts` is the 8-chapter story.
- `src/data/strings.ts` has all app copy, in Hinglish and English.
- `src/notes/` is the explainer layer: the spotlight guide, the story map and the all-changes page.

## A few honest notes

- This isn't affiliated with SuperLiving. It's an outside product pitch.
- The real-app screenshots used for reference are kept out of this repo.
- The illustrations are Notionists by Zoish (CC0). They're pre-rendered into `public/avatars/` by `npm run avatars`.
