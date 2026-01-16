import React, { useState, useMemo } from 'react';
import accordionsData from '../../accordions.json';
import accordionListData from '../../accordion-list.json';

// Hardcoded feature WP post IDs for test UI (replace with real IDs as needed)
const featureOptions = [
  { id: 'cG9zdDozNDg=', title: 'Business apps' },
  { id: 'cG9zdDozNDM=', title: 'Automated processes' },
  { id: "cG9zdDozMzg=", title: 'Modern workplace' },
];

const AccordionTest: React.FC = () => {
  const [selectedFeatureId, setSelectedFeatureId] = useState(featureOptions[0].id);
  const accordions = useMemo(() => {
    return (accordionsData.body || accordionsData).filter(
      (acc: any) => acc.parentFeatureId === selectedFeatureId
    );
  }, [selectedFeatureId]);

  const [selectedAccordionId, setSelectedAccordionId] = useState<string | null>(null);
  const items = useMemo(() => {
    if (!selectedAccordionId) return [];
    return (accordionListData.body || accordionListData).filter(
      (item: any) => item.parentId === Number(selectedAccordionId)
    );
  }, [selectedAccordionId]);

  return (
    <div style={{ padding: 32 }}>
      <h2>Accordion Test Component</h2>
      <label>
        Feature:
        <select
          value={selectedFeatureId}
          onChange={e => {
            setSelectedFeatureId(e.target.value);
            setSelectedAccordionId(null);
          }}
        >
          {featureOptions.map(f => (
            <option key={f.id} value={f.id}>{f.title}</option>
          ))}
        </select>
      </label>
      <div style={{ margin: '16px 0' }}>
        <strong>Accordions:</strong>
        {accordions.length === 0 && <div>No accordions for this feature.</div>}
        {accordions.map(acc => {
          const accIdStr = String(acc.id);
          return (
            <button
              key={accIdStr}
              style={{ margin: 4, padding: 8, background: selectedAccordionId === accIdStr ? '#222' : '#eee', color: selectedAccordionId === accIdStr ? '#fff' : '#222' }}
              onClick={() => setSelectedAccordionId(accIdStr)}
            >
              {acc.label}
            </button>
          );
        })}
      </div>
      <div>
        <strong>Accordion Items:</strong>
        {items.length === 0 && <div>No items for this accordion.</div>}
        <ul>
          {items.map(item => (
            <li key={item.id}><strong>{item.label}</strong>: {item.blurb}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccordionTest;
