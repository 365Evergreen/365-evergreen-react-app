import { useState, useEffect, useRef } from 'react';
import { Button } from '@fluentui/react-components';
import '../LatestPostsArchive.css';
import { useLatestPosts } from '../lib/useLatestPosts';
import { useParams, useNavigate } from 'react-router-dom';

const LatestPostsArchive: React.FC = () => {
  const { category } = useParams<{ category?: string }>();

  // Categories state
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const catDropdownRef = useRef<HTMLDivElement>(null);

  // Endpoint config
  const WPGRAPHQL_URL = import.meta.env.VITE_WPGRAPHQL_URL || 'https://365evergreen.com/wpgraphql';
  const BLOB_BASE_URL = import.meta.env.VITE_BLOB_BASE_URL || 'https://pauli.blob.core.windows.net/365-evergreen/';

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (catDropdownRef.current && !catDropdownRef.current.contains(e.target as Node)) {
        setCatDropdownOpen(false);
      }
    }
    if (catDropdownOpen) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [catDropdownOpen]);

  // Fetch categories from WPGraphQL (with parent/child structure)
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(WPGRAPHQL_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `query categories {
              categories {
                edges {
                  node {
                    id
                    name
                    slug
                    parent { node { id name slug } }
                  }
                }
              }
            }`
          })
        });
        if (!res.ok) {
          // eslint-disable-next-line no-console
          console.warn('WPGraphQL endpoint not found or returned error:', WPGRAPHQL_URL, res.status);
          setCategories([]);
          return;
        }
        let json = null;
        try {
          json = await res.json();
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('WPGraphQL endpoint did not return JSON:', WPGRAPHQL_URL);
          setCategories([]);
          return;
        }
        const flat = (json?.data?.categories?.edges || []).map((e: any) => e.node);
        // Group by parent
        const parents = flat.filter((cat: any) => !cat.parent || !cat.parent.node);
        const children = flat.filter((cat: any) => cat.parent && cat.parent.node);
        // Attach children to parents
        const grouped = parents.map((parent: any) => ({
          ...parent,
          children: children.filter((c: any) => c.parent.node.id === parent.id)
        }));
        setCategories(grouped);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch categories from WPGraphQL', e);
        setCategories([]);
      }
    }
    fetchCategories();
  }, [WPGRAPHQL_URL]);
  const navigate = useNavigate();

  const posts = useLatestPosts() || [];

  const [typeFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const pageSize = viewMode === 'grid' ? 15 : 10;

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
        // Try to fetch from Azure blob storage (allow for subfolders)
        try {
          const res = await fetch(BLOB_BASE_URL + 'page-components.json');
          data = await res.json();
        } catch (e) {
          // fallback: try root if not found
          try {
            const res = await fetch(BLOB_BASE_URL + '/page-components.json');
            data = await res.json();
          } catch (e2) {
            data = null;
          }
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
  }, [BLOB_BASE_URL]);

  // Filtering
  let filteredPosts = posts;
  // Filter by selected categories (multi-select)
  if (selectedCategories.length > 0) {
    filteredPosts = filteredPosts.filter((post: any) =>
      post.categories?.edges?.some((edge: any) => selectedCategories.includes(edge.node.slug))
    );
  } else if (category) {
    filteredPosts = filteredPosts.filter((post: any) =>
      post.categories?.edges?.some((edge: any) => edge.node.slug === category)
    );
  }
  if (typeFilter) filteredPosts = filteredPosts.filter((p: any) => p.type === typeFilter);
  if (searchTerm?.trim()) {
    const term = searchTerm.trim().toLowerCase();
    filteredPosts = filteredPosts.filter((post: any) => {
      const title = (post.title || '').toLowerCase();
      const excerpt = (post.excerpt || '').toLowerCase();
      const content = (post.content || '').toLowerCase();
      const categories = (post.categories?.edges || [])
        .map((edge: any) => (edge.node.name || '').toLowerCase())
        .join(' ');
      return (
        title.includes(term) ||
        excerpt.includes(term) ||
        content.includes(term) ||
        categories.includes(term)
      );
    });
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
    <div className="latest-posts-archive-root">
      {/* Hero Section */}
      {heroLoading ? (
        <section className="hero-root-archive" style={{ minHeight: 160, height: 200, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <div className="hero-gradient" />
          </div>
          <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ padding: '2rem', color: '#888' }}>Loading...</div>
          </div>
        </section>
      ) : hero ? (
        <section
          className="hero-root-archive"
          style={{
            ...(hero.backgroundImage
              ? { background: `url('${hero.backgroundImage}') center/cover no-repeat` }
              : hero.backgroundColour
                ? { background: hero.backgroundColour }
                : {}),
            position: 'relative' as const,
            overflow: 'hidden' as const,
          }}
        >
          {hero.backgroundImage && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              <div className="hero-gradient" />
            </div>
          )}
          <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
            <h1 className="hero-title">{hero.title}</h1>
            {hero.blurb && <p className="hero-desc">{hero.blurb}</p>}
            {hero.ctaText && hero.ctaUrl && (
              <a href={hero.ctaUrl} className="hero-btn">{hero.ctaText}</a>
            )}
            {/* Filters/Search Row */}
            <div className="latest-posts-archive-filters-row" style={{ marginTop: '1.5rem' }}>
              <div className="latest-posts-archive-filter-group">
                <span className="latest-posts-archive-filter-label">Search:</span>
                {/* Example search input, wire up as needed */}
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ padding: '0.5em', borderRadius: 4, border: '1px solid #ccc', minWidth: 180 }}
                />
              </div>
              <div className="latest-posts-archive-filter-group" ref={catDropdownRef} style={{ position: 'relative' }}>
                <span className="latest-posts-archive-filter-label">Categories:</span>
                <div
                  tabIndex={0}
                  className="cat-dropdown-summary"
                  style={{
                    minWidth: 140,
                    border: '1px solid #ccc',
                    borderRadius: 4,
                    padding: '0.5em',
                    background: '#fff',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  onClick={() => setCatDropdownOpen(v => !v)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setCatDropdownOpen(v => !v); }}
                  aria-haspopup="listbox"
                  aria-expanded={catDropdownOpen}
                >
                  {selectedCategories.length === 0
                    ? 'All'
                    : categories.filter(cat => selectedCategories.includes(cat.slug)).map(cat => cat.name).join(', ')}
                  <span style={{ float: 'right', marginLeft: 8, fontSize: 12, color: '#888' }}>{catDropdownOpen ? '▲' : '▼'}</span>
                </div>
                {catDropdownOpen && (
                  <div
                    className="cat-dropdown-list"
                    style={{
                      position: 'absolute',
                      top: '2.5em',
                      left: 0,
                      zIndex: 10,
                      background: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: 4,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      minWidth: 180,
                      maxHeight: 260,
                      overflowY: 'auto',
                    }}
                    role="listbox"
                  >
                    {categories.map(parent => (
                      <div key={parent.slug || parent.id} style={{ padding: 0 }}>
                        <div style={{
                          padding: '0.5em 1em',
                          fontWeight: 700,
                          background: '#f6f6f6',
                          color: '#222',
                          borderBottom: parent.children && parent.children.length > 0 ? '1px solid #eee' : undefined,
                        }}>{parent.name}</div>
                        {/* If parent has children, render them as options */}
                        {(parent.children && parent.children.length > 0)
                          ? parent.children.map((cat: any) => (
                              <div
                                key={cat.slug}
                                role="option"
                                aria-selected={selectedCategories.includes(cat.slug)}
                                tabIndex={0}
                                style={{
                                  padding: '0.5em 2em',
                                  background: selectedCategories.includes(cat.slug) ? '#e6f2e6' : '#fff',
                                  color: selectedCategories.includes(cat.slug) ? '#2d6a2d' : '#222',
                                  cursor: 'pointer',
                                  fontWeight: selectedCategories.includes(cat.slug) ? 600 : 400,
                                }}
                                onClick={() => {
                                  setSelectedCategories(prev =>
                                    prev.includes(cat.slug)
                                      ? prev.filter(s => s !== cat.slug)
                                      : [...prev, cat.slug]
                                  );
                                }}
                                onKeyDown={e => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    setSelectedCategories(prev =>
                                      prev.includes(cat.slug)
                                        ? prev.filter(s => s !== cat.slug)
                                        : [...prev, cat.slug]
                                    );
                                  }
                                }}
                              >
                                {cat.name}
                                {selectedCategories.includes(cat.slug) && (
                                  <span style={{ float: 'right', color: '#007814', fontWeight: 700 }}>&#10003;</span>
                                )}
                              </div>
                            ))
                          : (
                            // If no children, parent is selectable
                            <div
                              role="option"
                              aria-selected={selectedCategories.includes(parent.slug)}
                              tabIndex={0}
                              style={{
                                padding: '0.5em 2em',
                                background: selectedCategories.includes(parent.slug) ? '#e6f2e6' : '#fff',
                                color: selectedCategories.includes(parent.slug) ? '#2d6a2d' : '#222',
                                cursor: 'pointer',
                                fontWeight: selectedCategories.includes(parent.slug) ? 600 : 400,
                              }}
                              onClick={() => {
                                setSelectedCategories(prev =>
                                  prev.includes(parent.slug)
                                    ? prev.filter(s => s !== parent.slug)
                                    : [...prev, parent.slug]
                                );
                              }}
                              onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  setSelectedCategories(prev =>
                                    prev.includes(parent.slug)
                                      ? prev.filter(s => s !== parent.slug)
                                      : [...prev, parent.slug]
                                  );
                                }
                              }}
                            >
                              {parent.name}
                              {selectedCategories.includes(parent.slug) && (
                                <span style={{ float: 'right', color: '#007814', fontWeight: 700 }}>&#10003;</span>
                              )}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="hero-root-archive" style={{ minHeight: 160, height: 200, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <div className="hero-gradient" />
          </div>
          <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ padding: '2rem', color: '#c00' }}>
              Hero content not found.
              <pre style={{ textAlign: 'left', fontSize: '0.9em', color: '#444', background: '#f9f9f9', padding: '1em', borderRadius: 8, overflowX: 'auto' }}>{JSON.stringify(hero, null, 2)}</pre>
            </div>
          </div>
        </section>
      )}

      {/* View toggle below hero, above archive */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1.5rem 0 1rem 0' }}>
        <Button
          appearance="secondary"
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5em', fontWeight: 600 }}
        >
          <img
            src={viewMode === 'grid'
              ? 'https://365evergreen.com/wp-content/uploads/2026/01/ic_fluent_apps_list_24_regular.png'
              : 'https://365evergreen.com/wp-content/uploads/2026/01/ic_fluent_grid_24_regular.png'}
            alt={viewMode === 'grid' ? 'List view icon' : 'Grid view icon'}
            style={{ width: 22, height: 22, marginRight: 4, verticalAlign: 'middle' }}
          />
          {viewMode === 'grid' ? 'List View' : 'Grid View'}
        </Button>
      </div>
      <div className={viewMode === 'grid' ? 'latest-posts-archive-grid' : 'latest-posts-archive-list'}>
        {pagedPosts.map((post: any) => {
          const primaryCategory = post.categories?.edges?.[0]?.node?.slug || 'post';
          const postUrl = `/category/${primaryCategory}/${post.slug}`;
          if (viewMode === 'grid') {
            return (
              <div
                key={post.id}
                className="latest-posts-archive-card selectable-card"
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
                  className="latest-posts-archive-link"
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
          }
          // List view fallback
          const cardClass = 'latest-posts-archive-card';
          return (
            <div key={post.id} className={cardClass}>
              <a href={postUrl} className="latest-posts-title-link">
                <h3 className="fluent-title3">{post.title}</h3>
              </a>
              {post.featuredImage?.node?.sourceUrl && (
                <img
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.title}
                  className="latest-posts-featured-image"
                />
              )}
              <p className="latest-posts-excerpt">{getExcerpt(post)}</p>
              <div className="latest-posts-meta-row">
                <span className="latest-posts-date">{new Date(post.date).toLocaleDateString()}</span>
                {(post.categories?.edges ?? []).map((cat: any) => (
                  <span
                    key={cat.node.slug}
                    className="latest-posts-category-tag"
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
    </div>
  );
};

export default LatestPostsArchive;
