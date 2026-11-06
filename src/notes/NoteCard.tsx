import { ChevronDown, ShieldCheck, FlaskConical } from 'lucide-react';
import { tagStyle, type ProductNote, type Tag } from '../data/notes';

export function TagPill({ tag, small = false }: { tag: Tag; small?: boolean }) {
  const s = tagStyle[tag];
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full font-semibold ${small ? 'px-2 py-[1px] text-[10.5px]' : 'px-2.5 py-[2px] text-[11.5px]'}`}
      style={{ background: s.bg, color: s.fg, border: s.border }}
    >
      {s.label ?? tag}
    </span>
  );
}

export function Pin({ n, roadmap = false }: { n: number; roadmap?: boolean }) {
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-green-900"
      style={roadmap ? { border: '1.5px dashed #38592D', background: '#FFFDF8' } : { background: '#E2C04C' }}
    >
      {n}
    </span>
  );
}

const Row = ({ label, children, strong = false }: { label: string; children: React.ReactNode; strong?: boolean }) => (
  <div className="grid grid-cols-[64px_1fr] gap-2 py-1">
    <span className="pt-[2px] text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8A877E]">{label}</span>
    <span className={`text-[13.5px] leading-[1.5] ${strong ? 'font-medium text-green-900' : 'text-[#5E5D58]'}`}>{children}</span>
  </div>
);

/** One change, readable at a glance: what it was, what it is now, why, how we'd know. */
export function NoteCard({
  note,
  number,
  expanded,
  onToggle,
  onDemo,
}: {
  note: ProductNote;
  number?: number;
  expanded: boolean;
  onToggle: () => void;
  onDemo?: (a: NonNullable<ProductNote['demo']>[number]['action']) => void;
}) {
  return (
    <article className={`overflow-hidden rounded-2xl border bg-card transition-shadow ${expanded ? 'border-[#D9C27A] shadow-[0_4px_16px_rgba(34,57,29,0.08)]' : 'border-[#E4DFCF]'}`}>
      <button type="button" onClick={onToggle} className="flex w-full items-start gap-2.5 px-3.5 pb-2.5 pt-3 text-left" aria-expanded={expanded}>
        {number !== undefined && <Pin n={number} roadmap={note.tag === 'Roadmap'} />}
        <span className="min-w-0 flex-1">
          <span className="block text-[14.5px] font-semibold leading-snug text-green-900">{note.title}</span>
          {!expanded && <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-[#5E5D58]">{note.now}</span>}
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1.5">
          <TagPill tag={note.tag} small />
          <ChevronDown size={16} className={`text-[#8A877E] transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </span>
      </button>
      {expanded && (
        <div className="border-t border-[#EFEADB] px-3.5 pb-3.5 pt-1.5">
          {note.before !== '—' && <Row label="Before">{note.before}</Row>}
          <Row label="Now" strong>{note.now}</Row>
          <Row label="Why">{note.why}</Row>
          {note.measure !== '—' && <Row label="Measure">{note.measure}</Row>}
          {note.safety && (
            <p className="mt-2 flex gap-2 rounded-xl bg-green-50 px-3 py-2 text-[12.5px] leading-snug text-green-900">
              <ShieldCheck size={15} className="mt-[1px] shrink-0 text-green-700" /> {note.safety}
            </p>
          )}
          {note.hypothesis && (
            <p className="mt-2 flex gap-2 rounded-xl bg-gold-bg px-3 py-2 text-[12.5px] leading-snug text-[#6B5208]">
              <FlaskConical size={15} className="mt-[1px] shrink-0" /> A hypothesis to test against SuperLiving’s own numbers.
            </p>
          )}
          {note.demo && onDemo && (
            <div className="mt-2.5 flex flex-wrap gap-2">
              {note.demo.map((d) => (
                <button key={d.label} type="button" onClick={() => onDemo(d.action)} className="h-9 rounded-full bg-green-900 px-4 text-[13px] font-semibold text-[#F1EFE7] hover:bg-green-700">
                  {d.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
