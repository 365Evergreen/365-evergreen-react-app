import React, { useState, useEffect, useMemo } from 'react';
import { useAzureAccordions } from '../lib/useAzureAccordions';
import { VanillaAccordion } from './VanillaAccordion';
import accordionListJson from '../../accordion-list.json';
import featuresData from '../lib/features.json';

interface FeatureAccordionButtonsProps {
  feature: string;
}
const FeatureAccordionButtons: React.FC<FeatureAccordionButtonsProps> = ({ feature }) => {
  // Find featureId from features.json
  const featureId = useMemo(() => {
    const edges = featuresData.data?.features?.edges || [];
    const match = edges.find((f: any) => f.node.title.trim().toLowerCase() === feature.trim().toLowerCase());
    return match?.node?.id ?? undefined;
  }, [feature]);

  // Filter accordions by parentFeatureId
  const accordions = useAzureAccordions(featureId);

  // State for selected accordion index
  const [selectedIdx, setSelectedIdx] = useState(0);
  useEffect(() => {
    setSelectedIdx(0);
  }, [featureId]);

  // Get panels/items for each accordion
  const accordionItems = useMemo(() => (
    accordions.map(acc => {
      // Find items in accordion-list where parentId matches acc.id
      const panels = (accordionListJson.body || []).filter(item => item.parentId === acc.id)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map(item => ({ title: item.label, content: item.blurb }));
      return {
        title: acc.title,
        description: acc.description,
        image: acc.image,
        panels
      };
    })
  ), [accordions]);

  return (
    <div>
      {accordionItems.length > 0 && (
        <div style={{ marginTop: '2rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {accordionItems.map((acc, idx) => (
            <button
              key={acc.title + '-' + idx}
              type="button"
              className={`appButton feature-accordion-btn${selectedIdx === idx ? ' feature-accordion-btn--active' : ''}`}
              style={{
                padding: '0.5em 1.2em',
                borderRadius: 10,
                border: selectedIdx === idx ? '2px solid #000' : '1px solid #ccc',
                background: selectedIdx === idx ? '#000' : '#fff',
                color: selectedIdx === idx ? '#fff' : '#181828',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: selectedIdx === idx ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.18s',
              }}
              onClick={() => setSelectedIdx(idx)}
            >
              {acc.title}
            </button>
          ))}
        </div>
      )}
      {accordionItems[selectedIdx] && (
        <div style={{ marginTop: '2rem' }}>
          <VanillaAccordion items={[accordionItems[selectedIdx]]} />
        </div>
      )}
    </div>
  );
};

export default FeatureAccordionButtons;