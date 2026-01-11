import { useEffect, useState } from 'react';
import type { PageBlock } from './usePageBlocks';

export interface PageData {
  id: string;
  title: string;
  blocks: PageBlock[];
  content: string;
  featuredImage?: { node: { sourceUrl: string } };
  categories?: { edges: { node: { id: string; name: string; slug: string } }[] };
}

export function usePageBySlug(slug: string | undefined): PageData | null {
  const [data, setData] = useState<PageData | null>(null);
  useEffect(() => {
    if (!slug) return;
    fetch('https://365evergreen.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query postContent {\n  postBy(uri: \"${slug}\") {\n    id\n    title\n    blocks\n    content(format: RENDERED)\n    featuredImage { node { sourceUrl(size: MEDIUM) } }\n    categories { edges { node { id name slug } } }\n  }\n}`
      })
    })
      .then(res => res.json())
      .then(result => {
        const page = result?.data?.postBy;
        let blocks: PageBlock[] = [];
        try {
          blocks = page?.blocks ? JSON.parse(page.blocks) : [];
        } catch {
          blocks = [];
        }
        setData(page
          ? {
              id: page.id,
              title: page.title,
              blocks,
              content: page.content,
              featuredImage: page.featuredImage,
              categories: page.categories,
            }
          : null
        );
      });
  }, [slug]);
  return data;
}