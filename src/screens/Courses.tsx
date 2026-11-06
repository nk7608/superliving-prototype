import { Star, ArrowRight } from 'lucide-react';
import { useDemo } from '../app/DemoContext';
import { Anchor } from '../notes/Anchor';
import { AppHeader, BottomNav, StreakPill } from '../components/ui';

/** Courses tab — static copy of the existing style (ref 09). Unchanged. */
export function Courses() {
  const { t } = useDemo();
  const list = [
    { title: t('course1'), old: '₹999', price: '₹189', art: 'Fix Work-Life Balance', bg: '#DCE9DF' },
    { title: t('course2'), old: '₹449', price: '₹159', art: '15-Days Sleep Reset', bg: '#9FCB98' },
    { title: t('course3'), old: '₹799', price: '₹179', art: 'Hair Fall Control', bg: '#E8D8C4' },
    { title: t('course4'), old: '₹699', price: '₹169', art: 'PCOS Diet Plan', bg: '#F1D2DA' },
  ];
  return (
    <div className="absolute inset-0 flex flex-col bg-cream-bg">
      <AppHeader right={<StreakPill />} />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-[110px] pt-4">
        <h1 className="text-[20px] font-bold text-text-primary">{t('navCourses')}</h1>
        <Anchor id="courses-list" className="mt-3">
          <div className="space-y-4">
            {list.map((c) => (
              <div key={c.title} className="overflow-hidden rounded-card border border-[#ECE8DC] bg-card">
                <div className="flex gap-3 p-3">
                  <div className="flex h-[130px] w-[96px] shrink-0 items-center justify-center rounded-[14px] p-2 text-center text-[14px] font-extrabold uppercase leading-tight text-[#2A3D2A]" style={{ background: c.bg }}>{c.art}</div>
                  <div className="flex-1 pt-3">
                    <div className="text-[17px] font-semibold leading-snug">{c.title}</div>
                    <div className="mt-2 flex items-center gap-1 text-[14px] text-[#B9962E]"><Star size={14} fill="#E2C04C" color="#E2C04C" /> 4.9</div>
                  </div>
                </div>
                <div className="border-t border-[#ECE8DC] p-3">
                  <button type="button" className="flex h-[48px] w-full items-center justify-center gap-1.5 rounded-[14px] bg-green-700 text-[15px] text-white">
                    {t('startCourseA')} <span className="line-through opacity-70">{c.old}</span> {c.price} {t('perMonthLong')} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Anchor>
      </div>
      <BottomNav active="/courses" />
    </div>
  );
}
