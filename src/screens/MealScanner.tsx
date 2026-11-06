import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Camera, Image as ImageIcon, Mic, Trash2, CalendarDays } from 'lucide-react';
import { useAction, useDemo, wait } from '../app/DemoContext';
import { Anchor } from '../notes/Anchor';
import { Waveform } from './Onboarding';

interface Meal { id: string; name: string; portions: string; kcal: number; p: number; c: number; f: number; tip: string; type: string; emoji: string; time: string }

export function MealScanner() {
  const { state, set, t } = useDemo();
  const navigate = useNavigate();
  const [type, setType] = useState('breakfast');
  const [result, setResult] = useState<Meal | null>(null);
  const [listening, setListening] = useState(false);

  const meals: Record<string, Meal> = {
    poha: { id: 'poha', name: t('mealPoha'), portions: t('mealPohaP'), kcal: 310, p: 7.2, c: 52.4, f: 8.1, tip: t('mealPohaTip'), type: t('breakfast'), emoji: '☕', time: '08:52 AM' },
    lunch: { id: 'lunch', name: t('mealLunch'), portions: t('mealLunchP'), kcal: 420, p: 15.6, c: 64.0, f: 10.8, tip: t('mealLunchTip'), type: t('lunch'), emoji: '🍛', time: '01:20 PM' },
    voice: { id: 'voice', name: t('mealVoice'), portions: t('mealVoiceP'), kcal: 310, p: 11.8, c: 48.5, f: 7.0, tip: t('mealLunchTip'), type: t('lunch'), emoji: '🫓', time: '01:24 PM' },
  };
  const log = (id: string) => {
    set((s) => ({ mealsLogged: s.mealsLogged.includes(id) ? s.mealsLogged : [...s.mealsLogged, id] }));
    setResult(meals[id]);
  };
  const logged = state.mealsLogged.map((id) => meals[id]).filter(Boolean);
  const total = logged.reduce((a, m) => a + m.kcal, 0);

  useAction('meal-usual', async () => {
    setResult(null);
    await wait(1400); // let the viewer see the "Aapka usual" chip before it is tapped
    log('poha');
  });
  useAction('meal-voice', async () => {
    setListening(true);
    await wait(2200);
    setListening(false);
    log('voice');
  });

  const close = () => navigate('/health');

  return (
    <div className="absolute inset-0 bg-[#0F1A0D]">
      <div className="absolute inset-x-0 bottom-0 flex flex-col overflow-hidden rounded-t-sheet bg-white" style={{ top: 'calc(var(--sat) + 36px)' }}>
        <button type="button" onClick={result ? () => setResult(null) : close} className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#EDEDED]" aria-label={t('close')}>
          <X size={22} />
        </button>
        {!result ? (
          <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-8 pt-16">
            <h1 className="text-center text-[22px] font-extrabold text-[#1E3A1A]">📷 Meal Scanner</h1>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[
                ['breakfast', '🌅'],
                ['lunch', '☀️'],
                ['snack', '🍪'],
                ['dinner', '🌙'],
              ].map(([k, e]) => (
                <button key={k} type="button" onClick={() => setType(k)} aria-pressed={type === k} className={`flex h-[72px] flex-col items-center justify-center gap-1 rounded-[16px] border-2 text-[14px] font-medium ${type === k ? 'border-[#F0A030] bg-[#FFF6E8]' : 'border-[#E4E4E4] bg-white'}`}>
                  <span className="text-[20px]" aria-hidden>{e}</span>
                  {t(k)}
                </button>
              ))}
            </div>

            <Anchor id="meal-usual" className="mt-4">
              <div>
                <div className="text-[14px] font-semibold text-[#1D1D1B]">{t('usualTitle')}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button type="button" onClick={() => log('poha')} className="flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#CFE3C8] bg-green-50 px-3.5 text-[14px] font-medium text-green-700">
                    ☕ {t('usualPoha')}
                  </button>
                  <button type="button" onClick={() => log('lunch')} className="flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#CFE3C8] bg-green-50 px-3.5 text-[14px] font-medium text-green-700">
                    🍛 {t('usualLunch')}
                  </button>
                </div>
              </div>
            </Anchor>

            <button type="button" className="mt-4 flex h-[190px] w-full flex-col items-center justify-center rounded-[24px] bg-green-700 text-white">
              <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white/15"><Camera size={30} /></span>
              <span className="mt-3 text-[19px] font-bold">Take a Photo</span>
              <span className="text-[14px] text-white/80">of your meal</span>
            </button>
            <div className="my-3 flex items-center gap-3 text-[13px] text-[#999]"><span className="h-px flex-1 bg-[#E2E2E2]" />or<span className="h-px flex-1 bg-[#E2E2E2]" /></div>
            <div className="flex items-center">
              <button type="button" className="flex h-11 flex-1 items-center justify-center gap-2 text-[16px] font-semibold text-green-700"><ImageIcon size={18} /> Gallery</button>
              <span className="h-6 w-px bg-[#E2E2E2]" />
              <button type="button" onClick={() => !listening && (async () => { setListening(true); await wait(2200); setListening(false); log('voice'); })()} className="flex h-11 flex-1 items-center justify-center gap-2 text-[16px] font-semibold text-[#C2410C]"><Mic size={18} /> Voice</button>
            </div>
            {listening && (
              <div className="mt-2 rounded-2xl bg-[#1F2A1B] p-3 text-center text-white">
                <Waveform />
                <div className="text-[14px]">“do roti, ek katori dal”</div>
              </div>
            )}
            <div className="my-3 flex items-center gap-3 text-[13px] text-[#999]"><span className="h-px flex-1 bg-[#E2E2E2]" />or<span className="h-px flex-1 bg-[#E2E2E2]" /></div>
            <Anchor id="meal-text">
              <textarea rows={2} placeholder={t('mealPlaceholder')} className="w-full resize-none rounded-[18px] border-[1.5px] border-[#9BD08F] bg-[#F7F7F5] px-4 py-3.5 text-[16px] placeholder:text-[#8A8A86]" aria-label={t('mealPlaceholder')} />
            </Anchor>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-[19px] font-bold text-[#1D1D1B]">November 6</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-[#F0A68A] text-[#C2410C]"><CalendarDays size={18} /></span>
            </div>
            <div className="mt-3 space-y-3">
              {logged.length === 0 && <p className="text-[14px] text-text-secondary">{t('noMeals')}</p>}
              {logged.map((m) => (
                <div key={m.id} className="flex items-center gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-[#F4EBD9] text-[26px]" aria-hidden>{m.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[16px] font-bold text-[#1D1D1B]">{m.name}</div>
                    <div className="truncate text-[13px] text-text-secondary">{m.portions} · {m.type}</div>
                  </div>
                  <div className="text-right"><div className="text-[20px] font-bold text-green-700">{m.kcal}</div><div className="text-[12px] text-text-secondary">cal</div></div>
                  <Trash2 size={20} className="text-[#E05A4E]" />
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-baseline justify-between">
              <span className="text-[17px]">Total</span>
              <span><b className="text-[24px] text-green-700">{total}</b> <span className="text-[16px] text-text-secondary">/ 1995</span></span>
            </div>
          </div>
        ) : (
          <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-8 pt-14">
            <h1 className="text-center text-[22px] font-extrabold text-[#1E3A1A]">✅ Meal Logged</h1>
            <p className="text-center text-[14px] text-text-secondary">Here's your nutrition breakdown</p>
            <div className="mt-4 rounded-[20px] border-[1.5px] border-[#9BD08F] bg-green-50 p-5 text-center">
              <div className="text-[34px]" aria-hidden>🍽️</div>
              <div className="mt-1 text-[19px] font-bold text-[#2D4A27]">{result.name}</div>
              <div className="mt-1 text-[15px] font-medium text-[#3A3A36]">{result.portions}</div>
            </div>
            <div className="mt-3 rounded-[16px] border border-[#D9D9D9] bg-[#F6F6F6] p-3 text-[14px] text-[#333]">{t('mealPortionNote')}</div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[
                ['🔥', `${result.kcal} kcal`, 'Calories', '#FFF4E6', '#C2410C', '#F5D7B5'],
                ['💪', `${result.p}g`, 'Protein', '#FDECEC', '#C53030', '#F2C4C4'],
                ['🌾', `${result.c}g`, 'Carbs', '#FFF8E6', '#6B5A2A', '#F1E2B5'],
                ['🥑', `${result.f}g`, 'Fats', '#E9F6F3', '#1F6F5C', '#BFE3DA'],
              ].map(([e, v, l, bg, fg, bd]) => (
                <div key={l} className="flex flex-col items-center rounded-[14px] border py-3" style={{ background: bg, borderColor: bd }}>
                  <span aria-hidden>{e}</span>
                  <span className="mt-1 text-[14px] font-bold text-[#1D1D1B]">{v}</span>
                  <span className="text-[13px] font-medium" style={{ color: fg }}>{l}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-[16px] bg-[#E6F0FA] p-4 text-[14px]">
              <div className="font-bold text-[#2D4A27]">📊 Daily Budget</div>
              {[
                ['Remaining', `${1995 - total} kcal`],
                ['Target Protein', '98g'],
                ['Target Carbs', '276g'],
                ['Target Fats', '55g'],
              ].map(([a, b]) => (
                <div key={a} className="mt-1.5 flex justify-between"><span className="text-text-secondary">{a}</span><b>{b}</b></div>
              ))}
            </div>
            <Anchor id="meal-tip" className="mt-3">
              <div className="rounded-[16px] bg-[#FFF8E1] p-4">
                <div className="text-[15px] font-bold text-[#2D4A27]">💡 Tip</div>
                <p className="mt-1 text-[15px] leading-snug text-[#333]">{result.tip}</p>
              </div>
            </Anchor>
            <button type="button" onClick={() => setResult(null)} className="mt-4 h-12 w-full rounded-full bg-green-700 text-[16px] font-semibold text-white">{t('mealDone')}</button>
          </div>
        )}
      </div>
    </div>
  );
}
