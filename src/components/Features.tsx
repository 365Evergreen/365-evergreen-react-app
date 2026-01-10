import '../Features.css';
import { useSiteFeatures } from '../lib/useSiteFeatures';
import type { SiteFeature } from '../lib/useSiteFeatures';
import { PeopleTeamToolbox24Regular } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';

export function Features() {
  const features = useSiteFeatures() as SiteFeature[];
  const navigate = useNavigate();

  // Sort features by siteFeature.sortOrder (ascending)
  const sortedFeatures = [...features].sort((a, b) => {
    const aOrder = Number(a.siteFeature?.sortOrder) || 0;
    const bOrder = Number(b.siteFeature?.sortOrder) || 0;
    return aOrder - bOrder;
  });

  if (!sortedFeatures.length) return null;

  return (
    <section className="features-root">
      <h2 className="fluent-title2">Features</h2>
      <div className="features-grid">
        {sortedFeatures.map(feature => (
          <div className="features-card" key={feature.id}>
            <span className="features-icon"><PeopleTeamToolbox24Regular /></span>
            <span className="features-title fluent-title3">{feature.siteFeature.title || feature.title}</span>
            <div className="features-desc fluent-body1">{feature.siteFeature.blurb}</div>
            <a
              href={`/feature/${feature.slug}`}
              className="features-link"
              onClick={e => {
                if (e.ctrlKey || e.metaKey || e.button === 1) return;
                e.preventDefault();
                navigate(`/feature/${feature.slug}`);
              }}
            >
              {feature.siteFeature.buttonText || feature.siteFeature.link?.title || 'Learn more'}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
