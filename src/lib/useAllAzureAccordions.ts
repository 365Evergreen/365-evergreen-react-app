import { useEffect, useState } from 'react';

export interface RawAccordion {
  id: number;
  label: string;
  blurb?: string;
  image?: string;
  feature?: string;
  section?: string | null;
}

export function useAllAzureAccordions(): RawAccordion[] {
  const [accordions, setAccordions] = useState<RawAccordion[]>([]);

  useEffect(() => {
    fetch('https://pauli.blob.core.windows.net/365-evergreen/accordions/accordions.json')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAccordions(data);
        } else if (data.body && Array.isArray(data.body)) {
          setAccordions(data.body);
        } else {
          setAccordions([data]);
        }
      });
  }, []);

  return accordions;
}
