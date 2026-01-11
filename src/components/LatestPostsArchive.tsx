import { useState } from 'react';
import { Button, Select, Option, Label } from '@fluentui/react-components';
import '../LatestPostsArchive.css';
import { useLatestPosts } from '../lib/useLatestPosts';

export function LatestPostsArchive() {
  const posts = useLatestPosts() || [];
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Filter state
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  // Pagination logic
  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const pageCount = Math.max(1, Math.ceil(sortedPosts.length / pageSize));
  const pagedPosts = sortedPosts.slice((page - 1) * pageSize, page * pageSize);

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
              <Option value="">All types</Option>
              <Option value="Blog post">Blog post</Option>
              <Option value="Updates">Updates</Option>
              <Option value="Tutorials">Tutorials</Option>
            </Select>
          </div>
          <div className="latest-posts-archive-filter-group">
            <Label htmlFor="category-filter" className="latest-posts-archive-filter-label">Category</Label>
            <Select id="category-filter" value={categoryFilter} onChange={(_, data: any) => setCategoryFilter(data.value)} style={{ minWidth: 180 }}>
              <Option value="">All categories</Option>
              <Option value="placeholder1">Placeholder 1</Option>
              <Option value="placeholder2">Placeholder 2</Option>
              <Option value="placeholder3">Placeholder 3</Option>
            </Select>
          </div>
        </div>
        <div className="features-grid">
          {pagedPosts.map((post: any) => (
            <div key={post.id} className="features-card selectable-card">
              <div className="latest-posts-date">{new Date(post.date).toLocaleDateString()}</div>
              <a href={"/post/" + post.slug} className="latest-posts-title-link fluent-title3">{post.title}</a>
              <p className="latest-posts-excerpt">{getExcerpt(post)}</p>
              <Button as="a" href={"/post/" + post.slug} className="latest-posts-readmore" appearance="secondary" size="small">Read more</Button>
            </div>
          ))}
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
