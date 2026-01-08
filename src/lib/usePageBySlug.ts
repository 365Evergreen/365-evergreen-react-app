import { useEffect, useState } from 'react';
import type { PageBlock } from './usePageBlocks';

export interface PageData {
  id: string;
  title: string;
  blocks: PageBlock[];
}

export function usePageBySlug(slug: string | undefined): PageData | null {
  const [data, setData] = useState<PageData | null>(null);
  useEffect(() => {
    if (!slug) return;
    fetch('https://365evergreen.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query GetPageBySlug {\n  pageBy(uri: \"${slug}\") {\n    id\n    title\n    blocks\n  }\n}`
      })
    })
      .then(res => res.json())
      .then(result => {
        const page = result?.data?.pageBy;
        let blocks: PageBlock[] = [];
        try {
          blocks = page?.blocks ? JSON.parse(page.blocks) : [];
        } catch {
          blocks = [];
        }
        setData(page ? { id: page.id, title: page.title, blocks } : null);
      });
  }, [slug]);
  return data;
}