import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from '@fluentui/react-components';
import { usePageBySlug } from '../lib/usePageBySlug';
import PageBlocks from './PageBlocks';

export const PageView: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();

  // Fetch page by slug (dynamic)
  const page = usePageBySlug(slug);

  // Placeholder: In the future, build this from WPGraphQL parent/child data
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: page?.title || (slug || 'Page'), href: `/${slug}` },
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
        {page ? (
          page.blocks && page.blocks.length > 0 ? (
            <PageBlocks blocks={page.blocks} />
          ) : page.content ? (
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          ) : <em>No content found…</em>
        ) : <em>Loading page content…</em>}
      </div>
    </section>
  );
};
