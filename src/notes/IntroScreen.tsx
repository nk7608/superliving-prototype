import { useNavigate } from 'react-router-dom';
import { Play, Compass, ListChecks, Mic, Footprints, Brain, HeartHandshake } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { chapters, tour } from '../data/tour';
import { Avatar } from '../components/Avatar';

/** S0 — what this is, in one screen, in SuperLiving's own look. */
export function IntroScreen() {
  const { goTour, set } = useDemo();
  const navigate = useNavigate();
  const startAt = (chapter: number) => goTour(Math.max(1, tour.findIndex((t) => t.chapter === chapter)));
  const ideas = [
    { Icon: Mic, t: 'Say it once', d: 'One voice note sets up the whole profile. No forms.' },
    { Icon: Brain, t: 'One memory', d: 'Every coach reads the same card — and you can see and edit it.' },
    { Icon: Footprints, t: 'One small step a day', d: 'One action, at your chai time, with one scoreboard.' },
    { Icon: HeartHandshake, t: 'A person when it matters', d: 'Dietitians review reports and step in at plateaus; crisis goes to humans.' },
  ];
  return (
    <main className="text-green-900">
      <section className="bg-green-900 text-[#F1EFE7]">
        <div className="mx-auto max-w-[1040px] px-5 pb-12 pt-10 sm:px-8 sm:pt-14">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {(['neha', 'tara', 'rohit'] as const).map((w) => (
                <Avatar key={w} who={w} size={40} className="border-2 border-green-900" />
              ))}
            </div>
            <span className="text-[13px] text-[#F1EFE7]/75">A product pitch by a visiting product manager · not affiliated with SuperLiving</span>
          </div>
          <h1 className="mt-6 max-w-[760px] text-[34px] font-bold leading-[1.1] tracking-[-0.5px] sm:text-[48px]">
            One memory. <span className="text-green-300">One small step a day.</span>
          </h1>
          <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-[#F1EFE7]/85 sm:text-[17px]">
            SuperLiving already has the parts — coaches, SuperTV, trackers, lab tests, WhatsApp, voice. This prototype shows the small add-ons that connect them, inside the screens users already know.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={() => goTour(1)} className="flex h-12 items-center gap-2 rounded-full bg-mustard px-6 text-[16px] font-semibold text-green-900 hover:brightness-105">
              <Play size={18} fill="#22391D" /> Take the 5-minute tour
            </button>
            <button
              type="button"
              onClick={() => {
                set({ tourActive: false, notesOn: true, persona: 'neha' });
                navigate('/onboarding');
              }}
              className="flex h-12 items-center gap-2 rounded-full border border-[#F1EFE7]/40 px-6 text-[16px] font-semibold text-[#F1EFE7] hover:bg-white/10"
            >
              <Compass size={18} /> Explore on my own
            </button>
            <button type="button" onClick={() => navigate('/changes')} className="flex h-12 items-center gap-2 rounded-full px-4 text-[15px] font-medium text-[#F1EFE7]/80 hover:bg-white/10">
              <ListChecks size={18} /> See every change
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1040px] px-5 py-10 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ideas.map(({ Icon, t, d }) => (
            <div key={t} className="rounded-[20px] border border-[#E4DFCF] bg-[#FFFDF8] p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700"><Icon size={20} /></span>
              <div className="mt-3 text-[16px] font-semibold">{t}</div>
              <p className="mt-1 text-[14px] leading-snug text-[#5E5D58]">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-[20px] font-semibold">The story, in 8 short chapters</h2>
            <p className="mt-1 text-[14px] text-[#5E5D58]">Follow Neha, 34, from Kanpur, and her husband Rohit. Tap a chapter to start there.</p>
            <ol className="mt-4 space-y-2">
              {chapters.slice(1).map((c, i) => (
                <li key={c}>
                  <button type="button" onClick={() => startAt(i + 2)} className="flex w-full items-center gap-3 rounded-2xl border border-[#E4DFCF] bg-[#FFFDF8] px-4 py-3 text-left hover:border-green-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mustard text-[13px] font-bold">{i + 1}</span>
                    <span className="text-[15px] font-medium">{c}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-[20px] font-semibold">How to read it</h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-[#3E4A39]">
              <li className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mustard text-[12px] font-bold">1</span>Yellow numbered pins mark what’s new or changed. Tap one to see what it was before, what it is now, and why.</li>
              <li className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-[12px] font-bold">N</span>Turn notes off (or press N) to see the app exactly as users would.</li>
              <li className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-[12px] font-bold">A</span>Switch between Neha and Rohit, or Hinglish and English, at any time — every screen updates instantly.</li>
            </ul>
            <p className="mt-6 text-[13px] leading-relaxed text-[#8A877E]">All people, reports and numbers are made up for the demo. Faces are illustrations.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
