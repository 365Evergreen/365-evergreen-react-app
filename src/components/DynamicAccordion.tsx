
import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from '@fluentui/react-components';

export interface AccordionItem {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  panels: { title: string; content: string }[];
}

interface DynamicAccordionProps {
  items: AccordionItem[];
}

export const DynamicAccordion: React.FC<DynamicAccordionProps> = ({ items }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {items.map((item, idx) => (
        <section
          key={item.title + idx}
          style={{
            display: 'flex',
            flexDirection: idx % 2 === 1 ? 'row-reverse' : 'row',
            alignItems: 'flex-start',
            gap: '2rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>{item.title}</h2>
            {item.description && <p style={{ margin: '0.5rem 0 1.5rem 0' }}>{item.description}</p>}
            <Accordion collapsible multiple>
              {item.panels.map((panel, pidx) => (
                <AccordionItem value={panel.title + pidx} key={panel.title + pidx}>
                  <AccordionHeader>{panel.title}</AccordionHeader>
                  <AccordionPanel>{panel.content}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          {item.image && (
            <div style={{ flex: '0 0 240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={item.image}
                alt={item.imageAlt || item.title}
                style={{ maxWidth: 220, maxHeight: 180, borderRadius: 12 }}
              />
            </div>
          )}
        </section>
      ))}
    </div>
  );
};
