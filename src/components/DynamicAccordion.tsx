import React, { useState } from 'react';
import styles from './DynamicAccordion.module.css';

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
    <div className={styles.accordionList}>
      {items.map((item, idx) => (
        <section
          className={
            styles.accordionSection +
            ' ' +
            (idx % 2 === 1 ? styles.reverse : '')
          }
          key={item.title + idx}
        >
          <div className={styles.accordionContent}>
            <h2 className={styles.accordionTitle}>{item.title}</h2>
            {item.description && <p className={styles.accordionDesc}>{item.description}</p>}
            <div className={styles.accordionPanels}>
              {item.panels.map((panel, pidx) => (
                <AccordionPanel key={panel.title + pidx} title={panel.title}>
                  {panel.content}
                </AccordionPanel>
              ))}
            </div>
          </div>
          {item.image && (
            <div className={styles.accordionImageWrap}>
              <img
                src={item.image}
                alt={item.imageAlt || item.title}
                className={styles.accordionImage}
              />
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

const AccordionPanel: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.panel}>
      <button
        className={styles.panelTitle}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={title.replace(/\s+/g, '-') + '-panel'}
      >
        {title}
        <span className={styles.panelIcon}>{open ? '\u25B2' : '\u25BC'}</span>
      </button>
      {open && (
        <div className={styles.panelContent} id={title.replace(/\s+/g, '-') + '-panel'}>
          {children}
        </div>
      )}
    </div>
  );
};
