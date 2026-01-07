import './App.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { CTA } from './components/CTA';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { LatestPosts } from './components/LatestPosts';
import { CopilotChat } from './components/CopilotChat';
import { ChatBubble } from './components/ChatBubble';
import { useState } from 'react';


function App() {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <CTA />
        <ContactForm />
        <CopilotChat open={chatOpen} onClose={() => setChatOpen(false)} />
      </main>
      <LatestPosts />
      <Footer />
      {!chatOpen && <ChatBubble onClick={() => setChatOpen(true)} />}
    </>
  );
}

export default App;
