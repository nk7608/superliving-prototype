// Synthetic personas — CLAUDE.md §12. Keep exactly as written.
export const neha = {
  id: 'neha', name: 'Neha Sharma', age: 34, city: 'Kanpur', language: 'Hinglish', sex: 'female (inferred)',
  diet: 'veg', fasting: ['Tuesday'], household: { size: 6, cooks: true }, goals: ['Hair fall', 'Energy', 'Thoda weight'],
  routine: { wake: '06:00', chai: '06:30', work: 'Home tuition 16:00–19:00' }, whoFor: 'Me and family',
  transcript: 'Main Neha, 34, Kanpur se. Ghar mein 6 log hain, khana main banati hoon. Baal bahut jhad rahe hain, thakaan rehti hai, thoda weight bhi kam karna hai. Veg hoon, Mangalvar vrat rakhti hoon.'
};
export const rohit = {
  id: 'rohit', name: 'Rohit Sharma', age: 38, city: 'Kanpur', language: 'Hinglish', sex: 'male',
  diet: 'veg weekdays, non-veg Sundays', household: 'shared with neha', goals: ['Stress', 'Neend', 'Pet ki charbi'],
  routine: { work: 'Bank branch 09:00–19:00', sleep: '23:30' },
  transcript: 'Main Rohit, Neha ka husband. Bank mein kaam karta hoon. Office ke baad bahut thakaan aur tension rehti hai, neend theek nahi aati, pet badh raha hai.',
  eveningVoiceNote: 'Aaj office mein bahut pressure tha, ghar aake kuch karne ka mann nahi.'
};
export type PersonaId = 'neha' | 'rohit';
export const personas = { neha, rohit };
