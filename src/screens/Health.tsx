import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Droplet, Utensils, PersonStanding, Plus, Sparkles, FileText, Upload, Camera, Lock, ArrowLeft, X, MapPin, Check, Circle } from 'lucide-react';
import { useAction, useDemo } from '../app/DemoContext';
import { Anchor } from '../notes/Anchor';
import { BottomNav, Sheet, PrimaryButton } from '../components/ui';
import { StepCard, StreakSheet } from '../components/StepCard';

export function Ring({ value, total, size = 46 }: { value: number; total: number; size?: number }) {
  const r = size / 2 - 4;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#E7E3D6" strokeWidth="4.5" fill="none" />
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#38592D" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeDasharray={`${(c * value) / total} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: 'stroke-dasharray .6s' }} />
    </svg>
  );
}

function Counter({ icon, val, total, unit, label, onAdd }: { icon: React.ReactNode; val: number; total: number; unit?: string; label: string; onAdd: () => void }) {
  return (
    <div className="relative flex flex-1 flex-col items-center rounded-[18px] border border-[#E6E1D1] bg-[#FAF8F1] px-2 pb-3 pt-3">
      <button type="button" onClick={onAdd} aria-label={`Add ${label}`} className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-900 text-white after:absolute after:-inset-1.5 after:content-['']">
        <Plus size={18} />
      </button>
      <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#EAEDE2] text-green-800">{icon}</span>
      <div className="mt-2 text-[20px] font-bold text-text-primary">
        {val}
        <span className="text-[14px] font-semibold text-text-secondary">/{total}{unit ? ` ${unit}` : ''}</span>
      </div>
      <div className="text-[14px] font-semibold text-[#5A5A55]">{label}</div>
      <div className="mt-2 h-[5px] w-[85%] overflow-hidden rounded-full bg-[#E6E2D6]">
        <div className="h-full rounded-full bg-green-700" style={{ width: `${Math.min(100, (val / total) * 100)}%` }} />
      </div>
    </div>
  );
}

function Tool({ emoji, name, cta, gold = false, onClick, tint }: { emoji: string; name: string; cta: string; gold?: boolean; onClick?: () => void; tint: string }) {
  return (
    <div className={`flex flex-col rounded-[18px] border p-3 ${gold ? 'border-[#E8C866] bg-gradient-to-br from-[#FFF6DD] to-[#F6E2A6]' : 'border-[#E6E1D1] bg-card'}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-[10px] text-[18px]" style={{ background: tint }} aria-hidden>{emoji}</span>
      <div className="mt-2 text-[15px] font-semibold text-[#5A5A55]">{name}</div>
      <button type="button" onClick={onClick} className={`mt-2 h-9 self-start rounded-[10px] px-3.5 text-[14px] font-semibold text-white ${gold ? 'bg-[#3A2E05]' : 'bg-green-900'}`}>{cta}</button>
    </div>
  );
}

export function Health() {
  const { state, set, t } = useDemo();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [streak, setStreak] = useState(false);
  const [future, setFuture] = useState(false);
  const [scan, setScan] = useState(false);
  const [address, setAddress] = useState(false);
  const [autofill, setAutofill] = useState(true);
  const dayRef = useRef<HTMLDivElement>(null);
  const n = state.weekDays[state.persona];

  useAction('open-streak', () => setStreak(true));
  useAction('open-future', () => setFuture(true));
  useAction('open-scan', () => setScan(true));
  useAction('open-address', () => setAddress(true));
  useAction('show-autofill', () => setAutofill(true));

  useEffect(() => {
    if (params.get('to') === 'day90') window.setTimeout(() => dayRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
  }, [params]);

  return (
    <div className="absolute inset-0 flex flex-col bg-cream-bg">
      <div className="shrink-0 bg-green-900" style={{ height: 'calc(var(--sat) + 22px)' }} />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-[110px] pt-3">
        <Anchor id="health-ring">
          <button type="button" onClick={() => setStreak(true)} className="flex w-full items-center gap-3 rounded-[18px] border border-[#E6E1D1] bg-card px-4 py-3 text-left">
            <Ring value={n} total={7} />
            <span className="text-[17px] text-text-primary">
              <b className="text-[20px]">{n}/7</b> · {t('ringText')}
            </span>
          </button>
        </Anchor>

        <Anchor id="health-step" className="mt-3">
          <StepCard compact />
        </Anchor>

        {autofill && state.water === 0 && state.persona === 'neha' && (
          <Anchor id="health-autofill" className="mt-3">
            <div className="flex items-center gap-2 rounded-[16px] bg-[#1F2A1B] px-3.5 py-3 text-white">
              <span className="text-[18px]" aria-hidden>💧</span>
              <span className="flex-1 text-[14px] leading-snug">{t('autofill')}</span>
              <button type="button" onClick={() => set({ water: 2 })} className="h-9 rounded-full bg-green-cta-light px-3 text-[14px] font-semibold text-[#163015]">{t('yes')}</button>
              <button type="button" onClick={() => setAutofill(false)} className="h-9 rounded-full bg-white/15 px-3 text-[14px] font-medium">{t('no')}</button>
            </div>
          </Anchor>
        )}

        <div className="mt-3 flex gap-2.5 rounded-[22px] border border-[#E6E1D1] bg-card p-2.5">
          <Counter icon={<Droplet size={20} />} val={state.water} total={8} label={t('water')} onAdd={() => set((s) => ({ water: Math.min(8, s.water + 1) }))} />
          <Counter icon={<Utensils size={20} />} val={state.mealsLogged.length} total={4} label={t('meals')} onAdd={() => navigate('/meal')} />
          <Counter icon={<PersonStanding size={20} />} val={0} total={20} unit="min" label={t('exercise')} onAdd={() => undefined} />
        </div>

        <h3 className="mt-6 text-[14px] font-bold uppercase tracking-[0.08em] text-[#5A5A55]">{t('healthTools')}</h3>
        <div className="mt-2.5 grid grid-cols-3 gap-2.5">
          <Tool emoji="⚖️" name={t('toolWeight')} cta={t('ctaAdd')} tint="#E9EDE3" />
          <Tool emoji="📏" name={t('toolBody')} cta={t('ctaScan')} tint="#E3EAEF" />
          <Anchor id="health-bloodtest">
            <Tool emoji="💉" name={t('toolBlood')} cta={t('book')} gold onClick={() => setAddress(true)} tint="#F7E3D1" />
          </Anchor>
          <Tool emoji="📅" name={t('toolPeriod')} cta={t('ctaLog')} tint="#F8E1E4" />
          <Tool emoji="🌙" name={t('toolSleep')} cta={t('ctaLog')} tint="#EFE6D2" />
          <Anchor id="health-stress">
            <Tool emoji="🧘" name={t('toolStress')} cta={t('ctaCheck')} onClick={() => setScan(true)} tint="#E4E6F3" />
          </Anchor>
        </div>

        <h3 className="mt-6 text-[14px] font-bold uppercase tracking-[0.08em] text-[#5A5A55]">{t('yourJourney')}</h3>
        <div ref={dayRef} className="mt-2.5 space-y-3">
          <Anchor id="health-day90">
            <JourneyCard icon={<Sparkles size={22} />} title={t('day90')} cta={<><Camera size={16} /> {t('addPhoto')}</>} onClick={() => setFuture(true)} />
          </Anchor>
          <Anchor id="health-report">
            <JourneyCard icon={<FileText size={20} />} title={t('analyseReport')} cta={<><Upload size={16} /> {t('upload')}</>} onClick={() => navigate('/report')} />
          </Anchor>
        </div>
      </div>
      <BottomNav active="/health" />
      <StreakSheet open={streak} onClose={() => setStreak(false)} />
      <FutureLookSheet open={future} onClose={() => setFuture(false)} />
      <ScanSheet open={scan} onClose={() => setScan(false)} />
      <AddressSheet open={address} onClose={() => setAddress(false)} />
    </div>
  );
}

function JourneyCard({ icon, title, cta, onClick }: { icon: React.ReactNode; title: string; cta: React.ReactNode; onClick: () => void }) {
  return (
    <div className="flex items-center gap-3 rounded-[24px] bg-gradient-to-r from-[#22391D] to-[#2F4A24] p-4">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-mustard/80 bg-white/5 text-mustard">{icon}</span>
      <span className="flex-1 text-[17px] font-bold leading-snug text-white">{title}</span>
      <button type="button" onClick={onClick} className="flex h-12 items-center gap-1.5 rounded-[14px] bg-mustard px-3.5 text-[15px] font-bold text-[#2B2205]">{cta}</button>
    </div>
  );
}

// F9e — Future Look: opt-in, 18+, labelled
function FutureLookSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, set, t } = useDemo();
  const [adult, setAdult] = useState(false);
  return (
    <Sheet open={open} onClose={onClose} label={t('transformation')} full>
      <div className="px-4">
        <div className="flex items-center justify-between">
          <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center" aria-label={t('close')}><ArrowLeft size={22} /></button>
          <span className="text-[18px] font-medium text-text-primary">{t('transformation')}</span>
          <span className="w-11" />
        </div>
        <p className="mt-2 text-center text-[20px] text-text-primary">{t('uploadToSee')}</p>
        <p className="text-center text-[28px] font-medium text-text-primary">{t('theMagic')}</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-[20px] bg-white p-2 shadow-sm">
            <div className="flex h-[220px] items-center justify-center rounded-[14px] bg-[#E2E2E2] text-[#FFF]"><Camera size={40} /></div>
            <div className="py-2 text-center text-[15px] text-text-secondary">{t('currentLook')}</div>
          </div>
          <Anchor id="health-future-tile">
            <div className="rounded-[20px] bg-white p-2 shadow-sm">
              {state.futureOptIn ? (
                <div className="flex h-[220px] flex-col items-center justify-center gap-2 rounded-[14px] bg-gradient-to-b from-[#E8F0E3] to-[#D6E4CF] px-3 text-center">
                  <Sparkles size={30} className="text-green-700" />
                  <span className="text-[13px] font-medium text-green-700">{t('futureReady')}</span>
                </div>
              ) : (
                <div className="flex h-[220px] items-center justify-center rounded-[14px] bg-[#E2E2E2] text-white"><Lock size={36} /></div>
              )}
              <div className="py-2 text-center text-[15px] text-text-secondary">{t('futureLook')}</div>
            </div>
          </Anchor>
        </div>
        <p className="mt-2 rounded-xl bg-[#F4F1E6] px-3 py-2 text-center text-[13px] text-text-primary">{t('futureLabel')}</p>
        {!state.futureOptIn && (
          <div className="mt-3 rounded-card border border-[#E4DFCF] bg-white p-4">
            <div className="text-[16px] font-semibold">{t('futureOff')}</div>
            <p className="mt-1 text-[14px] text-text-secondary">{t('futureWhy')}</p>
            <label className="mt-3 flex min-h-[44px] items-center gap-3">
              <input type="checkbox" checked={adult} onChange={(e) => setAdult(e.target.checked)} className="h-5 w-5 accent-[#38592D]" />
              <span className="text-[14px]">{state.persona === 'rohit' ? t('future18m') : t('future18')}</span>
            </label>
            <PrimaryButton full className="mt-2" disabled={!adult} onClick={() => set({ futureOptIn: true })}>{t('futureOn')}</PrimaryButton>
          </div>
        )}
        <button type="button" className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-[16px] bg-green-900 text-[16px] font-medium text-white">
          <Upload size={18} /> {t('uploadImage')}
        </button>
      </div>
    </Sheet>
  );
}

// F9f — Stress scan: fixable checks + "Phir bhi photo lein" after 8s
function ScanSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useDemo();
  const [secs, setSecs] = useState(0);
  const [taken, setTaken] = useState(false);
  useEffect(() => {
    if (!open) {
      setSecs(0);
      setTaken(false);
      return;
    }
    const id = window.setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [open]);
  const checks = [
    { k: 'scanLight', ok: true },
    { k: 'scanDistance', ok: true },
    { k: 'scanStraight', ok: false },
    { k: 'scanClear', ok: true },
  ];
  return (
    <Sheet open={open} onClose={onClose} label={t('toolStress')} full dark>
      <div className="px-4">
        <div className="flex items-center justify-between">
          <span className="text-[18px] font-semibold">{t('toolStress')}</span>
          <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10" aria-label={t('close')}><X size={20} /></button>
        </div>
        <div className="relative mt-3 flex h-[330px] items-center justify-center overflow-hidden rounded-[22px] bg-gradient-to-b from-[#2B3A2A] to-[#121A12]">
          <div className="h-[230px] w-[170px] rounded-[50%] border-[3px] border-dashed border-white/60" />
          <span className="absolute bottom-3 text-[13px] text-white/70">{taken ? t('scanTaken') : t('scanFrame')}</span>
        </div>
        <Anchor id="health-scan-checks" className="mt-3">
          <div className="flex flex-wrap gap-2">
            {checks.map((c) => (
              <span key={c.k} className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-[14px] font-medium ${c.ok ? 'bg-green-cta-light/20 text-green-cta-light' : 'border border-dashed border-mustard text-mustard'}`}>
                {c.ok ? <Check size={15} /> : <Circle size={13} />} {t(c.k)}
              </span>
            ))}
          </div>
        </Anchor>
        <p className="mt-3 rounded-2xl bg-white/10 p-3 text-[15px] leading-snug">
          <b className="text-mustard">{t('scanStraight')}:</b> {t('scanStraightFix')}
        </p>
        {secs >= 8 && !taken && (
          <button type="button" onClick={() => setTaken(true)} className="mt-3 h-12 w-full rounded-full bg-white text-[16px] font-semibold text-green-900">
            {t('scanAnyway')}
          </button>
        )}
        {secs < 8 && <p className="mt-3 text-center text-[13px] text-white/55">{t('scanWait')}</p>}
      </div>
    </Sheet>
  );
}

// F6 — local address placeholder (ref 07 layout)
function AddressSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useDemo();
  const field = 'mt-1.5 h-12 w-full rounded-[14px] border border-[#DAD6CB] bg-white px-4 text-[15px] placeholder:text-[#B3AFA6]';
  return (
    <Sheet open={open} onClose={onClose} label={t('labTitle')} full>
      <div className="-mt-6 bg-green-900 px-4 pb-4 pt-7 text-white">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-3 text-[19px] font-bold"><ArrowLeft size={22} /> {t('labTitle')}</span>
          <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15" aria-label={t('close')}><X size={18} /></button>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[14px] text-white/85"><MapPin size={14} className="text-[#E05A4E]" /> {t('labAt')}</div>
      </div>
      <div className="space-y-4 px-4 pt-4 text-[15px] text-[#1D1D1B]">
        <div>
          <div className="flex items-center justify-between">
            <span>Pincode</span>
            <span className="flex h-10 items-center gap-1.5 rounded-full bg-green-50 px-3 text-[14px] font-medium text-green-700"><MapPin size={14} className="text-[#E05A4E]" /> Use my location</span>
          </div>
          <input className={field} defaultValue="208002" aria-label="Pincode" />
          <div className="mt-1.5 text-[14px] font-medium text-green-600">✓ Home collection available in your area</div>
        </div>
        <label className="block">House / Flat No.<input className={field} placeholder="e.g. 402, B-wing" /></label>
        <Anchor id="addr-street">
          <label className="block">Street / Area<input className={field} placeholder={t('labStreetPh')} /></label>
        </Anchor>
        <label className="block">Landmark <span className="text-[#9A968C]">(optional)</span><input className={field} placeholder="Near temple, school…" /></label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">City<input className={`${field} bg-[#F1F0EC]`} defaultValue="Kanpur" /></label>
          <label className="block">State<input className={`${field} bg-[#F1F0EC]`} defaultValue="Uttar Pradesh" /></label>
        </div>
        <button type="button" disabled className="h-12 w-full rounded-[14px] bg-[#E0E0E0] text-[16px] font-semibold text-[#A8A8A8]">Continue →</button>
      </div>
    </Sheet>
  );
}
