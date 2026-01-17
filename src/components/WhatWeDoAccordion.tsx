import React, { useState } from "react";
import "../WhatWeDoAccordion.css";

export interface WhatWeDoAccordionPanel {
  title: string;
  content: string;
}

export interface WhatWeDoAccordionItem {
  title: string;
  panels: WhatWeDoAccordionPanel[];
}

interface WhatWeDoAccordionProps {
  items: WhatWeDoAccordionItem[];
  openPanelIdx?: number | null;
  setOpenPanelIdx?: (idx: number | null) => void;
}

const WhatWeDoAccordion: React.FC<WhatWeDoAccordionProps> = ({ items, openPanelIdx, setOpenPanelIdx }) => {
  // All panels collapsed by default
  const [internalOpenIdx, setInternalOpenIdx] = useState<number | null>(null);
  const handlePanelClick = (idx: number) => {
    if (setOpenPanelIdx) {
      setOpenPanelIdx(idx === (openPanelIdx ?? null) ? null : idx);
    } else {
      setInternalOpenIdx(idx === internalOpenIdx ? null : idx);
    }
  };
  const currentOpenIdx = setOpenPanelIdx ? openPanelIdx : internalOpenIdx;
  return (
    <div className="whatwedo-accordion">
      {items.map((item, itemIdx) => (
        <section key={item.title + itemIdx} className="whatwedo-accordion__section">
          <h2 className="whatwedo-accordion__title">{item.title}</h2>
          <div className="whatwedo-accordion__panels">
            {item.panels.map((panel, pidx) => (
              <div key={panel.title + pidx} className="whatwedo-accordion__panel">
                <button
                  type="button"
                  className={`whatwedo-accordion__button${currentOpenIdx === pidx ? " open" : ""}`}
                  aria-expanded={currentOpenIdx === pidx}
                  onClick={() => handlePanelClick(pidx)}
                >
                  <span className="whatwedo-accordion__arrow" style={{ transform: currentOpenIdx === pidx ? "rotate(90deg)" : "none" }}>
                    ▶
                  </span>
                  {panel.title}
                </button>
                <div className="whatwedo-accordion-content-expanded">
                <div
                  className="whatwedo-accordion__content"
                  style={{ display: currentOpenIdx === pidx ? "block" : "none" }}
                  aria-hidden={currentOpenIdx !== pidx}
                >
                  {panel.content}
                </div>
                {currentOpenIdx === pidx && (
                  <div>
                    <button type="button">Unstyled</button>
                  </div>
                )}
              </div></div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default WhatWeDoAccordion;
