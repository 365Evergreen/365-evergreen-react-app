import React from 'react';
import { Button } from '@fluentui/react-components';
import '../WhatWeDoHero.css';

const WhatWeDoHero: React.FC = () => (
  <section className="what-we-do-hero-root">
    <div className="what-we-do-hero-gradient" />
    <div className="what-we-do-hero-content">
      <h1 className="what-we-do-hero-title fluent-display">What we do</h1>
      <p className="what-we-do-hero-desc">
        We help teams like yours navigate the complexity of the Microsoft 365 ecosystem, focusing on the six core pillars that define modern work in the evergreen era.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button
          appearance="primary"
          className="what-we-do-hero-btn"
          style={{ display: 'none' }}
        >
          Let's see how we can help
        </Button>
        <Button
          appearance="secondary"
          className="what-we-do-hero-btn"
        >
          Start your journey
        </Button>
      </div>
    </div>
  </section>
);

export default WhatWeDoHero;
