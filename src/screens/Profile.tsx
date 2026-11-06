import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, MoreVertical, Pencil, ShoppingCart, Instagram, Headset, ChevronRight, Award, Wallet, Languages, Star, ShieldAlert, FileText, RotateCcw, BellRing, IdCard } from 'lucide-react';
import { useAction, useDemo } from '../app/DemoContext';
import { neha, rohit } from '../data/personas';
import { Anchor } from '../notes/Anchor';
import { Face, Sheet, SheetClose } from '../components/ui';
import { PriceSheet } from '../components/PriceSheet';
import { MeSheet } from '../components/MeSheet';
import type { DemoState } from '../app/DemoContext';

/** S12 — Profile (ref 22) with F7 check-ins, F1 entry and F9d price card. */
export function Profile() {
  const { state, t } = useDemo();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [checkins, setCheckins] = useState(false);
  const [price, setPrice] = useState<false | 'free' | 'sub'>(false);
  const [me, setMe] = useState(false);
  const p = state.persona === 'rohit' ? rohit : neha;

  useEffect(() => {
    if (params.get('open') === 'checkins') setCheckins(true);
  }, [params]);
  useAction('open-checkins', () => setCheckins(true));
  useAction('open-price', () => setPrice('free'));
  useAction('open-price-subscriber', () => {
    setCheckins(false);
    setPrice('sub');
  });

  const Row = ({ icon, label, value, onClick, anchor }: { icon: React.ReactNode; label: string; value?: string; onClick?: () => void; anchor?: string }) => {
    const r = (
      <button type="button" onClick={onClick} className="flex min-h-[64px] w-full items-center gap-4 border-b border-[#ECECEC] text-left">
        <span className="w-6 text-green-900">{icon}</span>
        <span className="flex-1 text-[16.5px] text-[#2B2B2B]">{label}</span>
        {value && <span className="text-[15px] text-[#3B3B3B]">{value}</span>}
        <ChevronRight size={20} className="text-[#4CAF50]" />
      </button>
    );
    return anchor ? <Anchor id={anchor}>{r}</Anchor> : r;
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <header className="relative z-10 flex items-center justify-between bg-green-profile px-3 pb-4 text-white" style={{ paddingTop: 'calc(var(--sat) + 14px)' }}>
        <button type="button" onClick={() => navigate(-1)} className="flex h-11 w-11 items-center justify-center" aria-label="Back"><ChevronLeft size={28} /></button>
        <span className="text-[20px] font-medium">My Profile</span>
        <MoreVertical size={24} className="mr-2" />
      </header>
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-5 pb-10">
        <div className="mt-4 flex items-center gap-4">
          <Face spec={{ skin: '#E8B892', hair: '#1E1612', style: state.persona === 'rohit' ? 'short' : 'long', shirt: '#4A6E8A', bg: '#FFFFFF' }} className="h-[84px] w-[84px]" rounded />
          <div className="flex-1">
            <div className="text-[22px] font-bold text-green-700">{p.name.split(' ')[0]}</div>
            <div className="text-[15px] text-[#9A9A96]">{p.city} · Hinglish</div>
            <div className="text-[15px] text-[#9A9A96]">{state.persona === 'rohit' ? 'Male' : 'Female'}</div>
          </div>
          <Pencil size={22} className="text-[#3B3B3B]" />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            [<ShoppingCart key="a" size={24} />, 'My Purchases'],
            [<Instagram key="b" size={24} />, 'Follow us'],
            [<Headset key="c" size={24} />, 'Help & support'],
          ].map(([i, l]) => (
            <div key={l as string} className="flex h-[118px] flex-col items-center justify-center gap-2 rounded-[18px] border-[1.5px] border-[#A9D7A9] px-2 text-center text-[15px] text-[#1D1D1B]">
              <span className="text-green-900">{i}</span>
              {l}
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-[20px] bg-green-50 p-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#CDE6CF] text-[28px]" aria-hidden>🎁</span>
          <div className="flex-1">
            <div className="text-[16px] font-semibold text-[#2D4A27]">Refer a friend and get FREE PRO</div>
            <div className="text-[14px] text-[#6E6E6A]">Invite your friends</div>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-900 text-white"><ChevronRight size={18} /></span>
        </div>
        <div className="mt-3">
          <Row icon={<Award size={22} />} label="Pro membership" onClick={() => setPrice('free')} anchor="prof-pro" />
          <Row icon={<IdCard size={22} />} label={t('profMeCard')} onClick={() => setMe(true)} anchor="prof-me" />
          <Row icon={<Wallet size={22} />} label="My Rewards & Cashbacks" />
          <Row icon={<Languages size={22} />} label="Bhasha / Language" value={state.lang === 'hi' ? 'Hinglish' : 'English'} />
          <Row icon={<BellRing size={22} />} label={t('profCheckins')} onClick={() => setCheckins(true)} anchor="prof-checkins" />
          <Row icon={<Star size={22} />} label="Rate Your Experience" />
          <Row icon={<ShieldAlert size={22} />} label="Privacy policy" />
          <Row icon={<FileText size={22} />} label="Terms and Conditions" />
          <Row icon={<RotateCcw size={22} />} label="Refund Policy" />
        </div>
      </div>
      <CheckinsSheet open={checkins} onClose={() => setCheckins(false)} />
      <PriceSheet open={!!price} subscriber={price === 'sub'} onClose={() => setPrice(false)} />
      <MeSheet open={me} onClose={() => setMe(false)} />
    </div>
  );
}

/** F7 — channel, frequency, time, quiet hours, style, neutral preview. */
export function CheckinsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, set, t } = useDemo();
  const ck = state.checkins;
  const upd = (patch: Partial<DemoState['checkins']>) => set((s) => ({ checkins: { ...s.checkins, ...patch } }));
  const seg = <K extends keyof DemoState['checkins']>(k: K, opts: [DemoState['checkins'][K], string][]) => (
    <div className="mt-1.5 flex flex-wrap gap-2">
      {opts.map(([v, l]) => (
        <button key={String(v)} type="button" aria-pressed={ck[k] === v} onClick={() => upd({ [k]: v } as Partial<DemoState['checkins']>)} className={`min-h-[44px] rounded-full border-[1.5px] px-4 text-[14.5px] font-medium ${ck[k] === v ? 'border-green-700 bg-green-700 text-white' : 'border-[#D5D0C0] bg-white text-text-primary'}`}>
          {l}
        </button>
      ))}
    </div>
  );
  const preview = ck.neutral ? t('previewNeutral') : t('previewDetailed');
  return (
    <Sheet open={open} onClose={onClose} label={t('profCheckins')} full>
      <div className="px-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[22px] font-semibold">{t('profCheckins')}</h2>
            <p className="text-[14px] text-text-secondary">{t('ckSub')}</p>
          </div>
          <SheetClose onClick={onClose} label={t('close')} />
        </div>
        <div className="mt-4 space-y-4">
          <div><div className="text-[14px] font-semibold">{t('ckChannel')}</div>{seg('channel', [['whatsapp', 'WhatsApp'], ['app', 'App']])}</div>
          <div><div className="text-[14px] font-semibold">{t('ckFreq')}</div>{seg('freq', [['daily', t('freq_daily')], ['thrice', t('freq_thrice')], ['important', t('freq_important')]])}</div>
          <div>
            <div className="text-[14px] font-semibold">{t('ckTime')}</div>
            <label className="mt-1.5 flex min-h-[48px] items-center justify-between rounded-[14px] border border-[#D5D0C0] bg-white px-4">
              <span className="text-[15px]">{ck.time} · {t('ckChai')}</span>
              <input type="time" value={`0${ck.time}`.slice(-5)} onChange={(e) => upd({ time: e.target.value.replace(/^0/, '') })} className="h-10 rounded-lg bg-[#F4F1E6] px-2 text-[14px]" aria-label={t('ckTime')} />
            </label>
          </div>
          <div className="flex min-h-[48px] items-center justify-between rounded-[14px] bg-[#F4F1E6] px-4">
            <span className="text-[14.5px] font-medium">{t('ckQuiet')}</span>
            <span className="text-[14.5px]">10 pm – 7 am</span>
          </div>
          <div><div className="text-[14px] font-semibold">{t('ckStyle')}</div>{seg('style', [['hinglish', 'Hinglish'], ['hindi', t('styleHindi')], ['english', 'English']])}</div>
          <Anchor id="chk-preview">
            <div className="rounded-[18px] border border-[#E6E1D1] bg-white p-3.5">
              <label className="flex min-h-[44px] items-center justify-between gap-3">
                <span className="text-[15px] font-medium">{t('ckNeutral')}</span>
                <input type="checkbox" checked={ck.neutral} onChange={(e) => upd({ neutral: e.target.checked })} className="h-6 w-6 shrink-0 accent-[#38592D]" />
              </label>
              <div className="mt-2 text-[12.5px] font-medium text-text-secondary">{t('ckPreview')}</div>
              <div className="mt-1.5 rounded-[18px] bg-gradient-to-br from-[#5B6E8C] to-[#2E3A52] p-3">
                <div className="rounded-[14px] bg-white/85 p-3 backdrop-blur">
                  <div className="flex items-center justify-between text-[11.5px] text-[#555]">
                    <span className="font-semibold uppercase tracking-wide">{ck.channel === 'whatsapp' ? 'WhatsApp' : 'SuperLiving'}</span>
                    <span>{ck.time}</span>
                  </div>
                  <div className="mt-0.5 text-[14px] font-semibold text-[#111]">{ck.channel === 'whatsapp' ? 'Tara (SuperLiving)' : 'SuperLiving'}</div>
                  <div className="text-[14px] text-[#222]">{preview}</div>
                </div>
              </div>
            </div>
          </Anchor>
        </div>
      </div>
    </Sheet>
  );
}
