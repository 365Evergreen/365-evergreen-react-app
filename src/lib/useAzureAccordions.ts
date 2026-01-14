import { useEffect, useState } from 'react';

export interface AccordionPanelData {
  title: string;
  content: string;
}

export interface AccordionGroupData {
  title: string;
  description?: string;
  header?: string;
  image?: string;
  parentFeature?: string;
  panels: AccordionPanelData[];
}

export function useAzureAccordions(): AccordionGroupData[] {
  const [data, setData] = useState<AccordionGroupData[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('https://pauli.blob.core.windows.net/365-evergreen/accordions/accordions.json').then(res => res.json()),
      fetch('https://pauli.blob.core.windows.net/365-evergreen/accordions/accordion-list.json').then(res => res.json())
    ]).then(([accordionMeta, accordionItems]) => {
      const accordions = Array.isArray(accordionMeta) ? accordionMeta : [accordionMeta];
      const items = Array.isArray(accordionItems) ? accordionItems : [accordionItems];
      const grouped = accordions.map(acc => {
        // Find panels where parentId matches this accordion's ID
        const panels = items
          .filter(item => item.parentId === acc.ID)
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map(item => ({
            title: item.label,
            content: item.blurb
          }));
        return {
          title: acc.Label,
          description: acc.Blurb,
          image: acc.Image,
          parentFeature: acc.ParentFeature,
          panels
        };
      });
      setData(grouped);
    });
  }, []);

  return data;
}
