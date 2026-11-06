// coaches.ts — placeholder avatars only (CLAUDE.md §12)
export const coaches = [
  { id: 'tara', name: 'Coach Tara', role: 'Nutritionist', langs: 'Hindi · English' },
  { id: 'dev', name: 'Dev', role: 'Hair Care Expert', langs: 'Hinglish' },
  { id: 'rashmi', name: 'Coach Rashmi', role: 'Skin Specialist', langs: 'Hindi · English' },
  { id: 'arjun', name: 'Coach Arjun', role: 'Fitness Coach', langs: 'Hinglish' },
  { id: 'sandy', name: 'Chef Sandy', role: 'Masterchef', langs: 'Hinglish' } ];

// Presentation-only extras for the Expert Chat grid (placeholder faces, F9b counts).
// Q11 (resolved, default kept): counts are illustrative "baatein" (chats), defined in the tooltip.
export const coachMeta: Record<string, { lakh: string; rating: string; tags: string[]; face: FaceSpec }> = {
  rashmi: { lakh: '13 lakh', rating: '4.9', tags: ['Skin', 'Acne'], face: { skin: '#E8B892', hair: '#2B1B14', style: 'long', shirt: '#A9C4E2', bg: '#E9E4DA' } },
  sandy: { lakh: '1.5 lakh', rating: '5.0', tags: ['Tasty Recipes'], face: { skin: '#B07A55', hair: '#3A2A20', style: 'short', shirt: '#F3F1EA', bg: '#D9CFC2', beard: true } },
  tara: { lakh: '46 lakh', rating: '4.9', tags: ['Diet', 'Weight'], face: { skin: '#D9A27D', hair: '#4A3A33', style: 'bun', shirt: '#C98B6B', bg: '#EFE4D6' } },
  arjun: { lakh: '8 lakh', rating: '4.9', tags: ['Fitness', 'Strength'], face: { skin: '#B98059', hair: '#1E1612', style: 'short', shirt: '#3E5F8A', bg: '#DCE6EE' } },
  dev: { lakh: '3 lakh', rating: '4.8', tags: ['Hair fall', 'Dandruff'], face: { skin: '#C48B63', hair: '#18110D', style: 'short', shirt: '#22272B', bg: '#E2DED6', beard: true } },
};
export interface FaceSpec { skin: string; hair: string; style: 'long' | 'short' | 'bun'; shirt: string; bg: string; beard?: boolean }
export const coachById = (id: string) => coaches.find((c) => c.id === id)!;
