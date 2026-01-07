import { useEffect, useState } from 'react';
import { Spinner } from '@fluentui/react-components';
import '../LatestPosts.css';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  url: string;
}


export function LatestPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Replace with real API endpoint
    fetch('/api/posts')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="latest-posts-root">
      <div className="latest-posts-container">
        <h2 className="latest-posts-title">Latest Posts</h2>
        {loading && <Spinner label="Loading posts..." />}
        {error && <div className="latest-posts-error" role="alert">{error}</div>}
        <div className="latest-posts-list">
          {posts.map((post) => (
            <div key={post.id} className="latest-posts-card">
              <a href={post.url} className="latest-posts-title-link">{post.title}</a>
              <p className="latest-posts-excerpt">{post.excerpt}</p>
              <a href={post.url} className="latest-posts-readmore">Read more</a>
            </div>
          ))}
          {!loading && !error && posts.length === 0 && (
            <div className="latest-posts-info" role="status">No posts found.</div>
          )}
        </div>
      </div>
    </section>
  );
}
