import { useState, lazy, Suspense, type ComponentProps, type ComponentType } from 'react';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero';
// import { CTA } from './components/CTA';
import { Features } from './components/Features';
import LatestPosts from './components/LatestPosts';
import { ContactForm } from './components/ContactForm/ContactForm';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent/CookieConsent';
import { CopilotChat } from './components/CopilotChat';
import { ChatBubble } from './components/ChatBubble';
import { FloatingDrawer } from './components/FloatingDrawer';
import { JourneySurvey } from './components/JourneySurvey';
import questionsData from '../CTAJourneyQuestions.json';
// import Carousel from './components/Carousel';
import FluentCarousel from './components/FluentCarousel';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeVariants } from './components/motionPresets';
import { Routes, Route } from 'react-router-dom';
import './HomeSectionLayout.css';
import RouteLoader from './components/RouteLoader';
import HowWeDoItStatic from './components/HowWeDoIt/HowWeDoItStatic';
import ScrollToTop from './components/ScrollToTop';

const CtaPage = lazy(() => import('./components/CtaPage'));
const FeatureView = lazy(() => import('./components/FeatureView'));
const AllAccordions = lazy(() => import('./components/allacordions'));
const AllFeatures = lazy(() => import('./components/AllFeatures/AllFeatures'));
const LatestPostsArchive = lazy(() => import('./components/LatestPostsArchive/LatestPostsArchive'));

const WhatWeDoStatic = lazy(() => import('./components/WhatWeDoStatic/WhatWeDoStatic'));
const ResourceArchive = lazy(() => import('./components/ResourceArchive/ResourceArchive'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy/PrivacyPolicy'));
const TestCtaQuery = lazy(() => import('./components/TestCtaQuery'));
const VanillaAccordionDemoPage = lazy(() => import('./components/VanillaAccordionDemoPage'));
const FeatureButtonsTest = lazy(() => import('./components/FeatureButtonsTest'));
const FeatureButtonsLogic = lazy(() => import('./components/FeatureButtonsLogic'));
const PageView = lazy(() => import('./components/PageView').then(module => ({ default: module.PageView })));

// Wrapper to allow passing optional props to PageView without changing its
// original typings. We cast props through any when forwarding.



type PageViewProps = ComponentProps<typeof PageView>;

type PageViewOptionalProps = Partial<PageViewProps> & { whatWeDoPageId?: string };

const PageViewOptional: ComponentType<PageViewOptionalProps> = (props) => (
  <PageView {...(props as PageViewProps)} />
);

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<RouteLoader />}>
          <ScrollToTop />
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
                    <LatestPosts />
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
            <Route path="/what-we-do" element={<PageViewOptional whatWeDoPageId="cG9zdDo0OTM=" />} />
           
            <Route path="/e365-page/what-we-do/" element={<WhatWeDoStatic />} />
            <Route path="/e365-page/how-we-do-it" element={<HowWeDoItStatic />} />
            <Route path="/e365-page/resources/" element={<ResourceArchive />} />
            <Route path="/e365-page/privacy-policy/" element={<PrivacyPolicy />} />
            <Route path="/:slug" element={<PageView />} />
            <Route path="/:parent/:slug" element={<PageView />} />
            <Route path="/vanilla-accordion-demo" element={<VanillaAccordionDemoPage />} />
            <Route path="/feature-buttons-test" element={<FeatureButtonsTest />} />
            {/* Simulate homepage selection: pass featureId for Modern workplace */}
            <Route path="/feature-buttons-logic" element={<FeatureButtonsLogic featureId="cG9zdDozMzg=" />} />
          </Routes>
        </Suspense>
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
