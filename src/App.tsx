
import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
// import { CTA } from './components/CTA';
import { Features } from './components/Features';
import LatestPosts from './components/LatestPosts';
import { ContactForm } from './components/ContactForm';
import FeatureView from './components/FeatureView';
import AllAccordions from './components/allacordions';
import AllFeatures from './components/AllFeatures';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { CopilotChat } from './components/CopilotChat';
import { ChatBubble } from './components/ChatBubble';
import { FloatingDrawer } from './components/FloatingDrawer';
import { JourneySurvey } from './components/JourneySurvey';
import questionsData from '../CTAJourneyQuestions.json';
import { PageView } from './components/PageView';
import CtaPage from './components/CtaPage';
import TestCtaQuery from './components/TestCtaQuery';
import WhatWeDoStatic from './components/WhatWeDoStatic';
import LatestPostsArchive from './components/LatestPostsArchive';
// import Carousel from './components/Carousel';
import FluentCarousel from './components/FluentCarousel';
import VanillaAccordionDemoPage from './components/VanillaAccordionDemoPage';

import { AnimatePresence, motion } from 'framer-motion';
import { fadeVariants } from './components/motionPresets';
import AccordionTest from './components/AccordionTest';
import FeatureButtonsTest from './components/FeatureButtonsTest';
import FeatureButtonsLogic from './components/FeatureButtonsLogic';

import { Routes, Route } from 'react-router-dom';

// Wrapper to allow passing optional props to PageView without changing its
// original typings. We cast props through any when forwarding.

const PageViewAny: any = PageView;


function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <AnimatePresence mode="wait">
              <motion.div
                key="hero"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Hero onOpenDrawer={() => setDrawerOpen(true)} />
              </motion.div>
              <motion.div
                key="fluentcarousel"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <FluentCarousel />
              </motion.div>
              <div className="bg-default">
                <motion.div
                  key="features"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="features-outer">
                    <Features />
                  </div>
                </motion.div>
              </div>
              <div className="bg-alt">
                <motion.div
                  key="latestposts"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div style={{ paddingBottom: '2.5rem' }}>
                    <LatestPosts />
                  </div>
                </motion.div>
              </div>
              <div className="bg-default">
                <motion.div
                  key="contactform"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ContactForm />
                </motion.div>
              </div>
            </AnimatePresence>
          } />
          <Route path="/CTA/:slug" element={<CtaPage />} />
          <Route path="/feature/:slug" element={<FeatureView />} />
          <Route path="/all-accordions" element={<AllAccordions />} />
          <Route path="/all-features" element={<AllFeatures />} />
          <Route path="/test/cta-query" element={<TestCtaQuery />} />
          <Route path="/latest-posts" element={<LatestPostsArchive />} />
          <Route path="/category/:category" element={<LatestPostsArchive />} />
          <Route path="/category/:category/:slug" element={<PageView />} />
          <Route path="/what-we-do" element={<PageViewAny whatWeDoPageId="cG9zdDo0OTM=" />} />
          <Route path="/e365-page/what-we-do/" element={<WhatWeDoStatic />} />
          <Route path="/:slug" element={<PageView />} />
          <Route path="/:parent/:slug" element={<PageView />} />
          <Route path="/vanilla-accordion-demo" element={<VanillaAccordionDemoPage />} />
          <Route path="/accordion-test" element={<AccordionTest />} />
          <Route path="/feature-buttons-test" element={<FeatureButtonsTest />} />
          {/* Simulate homepage selection: pass featureId for Modern workplace */}
          <Route path="/feature-buttons-logic" element={<FeatureButtonsLogic featureId="cG9zdDozMzg=" />} />
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
              id: `q${i + 1}`,
              type: type as 'radio' | 'checkbox' | 'text',
              question: q.title,
              ...(options ? { options } : {})
            };
          })}
          onComplete={() => { }}
        />
      </FloatingDrawer>
    </>
  );
}

export default App;
