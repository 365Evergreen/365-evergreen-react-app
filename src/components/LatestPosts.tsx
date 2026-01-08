
import { Button } from '@fluentui/react-components';
import '../LatestPosts.css';
import { useLatestPosts } from '../lib/useLatestPosts';

export function LatestPosts() {
  const posts = useLatestPosts(6);

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
        <h2 className="latest-posts-title fluent-title2">Latest Posts</h2>
        <div className="latest-posts-list">
          {sortedPosts.map((post) => (
            <div key={post.id} className="latest-posts-card">
              <div className="latest-posts-date">{new Date(post.date).toLocaleDateString()}</div>
              <a href={"/post/" + post.slug} className="latest-posts-title-link fluent-title3">{post.title}</a>
              <p className="latest-posts-excerpt">{getExcerpt(post)}</p>
              <Button as="a" href={"/post/" + post.slug} className="latest-posts-readmore" appearance="secondary" size="small">Read more</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
