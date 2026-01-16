import React, { useState, useRef, useEffect } from "react";
import "../WeDoCommunication.css";
import WhatWeDoAccordion from "./WhatWeDoAccordion";



const COMMUNICATION_URL = "https://pauli.blob.core.windows.net/365-evergreen/accordions/accordions.json";
const ACCORDION_LIST_URL = "https://pauli.blob.core.windows.net/365-evergreen/accordions/accordion-list.json";

const WeDoCommunication: React.FC = () => {
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
      fetch(COMMUNICATION_URL).then((res) => res.json()),
      fetch(ACCORDION_LIST_URL).then((res) => res.json())
    ]).then(([commsData, accordionData]) => {
      let commsArr = Array.isArray(commsData)
        ? commsData
        : (commsData && Array.isArray(commsData.body) ? commsData.body : []);
      let accordionArr = Array.isArray(accordionData)
        ? accordionData
        : (accordionData && Array.isArray(accordionData.body) ? accordionData.body : []);
      if (!cancelled) {
        setComms(commsArr.filter((item: { section: string; }) => item.section === "communication"));
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

  // ...existing code...

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
    <section className="we-do-communication-bg">
      <div className="we-do-communication-container">
        <h2 className="we-do-communication__heading">Communication</h2>
        <p className="we-do-communication__description">This is a placeholder description for the communication section. Add your real content here to describe what this section is about.</p>
        <div className="we-do-communication__button-row">
          {comms.length === 0 ? (
            <span>Loading...</span>
          ) : (
            comms.map((item, idx) => (
              <button
                key={item.id}
                className={`we-do-communication__button${selectedIdx === idx ? " selected" : ""}`}
                onClick={() => setSelectedIdx(idx)}
              >
                {item.label}
              </button>
            ))
          )}
        </div>
        <div className="we-do-communication__columns">
          <div className="communication-accordion-container" ref={accordionContainerRef}>
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
          <div className="communication-image-container">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={selected?.label}
                className="communication-image"
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
              <div className="communication-image-placeholder" style={{ height: accordionHeight ? `${accordionHeight}px` : 'auto', width: '100%' }}>No image</div>
            )}
          </div>
        </div>
        <p className="we-do-communication__footer">Yo</p>
      </div>
    </section>
    );
};

export default WeDoCommunication;
