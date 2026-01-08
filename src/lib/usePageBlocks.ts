import { useEffect, useState } from 'react';

export interface PageBlock {
  name: string;
  attributes: Record<string, any>;
  innerHTML?: string;
  innerBlocks?: PageBlock[];
}

export interface PageData {
  id: string;
  title: string;
  blocks: PageBlock[];
}

export function usePageBlocks(pageId: string): PageData | null {
  const [data, setData] = useState<PageData | null>(null);
  useEffect(() => {
    fetch('https://365evergreen.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query GetPage {\n  page(id: \"${pageId}\") {\n    id\n    title\n    blocks\n  }\n}`
      })
    })
      .then(res => res.json())
      .then(result => {
        const page = result?.data?.page;
        let blocks: PageBlock[] = [];
        try {
          blocks = page?.blocks ? JSON.parse(page.blocks) : [];
        } catch {
          blocks = [];
        }
        setData({ id: page?.id, title: page?.title, blocks });
      });
  }, [pageId]);
  return data;
}
