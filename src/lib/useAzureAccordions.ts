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
      const grouped = accordions.map(acc => ({
        title: acc.Label,
        description: acc.Blurb,
        image: acc.Image,
        parentFeature: acc.ParentFeature,
        panels: items
          .filter(item => item.Accordion === acc.Label)
          .sort((a, b) => (a.SortOrder || 0) - (b.SortOrder || 0))
          .map(item => ({
            title: item.Title,
            content: item.Blurb
          }))
      }));
      setData(grouped);
    });
  }, []);

  return data;
}
