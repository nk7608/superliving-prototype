import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Compass, ListChecks, Mic, Footprints, Brain, HeartHandshake } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { chapters, firstStepOf } from '../data/tour';
import { Avatar } from '../components/Avatar';
import { penRef } from '../components/pen';

/** A pen-drawn squiggle, used to underline and point. */
const Squiggle = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 220 14" className={className} aria-hidden>
    <path
      d="M2 9 C 30 2, 50 13, 80 7 S 130 2, 160 8 S 200 11, 218 5"
      ref={penRef}
      className="pen-draw"
      style={{ animationDelay: '0.4s' }}
      fill="none"
      stroke="#E2C04C"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
);

/** S0 — a note from the person pitching, then two ways in. */
export function IntroScreen() {
  const { goTour, set } = useDemo();
  const navigate = useNavigate();
  const ideas = [
    { Icon: Mic, t: 'Say it once', d: 'One voice note sets up the profile. No forms.' },
    { Icon: Brain, t: 'One memory', d: 'Tell one coach; every coach knows.' },
    { Icon: Footprints, t: 'One small step a day', d: 'At chai time, with one scoreboard.' },
    { Icon: HeartHandshake, t: 'A person when it matters', d: 'Dietitians and real people step in.' },
  ];
  return (
    <main className="overflow-x-hidden text-green-900">
      <section className="relative bg-green-900 text-[#F1EFE7]">
        <div className="mx-auto grid max-w-[1080px] gap-10 px-5 pb-14 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {(['neha', 'tara', 'rohit'] as const).map((w) => (
                  <Avatar key={w} who={w} size={36} className="border-2 border-green-900" />
                ))}
              </div>
              <span className="font-hand text-[20px] text-green-300">a pitch for SuperLiving</span>
            </div>
            <h1 className="mt-5 text-[34px] font-bold leading-[1.08] tracking-[-0.5px] sm:text-[46px]">
              One memory.
              <br />
              <span className="text-green-300">One small step a day.</span>
            </h1>
            <Squiggle className="mt-2 h-auto w-[200px] sm:w-[280px]" />
            <p className="mt-4 max-w-[560px] text-[16px] leading-relaxed text-[#F1EFE7]/85 sm:text-[17px]">
              Small add-ons inside the screens people already use — what I’d ship in my first 90 days.
            </p>

            <div className="relative mt-8 flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => goTour(1, 'neha')} className="flex h-12 items-center gap-2 rounded-full bg-mustard px-6 text-[16px] font-semibold text-green-900 shadow-[0_6px_0_#B8952A] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_#B8952A]">
                <Play size={18} fill="#22391D" /> Follow Neha · 5 min
              </button>
              <button type="button" onClick={() => goTour(0, 'rohit')} className="flex h-12 items-center gap-2 rounded-full border border-[#F1EFE7]/40 px-5 text-[15px] font-semibold text-[#F1EFE7] hover:bg-white/10">
                <Avatar who="rohit" size={24} /> Rohit’s evening · 2 min
              </button>
              {/* hand-drawn "start here" */}
              <div className="pointer-events-none absolute -bottom-14 left-6 hidden items-center gap-1 sm:flex" aria-hidden>
                <svg width="46" height="40" viewBox="0 0 46 40">
                  <path d="M40 36 C 30 30, 14 26, 10 6" ref={penRef} className="pen-draw" style={{ animationDelay: '1s' }} fill="none" stroke="#E2C04C" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M4 13 L10 5 L17 11" ref={penRef} className="pen-draw" style={{ animationDelay: '1.6s' }} fill="none" stroke="#E2C04C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="mt-6 font-hand text-[21px] text-mustard">start here — 5 minutes, promise</span>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 sm:mt-20">
              <button
                type="button"
                onClick={() => {
                  set({ tourActive: false, notesOn: true, persona: 'neha' });
                  navigate('/onboarding');
                }}
                className="flex h-10 items-center gap-2 rounded-full px-3 text-[14px] font-medium text-[#F1EFE7]/80 hover:bg-white/10"
              >
                <Compass size={17} /> Explore on my own
              </button>
              <button type="button" onClick={() => navigate('/changes')} className="flex h-10 items-center gap-2 rounded-full px-3 text-[14px] font-medium text-[#F1EFE7]/80 hover:bg-white/10">
                <ListChecks size={17} /> Every change in one list
              </button>
            </div>
          </div>

          {/* A note from the person pitching */}
          <motion.div
            initial={{ opacity: 0, y: 16, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: 1.6 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 160, damping: 18 }}
            className="relative mx-auto w-full max-w-[400px] rounded-[6px] bg-[#FFFBEA] p-6 pt-7 text-green-900 shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
          >
            <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-4deg] rounded-[3px] bg-mustard/70" aria-hidden />
            <p className="font-hand text-[25px] leading-[1.25]">
              Hi! I spent time with SuperLiving — Tara, SuperTV, the trackers, the lab tests.
            </p>
            <p className="mt-3 font-hand text-[25px] leading-[1.25]">
              The pieces are great. What I kept wishing for was the <span className="bg-mustard/40 px-1">thread</span> between them.
            </p>
            <p className="mt-3 font-hand text-[25px] leading-[1.25]">So I built it. Have a look →</p>
            <p className="mt-4 text-right font-hand text-[20px] leading-tight text-green-700">— a PM who’d love to build this with you</p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-5 py-12 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ideas.map(({ Icon, t, d }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-[20px] border border-[#E4DFCF] bg-[#FFFDF8] p-4"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700"><Icon size={20} /></span>
                <span className="font-hand text-[26px] text-[#C9B27A]">{i + 1}</span>
              </div>
              <div className="mt-3 text-[16px] font-semibold">{t}</div>
              <p className="mt-1 text-[14px] leading-snug text-[#5E5D58]">{d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-[20px] font-semibold">Neha’s story, in 7 short chapters</h2>
            <p className="mt-1 font-hand text-[19px] text-green-700">tap any one to jump in</p>
            <ol className="mt-3 space-y-2">
              {chapters.slice(1).map((c, i) => (
                <li key={c}>
                  <button type="button" onClick={() => goTour(firstStepOf('neha', i + 2), 'neha')} className="group flex w-full items-center gap-3 rounded-2xl border border-[#E4DFCF] bg-[#FFFDF8] px-4 py-3 text-left transition-colors hover:border-green-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mustard text-[13px] font-bold">{i + 1}</span>
                    <span className="flex-1 text-[15px] font-medium">{c}</span>
                    <span className="text-[#C9B27A] transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-[20px] font-semibold">How to read it</h2>
            <ul className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3E4A39]">
              <li className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mustard text-[12px] font-bold">1</span>Yellow pins mark what’s new. Tap one: you’ll see what it was, what it is now, and why.</li>
              <li className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-[12px] font-bold">↔</span>Switch Neha ↔ Rohit or Hinglish ↔ English anytime. Every screen follows.</li>
              <li className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-[12px] font-bold">✕</span>Leave the tour whenever you like — “End tour” is always on top.</li>
            </ul>
            <p className="mt-6 font-hand text-[19px] text-[#8A877E]">All people and numbers are made up. Faces are illustrations.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
