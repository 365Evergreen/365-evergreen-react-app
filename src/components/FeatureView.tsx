import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from '@fluentui/react-components';
import { useFeatureBySlug } from '../lib/useFeatureBySlug';
import PageBlocks from './PageBlocks';
import { useAzureAccordions } from '../lib/useAzureAccordions';
import { DynamicAccordion } from './DynamicAccordion';

const FeatureView: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const feature = useFeatureBySlug(slug);
  const accordions = useAzureAccordions();

  // Filter accordions to only those matching the current feature title (case-insensitive)
  // Filter accordions by ParentFeature property (case-insensitive)
  const filteredAccordions = feature && feature.title
    ? accordions.filter(acc =>
        acc.parentFeature && acc.parentFeature.trim().toLowerCase() === feature.title.trim().toLowerCase()
      )
    : [];

  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: 'Features', href: '/#features' },
    { text: feature?.title || (slug || 'Feature'), href: `/feature/${slug}` },
  ];

  return (
    <section style={{ minHeight: 300, padding: '2rem 4vw' }}>
      <Breadcrumb>
        {breadcrumbItems.map((item, idx) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              {idx < breadcrumbItems.length - 1 ? (
                <Link to={item.href}>{item.text}</Link>
              ) : (
                <span>{item.text}</span>
              )}
            </BreadcrumbItem>
            {idx < breadcrumbItems.length - 1 && (
              <span style={{ margin: '0 0.5em', color: '#888' }}>/</span>
            )}
          </React.Fragment>
        ))}
      </Breadcrumb>
      <h2>{feature?.title || 'Loading...'}</h2>
      <div>
        {feature ? (
          feature.blocks && feature.blocks.length > 0 ? (
            <PageBlocks blocks={feature.blocks} />
          ) : feature.content ? (
            <div dangerouslySetInnerHTML={{ __html: feature.content }} />
          ) : (
            <em>No content found…</em>
          )
        ) : (
          <em>Loading feature content…</em>
        )}
      </div>
      {/* Render only accordions relevant to this feature */}
      {filteredAccordions.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <DynamicAccordion items={filteredAccordions} />
        </div>
      )}
    </section>
  );
};

export default FeatureView;
