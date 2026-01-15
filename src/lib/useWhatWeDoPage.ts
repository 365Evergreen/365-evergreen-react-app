import { useEffect, useState } from 'react';

const WP_GRAPHQL_ENDPOINT = 'https://365evergreen.com/graphql'; // Update if needed
const WHAT_WE_DO_PAGE_ID = 'cG9zdDo0OTM='; // Provided base64 ID

export interface WhatWeDoData {
  id: string;
  title: string;
  uri: string;
  slug: string;
  content: string;
  blocks: any; // JSON structure
}

export function useWhatWeDoPage() {
  const [data, setData] = useState<WhatWeDoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(WP_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query whatWeDo {
          e365page(id: "${WHAT_WE_DO_PAGE_ID}") {
            id
            title
            uri
            slug
            blocks(
              dynamicContent: true
              attributes: true
              htmlContent: true
              originalContent: true
              postTemplate: true
            )
          }
        }`
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.errors) throw new Error(res.errors[0].message);
        setData(res.data.e365page);
        setError(null);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
