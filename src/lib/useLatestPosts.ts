import { useEffect, useState } from 'react';

export interface LatestPost {
  id: string;
  title: string;
  date: string;
  slug: string;
  content?: string;
  featuredImage?: { node: { sourceUrl: string } };
}

export function useLatestPosts(limit = 6): LatestPost[] {
  const [posts, setPosts] = useState<LatestPost[]>([]);
  useEffect(() => {
    fetch('https://365evergreen.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query allPosts {\n  posts(first: ${limit}, where: {orderby: {field: DATE, order: DESC}}) {\n    edges {\n      node {\n        id\n        title\n        date\n        content(format: RENDERED)\n        featuredImage { node { sourceUrl } }\n        slug\n      }\n    }\n  }\n}`
      })
    })
      .then(res => res.json())
      .then(data => {
        const nodes = data?.data?.posts?.edges?.map((e: any) => e.node) || [];
        setPosts(nodes);
      });
  }, [limit]);
  return posts;
}
