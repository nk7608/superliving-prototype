import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Bot } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { coachById, coachMeta } from '../data/coaches';
import { Anchor } from '../notes/Anchor';
import { Sheet } from './ui';
import { Avatar, AvatarFill, type Who } from './Avatar';

/** Expert Chat grid card (ref 11 layout). Labels sit below the picture, never on the face. */
export function CoachCard({ id, markLabel = false, markCount = false }: { id: string; markLabel?: boolean; markCount?: boolean }) {
  const { t, state } = useDemo();
  const navigate = useNavigate();
  const c = coachById(id);
  const m = coachMeta[id];
  const [who, setWho] = useState(false);
  const [def, setDef] = useState(false);
  const label = (
    <span className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-[2px] text-[11px] font-semibold text-green-600">
        <Bot size={12} /> {t('aiCoach')}
      </span>
      <span className="text-[11px] text-text-secondary">{t('instantReply')}</span>
    </span>
  );
  const count = (
    <button type="button" onClick={() => setDef((v) => !v)} className="hit inline-flex items-center gap-1 whitespace-nowrap text-[12.5px] text-text-secondary" aria-expanded={def}>
      {m.lakh} {t('baatein')} · {m.rating}★ <Info size={12} />
    </button>
  );
  return (
    <div className="flex flex-col overflow-hidden rounded-[22px] bg-mustard">
      <div className="px-3.5 py-1.5 text-[13px] font-semibold text-text-primary">Popular</div>
      <div className="flex flex-1 flex-col overflow-hidden rounded-[20px] border border-[#EDE6CF] bg-card">
        <div className="h-[150px] overflow-hidden">
          <AvatarFill who={id as Who} />
        </div>
        <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5">
          <div className="text-[17px] font-semibold leading-tight text-[#1D1D1B]">{c.name}</div>
          <div className="mt-0.5 text-[12.5px] leading-snug text-text-secondary">{c.role}</div>
          <div className="text-[12px] leading-snug text-[#9A9890]">{c.langs}</div>
          <div className="mt-2">{markLabel ? <Anchor id="exp-label" className="inline-block pr-5" inset>{label}</Anchor> : label}</div>
          <div className="mt-1.5">{markCount ? <Anchor id="exp-count" className="inline-block pr-5" inset>{count}</Anchor> : count}</div>
          {def && <div className="mt-1 rounded-lg bg-green-50 px-2 py-1 text-[11.5px] leading-snug text-green-700">{t('baateinDef')}</div>}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {m.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-green-100 px-2.5 py-[2px] text-[12.5px] font-medium text-green-600">{tag}</span>
            ))}
          </div>
          <div className="flex-1" />
          <button type="button" onClick={() => setWho(true)} className="hit mt-2 self-start text-[12px] text-green-600 underline decoration-dotted underline-offset-2">
            {t('whoMakes')}
          </button>
          <button type="button" onClick={() => navigate(id === 'dev' ? '/chat/dev' : state.persona === 'rohit' ? '/rohit-chat' : '/chat/tara')} className="mt-2 h-11 w-full rounded-full bg-green-800 text-[15px] font-semibold text-white">
            {t('chatNow')}
          </button>
        </div>
      </div>
      <WhoMakesSheet open={who} onClose={() => setWho(false)} />
    </div>
  );
}

export function WhoMakesSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useDemo();
  return (
    <Sheet open={open} onClose={onClose} label={t('createdBy')}>
      <div className="px-5 pb-3">
        <h3 className="text-[20px] font-bold text-text-primary">{t('createdBy')}</h3>
        <p className="mt-1 text-[15px] leading-snug text-text-secondary">{t('whoMakesBody')}</p>
        <div className="mt-3 space-y-2">
          {([
            { n: t('expertName1'), r: t('expertRole1'), w: 'yoga' },
            { n: t('expertName2'), r: t('expertRole2'), w: 'advisor' },
          ] as const).map((e) => (
            <div key={e.n} className="flex items-center gap-3 rounded-2xl border border-[#E8E3D3] bg-white p-3">
              <Avatar who={e.w} size={48} />
              <div>
                <div className="text-[16px] font-semibold">{e.n}</div>
                <div className="text-[13px] leading-snug text-text-secondary">{e.r}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  );
}
