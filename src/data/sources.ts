// Sources — CLAUDE.md §13
export type SourceId =
  | 'memo' | 'reviews' | 'jama' | 'hybrid' | 'lally' | 'ii' | 'habuild' | 'duo' | 'seekho' | 'pocketfm'
  | 'ccpa' | 'endorse' | 'apa' | 'telemanas' | 'prolific' | 'familydm' | 'kerala' | 'nfhs' | 'chatform'
  | 'chatform2' | 'ultrahuman' | 'eka' | 'meta' | 'strava' | 'dpdp' | 'refs';

export interface Source { id: SourceId; label: string; link?: string; status?: string }

export const sources: Record<SourceId, Source> = {
  memo: { id: 'memo', label: 'Lightspeed India, The Investment Memo: SuperLiving (Oct 2026)', link: 'https://lsip.substack.com/p/the-investment-memo-superliving' },
  reviews: { id: 'reviews', label: "Author's coding of the 50 latest 1–2★ Google Play reviews (Nov 2026): crashes 9, \"just AI/fake\" 9, billing/refunds 8, plan fit 6, paywall stacking 5", status: 'internal' },
  jama: { id: 'jama', label: 'JAMA RCT: AI-led vs human-led Diabetes Prevention Program, 368 adults, 31.7% vs 31.9%', link: 'https://jamanetwork.com/journals/jama/fullarticle/2840703' },
  hybrid: { id: 'hybrid', label: 'Univ. of Michigan / HealthifyMe: human + AI coaching, 74% more weight loss than AI alone', link: 'https://news.umich.edu/human-ai-coaching-models-boost-weight-loss/' },
  lally: { id: 'lally', label: 'Lally et al. 2010, How are habits formed — median 66 days, range 18–254', link: 'https://www.researchgate.net/publication/32898894_How_are_habits_formed_Modeling_habit_formation_in_the_real_world' },
  ii: { id: 'ii', label: 'Gollwitzer & Sheeran (2006), Advances in Experimental Social Psychology 38 — implementation intentions meta-analysis, 94 tests, d = 0.65', status: 'primary paper; verify before demo (secondary summary seen)' },
  habuild: { id: 'habuild', label: 'Habuild: WhatsApp reminders, streaks, fixed batch timings', link: 'https://habuild.in/online-yoga-classes-in-pune' },
  duo: { id: 'duo', label: 'Duolingo Blog: streak experiments; bingers more likely to abandon', link: 'https://making.duolingo.com/how-streaks-keep-duolingo-learners-committed-to-their-language-goals' },
  seekho: { id: 'seekho', label: 'Elevation Capital on Seekho: 2–5 min episodic videos for Tier 2+', link: 'https://elevationcapital.com/investing-in-seekho' },
  pocketfm: { id: 'pocketfm', label: 'Pocket FM App Store reviews on rising unlock costs', link: 'https://apps.apple.com/app/1538433480' },
  ccpa: { id: 'ccpa', label: 'CCPA Guidelines for Prevention and Regulation of Dark Patterns, 2023 (13 patterns) — Deloitte summary', link: 'https://www2.deloitte.com/content/dam/Deloitte/in/Documents/tax/in-tax-gbt-the-guidelines-for-prevention-and-regulation-of-dark-patterns-noexp.pdf' },
  endorse: { id: 'endorse', label: 'CCPA Guidelines on Misleading Ads and Endorsements, 2022', link: 'https://www.mondaq.com/india/advertising-marketing-branding/1201534/ccpa-releases-guidelines-for-prevention-of-misleading-advertisements-and-endorsements-for-misleading-advertisements-2022' },
  apa: { id: 'apa', label: 'APA Health Advisory on GenAI chatbots and wellness apps (Nov 2025)', link: 'https://www.apa.org/news/press/releases/2025/11/ai-wellness-apps-mental-health' },
  telemanas: { id: 'telemanas', label: 'Tele-MANAS 14416, 24x7, ~20 languages', link: 'https://www.manoramayearbook.in/current-affairs/india/2025/04/05/tele-manas-programme-explained.html' },
  prolific: { id: 'prolific', label: 'PROLIFIC family-based weight trial, India', link: 'https://pubmed.ncbi.nlm.nih.gov/40127979/' },
  familydm: { id: 'familydm', label: 'Family-involvement trial in type 2 diabetes', link: 'https://www.sciencedirect.com/science/article/abs/pii/S0738399118305354' },
  kerala: { id: 'kerala', label: 'Kerala Diabetes Prevention Program (peer support)', link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5991386/' },
  nfhs: { id: 'nfhs', label: "NFHS-6 women's phone ownership 63.6% (rural 57.4%)", link: 'https://www.thenewsminute.com/news/womens-internet-use-nearly-doubles-but-access-gaps-remain' },
  chatform: { id: 'chatform', label: 'Chatbot vs online form for health data (69.9% preferred chatbot; slower)', link: 'https://www.frontiersin.org/journals/digital-health/articles/10.3389/fdgth.2022.954069/text' },
  chatform2: { id: 'chatform2', label: 'KU Leuven: web surveys often give better data quality', link: 'https://lirias.kuleuven.be/retrieve/697279' },
  ultrahuman: { id: 'ultrahuman', label: 'Ultrahuman Vision Cloud: free blood-report interpretation', link: 'https://www.indiatvnews.com/amp/technology/news/ultrahuman-launches-vision-cloud-app-free-health-interpreter-in-india-details-2025-11-08-1016472' },
  eka: { id: 'eka', label: 'Eka Care: free health records app (ABHA)', status: 'label only; add link if verified' },
  meta: { id: 'meta', label: 'WhatsApp Business messaging rules (opt-in; purpose-specific bots)', status: 'label only; add link if verified' },
  strava: { id: 'strava', label: 'Strava clubs by activity and location (pattern reference)', status: 'label only' },
  dpdp: { id: 'dpdp', label: 'DPDP Rules: main duties from 14 May 2027; verifiable parental consent for under-18', status: 'label only; add link if verified' },
  refs: { id: 'refs', label: "Author's screenshots of the current SuperLiving app (Nov 2026), personal details blurred; not included in the build", status: 'internal' },
};
