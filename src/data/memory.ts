// The shared "Me" card (F1). One memory read by every coach.
import type { DemoState } from '../app/DemoContext';
import type { L } from './strings';

export type MemSection = 'basics' | 'kitchen' | 'routine' | 'goals' | 'reports' | 'private';

export interface MemItem {
  id: string;
  section: MemSection;
  label: L;
  value: L;
  source: L;
  inferred?: boolean;
}

const l = (hi: string, en: string = hi): L => ({ hi, en });

const SRC = {
  onb: l('Onboarding'),
  onbGuess: l('Onboarding (andaza)', 'Onboarding (inferred)'),
  tara: l('Tara se chat, 6 Nov', 'Chat with Tara, 6 Nov'),
  logs: l('Meal logs se', 'From meal logs'),
  report: l('Report, 2 Nov'),
  neha: l('Neha ke card se ✓', 'From Neha\'s card ✓'),
  rohitVoice: l('Rohit ki awaaz se', 'From Rohit\'s voice note'),
};

export function memoryFor(state: DemoState): MemItem[] {
  if (state.persona === 'rohit') {
    return [
      { id: 'r-name', section: 'basics', label: l('Naam', 'Name'), value: l('Rohit Sharma'), source: SRC.rohitVoice },
      { id: 'r-age', section: 'basics', label: l('Umar', 'Age'), value: l('30–44'), source: SRC.onb },
      { id: 'r-city', section: 'basics', label: l('Shehar', 'City'), value: l('Kanpur'), source: SRC.neha },
      { id: 'r-kitchen', section: 'kitchen', label: l('Ghar ka khana', 'Home kitchen'), value: l('6 log · veg, Ravivar non-veg', '6 people · veg, non-veg on Sundays'), source: SRC.neha },
      { id: 'r-work', section: 'routine', label: l('Kaam', 'Work'), value: l('Bank mein kaam', 'Works at a bank'), source: SRC.rohitVoice },
      { id: 'r-goals', section: 'goals', label: l('Goals'), value: l('Stress · Neend · Pet ki charbi', 'Stress · Sleep · Belly fat'), source: SRC.rohitVoice },
    ].filter((i) => !state.forgotten.includes(i.id)) as MemItem[];
  }
  const items: MemItem[] = [
    { id: 'name', section: 'basics', label: l('Naam', 'Name'), value: l('Neha Sharma · 34'), source: SRC.onb },
    { id: 'city', section: 'basics', label: l('Shehar', 'City'), value: l('Kanpur'), source: SRC.onb },
    { id: 'lang', section: 'basics', label: l('Bhasha', 'Language'), value: l('Hinglish'), source: SRC.onb },
    { id: 'sex', section: 'basics', label: l('Ling', 'Sex'), value: l('Mahila', 'Woman'), source: SRC.onbGuess, inferred: true },
    { id: 'house', section: 'kitchen', label: l('Ghar', 'Household'), value: l('6 log · veg kitchen · khana aap banati hain', '6 people · veg kitchen · you cook'), source: SRC.onb },
    { id: 'staples', section: 'kitchen', label: l('Roz ka khana', 'Staples'), value: l('Roti, dal, sabzi, dahi, poha'), source: SRC.logs },
    { id: 'vrat', section: 'kitchen', label: l('Vrat', 'Fasting'), value: l('Mangalvar', 'Tuesday'), source: SRC.onb },
    { id: 'vratFood', section: 'kitchen', label: l('Vrat ka khana', 'Fasting food'), value: l('Sabudana khichdi'), source: SRC.tara },
    { id: 'breakfast', section: 'kitchen', label: l('Nashta', 'Breakfast'), value: l('Poha'), source: SRC.tara },
    { id: 'chai', section: 'routine', label: l('Subah chai', 'Morning chai'), value: l(state.chaiTime === '6 se pehle' ? '5:45' : state.chaiTime === '7–8' ? '7:30' : state.chaiTime === '8 ke baad' ? '8:15' : '6:30'), source: SRC.onb },
    // Q10 (resolved, default kept): morning chopping is inferred, not stated in the transcript.
    { id: 'morningCook', section: 'routine', label: l('Subah', 'Mornings'), value: l('Chai ke baad sabzi kaatna, khana banana', 'Chops vegetables and cooks after chai'), source: SRC.onbGuess, inferred: true },
    { id: 'tuition', section: 'routine', label: l('Kaam', 'Work'), value: l('Ghar par tuition, 4–7 pm · tab message nahi', 'Home tuition, 4–7 pm · no messages then'), source: SRC.tara },
    { id: 'goals', section: 'goals', label: l('Goals'), value: l('Hair fall · Energy · Thoda weight', 'Hair fall · Energy · A little weight'), source: SRC.onb },
    { id: 'report', section: 'reports', label: l('Blood report', 'Blood report'), value: l('Sample Diagnostics · B12 kam · Vitamin D kam · HbA1c dhyan dein', 'Sample Diagnostics · B12 low · Vitamin D low · HbA1c watch'), source: SRC.report },
  ];
  return items.filter((i) => {
    if (state.forgotten.includes(i.id)) return false;
    if (i.id === 'vratFood' && !state.learned.includes('vratFood')) return false;
    if (i.id === 'breakfast' && !state.learned.includes('breakfast')) return false;
    if (i.id === 'tuition' && !state.learned.includes('tuition')) return false;
    if (i.id === 'report' && state.report === 'none') return false;
    if (i.id === 'staples' && state.mealsLogged.length === 0) return false; // learned from meal logs
    return true;
  });
}

/** Convenience: does the shared memory currently contain this fact? */
export const knows = (state: DemoState, id: string) => memoryFor(state).some((i) => i.id === id);
