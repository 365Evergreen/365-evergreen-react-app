import React, { useState } from "react";

export interface VanillaAccordionPanel {
  title: string;
  content: string;
}

export interface VanillaAccordionItem {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  panels: VanillaAccordionPanel[];
}

interface VanillaAccordionProps {
  items: VanillaAccordionItem[];
}

export const VanillaAccordion: React.FC<VanillaAccordionProps> = ({ items }) => {
  // Track open panel: [itemIndex, panelIndex]
  const [openPanel, setOpenPanel] = useState<{ itemIdx: number; panelIdx: number } | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {items.map((item, idx) => (
        <section
          key={item.title + idx}
          style={{
            display: "flex",
            flexDirection: idx % 2 === 1 ? "row-reverse" : "row",
            alignItems: "flex-start",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>{item.title}</h2>
            {item.description && <p style={{ margin: "0.5rem 0 1.5rem 0" }}>{item.description}</p>}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {item.panels.map((panel, pidx) => (
                <VanillaAccordionPanel
                  key={(panel as any).key ?? panel.title + '-' + pidx}
                  title={panel.title}
                  content={panel.content}
                  open={openPanel?.itemIdx === idx && openPanel?.panelIdx === pidx}
                  onClick={() => setOpenPanel(openPanel?.itemIdx === idx && openPanel?.panelIdx === pidx ? null : { itemIdx: idx, panelIdx: pidx })}
                />
              ))}
            </div>
          </div>
          {item.image && (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minWidth: 0 }}>
              <img
                src={item.image}
                alt={item.imageAlt || item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }}
              />
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

interface VanillaAccordionPanelProps {
  title: string;
  content: string;
  open: boolean;
  onClick: () => void;
}

const VanillaAccordionPanel: React.FC<VanillaAccordionPanelProps> = ({ title, content, open, onClick }) => {
  // Always render the panel container, but only show content if open
  return (
    <div
      style={{
        border: "1px solid var(--neutralQuaternary)",
        borderRadius: 8,
        background: "var(--neutralLighter)",
        overflow: "hidden",
        transition: "box-shadow 0.2s",
        minHeight: 56, // Ensures the container doesn't shrink when closed
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={onClick}
        style={{
          width: "100%",
          textAlign: "left",
          fontWeight: 700,
          fontSize: "1.18rem",
          background: "none",
          border: "none",
          outline: "none",
          padding: "1.1rem 1.5rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          color: "var(--neutralPrimary)",
        }}
      >
        <span style={{ marginRight: 12, fontSize: 20, display: "inline-block", transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>
          ▶
        </span>
        {title}
      </button>
      <div
        style={{
          padding: open ? "1.1rem 1.5rem" : 0,
          background: open ? "#fff" : "inherit",
          fontSize: open ? "1rem" : 0,
          color: open ? "#222" : "inherit",
          height: open ? "auto" : 0,
          overflow: open ? "visible" : "hidden",
          transition: "all 0.28s cubic-bezier(.4,0,.2,1)",
        }}
        aria-hidden={!open}
      >
        {open && content}
      </div>
    </div>
  );
};
