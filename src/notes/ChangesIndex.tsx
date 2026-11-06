import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { hitl, metrics, notes, unchanged, type Tag } from '../data/notes';
import { sources } from '../data/sources';
import { screenById } from '../app/screens';
import { TagPill, NoteCard } from './NoteCard';
import { useOpenNote } from './NotesPanel';

const TAGS: Tag[] = ['New', 'Changed', 'Merged', 'Fixed', 'Roadmap', 'Unchanged'];

/** S17 — every note in a filterable table, metrics, what stayed, HITL, sources. */
export function ChangesIndex() {
  const navigate = useNavigate();
  const openNote = useOpenNote();
  const [filter, setFilter] = useState<Tag | 'All'>('All');
  const [open, setOpen] = useState<string | null>(null);
  const list = notes.filter((n) => filter === 'All' || n.tag === filter);
  const usedSources = [...new Set(notes.flatMap((n) => n.sources))];

  return (
    <main className="mx-auto max-w-[1100px] px-4 pb-20 pt-6 font-note text-[#141826] sm:px-8">
      <button type="button" onClick={() => navigate(-1)} className="flex min-h-[40px] items-center gap-1.5 text-[14px] font-medium text-[#3B4CCA]"><ArrowLeft size={16} /> Back</button>
      <h1 className="mt-2 text-[30px] font-bold tracking-[-0.4px]">All changes</h1>
      <p className="mt-1 max-w-[720px] text-[15px] text-[#4A4F66]">
        Every product note in one place. The notes are the PRD: what we saw, what changed, why, what stays, how we would measure it, and the safety rule. Tap a row to read it, or open it on its screen.
      </p>

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
        {(['All', ...TAGS] as const).map((t) => {
          const count = t === 'All' ? notes.length : notes.filter((n) => n.tag === t).length;
          return (
            <button key={t} type="button" aria-pressed={filter === t} onClick={() => setFilter(t)} className={`h-9 rounded-lg border px-3 text-[13px] font-medium ${filter === t ? 'border-[#3B4CCA] bg-[#3B4CCA] text-white' : 'border-[#D9DCEA] bg-white text-[#2A2F45]'}`}>
              {t} · {count}
            </button>
          );
        })}
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-[#E3E5EE] bg-white">
        <div className="hidden grid-cols-[70px_110px_1fr_170px_120px] gap-3 border-b border-[#E3E5EE] bg-[#F6F7FB] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#6A6F85] md:grid">
          <span>Feature</span><span>Tag</span><span>Note</span><span>Screen</span><span />
        </div>
        {list.map((n) => (
          <div key={n.id} className="border-b border-[#EEF0F6] last:border-0">
            <div className="grid grid-cols-1 gap-1 px-4 py-3 md:grid-cols-[70px_110px_1fr_170px_120px] md:items-center md:gap-3">
              <span className="text-[13px] font-semibold text-[#6A6F85]">{n.feature}</span>
              <span><TagPill tag={n.tag} small /></span>
              <button type="button" onClick={() => setOpen(open === n.id ? null : n.id)} className="text-left text-[15px] font-medium hover:text-[#3B4CCA]">
                {n.title} {n.hypothesis && <span className="text-[12px] font-medium text-[#9A6A00]">· hypothesis</span>}
              </button>
              <span className="text-[13px] text-[#4A4F66]">{n.screen === 'INDEX' ? 'Index only' : screenById(n.screen).label}</span>
              {n.screen !== 'INDEX' ? (
                <button type="button" onClick={() => openNote(n.id)} className="justify-self-start text-[13px] font-semibold text-[#3B4CCA] hover:underline md:justify-self-end">Open on screen →</button>
              ) : <span />}
            </div>
            {open === n.id && (
              <div className="bg-[#F6F7FB] px-4 pb-4">
                <NoteCard note={n} expanded onToggle={() => setOpen(null)} onRelated={openNote} />
              </div>
            )}
          </div>
        ))}
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-[20px] font-bold">Metrics</h2>
          <p className="mt-1 text-[14px] text-[#4A4F66]">Hypotheses, not promises. Targets are set against SuperLiving's own baselines.</p>
          <table className="mt-3 w-full overflow-hidden rounded-xl border border-[#E3E5EE] bg-white text-left text-[14px]">
            <thead className="bg-[#F6F7FB] text-[12px] uppercase tracking-[0.06em] text-[#6A6F85]"><tr><th className="px-3 py-2">Metric</th><th className="px-3 py-2">Type</th><th className="px-3 py-2">Features</th></tr></thead>
            <tbody>
              {metrics.leading.map((m) => <tr key={m.name} className="border-t border-[#EEF0F6]"><td className="px-3 py-2">{m.name}</td><td className="px-3 py-2 text-[#4A4F66]">Leading</td><td className="px-3 py-2 text-[#4A4F66]">{m.where}</td></tr>)}
              {metrics.lagging.map((m) => <tr key={m.name} className="border-t border-[#EEF0F6]"><td className="px-3 py-2">{m.name}</td><td className="px-3 py-2 text-[#4A4F66]">Lagging</td><td className="px-3 py-2 text-[#4A4F66]">{m.where}</td></tr>)}
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="text-[20px] font-bold">What we did not change</h2>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {unchanged.map((u) => <li key={u} className="rounded-lg border border-[#E3E5EE] bg-white px-3 py-2 text-[14px]">{u}</li>)}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-[20px] font-bold">Human in the loop</h2>
        <p className="mt-1 text-[14px] text-[#4A4F66]">AI is labelled as AI. No diagnosis or dosing. Sensitive items are private by default and any memory can be forgotten. Notification previews are neutral. Under-18s need guardian consent. Body-image AI is opt-in and 18+.</p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-[#E3E5EE] bg-white">
          <table className="w-full min-w-[640px] text-left text-[14px]">
            <thead className="bg-[#F6F7FB] text-[12px] uppercase tracking-[0.06em] text-[#6A6F85]"><tr><th className="px-3 py-2">Trigger</th><th className="px-3 py-2">Who steps in</th><th className="px-3 py-2">What the user sees</th><th className="px-3 py-2">Screen</th></tr></thead>
            <tbody>{hitl.map((h) => <tr key={h.trigger} className="border-t border-[#EEF0F6]"><td className="px-3 py-2">{h.trigger}</td><td className="px-3 py-2">{h.who}</td><td className="px-3 py-2">{h.sees}</td><td className="px-3 py-2 text-[#4A4F66]">{h.screen}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-[20px] font-bold">Sources</h2>
        <ul className="mt-3 space-y-2 text-[14px]">
          {usedSources.map((id) => {
            const s = sources[id];
            return (
              <li key={id} className="rounded-lg border border-[#E3E5EE] bg-white px-3 py-2">
                <span className="font-semibold">{id}</span> — {s.label}{' '}
                {s.link ? (
                  <a href={s.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 font-medium text-[#3B4CCA] hover:underline">link <ExternalLink size={12} /></a>
                ) : (
                  <span className="text-[#8A8FA6]">({s.status})</span>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
