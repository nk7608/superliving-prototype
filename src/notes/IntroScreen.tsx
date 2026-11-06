import { useNavigate } from 'react-router-dom';
import { Play, Compass, ListChecks } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { tr } from '../data/strings';

/** S0 — outside the phone. Plain English for founders and reviewers. */
export function IntroScreen() {
  const { goTour, set } = useDemo();
  const navigate = useNavigate();
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-52px)] max-w-[880px] flex-col justify-center px-4 py-10 font-note text-[#141826] sm:px-8">
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D9DCEA] bg-white px-3 py-1 text-[13px] text-[#4A4F66]">
        <span className="h-2 w-2 rounded-full bg-[#3B4CCA]" /> Unsolicited product pitch · clickable prototype
      </div>
      <h1 className="mt-5 text-[34px] font-bold leading-tight tracking-[-0.5px] sm:text-[44px]">
        SuperLiving: one memory, one small step a day
      </h1>
      <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-[#2A2F45]">
        <p>
          <span className="font-semibold">Who made it.</span> {tr('en', 'introBy')}. These are the add-ons I would ship in my first 90 days.
        </p>
        <p>
          <span className="font-semibold">What this is.</span> The real app, rebuilt as a prototype, with small additions inside existing screens. SuperLiving already has coaches, SuperTV, trackers, lab tests, WhatsApp and voice. The missing piece is the connecting layer: <em>one memory shared by every coach, turned into one small step a day, with a human stepping in where it matters.</em> All data is synthetic.
        </p>
        <p>
          <span className="font-semibold">How to use it.</span> Indigo numbered markers sit on everything new or changed. Tap one to read what we saw, what changed, why, and how we would measure it. Press <kbd className="rounded border border-[#C9CCDA] bg-white px-1.5 text-[14px]">N</kbd> to hide notes and see the app as users would. Use <kbd className="rounded border border-[#C9CCDA] bg-white px-1.5 text-[14px]">←</kbd> <kbd className="rounded border border-[#C9CCDA] bg-white px-1.5 text-[14px]">→</kbd> in the tour, and <kbd className="rounded border border-[#C9CCDA] bg-white px-1.5 text-[14px]">Esc</kbd> to leave it.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={() => goTour(1)} className="flex h-12 items-center gap-2 rounded-xl bg-[#3B4CCA] px-5 text-[16px] font-semibold text-white shadow-[0_6px_20px_rgba(59,76,202,0.3)] hover:bg-[#2F3DA8]">
          <Play size={18} /> Take the 5-min tour
        </button>
        <button
          type="button"
          onClick={() => {
            set({ tourActive: false, notesOn: true, persona: 'neha' });
            navigate('/onboarding');
          }}
          className="flex h-12 items-center gap-2 rounded-xl border border-[#3B4CCA] bg-white px-5 text-[16px] font-semibold text-[#3B4CCA] hover:bg-[#3B4CCA]/5"
        >
          <Compass size={18} /> Explore freely
        </button>
        <button type="button" onClick={() => navigate('/changes')} className="flex h-12 items-center gap-2 rounded-xl px-4 text-[15px] font-medium text-[#4A4F66] hover:bg-white">
          <ListChecks size={18} /> All changes
        </button>
      </div>
      <p className="mt-10 max-w-[680px] text-[13px] leading-relaxed text-[#6A6F85]">
        Not affiliated with SuperLiving. Coach names and roles match the live app; all faces, thumbnails and personal data are placeholders. Figures in the notes carry a source; anything unproven is labelled as a hypothesis.
      </p>
    </main>
  );
}
