import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { X, FileText, Copy, Share2, CalendarClock, Clock, BadgeCheck, ChevronDown } from 'lucide-react';
import { useAction, useDemo, wait } from '../app/DemoContext';
import { report, reportFileName } from '../data/report';
import { Anchor } from '../notes/Anchor';
import { CenterModal, Sheet, SheetClose, Toast } from './ui';

type Stage = 'pick' | 'uploading' | 'reading' | 'done';

/** F4 — upload modal in the app's own style (refs 05–06) with visible progress. */
export function UploadModal({ open, onClose, onDone, autoStart = 0 }: { open: boolean; onClose: () => void; onDone: () => void; autoStart?: number }) {
  const { t, state } = useDemo();
  const [stage, setStage] = useState<Stage>('pick');
  const [pct, setPct] = useState(0);
  const timer = useRef<number | null>(null);
  const cancelled = useRef(false);

  useEffect(() => {
    if (open) {
      setStage('pick');
      setPct(0);
      cancelled.current = false;
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [open]);

  const start = () => {
    cancelled.current = false;
    setStage('uploading'); // progress visible immediately (<300ms)
    setPct(3);
    let p = 3;
    timer.current = window.setInterval(async () => {
      p = Math.min(100, p + 7 + Math.round(Math.random() * 5));
      setPct(p);
      if (p >= 100 && timer.current) {
        clearInterval(timer.current);
        timer.current = null;
        setStage('reading');
        await wait(2600);
        if (cancelled.current) return;
        setStage('done');
        await wait(800);
        if (!cancelled.current) onDone();
      }
    }, 140);
  };

  useEffect(() => {
    if (autoStart && open && stage === 'pick' && Date.now() - autoStart < 3000) {
      const id = window.setTimeout(start, 400);
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, open]);

  const cancel = () => {
    cancelled.current = true;
    if (timer.current) clearInterval(timer.current);
    onClose();
  };
  const female = state.persona === 'neha';

  return (
    <CenterModal open={open} onClose={cancel} label={t('uploadTitle')}>
      <button type="button" onClick={cancel} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center" aria-label={t('close')}>
        <X size={22} />
      </button>
      <h2 className="mt-4 text-[20px] font-semibold text-[#1D1D1B]">Upload for Analysis</h2>
      <p className="mt-1.5 text-[15px] leading-snug text-[#7A7A76]">Upload an image or PDF report — your digital companion will analyse it and provide personalised insights.</p>

      {stage === 'pick' ? (
        <button type="button" onClick={start} className="mt-5 flex w-full items-center gap-3 rounded-[18px] border border-dashed border-[#BDBDBD] bg-[#F6F6F6] p-4 text-left">
          <span className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-[#FDE7E6] text-[#D93025]"><FileText size={26} /></span>
          <span>
            <span className="block text-[16px] font-semibold text-[#1D1D1B]">{t('pickFile')}</span>
            <span className="block text-[13px] text-[#7A7A76]">{reportFileName} · {report.sizeMB} MB · {report.pages} pages</span>
          </span>
        </button>
      ) : (
        <Anchor id="rep-progress" className="mt-5">
          <div className="rounded-[18px] border border-[#E2E2E2] bg-[#F6F6F6] p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-[#FDE7E6] text-[#D93025]"><FileText size={26} /></span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[16px] font-semibold text-[#1D1D1B]">{reportFileName}</div>
                <div className="text-[13px] text-[#7A7A76]">{report.sizeMB} MB · {report.pages} pages</div>
              </div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E3E3E3]">
              <div className={`h-full rounded-full bg-green-700 transition-all ${stage === 'reading' ? 'shimmer !bg-green-600' : ''}`} style={{ width: `${stage === 'uploading' ? pct : 100}%` }} />
            </div>
            <div className="mt-2 text-[14px] font-medium text-green-700" role="status" aria-live="polite">
              {stage === 'uploading' && t('upUploading', { pct })}
              {stage === 'reading' && t('upReading')}
              {stage === 'done' && t('upDone')}
            </div>
          </div>
        </Anchor>
      )}

      <div className="mt-4 h-[52px] rounded-[14px] border border-[#BDBDBD] px-4 text-[15px] leading-[52px] text-[#A3A3A3]">Add context or questions (optional)</div>
      {stage !== 'pick' && <p className="mt-3 text-[14px] text-text-secondary">{female ? t('upContinue') : t('upContinueM')}</p>}
      <div className="mt-3 flex gap-2">
        {stage !== 'pick' && stage !== 'done' && (
          <button type="button" onClick={cancel} className="h-12 flex-1 rounded-[14px] border border-[#CFCFCF] text-[16px] font-semibold text-[#333]">{t('cancel')}</button>
        )}
        {stage === 'pick' && (
          <button type="button" onClick={start} className="h-12 flex-1 rounded-[14px] bg-green-700 text-[16px] font-semibold text-white">{t('upStart')}</button>
        )}
      </div>
    </CenterModal>
  );
}

const statusChip = (s: string, t: (k: string) => string) => {
  const map: Record<string, [string, string, string]> = {
    low: [t('stLow'), '#FDECEC', '#B42318'],
    watch: [t('stWatch'), '#FFF4E0', '#9A5B00'],
    ok: [t('stOk'), '#E8F5E9', '#2E6B2F'],
  };
  const [l, bg, fg] = map[s];
  return <span className="shrink-0 rounded-full px-2.5 py-[3px] text-[12.5px] font-semibold" style={{ background: bg, color: fg }}>{l}</span>;
};

/** F4 — free first read: 3 priorities, doctor questions, one swap, retest, human review. */
export function NextStepsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, set, t } = useDemo();
  const [more, setMore] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const flash = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 2000);
  };
  const [b12, vitd, hba1c, hb, tsh] = report.values;

  useAction('report-review', async () => {
    await wait(500);
    reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    await wait(1100);
    set({ report: 'reviewed' });
  });

  const rows = [
    { v: b12, range: `range ${b12.range}`, todo: t('repB12Do'), food: t('repB12Food') },
    { v: vitd, range: t('repVitDRange'), todo: t('repVitDDo'), food: t('repVitDFood') },
    { v: hba1c, range: t('repHbRange'), todo: t('repHbA1cDo') },
  ];

  return (
    <Sheet open={open} onClose={onClose} label={t('repTitle')} full z={95}>
      <div className="px-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[12.5px] text-text-secondary">{report.lab} · {report.date}</div>
            <h2 className="text-[21px] font-semibold leading-snug text-text-primary">{t('repTitle')}</h2>
          </div>
          <SheetClose onClick={onClose} label={t('close')} />
        </div>

        <div ref={reviewRef}>
          <Anchor id="rep-review" className="mt-3">
            {state.report === 'reviewed' ? (
              <div className="rounded-[16px] border border-[#BFE0C0] bg-green-50 p-3">
                <div className="flex items-center gap-2 text-[15px] font-semibold text-green-700"><BadgeCheck size={18} /> {t('repReviewed', { who: report.reviewer })}</div>
                <p className="mt-1 text-[14px] leading-snug text-text-primary">“{t('repReviewComment')}”</p>
              </div>
            ) : (
              <button type="button" onClick={() => set({ report: 'reviewed' })} className="flex w-full items-center gap-2 rounded-[16px] border border-[#F0D9A6] bg-[#FFF8E6] p-3 text-left">
                <Clock size={18} className="shrink-0 text-[#9A6A00]" />
                <span className="text-[14.5px] font-medium text-[#6B4E00]">{t('repInReview')}</span>
              </button>
            )}
          </Anchor>
        </div>

        <Anchor id="rep-card" className="mt-3">
          <div className="space-y-2.5">
            {rows.map(({ v, range, todo, food }, i) => (
              <motion.div key={v.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.15, type: 'spring', stiffness: 260, damping: 24 }} className="rounded-[18px] border border-[#E6E1D1] bg-white p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[16px] font-semibold text-text-primary">{v.name}</div>
                    <div className="text-[13.5px] text-text-secondary">{v.value} {v.unit} · {range}</div>
                  </div>
                  {statusChip(v.status, t)}
                </div>
                <div className="mt-2 text-[14.5px] leading-snug text-text-primary">→ {todo}</div>
                {food && <div className="mt-1 text-[14px] text-green-700">🥗 {food}</div>}
              </motion.div>
            ))}
          </div>
        </Anchor>

        <button type="button" onClick={() => setMore((m) => !m)} className="mt-2 flex min-h-[44px] items-center gap-1 text-[14.5px] font-medium text-green-700">
          {t('repMore')} <ChevronDown size={16} className={more ? 'rotate-180' : ''} />
        </button>
        {more && (
          <div className="space-y-2">
            {[hb, tsh].map((v) => (
              <div key={v.name} className="flex items-center justify-between rounded-[14px] border border-[#EEE9DA] bg-white px-3.5 py-2.5">
                <div>
                  <div className="text-[15px] font-medium">{v.name}</div>
                  <div className="text-[13px] text-text-secondary">{v.value} {v.unit} · range {v.range}</div>
                </div>
                {statusChip(v.status, t)}
              </div>
            ))}
          </div>
        )}

        <section className="mt-4 rounded-[18px] border border-[#E6E1D1] bg-white p-3.5">
          <h3 className="text-[16px] font-semibold">{t('repDocQ')}</h3>
          <ol className="mt-1.5 list-decimal space-y-1 pl-5 text-[14.5px] leading-snug text-text-primary">
            <li>{t('repQ1')}</li>
            <li>{t('repQ2')}</li>
            <li>{t('repQ3')}</li>
          </ol>
          <div className="mt-2.5 flex gap-2">
            <button type="button" onClick={() => flash(t('copied'))} className="flex h-10 items-center gap-1.5 rounded-full border border-[#CFD8C6] px-3.5 text-[14px] font-medium text-green-700"><Copy size={15} /> {t('copy')}</button>
            <button type="button" onClick={() => flash(t('demoOnly'))} className="flex h-10 items-center gap-1.5 rounded-full border border-[#CFD8C6] px-3.5 text-[14px] font-medium text-green-700"><Share2 size={15} /> {t('share')}</button>
          </div>
        </section>

        <section className="mt-3 rounded-[18px] bg-green-50 p-3.5">
          <h3 className="text-[16px] font-semibold text-green-700">{t('repWeek')}</h3>
          <p className="mt-1 text-[15px] text-text-primary">{t('repSwap')}</p>
          <button
            type="button"
            onClick={() => {
              set((s) => ({ stepIndex: { ...s.stepIndex, neha: 1 } }));
              flash(t('repSwapAdded'));
            }}
            className="mt-2 h-10 rounded-full bg-green-700 px-4 text-[14px] font-semibold text-white"
          >
            {t('repSwapCta')}
          </button>
        </section>

        <Anchor id="rep-retest" className="mt-3">
          <section className="flex items-center gap-3 rounded-[18px] border border-[#E6E1D1] bg-white p-3.5">
            <CalendarClock size={22} className="shrink-0 text-green-700" />
            <div className="flex-1">
              <div className="text-[15.5px] font-semibold">{t('repRetest')}</div>
              <div className="text-[13px] text-text-secondary">{t('repRetestSub')}</div>
            </div>
            <label className="flex h-11 items-center">
              <span className="sr-only">{t('repRetest')}</span>
              <input type="checkbox" checked={state.retestReminder} onChange={(e) => set({ retestReminder: e.target.checked })} className="h-5 w-5 accent-[#38592D]" />
            </label>
          </section>
        </Anchor>

        <p className="mt-4 rounded-[14px] bg-[#F4F1E6] p-3 text-[13.5px] leading-snug text-text-primary">{t('repFooter')}</p>
      </div>
      <Toast show={!!toast}>{toast}</Toast>
    </Sheet>
  );
}
