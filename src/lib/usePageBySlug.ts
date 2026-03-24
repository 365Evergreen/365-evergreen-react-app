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
    const buildUris = () => {
      // possible URIs to match against pages: with and without leading/trailing slashes
      const asPath = slug.startsWith('/') ? slug : `/${slug}`;
      const withTrailing = asPath.endsWith('/') ? asPath : `${asPath}/`;
      const e365Uri = slug.startsWith('/e365-page/') ? slug : `/e365-page/${slug.replace(/^\//, '')}/`;
      return { asPath, withTrailing, e365Uri };
    };

    (async () => {
      try {
        const { withTrailing, e365Uri, asPath } = buildUris();

        // Try e365page first
        const e365Resp = await fetch('https://365evergreendev.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `query e365pageQuery {\n  e365page(id: "${e365Uri}", idType: URI) {\n    title\n    uri\n    slug\n    content(format: RENDERED)\n  }\n}`
          })
        });
        const e365Result = await e365Resp.json();
        const e365page = e365Result?.data?.e365page;
        if (e365page) {
          setData({
            id: e365page.slug,
            title: e365page.title,
            blocks: [],
            content: e365page.content,
            featuredImage: undefined,
            categories: undefined,
          });
          return;
        }

        // Fallback: query standard pages and match by uri or slug
        const pagesQuery = `query pages {\n  pages {\n    edges {\n      node {\n        id\n        title\n        uri\n        slug\n        content(format: RENDERED)\n        featuredImage { node { sourceUrl } }\n      }\n    }\n  }\n}`;
        const pagesResp = await fetch('https://365evergreendev.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: pagesQuery }),
        });
        const pagesResult = await pagesResp.json();
        const nodes = pagesResult?.data?.pages?.edges?.map((e: any) => e.node) || [];
        const match = nodes.find((n: any) => (n.uri === withTrailing) || (n.uri === asPath) || (n.slug === slug));
        if (match) {
          setData({
            id: match.slug,
            title: match.title,
            blocks: [],
            content: match.content,
            featuredImage: match.featuredImage,
            categories: undefined,
          });
        } else {
          setData(null);
        }
      } catch (err) {
        console.error('Failed to fetch page data:', err);
        setData(null);
      }
    })();
  }, [slug]);
  return data;
}