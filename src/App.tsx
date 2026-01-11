import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { CTA } from './components/CTA';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { LatestPosts } from './components/LatestPosts';
import { CopilotChat } from './components/CopilotChat';
import { ChatBubble } from './components/ChatBubble';
import { useState } from 'react';
import { FloatingDrawer } from './components/FloatingDrawer';
import { JourneySurvey } from './components/JourneySurvey';
import questionsData from '../CTAJourneyQuestions.json';
import { PageView } from './components/PageView';
import { LatestPostsArchive } from './components/LatestPostsArchive';
import FeatureView from './components/FeatureView';


function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero onOpenDrawer={() => setDrawerOpen(true)} />
              <Features />
              <CTA />
              <LatestPosts />
              <ContactForm />
            </>
          } />
          <Route path="/feature/:slug" element={<FeatureView />} />
          <Route path="/latest-posts" element={<LatestPostsArchive />} />
          <Route path="/:slug" element={<PageView />} />
        </Routes>
        <CopilotChat open={chatOpen} onClose={() => setChatOpen(false)} />
      </main>
      <CookieConsent />
      <Footer />
      {!chatOpen && <ChatBubble onClick={() => setChatOpen(true)} />}
      <FloatingDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <JourneySurvey
          questions={questionsData.map((q, i) => {
            const type = q.type === 'text-area' ? 'text' : q.type;
            let options: string[] | undefined = undefined;
            if (type === 'radio' && i === 0) options = ['Collaborative', 'Innovative', 'Supportive', 'Results-driven'];
            if (type === 'checkbox' && i === 1) options = ['Email', 'Chat', 'Video Calls', 'In-person'];
            if (type === 'radio' && i === 2) options = ['Lack of clarity', 'Poor tools', 'Low engagement', 'Siloed work'];
            return {
              id: `q${i+1}`,
              type: type as 'radio' | 'checkbox' | 'text',
              question: q.title,
              ...(options ? { options } : {})
            };
          })}
          onComplete={() => {}}
        />
      </FloatingDrawer>
    </>
  );
}

export default App;
