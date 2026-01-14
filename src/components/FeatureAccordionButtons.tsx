import React, { useState, useEffect, useMemo } from 'react';
import { useFeatureButtons } from '../lib/useFeatureButtons';
import { useAzureAccordions } from '../lib/useAzureAccordions';
import { VanillaAccordion } from './VanillaAccordion';

interface FeatureAccordionButtonsProps {
  featureTitle: string;
}

const FeatureAccordionButtons: React.FC<FeatureAccordionButtonsProps> = ({ featureTitle }) => {
  // Support both remote and local feature-buttons.json (with .body array)
  let featureButtonsRaw = useFeatureButtons() || [];
  // If the data is { body: [...] }, use .body
  const featureButtons = Array.isArray((featureButtonsRaw as any).body)
    ? (featureButtonsRaw as any).body
    : featureButtonsRaw;
  const accordions = useAzureAccordions();

  // Filter buttons for this feature
  const filteredButtons = useMemo(() => (
    featureTitle && Array.isArray(featureButtons)
      ? featureButtons.filter(btn => (btn.feature || '').trim().toLowerCase() === featureTitle.trim().toLowerCase())
      : []
  ), [featureTitle, featureButtons]);

  // Filter accordions for this feature
  const filteredAccordions = useMemo(() => (
    featureTitle
      ? accordions.filter(acc =>
          acc.parentFeature && acc.parentFeature.trim().toLowerCase() === featureTitle.trim().toLowerCase()
        )
      : []
  ), [featureTitle, accordions]);

  // State for selected button
  const [selectedAccordionId, setSelectedAccordionId] = useState<number | null>(null);

  // Always select the first button by default (or when feature changes)
  useEffect(() => {
    if (filteredButtons.length > 0) {
      // Support both accordionId and accordion property names
      setSelectedAccordionId(filteredButtons[0].accordionId ?? filteredButtons[0].accordion);
    }
  }, [filteredButtons, featureTitle]);

  // Find the selected button and related accordion group
  const selectedBtn = filteredButtons.find(btn => (btn.accordionId ?? btn.accordion) === selectedAccordionId);
  const selectedAccordion = selectedBtn
    ? filteredAccordions.find(acc => acc.title.trim().toLowerCase() === (selectedBtn.accordionLabel || '').trim().toLowerCase())
    : null;

  return (
    <div>
      {filteredButtons.length > 0 && (
        <div style={{ marginTop: '2rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {filteredButtons.map((btn, idx) => {
            const id = btn.accordionId ?? btn.accordion;
            return (
              <button
                key={String(id) + '-' + idx}
                style={{
                  padding: '0.5em 1.2em',
                  borderRadius: 10,
                  border: id === selectedAccordionId ? '2px solid #000' : '1px solid #ccc',
                  background: id === selectedAccordionId ? '#000' : '#fff',
                  color: id === selectedAccordionId ? '#fff' : '#181828',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: id === selectedAccordionId ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.18s',
                }}
                onClick={() => setSelectedAccordionId(id)}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      )}
      {selectedAccordion && (
        <div style={{ marginTop: '2rem' }}>
          <VanillaAccordion items={[selectedAccordion]} />
        </div>
      )}
    </div>
  );
};

export default FeatureAccordionButtons;