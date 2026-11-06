// videos.ts — titles are illustrative (CLAUDE.md §12)
export const picks = { neha: { title: 'Vrat mein energy kaise bani rahe', mins: 4, ep: '1/5', reason: 'kyunki aap Mangalvar ko vrat rakhti hain' },
  rohit: { title: '2-minute deep breathing', mins: 2, reason: 'kyunki aapne kaha office ke baad tension rehti hai' } };

export interface Thumb { title: string; emoji: string; bg: string; fg?: string; views?: string; locked?: boolean; price?: string }

// Placeholder thumbnails: bold coloured cards with title text and an emoji (§6.5).
export const fallbackPickNeha = { title: 'Baalon ke liye protein — ghar ka khana', mins: 4, ep: '1/4' };
export const similarNeha: Thumb[] = [
  { title: 'Makhana vrat chaat', emoji: '🥣', bg: '#7C3A2D', fg: '#FFE7B0', views: '6.2K' },
  { title: 'Sabudana kam, energy zyada', emoji: '⚡', bg: '#2E4B7A', fg: '#FFFFFF', views: '3.9K' },
];
export const similarRohit: Thumb[] = [
  { title: 'Office ke baad 5-min stretch', emoji: '🧘', bg: '#355E4A', fg: '#FFFFFF', views: '9.1K' },
  { title: 'Neend ke liye raat ki aadat', emoji: '🌙', bg: '#2A2F5C', fg: '#F2E6B8', views: '12K' },
];
export const tarasTen: Thumb[] = [
  { title: 'Protein Wala Bhel!', emoji: '🥗', bg: '#B23A1F', fg: '#FFF2C2', views: '1.2K', locked: true, price: 'Pro ₹199' },
  { title: 'Hungry in the morning?', emoji: '🍽️', bg: '#C9472B', fg: '#FFFFFF', views: '5.4K', locked: true, price: 'Pro ₹199' },
  { title: 'Late night cravings?', emoji: '🌙', bg: '#E8DDBE', fg: '#1C3A8A', views: '31.7K', locked: true, price: 'Pro ₹199' },
  { title: 'Iron wali thali', emoji: '🍛', bg: '#8A5A12', fg: '#FFF', views: '4.4K' },
  { title: 'Chai ke saath kya khayein', emoji: '☕', bg: '#5C3B28', fg: '#FBE3C0', views: '7.8K' },
  { title: 'Dahi ke 5 fayde', emoji: '🥛', bg: '#3E6E8E', fg: '#FFF', views: '2.6K' },
  { title: 'Baal jhadna: khana', emoji: '💇‍♀️', bg: '#6B2E5C', fg: '#FFE', views: '11K', locked: true, price: 'Pro ₹199' },
  { title: 'Roti ya chawal?', emoji: '🫓', bg: '#A2702A', fg: '#FFF', views: '8.0K' },
  { title: 'Subah ki dhoop', emoji: '☀️', bg: '#E2A72E', fg: '#3A2400', views: '3.1K' },
  { title: 'Thakaan ke 4 kaaran', emoji: '😮‍💨', bg: '#30475E', fg: '#FFF', views: '5.0K' },
];
export const top10: Thumb[] = [
  { title: 'Heart aur BP ki ladai', emoji: '❤️', bg: '#8E3B2E', fg: '#FFF', views: '7.7K' },
  { title: 'Hot Flashes se Instant Relief', emoji: '🥤', bg: '#F1D9C6', fg: '#7A2E1F', views: '8.1K' },
  { title: 'Skin Tight Natural', emoji: '🌿', bg: '#C9A15A', fg: '#2B1A00', views: '8.0K' },
  { title: 'Gas aur acidity', emoji: '🔥', bg: '#2F5D50', fg: '#FFF', views: '6.5K' },
];
export const exclusiveVideos: Thumb[] = [
  { title: '2 Minute Deep Breathing', emoji: '🧘‍♀️', bg: '#E9DFCB', fg: '#8A1F12', views: '1.5K' },
  { title: 'Hot Flashes se Instant Relief', emoji: '🥤', bg: '#F1D9C6', fg: '#7A2E1F', views: '8.1K' },
  { title: 'Ghar ka Healthy Nashta', emoji: '🍳', bg: '#E57A2C', fg: '#FFF', views: '42.2K' },
  { title: 'Weekend Detox', emoji: '🍵', bg: '#D23B2A', fg: '#FFF', views: '3.3K', locked: true },
];
export const originals: Thumb[] = [
  { title: 'Gut ki kahani', emoji: '🦠', bg: '#5A1F2E', fg: '#FFD9A0', views: '10 Episodes' },
  { title: 'Neend ka vigyan', emoji: '😴', bg: '#1F2E5A', fg: '#D0E0FF', views: '10 Episodes' },
];
