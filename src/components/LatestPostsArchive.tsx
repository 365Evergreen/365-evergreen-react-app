import { useState, useMemo, useEffect } from 'react';
import { Button, Select, Label } from '@fluentui/react-components';
import '../LatestPostsArchive.css';
import { useLatestPosts } from '../lib/useLatestPosts';
import { useParams, useNavigate } from 'react-router-dom';

import * as React from 'react';
export default function LatestPostsArchive(): React.ReactElement {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  // Fetch all posts for archive (no limit)
  const posts = useLatestPosts(undefined) || [];

  // Collect all unique categories from posts, sorted alphabetically
  const allCategories = useMemo(() => {
    const catMap = new Map<string, string>();
    posts.forEach(post => {
      post.categories?.edges?.forEach((edge: any) => {
        if (edge.node.slug && edge.node.name) {
          catMap.set(edge.node.slug, edge.node.name);
        }
      });
    });
    return Array.from(catMap.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, [posts]);

  // Filter state
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>(category || '');

  // Filtering logic: always use category from URL
  let filteredByCategory = posts;
  if (category) {
    filteredByCategory = filteredByCategory.filter(post =>
      post.categories?.edges?.some((edge: any) => edge.node.slug === category)
    );
  }
  const sortedPosts = [...filteredByCategory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Pagination logic
  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const pageCount = Math.max(1, Math.ceil(sortedPosts.length / pageSize));
  const pagedPosts = sortedPosts.slice((page - 1) * pageSize, page * pageSize);

  // Sync dropdown value with URL param
  useEffect(() => {
    setCategoryFilter(category || '');
    setPage(1);
  }, [category]);

  function getExcerpt(post: any) {
    const content = post.excerpt || post.content || '';
    if (content) {
      const text = content.replace(/<[^>]+>/g, '');
      return text.length > 175 ? text.slice(0, 175) + '…' : text;
    }
    return post.title && post.title.length > 175 ? post.title.slice(0, 175) + '…' : post.title;
  }

  return (
    <section className="latest-posts-archive-root">
      <div className="latest-posts-archive-container">
        <h2 className="latest-posts-archive-title fluent-title2">{/* ...existing text... */}</h2>
        <div className="latest-posts-archive-filters-row">
          <div className="latest-posts-archive-filter-group">
            <Label htmlFor="type-filter" className="latest-posts-archive-filter-label">Type of content</Label>
            <Select id="type-filter" value={typeFilter} onChange={(_, data: any) => setTypeFilter(data.value)} style={{ minWidth: 180 }}>
              <option value="">All types</option>
              <option value="Blog post">Blog post</option>
              <option value="Updates">Updates</option>
              <option value="Tutorials">Tutorials</option>
            </Select>
          </div>
          <div className="latest-posts-archive-filter-group">
            <Label htmlFor="category-filter" className="latest-posts-archive-filter-label">Category</Label>
            <Select
              id="category-filter"
              value={categoryFilter}
              onChange={(_, data: any) => {
                if (data.value) {
                  navigate(`/category/${data.value}`);
                } else {
                  navigate(`/latest-posts`);
                }
              }}
              style={{ minWidth: 180 }}
            >
              <option value="">All categories</option>
              {allCategories.map(([slug, name]) => (
                <option key={slug} value={slug}>{name}</option>
              ))}
            </Select>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {pagedPosts.map((post: any) => {
            const primaryCategory = post.categories?.edges?.[0]?.node?.slug || 'post';
            const postUrl = `/category/${primaryCategory}/${post.slug}`;
            return (
              <div
                key={post.id}
                style={{
                  width: '100%',
                  maxWidth: 540,
                  margin: '2rem auto',
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                className="latest-posts-archive-card"
              >
                <a href={postUrl} style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center', width: '100%' }}>
                  <h3 className="latest-posts-title-link fluent-title3" style={{ marginBottom: '1rem' }}>{post.title}</h3>
                </a>
                {post.featuredImage?.node?.sourceUrl && (
                  <img
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.title}
                    style={{
                      width: '100%',
                      maxWidth: 420,
                      borderRadius: 8,
                      marginBottom: '1rem',
                      objectFit: 'cover',
                    }}
                  />
                )}
                <p className="latest-posts-excerpt" style={{ marginBottom: '1rem', textAlign: 'center' }}>{getExcerpt(post)}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5em', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ color: '#888', fontSize: '0.95em' }}>{new Date(post.date).toLocaleDateString()}</span>
                  {(post.categories?.edges ?? []).map((cat: any) => (
                    <span
                      key={cat.node.slug}
                      className="latest-posts-category-tag"
                      style={{
                        background: '#e6f2e6',
                        color: '#2d6a2d',
                        fontSize: '0.85em',
                        borderRadius: '6px',
                        padding: '0.15em 0.7em',
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate(`/category/${cat.node.slug}`)}
                    >
                      {cat.node.name}
                    </span>
                  ))}
                </div>
                <Button as="a" href={postUrl} className="latest-posts-readmore" appearance="secondary" size="small">Read more</Button>
              </div>
            );
          })}
        </div>
        {pageCount > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>&lt; Prev</Button>
            <span style={{ color: '#fff', alignSelf: 'center' }}>Page {page} of {pageCount}</span>
            <Button disabled={page === pageCount} onClick={() => setPage(page + 1)}>Next &gt;</Button>
          </div>
        )}
      </div>
    </section>
  );
}
