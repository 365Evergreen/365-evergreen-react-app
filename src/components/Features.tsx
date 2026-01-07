import { Card } from '@fluentui/react-components';
import { Rocket24Regular, Shield24Regular, Cloud24Regular } from '@fluentui/react-icons';
import '../Features.css';

const features = [
  { icon: <Rocket24Regular className="features-icon" />, title: 'Fast', description: 'Lightning-fast load times and performance.' },
  { icon: <Shield24Regular className="features-icon" />, title: 'Secure', description: 'Enterprise-grade security and privacy.' },
  { icon: <Cloud24Regular className="features-icon" />, title: 'Cloud Ready', description: 'Deployed on Azure for global scale.' },
];


export function Features() {
  return (
    <section className="features-root">
      <div className="features-container">
        <h2>Features</h2>
        <div className="features-cards">
          {features.map((feature, i) => (
            <Card key={i} className="features-card">
              {feature.icon}
              <span className="features-title">{feature.title}</span>
              <span className="features-desc">{feature.description}</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
