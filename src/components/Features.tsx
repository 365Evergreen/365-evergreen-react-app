import '../Features.css';
import { useSiteFeatures } from '../lib/useSiteFeatures';
import { PeopleTeamToolbox24Regular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';

export function Features() {
  const features = useSiteFeatures();
  const feature = features[0]; // Only display the first card as requested
  const navigate = useNavigate();

  if (!feature) return null;

  const handleView = () => {
    navigate(`/feature/${feature.slug}`);
  };

  return (
    <section className="features-root">
      <h2 className="fluent-title2">Features</h2>
      <div className="features-grid">
        <div className="features-card">
          <span className="features-icon"><PeopleTeamToolbox24Regular /></span>
          <span className="features-title fluent-title3">{feature.siteFeature.title || feature.title}</span>
          <div className="features-desc fluent-body1">{feature.siteFeature.blurb}</div>
          <Button appearance="primary" onClick={handleView} className="features-link">
            {feature.siteFeature.link?.title || 'Learn more'}
          </Button>
        </div>
      </div>
    </section>
  );
}
