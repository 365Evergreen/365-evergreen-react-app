
import React from 'react';
// Removed unused Button import from Fluent UI
import '../LatestPosts.css';
import { useLatestPosts } from '../lib/useLatestPosts';
import { useNavigate } from 'react-router-dom';

const LatestPosts: React.FC = () => {
  const posts = useLatestPosts(6);
  const navigate = useNavigate();

  // Sort by date descending (should already be, but ensure)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  function getExcerpt(post: any) {
    // If WPGraphQL returns an excerpt, use it. Otherwise, use the first 175 chars of the title as fallback.
    // If content is available, prefer that.
    const content = post.excerpt || post.content || '';
    if (content) {
      // Remove HTML tags if present
      const text = content.replace(/<[^>]+>/g, '');
      return text.length > 175 ? text.slice(0, 175) + '…' : text;
    }
    return post.title.length > 175 ? post.title.slice(0, 175) + '…' : post.title;
  }

  return (
    <section className="latest-posts-root">
      <div className="latest-posts-container">
        <h2 className="latest-posts-title fluent-title2">Latest by 365 Evergreen</h2>
        <div className="features-grid">
          {sortedPosts.map((post) => {
            const primaryCategory = post.categories?.edges?.[0]?.node?.slug || 'post';
            const postUrl = `/category/${primaryCategory}/${post.slug}`;
            return (
              <div
                key={post.id}
                className="features-card selectable-card"
                onClick={() => navigate(postUrl)}
                style={{ cursor: 'pointer' }}
              >
                <span className="latest-posts-title-link fluent-title3" style={{ color: '#000', marginBottom: '0.5rem', display: 'block' }}>{post.title}</span>
                {post.featuredImage?.node?.sourceUrl && (
                  <span className="latest-posts-image-link">
                    <img
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.title}
                      className="latest-posts-featured-image"
                      loading="lazy"
                    />
                  </span>
                )}
                {/* Category tags */}
                {(post.categories?.edges?.length ?? 0) > 0 && (
                  <div style={{ marginBottom: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5em' }}>
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
                        onClick={e => {
                          e.stopPropagation();
                          navigate(`/category/${cat.node.slug}`);
                        }}
                      >
                        {cat.node.name}
                      </span>
                    ))}
                  </div>
                )}
                <div className="latest-posts-date">{new Date(post.date).toLocaleDateString()}</div>
                <p className="latest-posts-excerpt">{getExcerpt(post)}</p>
                <a
                  href={postUrl}
                  className="features-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4em', fontWeight: 600, color: '#111', textDecoration: 'none', marginTop: '0.5em' }}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate(postUrl);
                  }}
                  tabIndex={0}
                >
                  Read more
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '0.1em' }}>
                    <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;
