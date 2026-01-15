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
    // Prepend CPT base for e365page
    const uri = slug.startsWith('/e365-page/') ? slug : `/e365-page/${slug.replace(/^\//, '')}/`;
    fetch('https://365evergreen.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query whatwedo {\n  e365page(id: \"${uri}\", idType: URI) {\n    title\n    uri\n    slug\n    content(format: RENDERED)\n  }\n}`
      })
    })
      .then(res => res.json())
      .then(result => {
        const page = result?.data?.e365page;
        setData(page
          ? {
              id: page.slug,
              title: page.title,
              blocks: [],
              content: page.content,
              featuredImage: undefined,
              categories: undefined,
            }
          : null
        );
      });
  }, [slug]);
  return data;
}