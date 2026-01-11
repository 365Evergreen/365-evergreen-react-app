import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from '@fluentui/react-components';
import { usePageBySlug } from '../lib/usePageBySlug';
import PageBlocks from './PageBlocks';

export const PageView: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();

  // Fetch page by slug (dynamic)
  const page = usePageBySlug(slug);


  // Build breadcrumb: Home / Category (if present) / Post Title
  const params = useParams<{ slug?: string; category?: string }>();
  const category = params.category;
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    ...(category ? [{ text: category.charAt(0).toUpperCase() + category.slice(1), href: `/${category}` }] : []),
    { text: page?.title || (params.slug || 'Page'), href: `/${category ? category + '/' : ''}${params.slug || ''}` },
  ];

  return (
    <section style={{ minHeight: 300, padding: '2rem 4vw' }}>
      <Breadcrumb>
        {breadcrumbItems.map((item, idx) => (
          <BreadcrumbItem key={item.href}>
            {idx < breadcrumbItems.length - 1 ? (
              <>
                <Link to={item.href}>{item.text}</Link>
                <span style={{ margin: '0 0.5em', color: '#888' }}>/</span>
              </>
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
