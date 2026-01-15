import { useState, useEffect } from 'react';
import { Button } from '@fluentui/react-components';
import '../LatestPostsArchive.css';
import { useLatestPosts } from '../lib/useLatestPosts';
import { useParams, useNavigate } from 'react-router-dom';

const LatestPostsArchive: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();

  const posts = useLatestPosts() || [];

  const [typeFilter] = useState<string>('');
  const [searchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;
  const [viewMode] = useState<'grid' | 'list'>('list');

  const [, setIsWideScreen] = useState<boolean>(false);
  useEffect(() => {
    function handleResize() {
      setIsWideScreen(window.innerWidth >= 900);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [hero, setHero] = useState<any | null>(null);
  const [heroLoading, setHeroLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    async function fetchHero() {
      try {
        let data: any;
        try {
          const res = await fetch('/page-components.json');
          data = await res.json();
        } catch (e) {
          const res = await fetch('/azureblob/page-components.json');
          data = await res.json();
        }
        const heroConfig = (data?.body || []).find((c: any) => c.page === 'latest-posts') || null;
        if (mounted) setHero(heroConfig);
      } catch (e) {
        if (mounted) setHero(null);
      } finally {
        if (mounted) setHeroLoading(false);
      }
    }
    fetchHero();
    return () => {
      mounted = false;
    };
  }, []);

  // Filtering
  let filteredPosts = posts;
  if (category) {
    filteredPosts = filteredPosts.filter((post: any) =>
      post.categories?.edges?.some((edge: any) => edge.node.slug === category)
    );
  }
  if (typeFilter) filteredPosts = filteredPosts.filter((p: any) => p.type === typeFilter);
  if (searchTerm?.trim()) {
    const term = searchTerm.trim().toLowerCase();
    filteredPosts = filteredPosts.filter((post: any) =>
      (post.title || '').toLowerCase().includes(term) ||
      (post.excerpt || '').toLowerCase().includes(term) ||
      (post.content || '').toLowerCase().includes(term)
    );
  }

  const sortedPosts = [...filteredPosts].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const pageCount = Math.max(1, Math.ceil(sortedPosts.length / pageSize));
  const pagedPosts = sortedPosts.slice((page - 1) * pageSize, page * pageSize);

  function getExcerpt(post: any) {
    const raw = post.excerpt || post.content || '';
    const text = raw.replace(/<[^>]*>/g, '');
    return text.length > 180 ? text.slice(0, 177) + '...' : text;
  }

  return (
    <section className="latest-posts-archive">
      <div
        className="latest-posts-archive-hero"
        style={{
          width: '100%',
          maxWidth: 900,
          margin: '0 auto 2rem auto',
          padding: '2rem 1rem',
          background: hero?.backgroundColour || '#f6f8fa',
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {hero?.backgroundImage && (
          <span
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              backgroundImage: `url(${hero.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 1,
              borderRadius: 16,
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />
        )}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {heroLoading ? (
            <div style={{ padding: '2rem', color: '#888' }}>Loading...</div>
          ) : hero ? (
            <>
              <h1 className="fluent-title1" style={{ marginBottom: '0.5rem' }}>{hero.title}</h1>
              {hero.blurb && (
                <p className="fluent-title2" style={{ marginBottom: '1.5rem', color: '#444' }}>{hero.blurb}</p>
              )}
            </>
          ) : (
            <div style={{ padding: '2rem', color: '#c00' }}>
              Hero content not found.
              <pre style={{ textAlign: 'left', fontSize: '0.9em', color: '#444', background: '#f9f9f9', padding: '1em', borderRadius: 8, overflowX: 'auto' }}>{JSON.stringify(hero, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>

      <div className={viewMode === 'grid' ? 'latest-posts-archive-grid' : 'latest-posts-archive-list'}
        style={{
          display: viewMode === 'grid' ? 'grid' : 'flex',
          gridTemplateColumns: viewMode === 'grid' ? 'repeat(3, 1fr)' : undefined,
          gap: viewMode === 'grid' ? '2rem' : undefined,
          flexDirection: viewMode === 'list' ? 'column' : undefined,
          alignItems: 'center',
          width: '100%',
        }}
      >
        {pagedPosts.map((post: any) => {
          const primaryCategory = post.categories?.edges?.[0]?.node?.slug || 'post';
          const postUrl = `/category/${primaryCategory}/${post.slug}`;
          return (
            <div
              key={post.id}
              style={{
                width: '100%',
                maxWidth: viewMode === 'grid' ? '100%' : 540,
                margin: viewMode === 'grid' ? 0 : '2rem auto',
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
          <span style={{ color: '#444', alignSelf: 'center' }}>Page {page} of {pageCount}</span>
          <Button disabled={page === pageCount} onClick={() => setPage(page + 1)}>Next &gt;</Button>
        </div>
      )}
    </section>
  );
};

export default LatestPostsArchive;
