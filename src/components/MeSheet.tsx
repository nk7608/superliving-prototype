import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Pencil, Trash2, UserPlus, ChevronRight, Undo2 } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { memoryFor, type MemSection } from '../data/memory';
import { Anchor } from '../notes/Anchor';
import { Sheet, SheetClose } from './ui';

const sections: { id: MemSection | 'checkins' | 'family'; key: string }[] = [
  { id: 'basics', key: 'meBasics' },
  { id: 'kitchen', key: 'meKitchen' },
  { id: 'routine', key: 'meRoutine' },
  { id: 'goals', key: 'meGoals' },
  { id: 'reports', key: 'meReports' },
  { id: 'private', key: 'mePrivate' },
  { id: 'checkins', key: 'meCheckins' },
  { id: 'family', key: 'meFamily' },
];

/** F1 — the shared memory every coach reads. */
export function MeSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, set, t } = useDemo();
  const navigate = useNavigate();
  const items = memoryFor(state);
  const lang = state.lang;
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [lastForgot, setLastForgot] = useState<string | null>(null);
  let firstRow = true;

  const forget = (id: string) => {
    set((s) => ({ forgotten: [...s.forgotten, id] }));
    setLastForgot(id);
  };
  const ck = state.checkins;

  return (
    <Sheet open={open} onClose={onClose} label={t('meTitle')} full>
      <div className="px-4">
        <div className="flex items-start justify-between gap-3">
          <Anchor id="me-header" className="min-w-0 flex-1 pr-2">
            <h2 className="text-[22px] font-semibold text-text-primary">{t('meTitle')}</h2>
            <p className="mt-0.5 text-[14px] leading-snug text-text-secondary">{state.persona === 'rohit' ? t('meSubRohit') : t('meSub')}</p>
          </Anchor>
          <SheetClose onClick={onClose} label={t('close')} />
        </div>

        {lastForgot && (
          <div className="mt-3 flex items-center justify-between gap-2 rounded-2xl bg-[#1F2A1B] px-3.5 py-2.5 text-[14px] text-white" role="status">
            <span>{t('meForgot')}</span>
            <button
              type="button"
              onClick={() => {
                set((s) => ({ forgotten: s.forgotten.filter((x) => x !== lastForgot) }));
                setLastForgot(null);
              }}
              className="flex h-9 items-center gap-1 rounded-full bg-white/15 px-3 font-semibold"
            >
              <Undo2 size={14} /> {t('meUndo')}
            </button>
          </div>
        )}

        <div className="mt-3 space-y-4 pb-4">
          {sections.map((sec) => {
            const rows = items.filter((i) => i.section === sec.id);
            if (sec.id === 'private') {
              return (
                <Anchor key={sec.id} id="me-private">
                  <section>
                    <h3 className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-text-secondary">{t(sec.key)} <Lock size={13} /></h3>
                    <div className="mt-1.5 rounded-[18px] border border-dashed border-[#D9D3BF] bg-white px-4 py-3">
                      <p className="text-[15px] text-text-primary">{t('mePrivateEmpty')}</p>
                      <p className="mt-1 text-[13px] leading-snug text-text-secondary">{t('mePrivateRule')}</p>
                    </div>
                  </section>
                </Anchor>
              );
            }
            if (sec.id === 'checkins') {
              return (
                <section key={sec.id}>
                  <h3 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-text-secondary">{t(sec.key)}</h3>
                  <button type="button" onClick={() => navigate('/profile?open=checkins')} className="mt-1.5 flex w-full items-center justify-between rounded-[18px] border border-[#E6E1D1] bg-white px-4 py-3 text-left">
                    <span className="text-[15px] text-text-primary">
                      {ck.channel === 'whatsapp' ? 'WhatsApp' : 'App'} · {t(`freq_${ck.freq}`)} · {ck.time} · {ck.neutral ? t('meNeutral') : t('meDetailed')}
                    </span>
                    <ChevronRight size={18} className="text-green-700" />
                  </button>
                </section>
              );
            }
            if (sec.id === 'family') {
              if (state.persona === 'rohit') return null;
              return (
                <Anchor key={sec.id} id="me-family">
                  <section>
                    <h3 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-text-secondary">{t(sec.key)}</h3>
                    <div className="mt-1.5 rounded-[18px] border border-[#E6E1D1] bg-white">
                      {state.invited && (
                        <div className="flex items-center justify-between border-b border-[#F0ECE0] px-4 py-3">
                          <div>
                            <div className="text-[15px] font-semibold">Rohit</div>
                            <div className="text-[13px] text-text-secondary">{t('meRohitShares')}</div>
                          </div>
                          {state.rohitShares && state.today.rohit === 'done' && <span className="text-[13px] font-medium text-green-600">{t('rohitDidStep')}</span>}
                        </div>
                      )}
                      <button type="button" onClick={() => navigate('/invite')} className="flex min-h-[52px] w-full items-center gap-2 px-4 text-[15px] font-semibold text-green-700">
                        <UserPlus size={18} /> {state.invited ? t('meInviteAgain') : t('meInvite')}
                      </button>
                    </div>
                  </section>
                </Anchor>
              );
            }
            if (rows.length === 0 && sec.id === 'reports') {
              return (
                <section key={sec.id}>
                  <h3 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-text-secondary">{t(sec.key)}</h3>
                  <button type="button" onClick={() => navigate('/report')} className="mt-1.5 w-full rounded-[18px] border border-dashed border-[#D9D3BF] bg-white px-4 py-3 text-left text-[15px] text-green-700">
                    {t('meNoReport')}
                  </button>
                </section>
              );
            }
            if (rows.length === 0) return null;
            return (
              <section key={sec.id}>
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-text-secondary">{t(sec.key)}</h3>
                <div className="mt-1.5 divide-y divide-[#F0ECE0] rounded-[18px] border border-[#E6E1D1] bg-white">
                  {rows.map((r) => {
                    const val = state.edits[r.id] ?? r.value[lang];
                    const src = (
                      <span className="rounded-full bg-[#F1EFE7] px-2 py-[2px] text-[11.5px] text-[#6A6A64]">{r.source[lang]}</span>
                    );
                    const isFirst = firstRow;
                    firstRow = false;
                    return (
                      <div key={r.id} className="px-4 py-3">
                        <div className="text-[12px] text-text-secondary">{r.label[lang]}</div>
                        {editing === r.id ? (
                          <form
                            className="mt-1 flex gap-2"
                            onSubmit={(e) => {
                              e.preventDefault();
                              set((s) => ({ edits: { ...s.edits, [r.id]: draft } }));
                              setEditing(null);
                            }}
                          >
                            <input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} className="h-10 min-w-0 flex-1 rounded-xl border border-[#D5D0C0] px-3 text-[15px]" aria-label={r.label[lang]} />
                            <button type="submit" className="h-10 rounded-full bg-green-700 px-3 text-[14px] font-semibold text-white">{t('save')}</button>
                          </form>
                        ) : (
                          <div className="text-[15.5px] font-medium leading-snug text-text-primary">{val}</div>
                        )}
                        {editing !== r.id && (
                          <div className="mt-1.5 flex flex-wrap items-center gap-x-1 gap-y-1">
                            {isFirst ? <Anchor id="me-source" className="inline-block pr-7" inset>{src}</Anchor> : src}
                            <span className="flex-1" />
                            <button type="button" onClick={() => { setEditing(r.id); setDraft(val); }} className="flex h-8 items-center gap-1 rounded-full px-2 text-[12.5px] font-medium text-green-700 hover:bg-green-50" aria-label={`${t('edit')} ${r.label[lang]}`}>
                              <Pencil size={13} /> {t('edit')}
                            </button>
                            <button type="button" onClick={() => forget(r.id)} className="flex h-8 items-center gap-1 rounded-full px-2 text-[12.5px] font-medium text-[#A04A2E] hover:bg-[#F8E3D8]" aria-label={`${t('meForget')} ${r.label[lang]}`}>
                              <Trash2 size={13} /> {t('meForget')}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
          {state.forgotten.length > 0 && (
            <p className="text-[12.5px] text-text-secondary">{t('meForgottenCount', { n: state.forgotten.length })}</p>
          )}
        </div>
      </div>
    </Sheet>
  );
}
