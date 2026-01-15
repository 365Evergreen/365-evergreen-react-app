import { useEffect, useState } from 'react';

export interface LatestPost {
  type: string;
  excerpt: any;
  id: string;
  title: string;
  date: string;
  slug: string;
  content?: string;
  featuredImage?: { node: { sourceUrl: string } };
  categories?: { edges: { node: { id: string; name: string; slug: string } }[] };
}


// Utility for dynamic blob URLs (supports subfolders/files)
export function getBlobUrl(path: string): string {
  const base = import.meta.env.VITE_BLOB_BASE_URL || 'https://pauli.blob.core.windows.net/365-evergreen/';
  // Ensure no double slashes
  return base.replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '');
}

export function useLatestPosts(limit?: number): LatestPost[] {
  const [posts, setPosts] = useState<LatestPost[]>([]);
  useEffect(() => {
    const postLimit = typeof limit === 'number' ? limit : 100;
    const WPGRAPHQL_URL = import.meta.env.VITE_WPGRAPHQL_URL || 'https://365evergreen.com/wpgraphql';
    fetch(WPGRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query allPosts {\n  posts(first: ${postLimit}, where: {orderby: {field: DATE, order: DESC}}) {\n    edges {\n      node {\n        id\n        title\n        date\n        content(format: RENDERED)\n        featuredImage { node { sourceUrl } }\n        slug\n        categories { edges { node { id name slug } } }\n      }\n    }\n  }\n}`
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
