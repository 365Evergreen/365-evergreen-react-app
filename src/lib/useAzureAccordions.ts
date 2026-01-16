import { useEffect, useState } from 'react';

export interface AccordionPanelData {
  title: string;
  content: string;
}

export interface AccordionGroupData {
  id: number;
  title: string;
  description?: string;
  header?: string;
  image?: string;
  feature?: string;
  parentFeatureId?: string;
  panels: AccordionPanelData[];
}

export function useAzureAccordions(parentFeatureId?: string): AccordionGroupData[] {
  const [data, setData] = useState<AccordionGroupData[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('https://pauli.blob.core.windows.net/365-evergreen/accordions/accordions.json').then(res => res.json()),
      fetch('https://pauli.blob.core.windows.net/365-evergreen/accordions/accordion-list.json').then(res => res.json())
    ]).then(([accordionMeta, accordionItems]) => {
      const accordions = Array.isArray(accordionMeta) ? accordionMeta : [accordionMeta];
      const items = Array.isArray(accordionItems) ? accordionItems : [accordionItems];
      let filteredAccordions = accordions;
      if (parentFeatureId) {
        filteredAccordions = accordions.filter(acc => acc.parentFeatureId === parentFeatureId);
      }
      const grouped = filteredAccordions.map(acc => {
        // Find panels where parentId matches this accordion's id
        const panels = items
          .filter(item => item.parentId === acc.id)
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map(item => ({
            title: item.label,
            content: item.blurb
          }));
        return {
          id: acc.id,
          title: acc.label,
          description: acc.blurb,
          image: acc.image,
          feature: acc.feature,
          parentFeatureId: acc.parentFeatureId,
          panels
        };
      });
      setData(grouped);
    });
  }, [parentFeatureId]);

  return data;
}
