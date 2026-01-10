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
import { PageView } from './components/PageView';
import FeatureView from './components/FeatureView';


function App() {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <CTA />
              <ContactForm />
              <LatestPosts />
            </>
          } />
          <Route path="/feature/:slug" element={<FeatureView />} />
          <Route path="/:slug" element={<PageView />} />
        </Routes>
        <CopilotChat open={chatOpen} onClose={() => setChatOpen(false)} />
      </main>
      <CookieConsent />
      <Footer />
      {!chatOpen && <ChatBubble onClick={() => setChatOpen(true)} />}
    </>
  );
}

export default App;
