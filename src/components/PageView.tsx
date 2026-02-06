import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from '@fluentui/react-components';
import { usePageBySlug } from '../lib/usePageBySlug';
import { useCtaPost } from '../lib/useCtaPost';
import { useE365Resources } from './ResourceArchive/useE365Resources';
import PageRenderer from './PageRenderer';
import ResponsiveContainer from './ResponsiveContainer';

export const PageView: React.FC = () => {
  const { slug, parent } = useParams<{ slug?: string; parent?: string }>();

  // Build URI for custom post types
  let uri = slug || '';
  if (parent) {
    uri = `/${parent}/${slug}/`;
  }
  // Fetch page by URI
  const page = usePageBySlug(uri);
  // If no e365page found, try fetching a regular post by slug (CTA or normal post)
  const ctaPost = useCtaPost(slug);
  // Also attempt to find a Resource (by slug or uri) and render it using the same PageView layout
  const { resources } = useE365Resources();
  const resource = resources.find(r => (typeof r.slug === 'string' && r.slug === slug) || (typeof r.uri === 'string' && r.uri === uri));

  // Build breadcrumb: Home / Category (if present) / Post Title
  const params = useParams<{ slug?: string; category?: string }>();
  const category = params.category;
  const titleText = page?.title || ctaPost?.title || resource?.title || (params.slug || 'Page');
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    ...(category ? [{ text: category.charAt(0).toUpperCase() + category.slice(1), href: `/${category}` }] : []),
    { text: titleText, href: `/${category ? category + '/' : ''}${params.slug || ''}` },
  ];

  return (
    <section style={{ minHeight: 300, padding: 0, margin: 0 }}>
      <Breadcrumb>
        {breadcrumbItems.map((item, idx) => (
          <BreadcrumbItem key={item.href + '-' + idx}>
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
      <h2>{titleText}</h2>
      <ResponsiveContainer>
        {page ? (
          page.blocks && page.blocks.length > 0 ? (
            <PageRenderer blocks={page.blocks} />
          ) : page.content ? (
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          ) : <em>No content found…</em>
        ) : resource ? (
          <div dangerouslySetInnerHTML={{ __html: resource.excerpt || '' }} />
        ) : ctaPost ? (
          <div dangerouslySetInnerHTML={{ __html: ctaPost.content || '' }} />
        ) : <em>Loading page content…</em>}
      </ResponsiveContainer>
    </section>
  );
};
