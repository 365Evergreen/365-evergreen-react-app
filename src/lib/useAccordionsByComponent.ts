import { useEffect, useState } from 'react';

const WP_GRAPHQL_ENDPOINT = 'https://365evergreen.com/graphql';

export type AccordionItem = {
  id: number | string;
  parentId: number | string;
  label: string;
  blurb: string; // always string for UI
  order?: number | null;
  imageUrl?: string | null;
};

export type Accordion = {
  id: number | string;
  title: string;
  label: string; // always present
  blurb: string; // always string
  imageUrl?: string | null;
  componentname?: string[] | null;
};

export function useAccordionsByComponent(componentName: string) {
  const [accordions, setAccordions] = useState<Accordion[]>([]);
  const [items, setItems] = useState<AccordionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(WP_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query AllE365AccodionsWithFields($first: Int) {
          e365Accodions(first: $first) {
            nodes {
              id
              databaseId
              title
              slug
              content
              featuredImage { node { sourceUrl } }
              accordionFields {
                componentname
                label
                items {
                  nodes {
                    __typename
                    id
                    databaseId
                    title
                    ... on Post { content featuredImage { node { sourceUrl } } }
                    ... on Page { content featuredImage { node { sourceUrl } } }
                  }
                }
              }
            }
          }
        }`,
        variables: { first: 200 }
      })
    })
      .then(res => res.json())
      .then(json => {
        if (cancelled) return;
        if (json.errors) throw new Error(json.errors[0]?.message || 'GraphQL error');
        const nodes = (json.data?.e365Accodions?.nodes) || [];
        // Map accordions
        const accs: Accordion[] = nodes.map((n: any) => ({
          id: n.databaseId ?? n.id,
          title: n.title,
          label: n.accordionFields?.label ?? n.title ?? '',
          blurb: n.content ?? '',
          imageUrl: n.featuredImage?.node?.sourceUrl ?? null,
          componentname: Array.isArray(n.accordionFields?.componentname) ? n.accordionFields.componentname : (n.accordionFields?.componentname ? [n.accordionFields.componentname] : null),
        }));

        // Map items into a flat list with parentId
        const accItems: AccordionItem[] = [];
        nodes.forEach((n: any) => {
          const parentId = n.databaseId ?? n.id;
          const itemNodes = n.accordionFields?.items?.nodes || [];
          itemNodes.forEach((it: any, idx: number) => {
            accItems.push({
              id: it.databaseId ?? it.id,
              parentId,
              label: it.title ?? '',
              blurb: it.content ?? '',
              order: idx + 1,
              imageUrl: it.featuredImage?.node?.sourceUrl ?? null,
            });
          });
        });

        // Filter by componentName (case-sensitive match on list)
        const filteredAccs = accs.filter(a => Array.isArray(a.componentname) && a.componentname.includes(componentName));
        const filteredAccIds = new Set(filteredAccs.map(a => a.id));
        const filteredItems = accItems.filter(it => filteredAccIds.has(it.parentId));

        setAccordions(filteredAccs);
        setItems(filteredItems);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || String(err));
        setAccordions([]);
        setItems([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [componentName]);

  return { accordions, items, loading, error };
}
