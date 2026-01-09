import { useEffect, useState } from 'react';

export interface GlobalNavMenuItem {
  id: string;
  label: string;
  url: string;
  children?: GlobalNavMenuItem[];
}

export function useGlobalNav() {
  const [items, setItems] = useState<GlobalNavMenuItem[]>([]);

  useEffect(() => {
    fetch('https://365evergreen.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query glbNav {\n  menus(where: {location: PRIMARY}) {\n    nodes {\n      menuItems(where: {parentId: 0}) {\n        nodes {\n          id\n          label\n          url\n          childItems {\n            nodes {\n              id\n              label\n              url\n              childItems {\n                nodes {\n                  id\n                  label\n                  url\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}`
      })
    })
      .then(res => res.json())
      .then(data => {
        function mapMenuItem(item: any): GlobalNavMenuItem {
          return {
            id: item.id,
            label: item.label,
            url: item.url,
            children: item.childItems?.nodes?.map(mapMenuItem) || []
          };
        }
        const nodes = data?.data?.menus?.nodes?.[0]?.menuItems?.nodes || [];
        setItems(nodes.map(mapMenuItem));
      });
  }, []);

  return items;
}
