import { Button } from '@fluentui/react-components';
import '../what-we-do-hero.css';

  
    <section className="what-we-do-hero-root">
      <div className="what-we-do-hero-gradient" />
      <div className="what-we-do-hero-content">
        <h1 className="what-we-do-hero-title fluent-display">Microsoft 365 and Power Platform specialists</h1>
        <p className="what-we-do-hero-desc">
         We help businesses create collaborative and secure workspaces to increase productivity, streamline processes, and drive sustainable innovation. — without the tech headaches.
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
  ;
export const WhatWeDoHero = () => {}
