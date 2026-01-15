import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <AnimatePresence mode="wait">
        {items.map((item, idx) => (
          <motion.section
            key={item.title + idx}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
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
          </motion.section>
        ))}
      </AnimatePresence>
    </div>
  );
};

const VanillaAccordionPanel: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        border: "1px solid var(--neutralQuaternary)",
        borderRadius: 8,
        background: "var(--neutralLighter)",
        overflow: "hidden",
        transition: "box-shadow 0.2s",
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
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
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{ padding: "1.1rem 1.5rem", background: "#fff", fontSize: "1rem", color: "#222" }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
