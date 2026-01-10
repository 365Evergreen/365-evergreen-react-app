import { Button } from '@fluentui/react-components';
import '../Hero.css';

export function Hero() {
  return (
    <section className="hero-root">
      <div className="hero-gradient" />
      <h1 className="hero-title fluent-display">Welcome to 365 Evergreen</h1>
      <p className="hero-desc">
       We help businesses automate, scale, and simplify — without the tech headaches.
      </p>
      <Button appearance="primary" as="a" href="#contact" className="hero-btn">Get Started</Button>
    </section>
  );
}
