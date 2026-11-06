// coaches.ts — placeholder avatars only (CLAUDE.md §12)
export const coaches = [
  { id: 'tara', name: 'Coach Tara', role: 'Nutritionist', langs: 'Hindi · English' },
  { id: 'dev', name: 'Dev', role: 'Hair Care Expert', langs: 'Hinglish' },
  { id: 'rashmi', name: 'Coach Rashmi', role: 'Skin Specialist', langs: 'Hindi · English' },
  { id: 'arjun', name: 'Coach Arjun', role: 'Fitness Coach', langs: 'Hinglish' },
  { id: 'sandy', name: 'Chef Sandy', role: 'Masterchef', langs: 'Hinglish' } ];

// Presentation-only extras for the Expert Chat grid (F9b counts are total chats, defined in a tooltip).
export const coachMeta: Record<string, { lakh: string; rating: string; tags: string[] }> = {
  rashmi: { lakh: '13 lakh', rating: '4.9', tags: ['Skin', 'Acne'] },
  sandy: { lakh: '1.5 lakh', rating: '5.0', tags: ['Tasty Recipes'] },
  tara: { lakh: '46 lakh', rating: '4.9', tags: ['Diet', 'Weight'] },
  arjun: { lakh: '8 lakh', rating: '4.9', tags: ['Fitness', 'Strength'] },
  dev: { lakh: '3 lakh', rating: '4.8', tags: ['Hair fall', 'Dandruff'] },
};
export const coachById = (id: string) => coaches.find((c) => c.id === id)!;
