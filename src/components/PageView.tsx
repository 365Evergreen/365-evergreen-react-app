import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from '@fluentui/react-components';
import { usePageBlocks } from '../lib/usePageBlocks';
import { PageBlocks } from './PageBlocks';

export const PageView: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();

  // For demo: use a hardcoded page ID (replace with dynamic lookup by slug as needed)
  const pageId = 'cG9zdDozNjM=';
  const page = usePageBlocks(pageId);

  // Placeholder: In the future, build this from WPGraphQL parent/child data
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: page?.title || 'Page', href: `/page/${slug}` },
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
      <h2>{page?.title || 'Loading...'}</h2>
      <div>
        {page ? <PageBlocks blocks={page.blocks} /> : <em>Loading page content…</em>}
      </div>
    </section>
  );
};
