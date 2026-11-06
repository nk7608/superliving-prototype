// videos.ts — titles are illustrative (CLAUDE.md §12)
export const picks = { neha: { title: 'Vrat mein energy kaise bani rahe', mins: 4, ep: '1/5', reason: 'kyunki aap Mangalvar ko vrat rakhti hain' },
  rohit: { title: '2-minute deep breathing', mins: 2, reason: 'kyunki aapne kaha office ke baad tension rehti hai' } };

export interface Thumb { title: string; en?: string; emoji: string; bg: string; fg?: string; views?: string; locked?: boolean; price?: string }

// Placeholder thumbnails: bold coloured cards with title text and an emoji (§6.5).
export const fallbackPickNeha = { title: 'Baalon ke liye protein — ghar ka khana', mins: 4, ep: '1/4' };
export const similarNeha: Thumb[] = [
  { title: 'Makhana vrat chaat', en: 'Makhana fasting chaat', emoji: '🥣', bg: '#7C3A2D', fg: '#FFE7B0', views: '6.2K' },
  { title: 'Sabudana kam, energy zyada', en: 'Less sabudana, more energy', emoji: '⚡', bg: '#2E4B7A', fg: '#FFFFFF', views: '3.9K' },
];
export const similarRohit: Thumb[] = [
  { title: 'Office ke baad 5-min stretch', en: '5-min stretch after office', emoji: '🧘', bg: '#355E4A', fg: '#FFFFFF', views: '9.1K' },
  { title: 'Neend ke liye raat ki aadat', en: 'A night habit for better sleep', emoji: '🌙', bg: '#2A2F5C', fg: '#F2E6B8', views: '12K' },
];
export const tarasTen: Thumb[] = [
  { title: 'Protein Wala Bhel!', en: 'Protein Bhel!', emoji: '🥗', bg: '#B23A1F', fg: '#FFF2C2', views: '1.2K', locked: true, price: 'Pro ₹199' },
  { title: 'Hungry in the morning?', emoji: '🍽️', bg: '#C9472B', fg: '#FFFFFF', views: '5.4K', locked: true, price: 'Pro ₹199' },
  { title: 'Late night cravings?', emoji: '🌙', bg: '#E8DDBE', fg: '#1C3A8A', views: '31.7K', locked: true, price: 'Pro ₹199' },
  { title: 'Iron wali thali', en: 'An iron-rich thali', emoji: '🍛', bg: '#8A5A12', fg: '#FFF', views: '4.4K' },
  { title: 'Chai ke saath kya khayein', en: 'What to eat with chai', emoji: '☕', bg: '#5C3B28', fg: '#FBE3C0', views: '7.8K' },
  { title: 'Dahi ke 5 fayde', en: '5 benefits of curd', emoji: '🥛', bg: '#3E6E8E', fg: '#FFF', views: '2.6K' },
  { title: 'Baal jhadna: khana', en: 'Hair fall: what to eat', emoji: '💇‍♀️', bg: '#6B2E5C', fg: '#FFE', views: '11K', locked: true, price: 'Pro ₹199' },
  { title: 'Roti ya chawal?', en: 'Roti or rice?', emoji: '🫓', bg: '#A2702A', fg: '#FFF', views: '8.0K' },
  { title: 'Subah ki dhoop', en: 'Morning sunlight', emoji: '☀️', bg: '#E2A72E', fg: '#3A2400', views: '3.1K' },
  { title: 'Thakaan ke 4 kaaran', en: '4 reasons you feel tired', emoji: '😮‍💨', bg: '#30475E', fg: '#FFF', views: '5.0K' },
];
export const top10: Thumb[] = [
  { title: 'Heart aur BP ki ladai', en: 'Heart and BP', emoji: '❤️', bg: '#8E3B2E', fg: '#FFF', views: '7.7K' },
  { title: 'Hot Flashes se Instant Relief', en: 'Quick relief from hot flashes', emoji: '🥤', bg: '#F1D9C6', fg: '#7A2E1F', views: '8.1K' },
  { title: 'Skin Tight Natural', emoji: '🌿', bg: '#C9A15A', fg: '#2B1A00', views: '8.0K' },
  { title: 'Gas aur acidity', en: 'Gas and acidity', emoji: '🔥', bg: '#2F5D50', fg: '#FFF', views: '6.5K' },
];
export const exclusiveVideos: Thumb[] = [
  { title: '2 Minute Deep Breathing', emoji: '🧘‍♀️', bg: '#E9DFCB', fg: '#8A1F12', views: '1.5K' },
  { title: 'Hot Flashes se Instant Relief', en: 'Quick relief from hot flashes', emoji: '🥤', bg: '#F1D9C6', fg: '#7A2E1F', views: '8.1K' },
  { title: 'Ghar ka Healthy Nashta', en: 'Healthy home breakfast', emoji: '🍳', bg: '#E57A2C', fg: '#FFF', views: '42.2K' },
  { title: 'Weekend Detox', emoji: '🍵', bg: '#D23B2A', fg: '#FFF', views: '3.3K', locked: true },
];
export const originals: Thumb[] = [
  { title: 'Gut ki kahani', en: 'The gut story', emoji: '🦠', bg: '#5A1F2E', fg: '#FFD9A0', views: '10 Episodes' },
  { title: 'Neend ka vigyan', en: 'The science of sleep', emoji: '😴', bg: '#1F2E5A', fg: '#D0E0FF', views: '10 Episodes' },
];

// SuperTV category tabs (unchanged feature, now clickable in the prototype).
export const categories = ['All', 'Weight Control', 'Skin Care', 'Hair Care', 'Festive & Spiritual'] as const;
export const byCategory: Record<Exclude<(typeof categories)[number], 'All'>, Thumb[]> = {
  'Weight Control': [
    { title: 'Roti ya chawal?', en: 'Roti or rice?', emoji: '🫓', bg: '#A2702A', fg: '#FFF', views: '8.0K' },
    { title: 'Ghar ka Healthy Nashta', en: 'Healthy home breakfast', emoji: '🍳', bg: '#E57A2C', fg: '#FFF', views: '42.2K' },
    { title: 'Raat ka halka khana', en: 'A light dinner', emoji: '🥗', bg: '#355E4A', fg: '#FFF', views: '5.6K' },
  ],
  'Skin Care': [
    { title: 'Skin Tight Natural', en: 'Natural skin care', emoji: '🌿', bg: '#C9A15A', fg: '#2B1A00', views: '8.0K' },
    { title: 'Paani aur twacha', en: 'Water and skin', emoji: '💧', bg: '#3E6E8E', fg: '#FFF', views: '4.2K' },
    { title: 'Dhoop se bachav', en: 'Sun protection', emoji: '🧴', bg: '#D9822B', fg: '#FFF', views: '3.0K' },
  ],
  'Hair Care': [
    { title: 'Baal jhadna: khana', en: 'Hair fall: what to eat', emoji: '💇‍♀️', bg: '#6B2E5C', fg: '#FFE', views: '11K', locked: true, price: 'Pro ₹199' },
    { title: 'Dahi ke 5 fayde', en: '5 benefits of curd', emoji: '🥛', bg: '#3E6E8E', fg: '#FFF', views: '2.6K' },
    { title: 'Tel lagane ka sahi tareeka', en: 'How to oil your hair', emoji: '🫙', bg: '#8A5A12', fg: '#FFF', views: '6.9K' },
  ],
  'Festive & Spiritual': [
    { title: 'Karwa Chauth vrat options', en: 'Karwa Chauth fasting options', emoji: '🪔', bg: '#6E2414', fg: '#FFE7B0', views: '9.4K', locked: true, price: 'Pro ₹199' },
    { title: 'Makhana vrat chaat', en: 'Makhana fasting chaat', emoji: '🥣', bg: '#7C3A2D', fg: '#FFE7B0', views: '6.2K' },
    { title: 'Diwali ki mithai, halki', en: 'Lighter Diwali sweets', emoji: '🍬', bg: '#B23A1F', fg: '#FFF2C2', views: '7.1K' },
  ],
};
