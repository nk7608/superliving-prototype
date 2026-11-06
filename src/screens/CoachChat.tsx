import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { coachById } from '../data/coaches';
import { knows, memoryFor } from '../data/memory';
import { Anchor } from '../notes/Anchor';
import { ChatBody, ChatHeader, ChatInput, CoachBubble, DayDivider } from '../components/Chat';
import { MeSheet } from '../components/MeSheet';
import { Avatar } from '../components/Avatar';

/**
 * Any other coach (Rashmi, Arjun, Sandy). Neha has never spoken to them,
 * yet they open with what she told Tara — the shared memory at work.
 */
export function CoachChat() {
  const { id = 'rashmi' } = useParams();
  const { state, t } = useDemo();
  const [me, setMe] = useState(false);
  const coach = coachById(id);
  const short = coach.name.replace(/^(Coach|Chef) /, '');
  const lang = state.lang;
  const isRohit = state.persona === 'rohit';

  // Facts this coach can use: everything shared, nothing private.
  const facts = memoryFor(state)
    .filter((m) => m.section !== 'private' && !['name', 'city', 'lang', 'sex', 'r-name', 'r-city', 'r-age'].includes(m.id))
    .slice(0, 5);

  const opener = () => {
    if (isRohit) return t('coachOpenRohit', { coach: short });
    const bits: string[] = [];
    if (knows(state, 'house')) bits.push(t('cfVeg'));
    if (knows(state, 'vrat')) bits.push(t('cfVrat'));
    if (state.learned.includes('tuition') && knows(state, 'tuition')) bits.push(t('cfTuition'));
    const known = bits.length ? t('coachKnows', { list: bits.join(', ') }) : '';
    return `${t('coachHello', { coach: short })} ${known} ${t(`coachPlan_${id}`)}`.trim();
  };

  return (
    <div className="absolute inset-0 flex flex-col">
      <ChatHeader coachId={id} onMe={() => setMe(true)} />
      <ChatBody deps={[id]}>
        <DayDivider>{t('firstChat', { coach: short })}</DayDivider>
        <Anchor id="coach-context">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-[94%] rounded-[18px] border border-[#CFE3C8] bg-green-50 px-4 py-3">
            <div className="flex items-center gap-2 text-[13.5px] font-semibold text-green-700">
              <Brain size={16} /> {t('coachFromMemory', { coach: short })}
            </div>
            <div className="mt-2 space-y-1.5">
              {facts.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.18 }}
                  className="flex items-center justify-between gap-2 rounded-xl bg-white/80 px-2.5 py-1.5"
                >
                  <span className="min-w-0 truncate text-[13px] text-text-primary">{state.edits[f.id] ?? f.value[lang]}</span>
                  <span className="flex shrink-0 items-center gap-1 text-[11px] text-text-secondary">
                    {f.source[lang].includes('Tara') && <Avatar who="tara" size={16} />}
                    {f.source[lang]}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="mt-2 text-[12px] text-text-secondary">{t('coachNoRepeat')}</div>
          </motion.div>
        </Anchor>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + facts.length * 0.18 }}>
          <CoachBubble coachId={id} time="07:10 PM">{opener()}</CoachBubble>
        </motion.div>
      </ChatBody>
      <ChatInput coachName={short} actions={[{ emoji: '📞', label: `Call ${short}` }, { emoji: '📚', label: t('navCourses') }]} />
      <MeSheet open={me} onClose={() => setMe(false)} />
    </div>
  );
}
