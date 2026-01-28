import React, { useState, useMemo, useEffect } from 'react';
// Attempt to load fixture JSON from the project root at runtime; fall back to empty lists when unavailable.
const defaultAccordions: any = { body: [] };
const defaultAccordionList: any = { body: [] };

// Hardcoded feature WP post IDs for test UI (replace with real IDs as needed)
const featureOptions = [
  { id: 'cG9zdDozNDg=', title: 'Business apps' },
  { id: 'cG9zdDozNDM=', title: 'Automated processes' },
  { id: "cG9zdDozMzg=", title: 'Modern workplace' },
];

const AccordionTest: React.FC = () => {
  const [selectedFeatureId, setSelectedFeatureId] = useState(featureOptions[0].id);
  const [accordionsDataState, setAccordionsDataState] = React.useState<any>(defaultAccordions);
  const accordions = useMemo(() => {
    return (accordionsDataState.body || accordionsDataState).filter(
      (acc: any) => acc.parentFeatureId === selectedFeatureId
    );
  }, [selectedFeatureId, accordionsDataState]);

  const [selectedAccordionId, setSelectedAccordionId] = useState<string | null>(null);
  const [accordionListDataState, setAccordionListDataState] = React.useState<any>(defaultAccordionList);
  const items = useMemo(() => {
    if (!selectedAccordionId) return [];
    return (accordionListDataState.body || accordionListDataState).filter(
      (item: any) => item.parentId === Number(selectedAccordionId)
    );
  }, [selectedAccordionId, accordionListDataState]);

  useEffect(() => {
    fetch('/accordions.json')
      .then(r => r.ok ? r.json() : defaultAccordions)
      .then(j => setAccordionsDataState(j))
      .catch(() => setAccordionsDataState(defaultAccordions));
    fetch('/accordion-list.json')
      .then(r => r.ok ? r.json() : defaultAccordionList)
      .then(j => setAccordionListDataState(j))
      .catch(() => setAccordionListDataState(defaultAccordionList));
  }, []);

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
      {/* Load optional fixture JSON at runtime (non-blocking) */}
      <div style={{ margin: '16px 0' }}>
        <strong>Accordions:</strong>
        {accordions.length === 0 && <div>No accordions for this feature.</div>}
        {accordions.map((acc: any) => {
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
          {items.map((item: any) => (
            <li key={item.id}><strong>{item.label}</strong>: {item.blurb}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccordionTest;
