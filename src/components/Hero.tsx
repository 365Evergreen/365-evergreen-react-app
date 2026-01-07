import { Button } from '@fluentui/react-components';
import '../Hero.css';

export function Hero() {
  return (
    <section className="hero-root">
      <h1 className="hero-title">Welcome to 365 Evergreen</h1>
      <p className="hero-desc">
        Modern, scalable web solutions for your business.
      </p>
      <Button appearance="primary" as="a" href="#contact" className="hero-btn">Get Started</Button>
    </section>
  );
}
