import { useEffect, useState } from 'react';

export interface GlobalNavMenuItem {
  label: string;
  url: string;
}

export function useGlobalNav() {
  const [items, setItems] = useState<GlobalNavMenuItem[]>([]);

  useEffect(() => {
    // Placeholder: Replace with actual GraphQL fetch
    fetch('https://365evergreen.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query glbNav {\n  menus(where: {location: MENU_1}) {\n    nodes {\n      menuItems {\n        nodes {\n          label\n          url\n        }\n      }\n    }\n  }\n}`
      })
    })
      .then(res => res.json())
      .then(data => {
        const nodes = data?.data?.menus?.nodes?.[0]?.menuItems?.nodes || [];
        setItems(nodes);
      });
  }, []);

  return items;
}
