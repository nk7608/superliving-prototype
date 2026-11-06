import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { hitl, metrics, notes, unchanged, type ProductNote, type Tag } from '../data/notes';
import { chapters } from '../data/tour';
import { screenById, type ScreenId } from '../app/screens';
import { TagPill } from './NoteCard';
import { useOpenNote } from './NotesPanel';

const TAGS: Tag[] = ['New', 'Changed', 'Merged', 'Fixed', 'Roadmap'];
const chapterOf: Partial<Record<ScreenId | 'INDEX', number>> = {
  S1: 2, S2: 3, S3: 3, S4: 3, S5: 3, S6: 4, S7: 4, S8: 4, S9: 5, S10: 5, S11: 6, S12: 6, INDEX: 6, S13: 7, S14: 7, S15: 8, S16: 8,
};

function Row({ n }: { n: ProductNote }) {
  const [open, setOpen] = useState(false);
  const openNote = useOpenNote();
  const where = n.screen === 'INDEX' ? 'Not in this prototype' : screenById(n.screen).label.replace(/^S\d+ · /, '');
  return (
    <li className="border-b border-[#EFEADB] last:border-0">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 px-4 py-3 text-left" aria-expanded={open}>
        <TagPill tag={n.tag} small />
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-snug">{n.title}</span>
          <span className="mt-0.5 block text-[13.5px] leading-snug text-[#5E5D58]">{n.now}</span>
        </span>
        <span className="hidden shrink-0 text-[12px] text-[#8A877E] sm:block">{where}</span>
        <ChevronDown size={16} className={`mt-1 shrink-0 text-[#8A877E] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="grid gap-2 px-4 pb-4 text-[13.5px] leading-relaxed sm:grid-cols-3 sm:pl-[88px]">
          {n.before !== '—' && <div><div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8A877E]">Before</div>{n.before}</div>}
          <div><div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8A877E]">Why</div>{n.why}</div>
          <div><div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8A877E]">How we’d know</div>{n.measure}</div>
          {n.screen !== 'INDEX' && (
            <button type="button" onClick={() => openNote(n.id)} className="flex items-center gap-1 text-[13px] font-semibold text-green-700 hover:underline sm:col-span-3">
              Show it on screen <ArrowRight size={14} />
            </button>
          )}
        </div>
      )}
    </li>
  );
}

/** S17 — every change in one place, grouped by the story's chapters. */
export function ChangesIndex() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Tag | 'All'>('All');
  const list = notes.filter((n) => n.tag !== 'Unchanged' && (filter === 'All' || n.tag === filter));

  return (
    <main className="mx-auto max-w-[960px] px-4 pb-24 pt-6 text-green-900 sm:px-8">
      <button type="button" onClick={() => navigate(-1)} className="flex min-h-[40px] items-center gap-1.5 text-[14px] font-medium text-green-700"><ArrowLeft size={16} /> Back</button>
      <h1 className="mt-2 text-[30px] font-bold tracking-[-0.4px]">Every change, in one list</h1>
      <p className="mt-1 max-w-[640px] text-[15px] leading-relaxed text-[#5E5D58]">
        Grouped by the story. Each line says what the user now sees; open it for what it was before, why, and how we’d know it worked.
      </p>

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by type">
        {(['All', ...TAGS] as const).map((t) => {
          const count = t === 'All' ? notes.filter((n) => n.tag !== 'Unchanged').length : notes.filter((n) => n.tag === t).length;
          const on = filter === t;
          return (
            <button key={t} type="button" aria-pressed={on} onClick={() => setFilter(t)} className={`h-9 rounded-full border px-3.5 text-[13px] font-medium ${on ? 'border-green-900 bg-green-900 text-[#F1EFE7]' : 'border-[#D9D3BF] bg-[#FFFDF8]'}`}>
              {t === 'Roadmap' ? 'Roadmap' : t} · {count}
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-6">
        {chapters.slice(1).map((c, i) => {
          const items = list.filter((n) => chapterOf[n.screen] === i + 2);
          if (!items.length) return null;
          return (
            <section key={c}>
              <h2 className="flex items-center gap-2 text-[17px] font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mustard text-[13px] font-bold">{i + 1}</span> {c}
              </h2>
              <ul className="mt-2 overflow-hidden rounded-[20px] border border-[#E4DFCF] bg-[#FFFDF8]">
                {items.map((n) => <Row key={n.id} n={n} />)}
              </ul>
            </section>
          );
        })}
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-[20px] border border-[#E4DFCF] bg-[#FFFDF8] p-5">
          <h2 className="text-[16px] font-semibold">How we’d know it works</h2>
          <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8A877E]">Early signals</div>
          <ul className="mt-1 space-y-1 text-[14px]">{metrics.leading.map((m) => <li key={m}>• {m}</li>)}</ul>
          <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8A877E]">Outcomes</div>
          <ul className="mt-1 space-y-1 text-[14px]">{metrics.lagging.map((m) => <li key={m}>• {m}</li>)}</ul>
          <p className="mt-3 text-[12.5px] text-[#8A877E]">Hypotheses — targets set against SuperLiving’s own baselines.</p>
        </div>
        <div className="rounded-[20px] border border-[#E4DFCF] bg-[#FFFDF8] p-5">
          <h2 className="text-[16px] font-semibold">Where a person steps in</h2>
          <ul className="mt-3 space-y-2.5 text-[14px] leading-snug">
            {hitl.map((h) => (
              <li key={h.trigger}><span className="font-medium">{h.trigger}</span><br /><span className="text-[#5E5D58]">→ {h.who}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-[20px] border border-[#E4DFCF] bg-[#FFFDF8] p-5">
          <h2 className="text-[16px] font-semibold">What we didn’t change</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {unchanged.map((u) => <li key={u} className="rounded-full bg-[#EEECE5] px-3 py-1 text-[13px] text-[#5E5D58]">{u}</li>)}
          </ul>
          <h3 className="mt-5 text-[14px] font-semibold">Always</h3>
          <p className="mt-1 text-[13.5px] leading-relaxed text-[#5E5D58]">AI is labelled as AI. No diagnosis or doses. No guilt, fake urgency or locked first picks. Sensitive details private by default; anything can be forgotten. Neutral notification previews. Guardian consent under 18.</p>
        </div>
      </section>
    </main>
  );
}
