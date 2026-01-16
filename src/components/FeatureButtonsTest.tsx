import React, { useState, useMemo } from 'react';
import featuresData from '../lib/features.json';

// Hosted accordions data
const ACCORDIONS_URL = 'https://pauli.blob.core.windows.net/365-evergreen/accordions/accordions.json';

const featureOptions = (featuresData.data?.features?.edges || []).map((f: any) => ({
  id: f.node.id,
  title: f.node.title,
}));

const FeatureButtonsTest: React.FC = () => {
  const [selectedFeatureId, setSelectedFeatureId] = useState(featureOptions[0]?.id || '');
  const [accordions, setAccordions] = useState<any[]>([]);

  React.useEffect(() => {
    fetch(ACCORDIONS_URL)
      .then(res => res.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : (data.body || []);
        setAccordions(arr);
      });
  }, []);

  // Filter accordions by featureId
  const filteredAccordions = useMemo(() => (
    accordions.filter(acc => acc.featureId === selectedFeatureId)
  ), [accordions, selectedFeatureId]);

  return (
    <div style={{ padding: 32 }}>
      <h2>Feature Buttons Test</h2>
      <label>
        Feature:
        <select
          value={selectedFeatureId}
          onChange={e => setSelectedFeatureId(e.target.value)}
        >
          {featureOptions.map(f => (
            <option key={f.id} value={f.id}>{f.title}</option>
          ))}
        </select>
      </label>
      <div style={{ margin: '16px 0' }}>
        <strong>Filtered Accordions (Buttons):</strong>
        {filteredAccordions.length === 0 && <div>No accordions for this feature.</div>}
        {filteredAccordions.map(acc => (
          <button
            key={acc.id}
            style={{ margin: 4, padding: 8 }}
          >
            {acc.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeatureButtonsTest;
