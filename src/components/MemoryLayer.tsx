import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { Avatar, type Who } from './Avatar';

const coaches: { id: Who; name: string }[] = [
  { id: 'tara', name: 'Tara' },
  { id: 'dev', name: 'Dev' },
  { id: 'rashmi', name: 'Rashmi' },
  { id: 'arjun', name: 'Arjun' },
  { id: 'sandy', name: 'Sandy' },
];

/**
 * The shared memory, drawn: one layer in the middle, every coach plugged into it.
 * What you tell one coach flows to all of them (pulses travel along the lines).
 */
export function MemoryLayer({ compact = false }: { compact?: boolean }) {
  const { t } = useDemo();
  const W = 296;
  const H = compact ? 118 : 138;
  const cx = W / 2;
  const cy = H - 34;
  const pts = coaches.map((_, i) => ({ x: 28 + i * ((W - 56) / (coaches.length - 1)), y: 26 }));
  return (
    <div className="rounded-[20px] border border-[#E4DFCF] bg-gradient-to-b from-[#FFFDF8] to-green-50 px-3 pb-3 pt-2">
      <div className="relative mx-auto" style={{ width: W, height: H }}>
        <svg width={W} height={H} className="absolute inset-0" aria-hidden>
          {pts.map((p, i) => (
            <g key={i}>
              <line x1={p.x} y1={p.y + 16} x2={cx} y2={cy - 14} stroke="#CFE3C8" strokeWidth="2" />
              <motion.circle
                r="3.5"
                fill="#E2C04C"
                initial={{ cx: p.x, cy: p.y + 16, opacity: 0 }}
                animate={{ cx: [p.x, cx], cy: [p.y + 16, cy - 14], opacity: [0, 1, 0] }}
                transition={{ duration: 1.6, delay: i * 0.35, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
              />
            </g>
          ))}
        </svg>
        {pts.map((p, i) => (
          <div key={coaches[i].id} className="absolute flex -translate-x-1/2 flex-col items-center" style={{ left: p.x, top: p.y - 18 }}>
            <Avatar who={coaches[i].id} size={34} className="border-2 border-white shadow-sm" />
            <span className="mt-0.5 text-[10px] font-medium text-text-secondary">{coaches[i].name}</span>
          </div>
        ))}
        <div className="absolute -translate-x-1/2" style={{ left: cx, top: cy - 16 }}>
          <motion.div
            className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-green-900 px-3 py-1.5 text-[12.5px] font-semibold text-[#F1EFE7] shadow-md"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          >
            <Brain size={14} className="text-mustard" /> {t('memLayerName')}
          </motion.div>
        </div>
      </div>
      <p className="mt-1 text-center text-[13px] leading-snug text-text-primary">{t('memLayerLine')}</p>
    </div>
  );
}
