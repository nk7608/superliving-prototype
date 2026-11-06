import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { DemoProvider } from './DemoContext';
import { Layout } from './Layout';
import { IntroScreen } from '../notes/IntroScreen';
import { ChangesIndex } from '../notes/ChangesIndex';
import { Onboarding } from '../screens/Onboarding';
import { Home } from '../screens/Home';
import { WhatsApp } from '../screens/WhatsApp';
import { Health } from '../screens/Health';
import { MealScanner } from '../screens/MealScanner';
import { ExpertChat } from '../screens/ExpertChat';
import { TaraChat } from '../screens/TaraChat';
import { DevChat } from '../screens/DevChat';
import { SuperTV } from '../screens/SuperTV';
import { Profile } from '../screens/Profile';
import { Invite } from '../screens/Invite';
import { RohitChat } from '../screens/RohitChat';
import { Together } from '../screens/Together';
import { Day30 } from '../screens/Day30';
import { Courses } from '../screens/Courses';
import { CoachChat } from '../screens/CoachChat';

export function App() {
  return (
    <HashRouter>
      <MotionConfig reducedMotion="user">
        <DemoProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<IntroScreen />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/home" element={<Home />} />
              <Route path="/whatsapp" element={<WhatsApp />} />
              <Route path="/health" element={<Health />} />
              <Route path="/meal" element={<MealScanner />} />
              <Route path="/experts" element={<ExpertChat />} />
              <Route path="/chat/tara" element={<TaraChat key="chat" />} />
              <Route path="/me" element={<TaraChat key="me" mode="me" />} />
              <Route path="/report" element={<TaraChat key="report" mode="report" />} />
              <Route path="/chat/dev" element={<DevChat />} />
              <Route path="/chat/coach/:id" element={<CoachChat />} />
              <Route path="/chat/coach" element={<Navigate to="/chat/coach/rashmi" />} />
              <Route path="/tv" element={<SuperTV />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/invite" element={<Invite />} />
              <Route path="/rohit-chat" element={<RohitChat />} />
              <Route path="/together" element={<Together />} />
              <Route path="/day30" element={<Day30 />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/changes" element={<ChangesIndex />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        </DemoProvider>
      </MotionConfig>
    </HashRouter>
  );
}
