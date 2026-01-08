import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from '@fluentui/react-components';

export const PageView: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();

  // Placeholder: In the future, build this from WPGraphQL parent/child data
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: 'Features', href: '/features' },
    { text: slug || 'Feature', href: `/feature/${slug}` },
  ];

  return (
    <section style={{ minHeight: 300, padding: '2rem 4vw' }}>
      <Breadcrumb>
        {breadcrumbItems.map((item, idx) => (
          <BreadcrumbItem key={item.href}>
            {idx < breadcrumbItems.length - 1 ? (
              <Link to={item.href}>{item.text}</Link>
            ) : (
              <span>{item.text}</span>
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      <h2>Page: {slug || 'home'}</h2>
      <div>
        {/* WPGraphQL content will be rendered here based on slug */}
        <em>Content for <b>{slug || 'home'}</b> will appear here.</em>
      </div>
    </section>
  );
};
