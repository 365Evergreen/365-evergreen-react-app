import { useEffect, useState } from 'react';

export interface FeatureButton {
  feature: string;
  label: string;
  accordionId: number;
  accordionLabel: string;
}

export function useFeatureButtons(): FeatureButton[] {
  const [buttons, setButtons] = useState<FeatureButton[]>([]);

  useEffect(() => {
    fetch('https://pauli.blob.core.windows.net/365-evergreen/accordions/feature-buttons.json')
      .then(res => res.json())
      .then(setButtons);
  }, []);

  return buttons;
}
