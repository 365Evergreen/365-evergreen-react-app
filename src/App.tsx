import './App.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { CTA } from './components/CTA';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { LatestPosts } from './components/LatestPosts';


function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <CTA />
        <ContactForm />
      </main>
      <LatestPosts />
      <Footer />
    </>
  );
}

export default App;
