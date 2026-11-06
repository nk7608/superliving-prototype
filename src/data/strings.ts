import { neha as _neha, rohit as _rohit } from './personas';
// Every product string, with `hi` (Hinglish, Latin script) and `en` (CLAUDE.md §6.6).
// Unchanged app UI that is English in the real app keeps the same text in both.
// The explainer layer is always plain English and does not live here.
export type Lang = 'hi' | 'en';
export interface L { hi: string; en: string }

const S: Record<string, L> = {};
const add = (o: Record<string, [string, string] | string>) => {
  for (const [k, v] of Object.entries(o)) S[k] = typeof v === 'string' ? { hi: v, en: v } : { hi: v[0], en: v[1] };
};

export function tr(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const e = S[key];
  let out = e ? e[lang] : key;
  if (!e && import.meta.env.DEV) console.warn('[strings] missing key', key);
  if (vars) for (const [k, v] of Object.entries(vars)) out = out.split(`{${k}}`).join(String(v));
  return out;
}
export const hasKey = (k: string) => k in S;

// ── Shared app chrome ──────────────────────────────────────────────
add({
  wordmark: 'SuperLiving',
  navHome: 'Home', navExpert: 'Expert Chat', navTv: 'SuperTV', navCourses: 'Courses', navHealth: 'Health',
  streakPill: ['{n} days streak', '{n} days streak'],
  streakPill1: ['1 day streak', '1 day streak'],
  hello: ['Hello, {name}!', 'Hello, {name}!'],
  close: ['Band karein', 'Close'],
  edit: 'Edit',
  save: ['Save karein', 'Save'],
  cancel: ['Cancel', 'Cancel'],
  yes: ['Haan', 'Yes'],
  no: ['Nahi', 'No'],
  demoOnly: ['Demo: yeh prototype hai, asli action nahi hota', 'Demo: this is a prototype, nothing is sent'],
  mock: 'Mock',
  aiCoach: ['AI coach', 'AI coach'],
  aiCoachFast: ['AI coach · turant jawab', 'AI coach · instant reply'],
  instantReply: ['turant jawab', 'instant reply'],
});

// ── S1 Onboarding (F0) ─────────────────────────────────────────────
add({
  onbTitle: ['Namaste! 🙏', 'Namaste! 🙏'],
  onbSub: ['Ek baar apne baare mein bata dijiye — bolkar ya likhkar. Baaki hum samajh lenge.', 'Tell us about yourself once — by speaking or typing. We\'ll work out the rest.'],
  onbSpeak: ['Bolkar batayein', 'Speak'],
  onbListening: ['Sun rahe hain…', 'Listening…'],
  onbStop: ['Ho gaya', 'Done'],
  onbType: ['Ya yahan likhiye…', 'Or type here…'],
  onbTypeGo: ['Samjho', 'Understand'],
  onbExample: ['Jaise: Main Neha, 34, Kanpur se. Ghar mein 6 log hain, khana main banati hoon. Baal bahut jhad rahe hain, thakaan rehti hai. Veg hoon, Mangalvar vrat rakhti hoon.', 'For example: I\'m Neha, 34, from Kanpur. There are 6 of us at home and I cook. My hair is falling a lot and I feel tired. I\'m vegetarian and fast on Tuesdays.'],
  onbUnderstood: ['Humne yeh samjha', 'Here\'s what we understood'],
  onbTapEdit: ['Kuch galat ho to chip par tap karke badlein', 'Tap any chip to fix it'],
  onbGuess: ['andaza', 'guess'],
  onbTwoMore: ['Bas 2 cheezein aur', 'Just 2 more things'],
  onbChaiQ: ['Subah chai kab peeti hain?', 'When do you have your morning chai?'],
  onbChaiQm: ['Subah chai kab peete hain?', 'When do you have your morning chai?'],
  chai1: ['6 se pehle', 'Before 6'], chai2: '6–7', chai3: '7–8', chai4: ['8 ke baad', 'After 8'],
  onbWhoQ: ['Kiske liye?', 'Who is this for?'],
  whoMe: ['Mere liye', 'Just me'],
  whoFamily: ['Mere aur parivaar ke liye', 'Me and my family'],
  onbPrivacy: ['Aapki health details sirf aapke liye. Kabhi bhi \'Me\' mein badal ya mita sakti hain.', 'Your health details are only for you. Change or delete them any time in \'Me\'.'],
  onbPrivacyM: ['Aapki health details sirf aapke liye. Kabhi bhi \'Me\' mein badal ya mita sakte hain.', 'Your health details are only for you. Change or delete them any time in \'Me\'.'],
  onbWhatSaved: ['Kya-kya save hota hai?', 'What do we save?'],
  onbWhatsapp: ['WhatsApp par roz ek chhota reminder bhejein', 'Send me one short reminder a day on WhatsApp'],
  onbCta: ['Sahi hai, shuru karein', 'Looks right, let\'s start'],
  onbFallback: ['Bolna/likhna nahi? Tap karke chuniye', 'Prefer not to speak or type? Tap to choose'],
  onbBackToVoice: ['Wapas bolkar batayein', 'Back to speaking'],
  fbGoal: ['Aapke goals (3 tak)', 'Your goals (up to 3)'],
  fbMore: ['Aur dekhein', 'More'],
  fbAge: ['Umar', 'Age'],
  fbFood: ['Khana', 'Food'],
  fbLang: ['Bhasha', 'Language'],
  fbVeg: ['Veg', 'Veg'], fbNonveg: ['Non-veg', 'Non-veg'], fbEgg: ['Egg', 'Eggetarian'], fbJain: ['Jain', 'Jain'],
  savedTitle: ['Kya-kya save hota hai', 'What we save'],
  saved1: ['Naam, umar, shehar aur bhasha — taaki coach aapse aapki tarah baat kare.', 'Name, age, city and language — so coaches talk to you the right way.'],
  saved2: ['Khana, vrat aur ghar — taaki plan aapke ghar ke khane se bane.', 'Food, fasts and household — so plans fit what your family cooks.'],
  saved3: ['Goals aur routine — taaki roz ka step sahi samay par aaye.', 'Goals and routine — so the daily step arrives at the right time.'],
  saved4: ['Bimari ya dawai sirf tab poochhenge jab zaroori ho. Yeh private rehti hai.', 'We ask about conditions or medicines only when needed. They stay private.'],
  saved5: ['Sab kuch \'Me\' card mein dikhta hai. Har cheez badal ya mita sakti hain.', 'Everything shows in your \'Me\' card. You can edit or delete any item.'],
  editChip: ['Badlein', 'Edit'],
  confirmChip: ['Haan, sahi hai', 'Yes, that\'s right'],
  guardianTitle: ['Parent/guardian ki permission chahiye', 'A parent or guardian needs to agree'],
  guardianBody: ['18 se kam umar ke liye hum parent ya guardian se permission lete hain. Weight challenges aur Future Look band rahenge.', 'For anyone under 18 we ask a parent or guardian to agree. Weight challenges and Future Look stay off.'],
  guardianCta: ['Guardian ko link bhejein', 'Send link to guardian'],
  guardianBack: ['Umar theek karein', 'Fix the age'],
  // chips
  chipName: ['👤 {name} · {age}', '👤 {name} · {age}'],
  chipCity: '📍 Kanpur',
  chipLang: '🗣️ Hinglish',
  chipFood: ['🥗 Veg · Mangalvar vrat', '🥗 Veg · Tuesday fast'],
  chipHouse: ['🏠 6 log ka khana aap banati hain', '🏠 You cook for 6 people'],
  chipGoals: ['🎯 Hair fall · Energy · Thoda weight', '🎯 Hair fall · Energy · A little weight'],
  chipSex: ['♀️ Mahila', '♀️ Woman'],
  chipSexWhy: ['"banati hoon" se', 'from "banati hoon"'],
});

// ── Step card / streak (F3) ────────────────────────────────────────
add({
  stepTitle: ['Aaj ka ek step', 'Today\'s one step'],
  stepReasonPre: ['Kyunki: aapko thakaan rehti hai · aap subah khana banati hain', 'Because: you feel tired · you cook in the morning'],
  stepReasonPost: ['Kyunki: Vitamin D kam hai · aap subah sabzi kaatti hain', 'Because: your Vitamin D is low · you chop vegetables in the morning'],
  stepReason1: ['Kyunki: B12 kam hai · dopahar mein roti banti hai', 'Because: your B12 is low · lunch is roti'],
  stepReason2: ['Kyunki: aap Mangalvar ko vrat rakhti hain', 'Because: you fast on Tuesdays'],
  stepReasonRohit: ['Kyunki: office ke baad tension rehti hai', 'Because: you feel tense after work'],
  stepReasonRohit2: ['Kyunki: neend theek nahi aati', 'Because: you are not sleeping well'],
  stepDone: ['Ho gaya ✅', 'Done ✅'],
  stepSkip: ['Aaj nahi', 'Not today'],
  stepSwap: ['Badlo 🔄', 'Change 🔄'],
  stepShabaash: ['Shabaash! Kal: {next}', 'Well done! Tomorrow: {next}'],
  stepBonus: ['Bonus: 2-min Memory Flash khelein?', 'Bonus: play 2-min Memory Flash?'],
  stepSkipped: ['Koi baat nahi — ek din chhootne se aadat nahi tootti.', 'That\'s fine — one missed day doesn\'t break a habit.'],
  stepUndo: ['Wapas lein', 'Undo'],
  stepFooter: ['Hafta 1 / 13 · Day-90 self ki taraf', 'Week 1 / 13 · towards your Day-90 self'], // Q2 resolved: week 1 of 13
  stepTogether: ['Kisi ke saath karna hai?', 'Want to do it with someone?'],
  streakSheetTitle: ['Aapki streak', 'Your streak'],
  streakDef: ['Streak = jitne din aapne apna step kiya.', 'Streak = the number of days you did your step.'],
  streakForgive: ['Hafte mein ek "Aaj nahi" se streak nahi tootti.', 'One "Not today" a week doesn\'t break your streak.'],
  streakSame: ['Health tab ki ring bhi yahi din ginti hai.', 'The ring on the Health tab counts the same days.'],
  streakWeek: ['Aapke pehle 7 din', 'Your first 7 days'],
  days: '1,2,3,4,5,6,7',
  gamesTitle: ['Memory Flash', 'Memory Flash'],
  gamesBody: ['Step ke baad ek chhota game — chahein to. Points aapki streak se alag nahi ginte.', 'A short game after your step — only if you want. Points are not a separate score.'],
  gamesPlay: ['Khelein', 'Play'],
});

// ── S2 Home ────────────────────────────────────────────────────────
add({
  homeBlood: 'Get your blood test done at home',
  mostSelling: 'Most Selling',
  fullBody: 'Full Body Test', tests10: '10 tests',
  energyTest: 'Energy & Deficiency Test', tests4: '4 tests',
  detoxTest: 'Detox Test', tests3: '3 tests',
  book: 'Book',
  exclusive: 'Exclusive Videos',
  superPlans: 'Super Plans for You',
  personalised: '100% PERSONALISED BY SUPERAI',
  course1: 'Fix Work-Life Balance with SuperAI (3-Months)',
  course1a: 'For all job types', course1b: 'Right Habits', course1c: 'For Fatigue, Nutrition & Stress',
  course2: 'Fix Sleep Routine in 15 days',
  course2a: 'Fall asleep faster & wake fresh', course2b: 'Designed by India\'s top experts', course2c: 'More energy, better skin!',
  reviews12k: '4.9 (12k reviews)', reviews16k: '4.9 (16k reviews)',
  details: 'Details',
  startCourse: 'Start course at {old} {price} per month',
  freeChats: 'Start Free Chats with Experts',
  chatNow: 'Chat now',
  proTitle: 'Get more features with PRO!',
  proBody: 'Unlimited chat, advanced tracking, exclusive content',
  proCta: 'Upgrade to PRO',
  createdBy: 'Created by Experts, powered by AI',
  expertRole1: 'Yoga & Pilates Coach, Weight Loss Expert',
  expertRole2: 'Advisor, Public Health Nutrition',
  expertName1: ['Yoga expert', 'Yoga expert'],
  expertName2: ['Nutrition advisor', 'Nutrition advisor'],
  storiesTitle: ['Aap jaisi families', 'Families like yours'],
  storiesSub: ['Aapke goals aur bhasha se mile hue', 'Matched to your goals and language'],
  storyReal: ['Asli member · koi inaam nahi mila', 'Real member · no reward given'],
  storyVary: ['Har kisi ke result alag hote hain', 'Results vary from person to person'],
  story1: ['Sunita, 41, Sagar', 'Sunita, 41, Sagar'], story1q: ['"Ghar ka hi khana, bas thoda badla"', '"Same home food, just a little changed"'], story1t: ['Hindi · 4 mahine · weight', 'Hindi · 4 months · weight'],
  story2: ['Imran, 45, Bareilly', 'Imran, 45, Bareilly'], story2q: ['"Raat ki walk ab aadat hai"', '"The evening walk is a habit now"'], story2t: ['Hinglish · 3 mahine · sugar', 'Hinglish · 3 months · sugar'],
  story3: ['Kavya, 29, Nashik', 'Kavya, 29, Nashik'], story3q: ['"Baal jhadna kam hua, dahi roz"', '"Less hair fall, curd every day"'], story3t: ['Hindi · 5 mahine · hair', 'Hindi · 5 months · hair'],
  support: 'Facing any issue? Chat with us.',
  supportHours: 'Daily (10 AM to 6 PM IST)',
});

// ── Price card (F9d) ───────────────────────────────────────────────
add({
  priceTitle: ['Kya milta hai', 'What you get'],
  priceSub: ['Saare plan aur keemat ek jagah', 'Every plan and price in one place'],
  planFree: 'Free', planPro: 'Pro', planSuper: 'Super Pro',
  perMonth: ['/mahina', '/month'],
  yourPlan: ['Aapka plan', 'Your plan'],
  rowChat: ['Coach chat', 'Coach chat'], rowChatFree: ['Roz kuch messages', 'A few a day'], rowUnl: ['Unlimited', 'Unlimited'],
  rowStep: ['Roz ka step + Me card', 'Daily step + Me card'],
  rowReport: ['Report ki pehli read', 'First report read'],
  rowTv: ['SuperTV', 'SuperTV'], rowTvFree: ['Coach ki pick + kuch videos', 'Coach\'s pick + some videos'], rowAll: ['Sab', 'All'],
  rowLive: ['Live yoga / zumba', 'Live yoga / zumba'],
  rowCourses: ['Courses', 'Courses'], rowCoursesExtra: ['₹159–189/mahina alag se', '₹159–189/month extra'], rowCoursesIn: ['20+ shamil', '20+ included'],
  priceRenewTitle: ['Renewal aur cancel', 'Renewal and cancel'],
  priceRenew: ['Har mahine usi tareekh ko renew hota hai. 3 din pehle yaad dilayenge.', 'Renews on the same date each month. We remind you 3 days before.'],
  priceCancelWhere: ['Kabhi bhi cancel — Profile > Pro membership', 'Cancel any time — Profile > Pro membership'],
  priceHelp: ['Billing mein dikkat? Help', 'Billing problem? Help'],
  priceBuyPro: ['Pro lein · ₹199/mahina', 'Get Pro · ₹199/month'],
  priceBuySuper: ['Super Pro lein · ₹349/mahina', 'Get Super Pro · ₹349/month'],
  subPlan: ['Pro · ₹199/mahina', 'Pro · ₹199/month'],
  subRenews: ['Agla renewal: 6 Dec 2026', 'Next renewal: 6 Dec 2026'],
  subRemind: ['3 din pehle yaad dilayenge (3 Dec)', 'We\'ll remind you 3 days before (3 Dec)'],
  subCancel: ['Pro cancel karein', 'Cancel Pro'],
  subCancelled: ['Cancel ho gaya. 6 Dec tak Pro chalega. Aage koi charge nahi.', 'Cancelled. Pro works until 6 Dec. No further charges.'],
  subResume: ['Wapas shuru karein', 'Resume'],
  subView: ['Subscriber view (demo)', 'Subscriber view (demo)'],
  helpSent: ['Support team se baat shuru — 10 AM se 6 PM', 'Support chat started — 10 AM to 6 PM'],
});

// ── Steps (F3) — Hinglish text is the synthetic data in steps.ts ──
add({
  stepNeha0: ['Chai ke baad 10 min dhoop mein baith kar sabzi kaatiye ☀️', 'After chai, sit in the sun for 10 min while you chop vegetables ☀️'],
  stepNeha1: ['Dopahar ki roti ke saath 1 katori dahi', 'One bowl of curd with your lunch rotis'],
  stepNeha2: ['Mangalvar vrat: sabudana kam, makhana + dahi zyada', 'Tuesday fast: less sabudana, more makhana + curd'],
  stepRohit0: ['Office se aakar 10 min chhat par walk 🚶', 'After office, a 10-min walk on the terrace 🚶'],
  stepRohit1: ['Raat 10:30 ke baad phone charger par, bed se door', 'After 10:30 pm, phone on the charger, away from bed'],
  stepReasonPreNoCook: ['Kyunki: aapko thakaan rehti hai · subah ki dhoop energy deti hai', 'Because: you feel tired · morning sun helps energy'],
  stepReason1Pre: ['Kyunki: baalon ke liye protein · dopahar mein roti banti hai', 'Because: protein helps hair · lunch is roti'],
  ringText: ['Is hafte din step pura', 'days this week with your step done'],
});

// ── Health tab ──
add({
  autofill: ['Tara ke chat se: 2 glass paani add karein?', 'From your chat with Tara: add 2 glasses of water?'],
  water: 'Water', meals: 'Meals', exercise: 'Exercise',
  healthTools: 'Health tools',
  toolWeight: 'Weight', toolBody: 'Body scan', toolBlood: 'Blood test', toolPeriod: 'Period', toolSleep: 'Sleep', toolStress: 'Stress score',
  ctaAdd: 'Add', ctaScan: 'Scan', ctaLog: 'Log', ctaCheck: 'Check',
  yourJourney: 'Your journey',
  day90: 'Your Day-90 self', addPhoto: 'Add photo',
  analyseReport: 'Analyse your blood report', upload: 'Upload',
  transformation: 'Transformation', uploadToSee: 'Upload to see', theMagic: 'The Magic',
  currentLook: 'Current Look', futureLook: 'Future Look',
  futureReady: ['Photo daalne par yahan AI tasveer banegi', 'An AI image appears here after you add a photo'],
  futureLabel: ['AI se bani tasveer — koi wada nahi', 'AI-made image — not a promise'],
  futureOff: ['Future Look band hai', 'Future Look is off'],
  futureWhy: ['Yeh AI se bani tasveer hai, asli result ka wada nahi. Chahein to hi chalu karein.', 'This is an AI-made image, not a promised result. Turn it on only if you want to.'],
  future18: ['Main 18+ hoon aur AI tasveer dekhna chahti hoon', 'I am 18+ and want to see an AI image'],
  future18m: ['Main 18+ hoon aur AI tasveer dekhna chahta hoon', 'I am 18+ and want to see an AI image'],
  futureOn: ['Chalu karein', 'Turn on'],
  uploadImage: 'Upload Image',
  scanLight: ['Roshni', 'Light'], scanDistance: ['Doori', 'Distance'], scanStraight: ['Seedha', 'Straight'], scanClear: ['Saaf', 'Clear'],
  scanStraightFix: ['Phone aankhon ki seedh mein rakhein', 'Hold the phone level with your eyes'],
  scanAnyway: ['Phir bhi photo lein', 'Take the photo anyway'],
  scanWait: ['Check ho raha hai…', 'Checking…'],
  scanTaken: ['Photo li gayi ✓', 'Photo taken ✓'],
  scanFrame: ['Chehra oval ke andar rakhein', 'Keep your face inside the oval'],
  labTitle: 'Lab Test at Home',
  labAt: ['Home collection at Kanpur 208002', 'Home collection at Kanpur 208002'],
  labStreetPh: ['e.g. Swaroop Nagar, Kanpur', 'e.g. Swaroop Nagar, Kanpur'],
});

// ── Meal scanner (F6) ──
add({
  breakfast: 'Breakfast', lunch: 'Lunch', snack: 'Snack', dinner: 'Dinner',
  usualTitle: ['Aapka usual', 'Your usual'],
  usualPoha: ['Poha + chai (nashta)', 'Poha + chai (breakfast)'],
  usualLunch: ['2 roti, dal, sabzi (lunch)', '2 roti, dal, sabzi (lunch)'],
  mealPlaceholder: ['Kya khaya? jaise "do roti, ek katori dal"', 'What did you eat? e.g. "do roti, ek katori dal"'],
  noMeals: ['Aaj abhi kuch log nahi hua', 'Nothing logged yet today'],
  mealPoha: 'Poha + chai', mealPohaP: ['1 plate poha · 1 cup chai', '1 plate poha · 1 cup chai'],
  mealPohaTip: ['Achha nashta! Poha ke saath 1 katori dahi ya mutthi bhar moongphali jodein — protein badhega, baalon ke liye achha.', 'Good breakfast! Add a bowl of curd or a handful of peanuts to the poha — more protein, good for hair.'],
  mealLunch: '2 roti, dal, sabzi', mealLunchP: ['2 roti · 1 katori dal · 1 katori sabzi', '2 roti · 1 bowl dal · 1 bowl sabzi'],
  mealLunchTip: ['Santulit thali! Saath mein 1 katori dahi ho to aur behtar — yahi kal ka step bhi hai.', 'Balanced plate! A bowl of curd with it is even better — that\'s tomorrow\'s step too.'],
  mealVoice: 'Roti + dal', mealVoiceP: ['2 roti · 1 katori dal', '2 roti · 1 bowl dal'],
  mealPortionNote: ['Portion roti aur katori mein liya gaya. Badalna ho to tap karein.', 'Portions are counted in rotis and bowls. Tap to change.'],
  mealDone: ['Theek hai', 'Done'],
});

// ── Expert Chat (F2, F9a, F9b) ──
add({
  baatein: ['baatein', 'chats'],
  baateinDef: ['baatein = is coach ke saath kul chats', 'chats = total conversations with this coach'],
  whoMakes: ['Kaun banata hai?', 'Who makes this?'],
  whoMakesBody: ['Har AI coach ko asli experts ne banaya aur jaancha hai. Coach AI hai — turant jawab deta hai, par doctor nahi.', 'Each AI coach was built and checked by real experts. The coach is AI — it replies instantly, but it is not a doctor.'],
  coachCount: ['18 AI coaches', '18 AI coaches'],
  taraCardTitle: ['Tara ke saath jaari rakhein', 'Continue with Tara'],
  taraCardSub: ['aapke goals jaanti hain', 'she knows your goals'],
});

// ── Chats (F1, F2, F4) ──
add({
  today: ['Aaj', 'Today'],
  intentListen: ['Bas sun lo 👂', 'Just listen 👂'],
  intentAct: ['Kuch karna hai ✅', 'Help me act ✅'],
  intentShow: ['Kuch dikhao 📺', 'Show me something 📺'],
  intentGap: ['8 ghante baad — aaj kaise madad karoon?', '8 hours later — how can I help today?'],
  aiDisclosure: ['Main AI coach hoon — doctor ya therapist nahi.', 'I am an AI coach — not a doctor or therapist.'],
  memSaved: ['Me mein save hua', 'Saved to Me'],
  memVratFood: ['Vrat mein sabudana khichdi', 'Sabudana khichdi on fasts'],
  memBreakfast: ['Nashta: poha', 'Breakfast: poha'],
  taraGoals: ['hair fall, energy aur thoda weight', 'hair fall, energy and a little weight'],
  nehaWater: ['Good morning! Subah se 2 glass paani pee liya 💧', 'Good morning! Had 2 glasses of water already 💧'],
  taraOpener: ['Namaste Neha! 🙏 2 glass paani — badhiya shuruaat. Aapke goals yaad hain — {goals}. Aaj kaise madad karoon?', 'Namaste Neha! 🙏 2 glasses of water — a good start. I remember your goals — {goals}. How can I help today?'],
  taraOpenerNoGoals: ['Namaste Neha! 🙏 2 glass paani — badhiya shuruaat. Aaj kaise madad karoon?', 'Namaste Neha! 🙏 2 glasses of water — a good start. How can I help today?'],
  taraListen: ['Zaroor. Main sun rahi hoon — jo mann mein hai, boliye. Koi plan nahi, bas baat.', 'Of course. I\'m listening — say whatever is on your mind. No plan, just talk.'],
  taraShowVrat: ['Aaj ke liye ek video — kyunki aap Mangalvar ko vrat rakhti hain:', 'One video for today — because you fast on Tuesdays:'],
  taraShowHair: ['Aaj ke liye ek video — kyunki aapka goal hair fall hai:', 'One video for today — because your goal is hair fall:'],
  taraAskVrat: ['Badhiya! Ek chhota sawaal — Mangalvar ke vrat mein aap aksar kya khaati hain?', 'Great! One small question — what do you usually eat on your Tuesday fast?'],
  taraAskBreakfast: ['Badhiya! Ek chhota sawaal — subah nashte mein aksar kya banta hai?', 'Great! One small question — what\'s usually cooked for breakfast?'],
  ansSabudana: 'Sabudana khichdi', ansFruit: ['Phal aur doodh', 'Fruit and milk'],
  ansPoha: 'Poha', ansParatha: 'Paratha',
  taraVratStep: ['Samajh gayi. Vrat wale din ke liye: sabudana thoda kam, makhana + dahi zyada. Isse energy bani rahegi. Maine yeh Mangalvar ke step mein daal diya.', 'Got it. For fast days: a little less sabudana, more makhana + curd. That keeps energy steady. I\'ve added it as Tuesday\'s step.'],
  taraBreakfastStep: ['Samajh gayi. Poha ke saath 1 katori dahi jod dein — protein badhega. Yeh kal ke step mein hai.', 'Got it. Add a bowl of curd to the poha — more protein. It\'s in tomorrow\'s step.'],
  taraAskReport: ['Aapke paas haal ki blood report hai? Upload kar dijiye — main 3 zaroori baatein nikaal doongi, free.', 'Do you have a recent blood report? Upload it — I\'ll pull out the 3 things that matter, free.'],
  uploadReport: ['Report upload karein', 'Upload report'],
  taraReportRead: ['Report padh li ✓ 3 baatein zaroori hain: B12 kam, Vitamin D kam, aur HbA1c par dhyan dena hai. Pehli read free hai.', 'Report read ✓ 3 things matter: low B12, low Vitamin D, and HbA1c to watch. The first read is free.'],
  repOpen: ['Next steps dekhein', 'See next steps'],
  taraHandoff: ['Baalon ke liye Dev se baat karwa doon? Unhe aapki report ke 3 points pehle se pata honge.', 'Shall I connect you to Dev for your hair? He\'ll already know the 3 points from your report.'],
  notNow: ['Abhi nahi', 'Not now'],
  callTara: ['Call Tara', 'Call Tara'], callDev: 'Call Dev',
  mealPlan: ['Meal Plan', 'Meal Plan'],
  sleepStory: ['Sleep story', 'Sleep story'],
  handoffFromTara: ['Tara ne joda · 7:02 PM', 'Connected by Tara · 7:02 PM'],
  devDirect: ['Dev ko aapka Me card dikhta hai', 'Dev can see your Me card'],
  devOpenerDirect: ['Namaste Neha! Aapka Me card dekha — baalon ke liye shuru karte hain roz ki dahi aur subah ki dhoop se?', 'Namaste Neha! I\'ve seen your Me card — shall we start your hair plan with daily curd and morning sun?'],
  devKnows: ['Dev ko yeh pata hai:', 'Dev knows:'],
  devPrivateNote: ['Private cheezein share nahi hoti jab tak aap na chahein.', 'Private items are not shared unless you choose.'],
  ctxB12: ['B12 kam', 'low B12'], ctxVitD: ['Vitamin D kam', 'low Vitamin D'], ctxVeg: 'veg', ctxHair: 'hair fall', ctxVrat: ['Mangalvar vrat', 'Tuesday fast'],
  devOpener: ['Namaste Neha! Tara ne bataya — shuru karte hain roz ki dahi aur subah ki dhoop se?', 'Namaste Neha! Tara told me — shall we start with daily curd and morning sun?'],
  devOpenerNoReport: ['Namaste Neha! Tara ne bataya — baalon ke liye shuru karte hain roz ki dahi se?', 'Namaste Neha! Tara told me — shall we start your hair plan with daily curd?'],
  devYes: ['Haan, shuru karein', 'Yes, let\'s start'],
  devAsk: ['Doctor se kya poochhun?', 'What should I ask my doctor?'],
  devReplyYes: ['Badhiya. Yeh dono Tara ke step mein pehle se hain, toh kuch naya nahi jodenge. 2 hafte baad baalon ki ek photo lein — farak dekhenge.', 'Great. Both are already in Tara\'s step, so nothing new to add. Take a hair photo in 2 weeks — we\'ll compare.'],
  devReplyAsk: ['Poochhiye: "B12 aur Vitamin D kam hai — kya ilaaj chahiye, aur kab dobara test karein?" Dose doctor hi batayenge.', 'Ask: "My B12 and Vitamin D are low — what treatment do I need, and when should I retest?" Only your doctor should set a dose.'],
  devCtxTitle: ['Dev ko kya dikhe?', 'What Dev can see'],
  devCtxSub: ['Jo hataenge, Dev use nahi dekhega.', 'Anything you untick, Dev won\'t see.'],
});

// ── Me card (F1, F10) ──
add({
  meTitle: ['Mera health card', 'My health card'],
  meSub: ['Tara, Dev aur baaki coaches yahi dekhte hain.', 'Tara, Dev and the other coaches see exactly this.'],
  meSubRohit: ['Aapke coaches yahi dekhte hain. Neha ko sirf ghar ka khana dikhta hai.', 'Your coaches see exactly this. Neha only sees the shared kitchen.'],
  meBasics: ['Basics', 'Basics'], meKitchen: ['Ghar & khana', 'Home & food'], meRoutine: ['Routine', 'Routine'], meGoals: 'Goals',
  meReports: ['Reports', 'Reports'], mePrivate: ['Private', 'Private'], meCheckins: ['Check-ins', 'Check-ins'], meFamily: ['Ghar ke log', 'Household'],
  mePrivateEmpty: ['Coach poochhega jab zaroorat ho', 'A coach will ask only when needed'],
  mePrivateRule: ['Bimari ya dawai yahan rahegi — sirf aapko dikhegi. Har item par "Dev ko dikhayein?" ka option hoga.', 'Conditions or medicines stay here — only you see them. Each item gets a "Show to Dev?" option.'],
  meNoReport: ['Abhi koi report nahi · Upload karein →', 'No report yet · Upload →'],
  meForget: ['Bhool jao', 'Forget'],
  meForgot: ['Bhool gaye. Coaches ab ise use nahi karenge.', 'Forgotten. Coaches won\'t use it any more.'],
  meUndo: ['Wapas laayein', 'Undo'],
  meForgottenCount: ['{n} cheez(ein) bhula di gayi', '{n} item(s) forgotten'],
  meNeutral: ['preview neutral', 'neutral preview'],
  meDetailed: ['preview mein details', 'detailed preview'],
  meInvite: ['Rohit ko jodein', 'Add Rohit'],
  meInviteAgain: ['Kisi aur ko jodein', 'Add someone else'],
  meRohitShares: ['Sirf ghar ka khana share · health private', 'Only the kitchen is shared · health stays private'],
  rohitDidStep: ['Rohit ne aaj step kiya ✓', 'Rohit did his step today ✓'],
  freq_daily: ['Roz', 'Daily'], freq_thrice: ['Hafte mein 3 baar', '3 times a week'], freq_important: ['Sirf zaroori', 'Only important'],
});

// ── Report (F4) ──
add({
  uploadTitle: 'Upload for Analysis',
  pickFile: ['File chuniye', 'Choose a file'],
  upStart: ['Upload karein', 'Upload'],
  upUploading: ['Upload ho raha hai {pct}%', 'Uploading {pct}%'],
  upReading: ['Padh rahe hain (~30 sec)', 'Reading (~30 sec)'],
  upDone: ['Ho gaya ✓', 'Done ✓'],
  upContinue: ['Aap chat jaari rakh sakti hain — ready hote hi batayenge.', 'You can keep chatting — we\'ll tell you when it\'s ready.'],
  upContinueM: ['Aap chat jaari rakh sakte hain — ready hote hi batayenge.', 'You can keep chatting — we\'ll tell you when it\'s ready.'],
  repTitle: ['Aapki report: 3 baatein jo zaroori hain', 'Your report: 3 things that matter'],
  repInReview: ['Expert review mein ⏳ · aam taur par 24 ghante mein', 'In expert review ⏳ · usually within 24 hours'],
  repReviewed: ['Reviewed ✓ — {who}', 'Reviewed ✓ — {who}'],
  repReviewComment: ['B12 aur Vitamin D ke liye doctor se zaroor milein. Dahi aur dhoop wala plan theek hai.', 'Do see a doctor about B12 and Vitamin D. The curd and sunlight plan is fine.'],
  stLow: ['Kam', 'Low'], stWatch: ['Dhyan dein', 'Watch'], stOk: ['Theek', 'Normal'],
  repB12Do: ['Doctor se poochhein: kya ilaaj chahiye?', 'Ask your doctor: what treatment is needed?'],
  repB12Food: ['Roz dahi, doodh ya paneer', 'Curd, milk or paneer every day'],
  repVitDRange: ['20 se kam = deficient', 'below 20 = deficient'],
  repVitDDo: ['Doctor se dose ke baare mein poochhein', 'Ask your doctor about the dose'],
  repVitDFood: ['Roz thodi subah ki dhoop', 'A little morning sun every day'],
  repHbRange: ['normal 5.7 se kam', 'normal below 5.7'],
  repHbA1cDo: ['Pre-diabetes range ho sakti hai — doctor se confirm karein', 'May be in the pre-diabetes range — confirm with your doctor'],
  repMore: ['Aur dekhein', 'See more'],
  repDocQ: ['Doctor ke liye sawaal', 'Questions for your doctor'],
  repQ1: ['B12 kam hai — kya ilaaj chahiye?', 'My B12 is low — what treatment do I need?'],
  repQ2: ['Vitamin D ke liye kitna aur kab tak lena hai?', 'How much Vitamin D should I take, and for how long?'],
  repQ3: ['HbA1c 5.9% hai — kya aur test chahiye?', 'My HbA1c is 5.9% — do I need more tests?'],
  copy: ['Copy', 'Copy'], share: ['Share', 'Share'], copied: ['Copy ho gaya ✓', 'Copied ✓'],
  repWeek: ['Is hafte', 'This week'],
  repSwap: ['Dopahar ki roti ke saath 1 katori dahi', 'One bowl of curd with lunch'],
  repSwapCta: ['Roz ke step mein jodein', 'Add to my daily step'],
  repSwapAdded: ['Step mein jud gaya ✓', 'Added to your step ✓'],
  repRetest: ['Dobara test: Day 90 (4 Feb)', 'Retest: Day 90 (4 Feb)'],
  repRetestSub: ['Ek hafta pehle yaad dilayenge', 'We\'ll remind you a week before'],
  repFooter: ['Yeh salah hai, ilaaj nahi. Dawai ya dose ke liye apne doctor se milein.', 'This is guidance, not treatment. See your doctor for any medicine or dose.'],
});

// ── SuperTV (F5) ──
add({
  pickedForYou: 'Picked For You',
  tvBanner: ['{name}, aaj ke liye ek video — {reason}', '{name}, one video for today — {reason}'],
  pickNehaTitle: ['Vrat mein energy kaise bani rahe', 'Keeping energy up while fasting'],
  pickNehaMeta: '4 min · Ep 1/5',
  pickNehaReason: ['kyunki aap Mangalvar ko vrat rakhti hain', 'because you fast on Tuesdays'],
  pickNehaFallback: ['Baalon ke liye protein — ghar ka khana', 'Protein for hair — home food'],
  pickNehaFallbackMeta: '4 min · Ep 1/4',
  pickNehaFallbackReason: ['kyunki aapka goal hair fall hai', 'because your goal is hair fall'],
  pickRohitTitle: ['2-minute deep breathing', '2-minute deep breathing'],
  pickRohitMeta: '2 min',
  pickRohitReason: ['kyunki aapne kaha office ke baad tension rehti hai', 'because you said you feel tense after work'],
  tvUseful: ['Kaam ka laga?', 'Was this useful?'],
  tvYes: ['Haan 👍', 'Yes 👍'],
  tvOther: ['Kuch aur dikhao', 'Show me something else'],
  tvThanks: ['Shukriya! Kal isi tarah ka agla episode.', 'Thanks! Tomorrow, the next episode like this.'],
  tvMore: ['Theek hai — kal kuch alag dikhayenge.', 'Okay — we\'ll show something different tomorrow.'],
  tvSimilar: ['2 aur isi tarah', '2 more like this'],
  tvSeeAll: ['Sab dekhein', 'See all'],
  tvBack: ['Wapas', 'Back'],
  tvAllTitle: ['Tara ki saari picks', 'All of Tara\'s picks'],
  tvAllSub: ['Lock wali videos par keemat pehle se likhi hai.', 'Locked videos show their price up front.'],
  tvLockedNote: ['Yeh video {price} plan mein hai. "Kya milta hai" mein saare plan dekhein.', 'This video is in the {price} plan. See every plan in "What you get".'],
});

// ── Profile + check-ins (F7) ──
add({
  profMeCard: ['Mera health card', 'My health card'],
  profCheckins: ['Check-ins aur privacy', 'Check-ins and privacy'],
  ckSub: ['Tara kab, kahan aur kaise yaad dilaye — aap tay karein', 'You decide when, where and how Tara checks in'],
  ckChannel: ['Kahan', 'Where'], ckFreq: ['Kitni baar', 'How often'], ckTime: ['Samay', 'Time'],
  ckChai: ['chai ke time', 'chai time'],
  ckQuiet: ['Quiet hours', 'Quiet hours'],
  ckStyle: ['Bhasha ka andaaz', 'Language style'],
  styleHindi: ['Simple Hindi', 'Simple Hindi'],
  ckNeutral: ['Notification mein health ki baatein na dikhayein', 'Don\'t show health details in notifications'],
  ckPreview: ['Aisa dikhega:', 'It will look like this:'],
  previewNeutral: ['Aaj ka step ready hai ☀️', 'Today\'s step is ready ☀️'],
  previewDetailed: ['Vitamin D kam hai — chai ke baad 10 min dhoop ☀️', 'Low Vitamin D — 10 min of sun after chai ☀️'],
});

// ── WhatsApp mock (F3, F7) ──
add({
  lockDate: ['Shanivaar, 7 November', 'Saturday, 7 November'],
  now: ['abhi', 'now'],
  waNotOpted: ['WhatsApp opt-in nahi kiya, isliye app notification aaya.', 'No WhatsApp opt-in, so this came as an app notification.'],
  waBusiness: ['Business account', 'Business account'],
  waOptedNote: ['Aapne onboarding mein WhatsApp reminder chuna tha. "STOP" bhejein to band.', 'You chose WhatsApp reminders in onboarding. Send "STOP" to turn off.'],
  waMsg: ['Suprabhat Neha ☀️ Aaj ka step: {step}', 'Good morning Neha ☀️ Today\'s step: {step}'],
  waDone: ['Ho gaya', 'Done'],
  waThanks: ['Shabaash! 🔥 Is hafte {n} din. App mein ring update ho gayi.', 'Well done! 🔥 {n} day(s) this week. Your ring in the app is updated.'],
  waOpenApp: ['SuperLiving kholein', 'Open SuperLiving'],
});

// ── Invite + Rohit onboarding (F10) ──
add({
  invSendTo: ['Bhejein…', 'Send to…'],
  invRecent: ['Haal ke chats', 'Recent chats'],
  invHusband: ['Pati', 'Husband'],
  invPreview: ['Message', 'Message'],
  invCardTitle: ['Neha ne aapko ghar ke plan mein joda', 'Neha added you to the household plan'],
  invCardBody: ['Ghar ka khana share hota hai. Aapki health private rehti hai.', 'The kitchen is shared. Your health stays private.'],
  invMessage: ['Rohit, SuperLiving par aa jao — ghar ke khane ka plan pehle se bana hai, bas apne goals bata do 🙂', 'Rohit, join me on SuperLiving — the home-food plan is ready, just add your own goals 🙂'],
  invSend: ['Bhejein', 'Send'],
  invOpenAsRohit: ['Rohit ke phone par dekhein', 'See it on Rohit\'s phone'],
  invDemoHint: ['Demo: persona Rohit par badal jayega', 'Demo: switches the persona to Rohit'],
  rohitOnbTitle: ['Namaste Rohit! 🙏', 'Namaste Rohit! 🙏'],
  rohitOnbSub: ['Ghar ki baatein Neha ke card se aa gayi hain. Bas apne baare mein bata dijiye.', 'Household details came from Neha\'s card. Just tell us about yourself.'],
  rohitAlready: ['Pehle se pata hai', 'Already known'],
  rohitPrivateNote: ['Neha ki health details aapko nahi dikhti — sirf ghar ka khana share hai.', 'You can\'t see Neha\'s health details — only the kitchen is shared.'],
  chipRohitKitchen: ['🏠 Ghar ka khana: Neha ke card se ✓', '🏠 Home kitchen: from Neha\'s card ✓'],
  rohitExample: ['Jaise: Main Rohit, bank mein kaam karta hoon. Office ke baad tension rehti hai, neend theek nahi aati.', 'For example: I\'m Rohit, I work at a bank. I feel tense after office and don\'t sleep well.'],
  chipRohitName: ['👤 Rohit · Neha ke pati', '👤 Rohit · Neha\'s husband'],
  chipRohitWork: ['💼 Bank mein kaam', '💼 Works at a bank'],
  onbOneMore: ['Bas 1 cheez aur', 'Just 1 more thing'],
  onbAgeQ: ['Aapki umar?', 'Your age?'],
  chipRohitGoals: ['🎯 Stress · Neend · Pet ki charbi', '🎯 Stress · Sleep · Belly fat'],
  chipRohitSleep: ['🌙 Neend theek nahi', '🌙 Not sleeping well'],
  chipRohitSex: ['♂️ Purush', '♂️ Man'],
  chipRohitSexWhy: ['"karta hoon" se', 'from "karta hoon"'],
  rohitShareToggle: ['Neha ko dikhayein jab main apna step karun ("Rohit ne aaj step kiya ✓")', 'Show Neha when I do my step ("Rohit did his step today ✓")'],
});

// ── Rohit evening chat (F11) ──
add({
  rohitMorning: ['Suprabhat Rohit! Aaj ka step: office se aakar 10 min chhat par walk 🚶', 'Good morning Rohit! Today\'s step: a 10-min terrace walk after office 🚶'],
  rohitReflect: ['Lag raha hai aaj office ka pressure bahut bhaari raha, aur ghar aakar kuch karne ki himmat nahi bachi. Aisa lagna bilkul samajh aata hai.', 'It sounds like today\'s office pressure was really heavy, and there\'s no energy left after coming home. That makes complete sense.'],
  rohitGentleQ: ['Abhi sabse zyada kya mehsoos ho raha hai — thakaan, ya mann ka bojh?', 'What are you feeling most right now — tiredness, or a weight on your mind?'],
  feelTired: ['Thakaan zyada', 'Mostly tired'],
  feelHeavy: ['Mann ka bojh', 'A weight on my mind'],
  rohitOffer: ['Theek hai. Aaj kuch theek karna zaroori nahi. Chahein to:', 'Okay. Nothing needs fixing tonight. If you like:'],
  offerBreath: ['2-min saans wala break', '2-min breathing break'],
  offerTomorrow: ['Kal ke liye ek chhota step?', 'One small step for tomorrow?'],
  breathIn: ['Saans andar… 4… 3… 2…', 'Breathe in… 4… 3… 2…'],
  rohitTomorrow: ['Kal office se aakar 10 min chhat par walk? Bas itna. Aaj aaram kariye. 🌙', 'Tomorrow after office, a 10-min terrace walk? That\'s all. Rest tonight. 🌙'],
  crisisMsg: ['Kabhi lagta hai ab aur nahi ho payega, sab chhod doon.', 'Sometimes I feel I can\'t go on, like giving up on everything.'],
  safetyTitle: ['Aap akele nahi hain. Abhi baat karein:', 'You are not alone. Talk to someone now:'],
  safetyTele: ['Free · 24x7 · kai bhashaon mein', 'Free · 24x7 · many languages'],
  safetyCall: ['Call 14416', 'Call 14416'],
  safetyMsg: ['Kisi apne ko message', 'Message someone close'],
  safetyCallback: ['SuperLiving se call back maangein', 'Ask SuperLiving to call back'],
  safetyCallbackDone: ['Request bhej di. Hamari team ka ek insaan aapko call karega.', 'Request sent. A person from our team will call you.'],
  safetyQuiet: ['Agle 24 ghante koi reminder, streak ya offer nahi aayega — jab tak aap na kahein.', 'For the next 24 hours: no reminders, streaks or offers — unless you ask.'],
});

// ── Together + Roadmap (F12) ──
add({
  togTitle: ['Saath mein karein', 'Do it together'],
  togSub: ['Jo SuperLiving mein aaj hai, usi se shuru:', 'Start with what SuperLiving already has:'],
  togYoga: ['Kal subah 6 AM Live Yoga', 'Live Yoga, tomorrow 6 AM'],
  togYogaSub: ['Super Pro live classes · 30 min', 'Super Pro live classes · 30 min'],
  togYogaCta: ['Yaad dilayein', 'Remind me'],
  togReminder: ['Kal 5:50 AM yaad dilayenge ✓', 'We\'ll remind you at 5:50 AM ✓'],
  togCommunity: ['WhatsApp community join karein', 'Join the WhatsApp community'],
  togCommunitySub: ['Roz ke tips aur saathi', 'Daily tips and company'],
  roadTitle: ['Apne jaise log dhoondhein', 'Find people like you'],
  roadTeaser: ['Shehar aur activity ke clubs', 'Clubs by city and activity'],
  roadSub: ['Kanpur mein, aapke goals aur routine ke hisaab se:', 'In Kanpur, matched to your goals and routine:'],
  club1: ['Kanpur Morning Walk Club', 'Kanpur Morning Walk Club'],
  club1m: ['Moti Jheel, 6:30 AM · organiser verified · 34 members', 'Moti Jheel, 6:30 AM · organiser verified · 34 members'],
  club2: ['Ghar ka healthy khana circle', 'Healthy home-food circle'],
  club2m: ['Online, Ravivar', 'Online, Sundays'],
  club3: ['Office ke baad 15-min stretch', '15-min stretch after office'],
  club3m: ['Online, roz 7:15 PM', 'Online, daily 7:15 PM'],
  club4: ['Mahila walking group', 'Women\'s walking group'],
  club4m: ['Sirf mahilayein', 'Women only'],
  roadGoal: ['Is hafte club ne 212 din step pure kiye', 'This week the club completed 212 step-days'],
  roadPhases: ['Kaise aayega', 'How it rolls out'],
  phase1When: ['Agla', 'Next'], phase1: ['Online groups — live classes aur WhatsApp community par', 'Online groups — built on live classes and the WhatsApp community'],
  phase2When: ['Baad mein', 'Later'], phase2: ['Verified organiser wale clubs, 3 pilot shehron mein', 'Verified-organiser clubs in 3 pilot cities'],
  phase3When: ['Uske baad', 'Later still'], phase3: ['Opt-in buddy matching — goal, routine aur shehar se', 'Opt-in buddy matching by goal, routine and city'],
  joinTitle: ['Club join karein', 'Join club'],
  joinWhen: ['Roz 6:30 AM', 'Daily 6:30 AM'],
  joinPrivacyTitle: ['Aapki privacy', 'Your privacy'],
  joinPrivacy: ['Sirf naam aur shehar dikhega · health details kabhi nahi · DMs band (v1)', 'Only your name and city show · never health details · DMs off (v1)'],
  joinCta: ['Join karein', 'Join'],
  roadNotLive: ['Roadmap: abhi live nahi', 'Roadmap: not live yet'],
});

// ── Day 30 (F3, F4, HITL) ──
add({
  d30Date: ['Ravivar, 6 December · Day 30', 'Sunday, 6 December · Day 30'],
  d30Title: ['Aapke 30 din', 'Your 30 days'],
  d30Days: ['din step pura', 'days with your step done'],
  d30Week: ['Hafta {n}', 'Week {n}'],
  d30Habit: ['Aadat ban rahi hai. Chhoote din ginti nahi todte.', 'The habit is forming. Missed days don\'t reset the count.'],
  d30Human: ['Insaan coach · Registered Dietitian', 'Human coach · Registered Dietitian'],
  d30Voice: ['Plateau aaya hai? Lunch mein ek badlaav karte hain.', 'Hit a plateau? Let\'s make one change at lunch.'],
  d30Why: ['2 hafte se progress ruki hai, isliye Ritu ne khud message kiya.', 'Progress has been flat for 2 weeks, so Ritu messaged you herself.'],
  d30Retest: ['Dobara test: {date}', 'Retest: {date}'],
  d30RetestSub: ['B12, Vitamin D aur HbA1c dobara dekhenge', 'We\'ll recheck B12, Vitamin D and HbA1c'],
  d30DaysLeft: ['din baaki', 'days left'],
});

// ── Courses (unchanged) + misc ──
add({
  course3: 'Hair Fall Control in 60 days',
  course4: 'PCOS Diet Plan (3-Months)',
  startCourseA: 'Start course at',
  perMonthLong: 'per month',
  introBy: ['A visiting product manager — not part of SuperLiving', 'A visiting product manager — not part of SuperLiving'],
});

// ── Proofread pass: answer-aware chat replies, tuition, handoff decline ──
add({
  memVratFoodLabel: ['Vrat', 'Fasting'],
  memBreakfastLabel: ['Nashta', 'Breakfast'],
  taraVratStepFruit: ['Achha hai! Saath mein makhana + dahi jod dein — protein milega, energy bani rahegi. Maine yeh Mangalvar ke step mein daal diya.', 'Good choice! Add makhana + curd for protein and steady energy. I\'ve added it as Tuesday\'s step.'],
  taraBreakfastStepParatha: ['Samajh gayi. Paratha ke saath 1 katori dahi lein, aur ghee thoda kam. Yeh kal ke step mein hai.', 'Got it. Have a bowl of curd with the paratha, and a little less ghee. It\'s in tomorrow\'s step.'],
  taraAskTuition: ['Ek aur — din mein kab busy rehti hain, taaki us waqt message na karoon?', 'One more — when are you busy during the day, so I don\'t message then?'],
  ansTuition: ['Shaam 4–7 tuition padhati hoon', 'I teach tuition 4–7 pm'],
  ansNoFixed: ['Koi fixed time nahi', 'No fixed time'],
  taraTuitionAck: ['Theek hai — 4 se 7 ke beech koi message nahi aayega.', 'Okay — no messages between 4 and 7.'],
  taraNoFixedAck: ['Theek hai. Aapke chai ke time par hi yaad dilaungi.', 'Okay. I\'ll remind you only at your chai time.'],
  memTuition: ['Shaam 4–7 tuition · tab message nahi', 'Tuition 4–7 pm · no messages then'],
  taraHandoffLater: ['Koi baat nahi. Jab chahein, "Dev se baat" likh dijiye.', 'No problem. Whenever you want, just type "talk to Dev".'],
});

// ── Spoken transcripts (Hinglish = exactly the synthetic §12 data) ──
add({
  transcriptNeha: [_neha.transcript, 'I’m Neha, 34, from Kanpur. There are 6 of us at home and I do the cooking. My hair is falling a lot, I feel tired all the time, and I want to lose a little weight. I’m vegetarian and I fast on Tuesdays.'],
  transcriptRohit: [_rohit.transcript, 'I’m Rohit, Neha’s husband. I work at a bank. After office I feel very tired and tense, I don’t sleep well, and my belly is growing.'],
  rohitVoiceNote: [_rohit.eveningVoiceNote, 'There was a lot of pressure at the office today. I don’t feel like doing anything after coming home.'],
});

// ── Rohit's own usual meal ──
add({
  usualOffice: ['Chai + 2 biscuit (office)', 'Chai + 2 biscuits (office)'],
  mealOffice: 'Chai + biscuit', mealOfficeP: ['1 cup chai · 2 biscuit', '1 cup chai · 2 biscuits'],
  mealOfficeTip: ['Office ki chai ke saath biscuit ki jagah mutthi bhar bhuna chana lein — pet bhara rahega.', 'Swap the biscuits for a handful of roasted chana with your office chai — keeps you full longer.'],
});
