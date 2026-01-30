import React, { useState, useRef, useEffect } from "react";
import "../WeDoSupport.css";
import WhatWeDoAccordion from "./WhatWeDoAccordion";

const support_URL = "https://365evergreendev.blob.core.windows.net/365evergreen/accordions.json";
const ACCORDION_LIST_URL = "https://365evergreendev.blob.core.windows.net/365evergreen/accordion-list.json";

const WhatWeSupport: React.FC = () => {
  const [comms, setComms] = React.useState<any[]>([]);
  const [accordionList, setAccordionList] = React.useState<any[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [openPanelIdx, setOpenPanelIdx] = useState<number | null>(0);
  const accordionContainerRef = useRef<HTMLDivElement>(null);
  const [accordionHeight, setAccordionHeight] = useState<number>(0);
  const selected = comms.length > 0 ? comms[selectedIdx] : null;
  const panels = selected && Array.isArray(accordionList)
    ? accordionList.filter((item) => item.parentId === selected.id)
    : [];

  useEffect(() => {
    if (accordionContainerRef.current) {
      setAccordionHeight(accordionContainerRef.current.offsetHeight);
    }
  }, [panels, openPanelIdx, selectedIdx]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(support_URL).then((res) => res.json()),
      fetch(ACCORDION_LIST_URL).then((res) => res.json())
    ]).then(([commsData, accordionData]) => {
      let commsArr = Array.isArray(commsData)
        ? commsData
        : (commsData && Array.isArray(commsData.body) ? commsData.body : []);
      let accordionArr = Array.isArray(accordionData)
        ? accordionData
        : (accordionData && Array.isArray(accordionData.body) ? accordionData.body : []);
      if (!cancelled) {
        setComms(commsArr.filter((item: { section: string; }) => item.section === "support"));
        setAccordionList(accordionArr);
      }
    }).catch(() => {
      if (!cancelled) {
        setComms([]);
        setAccordionList([]);
      }
    });
    return () => { cancelled = true; };
  }, []);

  // Get image for selected panel if present, else fallback to selected item
  let imageUrl = selected?.imageUrl;
  if (
    panels.length > 0 &&
    openPanelIdx !== null &&
    panels[openPanelIdx] &&
    panels[openPanelIdx].imageUrl
  ) {
    imageUrl = panels[openPanelIdx].imageUrl;
  }

  return (
    <section className="we-do-support-bg">
      <div className="we-do-support-container">
        <h2 className="we-do-support__heading">Support</h2>
        <p className="we-do-support__description">Placeholder description for support. Replace with real content describing support offerings.</p>
        <div className="we-do-support__button-row">
          {comms.length === 0 ? (
            <span>Loading...</span>
          ) : (
            comms.map((item, idx) => (
              <button
                key={item.id}
                className={`we-do-support__button${selectedIdx === idx ? " selected" : ""}`}
                onClick={() => setSelectedIdx(idx)}
              >
                {item.label}
              </button>
            ))
          )}
        </div>
        <div className="we-do-support__columns">
          <div className="support-accordion-container" ref={accordionContainerRef}>
            {comms.length === 0 ? (
              <div>Loading accordion...</div>
            ) : selected ? (
              <WhatWeDoAccordion
                items={[{
                  title: selected.label,
                  panels: panels.length > 0
                    ? panels.map((p) => ({
                        title: p.label,
                        content: p.blurb,
                      }))
                    : [{ title: selected.label, content: selected.blurb }]
                }]}
                openPanelIdx={openPanelIdx}
                setOpenPanelIdx={setOpenPanelIdx}
              />
            ) : (
              <div>No accordion data found.</div>
            )}
          </div>
          <div className="support-image-container">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={selected?.label}
                className="support-image"
                style={{
                  opacity: 1,
                  transition: 'opacity 0.5s cubic-bezier(.4,0,.2,1)',
                  height: accordionHeight ? `${accordionHeight}px` : 'auto',
                  width: 'auto',
                  objectFit: 'cover',
                  maxWidth: '100%',
                  display: 'block',
                }}
                onLoad={e => { e.currentTarget.style.opacity = '1'; }}
              />
            ) : (
              <div className="support-image-placeholder" style={{ height: accordionHeight ? `${accordionHeight}px` : 'auto', width: '100%' }}>No image</div>
            )}
          </div>
        </div>
        <p className="we-do-support__footer">Support footer</p>
      </div>
    </section>
    );
};

export default WhatWeSupport;
