import { Button } from '@fluentui/react-components';

export function CTA() {
  return (
    <section className="cta-root">
      <h2 className="cta-title fluent-title2">Ready to grow your business?</h2>
      <Button appearance="primary" as="a" href="#contact" className="cta-button">Contact Us</Button>
    </section>
  );
}
