import { useState } from 'react';
import { Check, Minus, Bell, HelpCircle } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { Anchor } from '../notes/Anchor';
import { Sheet, SheetClose, Toast } from './ui';

/** F9d — one "Kya milta hai" card, opened from every Pro upsell. */
export function PriceSheet({ open, onClose, subscriber = false }: { open: boolean; onClose: () => void; subscriber?: boolean }) {
  const { t } = useDemo();
  const [cancelled, setCancelled] = useState(false);
  const [remind, setRemind] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const flash = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 2200);
  };

  const rows: { label: string; free: string | boolean; pro: string | boolean; sup: string | boolean }[] = [
    { label: t('rowStep'), free: true, pro: true, sup: true },
    { label: t('rowReport'), free: true, pro: true, sup: true },
    { label: t('rowChat'), free: t('rowChatFree'), pro: t('rowUnl'), sup: t('rowUnl') },
    { label: t('rowTv'), free: t('rowTvFree'), pro: t('rowAll'), sup: t('rowAll') },
    { label: t('rowLive'), free: false, pro: false, sup: true },
    { label: t('rowCourses'), free: t('rowCoursesExtra'), pro: t('rowCoursesExtra'), sup: t('rowCoursesIn') },
  ];
  const cell = (v: string | boolean) =>
    v === true ? <Check size={16} className="mx-auto text-green-600" aria-label="included" /> : v === false ? <Minus size={16} className="mx-auto text-[#C4C0B4]" aria-label="not included" /> : <span className="text-[11.5px] leading-tight">{v}</span>;

  return (
    <Sheet open={open} onClose={onClose} label={t('priceTitle')} full>
      <div className="px-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[22px] font-semibold text-text-primary">{t('priceTitle')}</h2>
            <p className="text-[14px] text-text-secondary">{t('priceSub')}</p>
          </div>
          <SheetClose onClick={onClose} label={t('close')} />
        </div>

        <div className="mt-3 overflow-hidden rounded-card border border-[#E4DFCF] bg-white">
          <div className="grid grid-cols-[1.25fr_1fr_1fr_1fr] border-b border-[#EFEBDD] bg-[#FAF8F1] text-center text-[12px]">
            <div />
            <div className="py-2">
              <div className="font-semibold">{t('planFree')}</div>
              <div className="text-text-secondary">₹0</div>
              {!subscriber && <div className="mx-auto mt-0.5 w-fit rounded-full bg-green-100 px-1.5 text-[10px] font-semibold text-green-600">{t('yourPlan')}</div>}
            </div>
            <div className={`py-2 ${subscriber ? 'bg-green-50' : ''}`}>
              <div className="font-semibold">{t('planPro')}</div>
              <div className="text-text-secondary">₹199{t('perMonth')}</div>
              {subscriber && <div className="mx-auto mt-0.5 w-fit rounded-full bg-green-100 px-1.5 text-[10px] font-semibold text-green-600">{t('yourPlan')}</div>}
            </div>
            <div className="bg-gold-bg py-2">
              <div className="font-semibold">{t('planSuper')}</div>
              <div className="text-text-secondary">₹349{t('perMonth')}</div>
            </div>
          </div>
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-[1.25fr_1fr_1fr_1fr] items-center border-b border-[#F3F0E6] text-center last:border-0">
              <div className="px-2.5 py-2 text-left text-[13px] font-medium text-text-primary">{r.label}</div>
              <div className="px-1 py-2">{cell(r.free)}</div>
              <div className={`px-1 py-2 ${subscriber ? 'bg-green-50/60' : ''}`}>{cell(r.pro)}</div>
              <div className="bg-gold-bg/60 px-1 py-2">{cell(r.sup)}</div>
            </div>
          ))}
        </div>

        {subscriber ? (
          <Anchor id="price-cancel" className="mt-3">
            <div className="rounded-card border border-[#E4DFCF] bg-white p-4">
              <div className="text-[13px] font-semibold uppercase tracking-[0.06em] text-text-secondary">{t('yourPlan')}</div>
              <div className="mt-0.5 text-[18px] font-semibold">{t('subPlan')}</div>
              {!cancelled ? (
                <>
                  <div className="mt-1 text-[14px] text-text-primary">{t('subRenews')}</div>
                  <label className="mt-2 flex min-h-[44px] items-center justify-between gap-3 rounded-xl bg-[#F7F5EE] px-3">
                    <span className="flex items-center gap-2 text-[14px]"><Bell size={16} className="text-green-700" /> {t('subRemind')}</span>
                    <input type="checkbox" checked={remind} onChange={(e) => setRemind(e.target.checked)} className="h-5 w-5 accent-[#38592D]" />
                  </label>
                  <button type="button" onClick={() => setCancelled(true)} className="mt-3 h-11 w-full rounded-full border border-[#CFC9B6] text-[15px] font-semibold text-text-primary">
                    {t('subCancel')}
                  </button>
                </>
              ) : (
                <>
                  <p className="mt-2 rounded-xl bg-green-50 p-3 text-[14px] text-text-primary">{t('subCancelled')}</p>
                  <button type="button" onClick={() => setCancelled(false)} className="mt-2 h-11 w-full rounded-full border border-[#CFC9B6] text-[15px] font-medium">
                    {t('subResume')}
                  </button>
                </>
              )}
            </div>
          </Anchor>
        ) : (
          <div className="mt-3 rounded-card border border-[#E4DFCF] bg-white p-4">
            <div className="text-[15px] font-semibold">{t('priceRenewTitle')}</div>
            <p className="mt-1 text-[14px] text-text-primary">{t('priceRenew')}</p>
            <p className="mt-1 text-[14px] text-text-primary">{t('priceCancelWhere')}</p>
          </div>
        )}

        <button type="button" onClick={() => flash(t('helpSent'))} className="mt-3 flex min-h-[44px] items-center gap-2 text-[14px] font-medium text-green-700">
          <HelpCircle size={17} /> {t('priceHelp')}
        </button>

        {!subscriber && (
          <div className="mt-2 space-y-2">
            <button type="button" onClick={() => flash(t('demoOnly'))} className="h-12 w-full rounded-full bg-green-700 text-[16px] font-semibold text-white">
              {t('priceBuyPro')}
            </button>
            <button type="button" onClick={() => flash(t('demoOnly'))} className="h-12 w-full rounded-full border-[1.5px] border-gold-border bg-gold-bg text-[16px] font-semibold text-text-primary">
              {t('priceBuySuper')}
            </button>
          </div>
        )}
      </div>
      <Toast show={!!toast}>{toast}</Toast>
    </Sheet>
  );
}
