import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { noteById, tagColor, type ProductNote, type Tag } from '../data/notes';
import { sources } from '../data/sources';

export function TagPill({ tag, small = false }: { tag: Tag; small?: boolean }) {
  const roadmap = tag === 'Roadmap';
  const unchanged = tag === 'Unchanged';
  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold tracking-wide ${small ? 'px-1.5 py-[1px] text-[10px]' : 'px-2 py-[2px] text-[11px]'}`}
      style={
        roadmap
          ? { border: '1.5px dashed #3B4CCA', color: '#3B4CCA', background: '#fff' }
          : unchanged
            ? { border: '1px solid #B5B5B5', color: '#6B6B6B', background: '#fff' }
            : { background: tagColor[tag], color: '#fff' }
      }
    >
      {roadmap ? 'Roadmap · not live' : tag}
    </span>
  );
}

/** Splits "text [source]" into text + source chip. */
function Evidence({ text }: { text: string }) {
  const m = text.match(/^(.*)\s\[(\w+)\]\.?$/);
  const body = m ? m[1] : text;
  const src = m ? sources[m[2] as keyof typeof sources] : undefined;
  return (
    <li className="leading-snug">
      {body}{' '}
      {src && (
        <span className="whitespace-nowrap text-[12px] text-[#5A5F7A]">
          [{src.link ? (
            <a href={src.link} target="_blank" rel="noreferrer" className="underline decoration-dotted underline-offset-2 hover:text-[#3B4CCA]">
              {src.id}
            </a>
          ) : (
            src.id
          )}]
        </span>
      )}
    </li>
  );
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mt-2.5">
    <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6A6F85]">{label}</div>
    <div className="mt-0.5 text-[14px] leading-[1.45] text-[#1E2233]">{children}</div>
  </div>
);

export function NoteCard({
  note,
  number,
  expanded,
  onToggle,
  onRelated,
  onDemo,
}: {
  note: ProductNote;
  number?: number;
  expanded: boolean;
  onToggle: () => void;
  onRelated: (id: string) => void;
  onDemo?: (a: NonNullable<ProductNote['demo']>[number]['action']) => void;
}) {
  const [showEv, setShowEv] = useState(false);
  return (
    <article
      className={`rounded-xl border bg-white transition-shadow ${expanded ? 'border-[#3B4CCA] shadow-[0_2px_12px_rgba(59,76,202,0.12)]' : 'border-[#E3E5EE]'}`}
    >
      <button type="button" onClick={onToggle} className="flex w-full items-start gap-2.5 p-3 text-left" aria-expanded={expanded}>
        {number !== undefined && (
          <span
            className="mt-[1px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[12px] font-bold"
            style={note.tag === 'Roadmap' ? { border: '1.5px dashed #3B4CCA', color: '#3B4CCA' } : { background: '#3B4CCA', color: '#fff' }}
          >
            {number}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-1.5">
            <TagPill tag={note.tag} small />
            <span className="text-[11px] font-medium text-[#8A8FA6]">{note.feature}</span>
            {note.hypothesis && <span className="text-[11px] font-medium text-[#9A6A00]">Hypothesis</span>}
          </span>
          <span className="mt-1 block text-[15px] font-semibold leading-snug text-[#141826]">{note.title}</span>
        </span>
        <ChevronDown size={18} className={`mt-1 shrink-0 text-[#8A8FA6] transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && (
        <div className="border-t border-[#EEF0F6] px-3 pb-3 pt-1">
          <Field label="What we saw">{note.saw}</Field>
          <Field label="What changed">{note.changed}</Field>
          <Field label="Why">{note.why}</Field>
          <Field label="What stays">{note.stays}</Field>
          <Field label="How we'd measure it">
            <span className="block">{note.measure.primary}</span>
            {note.measure.guardrail && <span className="mt-0.5 block text-[#5A5F7A]">Guardrail: {note.measure.guardrail}</span>}
          </Field>
          {note.safety && <Field label="Safety rule">{note.safety}</Field>}
          {note.hypothesis && (
            <p className="mt-2.5 rounded-lg bg-[#FFF7E0] px-2.5 py-1.5 text-[13px] text-[#6B4E00]">
              Hypothesis: the benefit is unproven. Targets get set against SuperLiving's own baselines.
            </p>
          )}
          {note.demo && onDemo && (
            <div className="mt-3 flex flex-wrap gap-2">
              {note.demo.map((d) => (
                <button key={d.label} type="button" onClick={() => onDemo(d.action)} className="rounded-lg bg-[#3B4CCA] px-3 py-2 text-[13px] font-semibold text-white hover:bg-[#2F3DA8]">
                  {d.label}
                </button>
              ))}
            </div>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
            <button type="button" onClick={() => setShowEv((v) => !v)} className="min-h-[32px] text-[13px] font-semibold text-[#3B4CCA] hover:underline">
              {showEv ? 'Hide evidence' : `Show evidence (${note.evidence.length})`}
            </button>
          </div>
          {showEv && (
            <div className="mt-1 rounded-lg bg-[#F6F7FB] p-2.5">
              <ul className="list-disc space-y-1.5 pl-4 text-[13px] text-[#1E2233]">
                {note.evidence.map((e) => (
                  <Evidence key={e} text={e} />
                ))}
              </ul>
              <div className="mt-2.5 border-t border-[#E3E5EE] pt-2">
                <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6A6F85]">Sources</div>
                <ul className="mt-1 space-y-1 text-[12px] text-[#3A3F55]">
                  {note.sources.map((s) => {
                    const src = sources[s];
                    return (
                      <li key={s}>
                        <span className="font-semibold">{s}</span> — {src.label}{' '}
                        {src.link ? (
                          <a href={src.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 text-[#3B4CCA] hover:underline">
                            link <ExternalLink size={11} />
                          </a>
                        ) : (
                          <span className="text-[#8A8FA6]">({src.status})</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
          {note.related && note.related.length > 0 && (
            <div className="mt-2.5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6A6F85]">Related</div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {note.related.map((r) => {
                  const rn = noteById(r);
                  if (!rn) return null;
                  return (
                    <button key={r} type="button" onClick={() => onRelated(r)} className="rounded-md border border-[#D9DCEA] bg-white px-2 py-1 text-[12px] text-[#2A2F45] hover:border-[#3B4CCA] hover:text-[#3B4CCA]">
                      {rn.feature} · {rn.title}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
